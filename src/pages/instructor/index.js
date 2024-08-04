import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { InstructorListResults } from '../../components/instructor/instructor-list-results';
import { InstructorListToolbar } from '../../components/instructor/instructor-list-toolbar';
import { DashboardLayout } from '../../components/dashboard-layout';
import { parseCookies } from '../../lib/auth-cookies';
import axios from 'axios';

const { NEXT_PUBLIC_API } = process.env;

export const getServerSideProps = async ({ req, query }) => {
  const page = query.page || 1;
  const size = query.limit || 6;
  const search = query.search;
  const courseId = query.courseId;

  let courses,
    instructors = null;
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

  if (courseId && courseId > 0) {
    Object.assign(queryParams, { courseId });
  }

  try {
    const responseInstructor = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/instructor`,
      params: queryParams,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    if (responseInstructor.status !== 200) {
      throw new Error('failed to get data instructors');
    }

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

    instructors = responseInstructor.data;
    courses = responseCourse.data;
  } catch (err) {
    instructors = { error: { message: err.message } };
    courses = { error: { message: err.message } };
  }

  return { props: { instructors, courses } };
};

const Instructor = (props) => {
  const { instructors, courses } = props;

  return (
    <>
      <Head>
        <title>Instructors | Halal Center</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <InstructorListToolbar courses={courses} />
          <Box sx={{ mt: 3 }}>
            <InstructorListResults instructors={instructors} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Instructor.getLayout = (instructor) => <DashboardLayout>{instructor}</DashboardLayout>;

export default Instructor;
