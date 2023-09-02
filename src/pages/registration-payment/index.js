import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { RegistrationPaymentListResults } from '../../components/registration-payment/registration-payment-list-results';
import { RegistrationPaymentListToolbar } from '../../components/registration-payment/registration-payment-list-toolbar';
import { DashboardLayout } from '../../components/dashboard-layout';
import { parseCookies } from '../../lib/auth-cookies';
import axios from 'axios';

const { NEXT_PUBLIC_API } = process.env;

export const getServerSideProps = async ({ req, res, query }) => {
  const page = query.page || 1;
  const size = query.limit || 10;
  const courseId = query.courseId;
  const registrationId = query.registrationId;
  const userId = query.userId;

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

  let registrationPayments;
  let queryParams = { page, size };

  if (courseId && courseId > 0) {
    Object.assign(queryParams, { courseId });
  }

  if (registrationId && registrationId > 0) {
    Object.assign(queryParams, { registrationId });
  }

  if (userId && userId > 0) {
    Object.assign(queryParams, { userId });
  }

  try {
    const response = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/registration-payment`,
      params: queryParams,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    if (response.status !== 200) {
      throw new Error('failed to get data registration payments');
    }

    registrationPayments = response.data;
  } catch (err) {
    registrationPayments = { error: { message: err.message } };
  }

  return { props: { registrationPayments: registrationPayments } };
};

const RegistrationPayment = (props) => {
  const { registrationPayments } = props;

  return (
    <>
      <Head>
        <title>Registration Payments</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <RegistrationPaymentListToolbar />
          <Box sx={{ mt: 3 }}>
            <RegistrationPaymentListResults registrationPayments={registrationPayments} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

RegistrationPayment.getLayout = (registrationPayment) => (
  <DashboardLayout>{registrationPayment}</DashboardLayout>
);

export default RegistrationPayment;
