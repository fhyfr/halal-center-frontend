import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { AddInstructor } from '../../components/instructor/add-instructor';
import { parseCookies } from '../../lib/auth-cookies';
import axios from 'axios';

const { NEXT_PUBLIC_API } = process.env;

export const getServerSideProps = async ({ req }) => {
  let courses, provinces, cities;

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
    const responseCourse = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/course?page=1&size=200`,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });

    if (responseCourse.status !== 200) {
      throw new Error('failed to get data courses');
    }

    const responseProvinces = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/province?page=1&size=200`,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    if (responseProvinces.status !== 200) {
      throw new Error('failed to get data provinces');
    }

    const responseCities = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/city?page=1&size=200`,
      params: { provinceId: responseProvinces.data.id },
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    if (responseCities.status !== 200) {
      throw new Error('failed to get data cities');
    }

    courses = responseCourse.data;
    provinces = responseProvinces.data;
    cities = responseCities.data;
  } catch (err) {
    courses = { error: { message: err.message } };
    provinces = { error: { message: err.message } };
    cities = { error: { message: err.message } };
  }

  return { props: { courses, provinces, cities } };
};

const AddNew = (props) => {
  const { courses, provinces, cities } = props;

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
            <AddInstructor courses={courses} provinces={provinces} cities={cities} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

AddNew.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default AddNew;
