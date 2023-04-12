import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Box, Button, Container, Typography, SvgIcon } from '@mui/material';
import { parseCookies } from '../../lib/auth-cookies';
import axios from 'axios';
import { ArrowBack } from '@mui/icons-material';
import { getCurrentUser } from '../../services/api/user';
import { DashboardLayout } from '../../components/dashboard-layout';
import { PaymentCourse } from '../../components/course/payment-course';

const { NEXT_PUBLIC_API } = process.env;

export const getServerSideProps = async ({ req, res, query }) => {
  let course, currentUser;

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

  try {
    const responseCourse = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/course/${courseId}`,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    const responseUser = await getCurrentUser(user.accessToken);

    currentUser = { ...responseUser };
    course = responseCourse.data;
  } catch (err) {
    course = { error: { message: err.message } };
    currentUser = { error: { message: err.message } };
  }

  return { props: { course, user: currentUser } };
};

const Payment = (props) => {
  const router = useRouter();
  const { course, user } = props;

  if (course.isRegistered) {
    router.push('/course');
  }

  return (
    <>
      <Head>
        <title>Payment Course | Halal Center</title>
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
            Payment Course
          </Typography>

          <PaymentCourse course={course} user={user} />
        </Container>
      </Box>
    </>
  );
};

Payment.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Payment;
