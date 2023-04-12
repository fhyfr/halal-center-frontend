import Head from 'next/head';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { CourseListToolbar } from '../../components/course/course-list-toolbar';
import { CourseCard } from '../../components/course/course-card';
import { DashboardLayout } from '../../components/dashboard-layout';
import { parseCookies } from '../../lib/auth-cookies';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
import useAuth from '../../hooks/use-auth';

const { NEXT_PUBLIC_API } = process.env;

export const getServerSideProps = async ({ req, res, query }) => {
  const page = query.page || 1;
  const size = query.limit || 6;
  const search = query.search;
  const categoryId = query.categoryId;

  let courses,
    categories = null;
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

  let queryParams = { page, size };

  if (search && search.length > 0) {
    Object.assign(queryParams, { query: search });
  }

  if (categoryId && categoryId > 0) {
    Object.assign(queryParams, { categoryId });
  }

  try {
    const responseCourse = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/course`,
      params: queryParams,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    if (responseCourse.status !== 200) {
      throw new Error('failed to get data courses');
    }

    const responseCategory = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/category?page=1&size=50`,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    if (responseCategory.status !== 200) {
      throw new Error('failed to get data categories');
    }

    categories = responseCategory.data;
    courses = responseCourse.data;
  } catch (err) {
    courses = { error: { message: err.message } };
    categories = { error: { message: err.message } };
  }

  return { props: { courses, categories } };
};

const Course = (props) => {
  const { courses, categories } = props;

  const router = useRouter();
  const { user } = useAuth();

  const [page, setPage] = useState(1);

  const handleChange = (event, newPage) => {
    const path = router.pathname;
    const query = router.query;
    query.page = newPage;

    setPage(newPage);

    router.push({
      pathname: path,
      query: query,
    });
  };

  return (
    <>
      <Head>
        <title>Courses | Halal Center</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <CourseListToolbar categories={categories} />
          <Box sx={{ pt: 3 }}>
            <Grid container spacing={3}>
              {courses.data.map((course) => (
                <Grid item key={course.id} lg={4} md={6} xs={12}>
                  <CourseCard user={user} course={course} />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pt: 3,
            }}
          >
            <Pagination
              color="primary"
              count={courses.pageCount}
              page={page}
              size="small"
              onChange={handleChange}
              showFirstButton
              showLastButton
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Course.getLayout = (course) => <DashboardLayout>{course}</DashboardLayout>;

export default Course;
