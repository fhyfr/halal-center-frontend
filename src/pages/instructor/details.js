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

export const getServerSideProps = async ({ req, res, query }) => {
  let instructor;
  let courses = [];

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
    instructor = response.data;

    if (instructor.courseIds?.length > 0) {
      for (let iterator = 0; iterator < instructor.courseIds.length; iterator++) {
        const responseCourse = await axios({
          method: 'GET',
          url: `${NEXT_PUBLIC_API}/course/${instructor.courseIds[iterator]}`,
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        });
        if (responseCourse.status !== 200) {
          throw new Error('failed to get data course');
        }

        courses.push(responseCourse.data);
      }
    }
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
