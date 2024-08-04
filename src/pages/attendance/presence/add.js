import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '../../../components/dashboard-layout';
import { parseCookies } from '../../../lib/auth-cookies';
import axios from 'axios';
import { AddPresence } from '../../../components/presence/add-presence';

const { NEXT_PUBLIC_API } = process.env;

export const getServerSideProps = async ({ req, query }) => {
  let attendance;
  const courseId = query.courseId;
  const attendanceId = query.attendanceId;
  const userId = query.userId;

  if (!courseId || !attendanceId || !userId) {
    return {
      redirect: {
        permanent: false,
        destination: `/course/details?courseId=${courseId}`,
      },
      props: {},
    };
  }

  const data = parseCookies(req);
  if (!data.user) {
    return {
      redirect: {
        permanent: false,
        destination: '/auth/login',
      },
      props: {},
    };
  }
  const user = JSON.parse(data.user);

  try {
    const responseAttendance = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/attendance/${attendanceId}`,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    if (responseAttendance.status !== 200) {
      throw new Error('failed to get data attendance');
    }

    attendance = responseAttendance.data;
  } catch (err) {
    attendance = { error: { message: err.message } };
  }

  return { props: { attendance } };
};

const AddNew = (props) => {
  const { attendance } = props;

  return (
    <>
      <Head>
        <title>Add New Presence</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography sx={{ mb: 3 }} variant="h4">
            Add New Presence
          </Typography>
          <Box sx={{ pt: 3 }}>
            <AddPresence attendance={attendance} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

AddNew.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default AddNew;
