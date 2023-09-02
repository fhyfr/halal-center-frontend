import Head from 'next/head';
import { Box, Button, Container, SvgIcon, Typography } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { parseCookies } from '../../lib/auth-cookies';
import axios from 'axios';
import { CourseDetails } from '../../components/course/details-course';
import { getCurrentUser } from '../../services/api/user';

const { NEXT_PUBLIC_API } = process.env;

export const getServerSideProps = async ({ req, res, query }) => {
  let course, instructors, documents, certificates, payments;

  const { courseId } = query;
  if (!courseId || courseId === null) {
    return {
      redirect: {
        permanent: false,
        destination: '/course',
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

  let currentUser;
  try {
    const response = await getCurrentUser(user.accessToken);

    currentUser = { ...response };
  } catch (err) {
    currentUser = { error: { message: err.message } };
  }

  try {
    // get course data
    const responseCourse = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/course/${courseId}`,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    if (responseCourse.status !== 200) {
      throw new Error('failed to get data course');
    }
    course = responseCourse.data;

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
    instructors = responseInstructor.data;

    // get documents data
    const responseDocument = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/document`,
      params: { courseId },
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    if (responseDocument.status !== 200) {
      throw new Error('failed to get data documents');
    }
    documents = responseDocument.data;

    // get certificate data
    const responseCertificate = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/document`,
      params: { courseId, userId: currentUser.id, type: 'CERTIFICATE' },
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    if (responseCertificate.status !== 200) {
      throw new Error('failed to get data certificates');
    }
    certificates = responseCertificate.data;

    // get registration payment data
    const responseRegistrationPayment = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/registration-payment`,
      params: { courseId: course.id, userId: currentUser.id },
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    payments = responseRegistrationPayment.data;
  } catch (err) {
    course = { error: { message: err.message } };
    instructors = { error: { message: err.message } };
    documents = { error: { message: err.message } };
    certificates = { error: { message: err.message } };
    payments = { error: { message: err.message } };
  }

  return { props: { course, instructors, user: currentUser, documents, certificates, payments } };
};

const Details = (props) => {
  const router = useRouter();
  const { course, instructors, user, documents, certificates, payments } = props;

  if (user.roleId === 3 && !course.isRegistered) {
    router.push('/course');
  }

  return (
    <>
      <Head>
        <title>Course Details | Halal Center</title>
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
            Course Details
          </Typography>

          <CourseDetails
            course={course}
            instructors={instructors}
            user={user}
            documents={documents}
            certificates={certificates}
            payments={payments}
          />
        </Container>
      </Box>
    </>
  );
};

Details.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Details;
