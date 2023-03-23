import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { AddInstructor } from '../../components/instructor/add-instructor';
import { parseCookies } from '../../lib/auth-cookies';
import axios from 'axios';

const { NEXT_PUBLIC_API } = process.env;

export const getServerSideProps = async ({ req, res }) => {
  const data = parseCookies(req);
  let courses;

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
    const response = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/course?page=1&size=200`,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });

    courses = response.data;
  } catch (err) {
    courses = { error: { message: err.message } };
  }

  return { props: { courses } };
};

const AddNew = (props) => {
  const { courses } = props;

  return (
    <>
      <Head>
        <title>Add New Instructor</title>
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
            Add New Instructor
          </Typography>
          <Box sx={{ pt: 3 }}>
            <AddInstructor courses={courses} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

AddNew.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default AddNew;
