import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { parseCookies } from '../../lib/auth-cookies';
import axios from 'axios';
import { EditInstructor } from '../../components/instructor/edit-instructor';

const { NEXT_PUBLIC_API } = process.env;

export const getServerSideProps = async ({ req, res, query }) => {
  const { instructorId } = query;
  if (!instructorId || instructorId === null) {
    return {
      redirect: {
        permanent: false,
        destination: '/instructor',
      },
      props: {},
    };
  }

  const data = parseCookies(req);
  let instructor, courses, provinces, cities;

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
      url: `${NEXT_PUBLIC_API}/instructor/${instructorId}`,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    if (response.status !== 200) {
      throw new Error('failed to get data instructor');
    }

    const responseCourse = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/course?page=1&size=200`,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });

    const responseProvinces = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/province?page=1&size=200`,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });

    const responseCities = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/city?page=1&size=200`,
      params: { provinceId: response.data.provinceId },
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });

    instructor = response.data;
    courses = responseCourse.data;
    provinces = responseProvinces.data;
    cities = responseCities.data;
  } catch (err) {
    instructor = { error: { message: err.message } };
    courses = { error: { message: err.message } };
    provinces = { error: { message: err.message } };
    cities = { error: { message: err.message } };
  }

  return { props: { instructor, courses, provinces, cities } };
};

const Edit = (props) => {
  const { instructor, courses, provinces, cities } = props;

  return (
    <>
      <Head>
        <title>Edit Instructor</title>
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
            Instructor
          </Typography>
          <Box sx={{ pt: 3 }}>
            <EditInstructor
              instructor={instructor}
              courses={courses}
              provinces={provinces}
              cities={cities}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Edit.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Edit;
