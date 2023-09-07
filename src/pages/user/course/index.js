import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../../../components/dashboard-layout';
import { parseCookies } from '../../../lib/auth-cookies';
import axios from 'axios';
import { getCurrentUser } from '../../../services/api/user';
import { MyCourseListResults } from '../../../components/user/course/my-course-list-results';
import { MyCourseListToolbar } from '../../../components/user/course/my-course-list-toolbar';

const { NEXT_PUBLIC_API } = process.env;

export const getServerSideProps = async ({ req, query }) => {
  const page = query.page || 1;
  const size = query.limit || 10;
  const search = query.search;

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

  let currentUser;
  try {
    const response = await getCurrentUser(user.accessToken);

    currentUser = { ...response };
  } catch (err) {
    currentUser = { error: { message: err.message } };
  }

  let courses;
  let queryParams = { page, size, userId: currentUser.id };

  if (search && search.length > 0) {
    Object.assign(queryParams, { query: search });
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

    courses = responseCourse.data;
  } catch (err) {
    courses = { error: { message: err.message } };
  }

  return { props: { courses } };
};

const User = (props) => {
  const { courses } = props;

  return (
    <>
      <Head>
        <title>My Course | Halal Center</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <MyCourseListToolbar />
          <Box sx={{ mt: 3 }}>
            <MyCourseListResults courses={courses} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

User.getLayout = (user) => <DashboardLayout>{user}</DashboardLayout>;

export default User;
