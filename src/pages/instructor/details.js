import Head from 'next/head';
import { Box, Button, Container, SvgIcon, Typography } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { ArrowBack } from '@mui/icons-material';
import { handleRedirectOnClick } from '../../utils/handle-event-button';
import { useRouter } from 'next/router';
import { parseCookies } from '../../lib/auth-cookies';
import axios from 'axios';
import { InstructorDetails } from '../../components/instructor/instructor-details';

const { NEXT_PUBLIC_API } = process.env;

export const getServerSideProps = async ({ req, query }) => {
  let instructor;
  let courses = [];

  const { id } = query;
  if (!id || id === null) {
    return {
      redirect: {
        permanent: false,
        destination: '/instructor',
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
    const responseInstructor = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/instructor/${id}`,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });

    if (responseInstructor.status !== 200) {
      throw new Error('failed to get data instructor');
    }

    const responseCourses = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/course/instructor/${id}?page=1&size=200`,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    if (responseCourses.status !== 200) {
      throw new Error('failed to get data courses');
    }

    instructor = responseInstructor.data;
    courses = responseCourses.data.data;
  } catch (err) {
    instructor = { error: { message: err.message } };
    courses = { error: { message: err.message } };
  }

  return { props: { instructor, courses } };
};

const Details = (props) => {
  const router = useRouter();
  const { instructor, courses } = props;

  return (
    <>
      <Head>
        <title>Instructor Details</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ marginY: 2 }}>
            <Button
              startIcon={
                <SvgIcon fontSize="small">
                  <ArrowBack />
                </SvgIcon>
              }
              color="primary"
              variant="contained"
              onClick={() => {
                handleRedirectOnClick(router, '/instructor');
              }}
            >
              Back
            </Button>
          </Box>
          <Typography sx={{ mb: 3 }} variant="h4">
            Instructor Details
          </Typography>

          <InstructorDetails instructor={instructor} courses={courses} />
        </Container>
      </Box>
    </>
  );
};

Details.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Details;
