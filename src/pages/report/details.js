import Head from 'next/head';
import { Box, Button, Container, SvgIcon, Typography } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { parseCookies } from '../../lib/auth-cookies';
import axios from 'axios';
import { ReportCourseDetails } from '../../components/report/report-course-details';

const { NEXT_PUBLIC_API } = process.env;

// eslint-disable-next-line no-unused-vars, unused-imports/no-unused-vars
export const getServerSideProps = async ({ req, res, query }) => {
  let course, instructors, participants;

  const { courseId } = query;
  if (!courseId || courseId === null) {
    return {
      redirect: {
        permanent: false,
        destination: '/report',
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
    // get course data
    const responseCourseDetailsReport = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/report/courses/${courseId}`,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    if (responseCourseDetailsReport.status !== 200) {
      throw new Error('failed to get data course details report');
    }

    // get instructors data
    const responseInstructor = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/instructor`,
      params: { courseId },
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    if (responseInstructor.status !== 200) {
      throw new Error('failed to get data instructors');
    }

    // get participants data
    const responseParticipant = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/member`,
      params: { courseId },
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    if (responseParticipant.status !== 200) {
      throw new Error('failed to get data participants');
    }

    course = responseCourseDetailsReport.data;
    instructors = responseInstructor.data;
    participants = responseParticipant.data;
  } catch (err) {
    course = { error: { message: err.message } };
    instructors = { error: { message: err.message } };
    participants = { error: { message: err.message } };
  }

  return {
    props: {
      course,
      instructors,
      participants,
    },
  };
};

const ReportDetails = (props) => {
  const router = useRouter();
  const { course, instructors, participants } = props;

  return (
    <>
      <Head>
        <title>Report Course Details | Halal Center</title>
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
                router.back();
              }}
            >
              Back
            </Button>
          </Box>
          <Typography sx={{ mb: 3 }} variant="h4">
            Report Course Details
          </Typography>

          <ReportCourseDetails
            course={course}
            instructors={instructors}
            participants={participants}
          />
        </Container>
      </Box>
    </>
  );
};

ReportDetails.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ReportDetails;
