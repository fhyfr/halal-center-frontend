import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { parseCookies } from '../../lib/auth-cookies';
import axios from 'axios';
import { EditAttendance } from '../../components/attendance/edit-attendance';

const { NEXT_PUBLIC_API } = process.env;

export const getServerSideProps = async ({ req, query }) => {
  let attendance;
  const { id } = query;
  if (!id || id === null) {
    return {
      redirect: {
        permanent: false,
        destination: '/attendance',
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
      url: `${NEXT_PUBLIC_API}/attendance/${id}`,
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

const Edit = (props) => {
  const { attendance } = props;

  return (
    <>
      <Head>
        <title>Edit Attendance</title>
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
            Attendance
          </Typography>
          <Box sx={{ pt: 3 }}>
            <EditAttendance attendance={attendance} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Edit.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Edit;
