import Head from 'next/head';
import { Box, Button, Container, SvgIcon, Typography } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { ArrowBack } from '@mui/icons-material';
import { handleRedirectOnClick } from '../../utils/handle-event-button';
import { useRouter } from 'next/router';
import { parseCookies } from '../../lib/auth-cookies';
import axios from 'axios';
import { RegistrationPaymentDetails } from '../../components/registration-payment/details-registration-payment';

const { NEXT_PUBLIC_API } = process.env;

export const getServerSideProps = async ({ req, query }) => {
  let registrationPaymentData, userData, courseData;

  const { id } = query;
  if (!id || id === null) {
    return {
      redirect: {
        permanent: false,
        destination: '/registration-payment',
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
    const responseRegistrationPayment = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/registration-payment/${id}`,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    if (responseRegistrationPayment.status !== 200) {
      throw new Error('failed to get data registration payment');
    }

    const responseCourse = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/course/${responseRegistrationPayment.data.registration?.courseId}`,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    if (responseCourse.status !== 200) {
      throw new Error('failed to get data course');
    }

    const responseUser = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/user/${responseRegistrationPayment.data.registration?.userId}`,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    if (responseUser.status !== 200) {
      throw new Error('failed to get data user');
    }

    registrationPaymentData = responseRegistrationPayment.data;
    courseData = responseCourse.data;
    userData = responseUser.data;
  } catch (err) {
    registrationPaymentData = { error: { message: err.message } };
    courseData = { error: { message: err.message } };
    userData = { error: { message: err.message } };
  }

  return { props: { registrationPaymentData, courseData, userData } };
};

const Details = (props) => {
  const router = useRouter();
  const { registrationPaymentData, courseData, userData } = props;

  return (
    <>
      <Head>
        <title>Registration Payment Details</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="md">
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
                handleRedirectOnClick(router, '/registration-payment');
              }}
            >
              Back
            </Button>
          </Box>
          <Typography sx={{ mb: 3 }} variant="h4">
            Registration Payment Details
          </Typography>

          <RegistrationPaymentDetails
            registrationPayment={registrationPaymentData}
            course={courseData}
            user={userData}
          />
        </Container>
      </Box>
    </>
  );
};

Details.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Details;
