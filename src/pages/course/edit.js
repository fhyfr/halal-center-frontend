import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { parseCookies } from '../../lib/auth-cookies';
import axios from 'axios';
import { EditCourse } from '../../components/course/edit-course';

const { NEXT_PUBLIC_API } = process.env;

export const getServerSideProps = async ({ req, res, query }) => {
  const { id } = query;
  if (!id || id === null) {
    return {
      redirect: {
        permanent: false,
        destination: '/course',
      },
      props: {},
    };
  }

  const data = parseCookies(req);
  let course, categories;

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
      url: `${NEXT_PUBLIC_API}/course/${id}`,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });

    const responseCategory = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/category?page=1&size=50`,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });

    course = responseCourse.data;
    categories = responseCategory.data;
  } catch (err) {
    course = { error: { message: err.message } };
    categories = { error: { message: err.message } };
  }

  return { props: { course, categories } };
};

const Edit = (props) => {
  const { course, categories } = props;

  return (
    <>
      <Head>
        <title>Edit Course</title>
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
            Course
          </Typography>
          <Box sx={{ pt: 3 }}>
            <EditCourse course={course} categories={categories} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Edit.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Edit;
