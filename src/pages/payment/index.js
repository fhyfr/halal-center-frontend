import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { PaymentListResults } from '../../components/payment/payment-list-results';
import { PaymentListToolbar } from '../../components/payment/payment-list-toolbar';
import { DashboardLayout } from '../../components/dashboard-layout';
import { parseCookies } from '../../lib/auth-cookies';
import axios from 'axios';

const { NEXT_PUBLIC_API } = process.env;

export const getServerSideProps = async ({ req, res, query }) => {
  const page = query.page || 1;
  const size = query.limit || 10;
  const courseId = query.courseId;
  const userId = query.userId;
  const type = query.type || 'registration';

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

  let payments;
  let queryParams = { page, size, type };

  if (type && type.length > 0) {
    Object.assign(queryParams, { type });
  }

  if (courseId && courseId > 0) {
    Object.assign(queryParams, { courseId });
  }

  if (userId && userId > 0) {
    Object.assign(queryParams, { userId });
  }

  try {
    const response = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/payment`,
      params: queryParams,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    if (response.status !== 200) {
      throw new Error('failed to get data payments');
    }

    payments = response.data;
  } catch (err) {
    payments = { error: { message: err.message } };
  }

  return { props: { payments } };
};

const Payment = (props) => {
  const { payments } = props;

  return (
    <>
      <Head>
        <title>Payments</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <PaymentListToolbar />
          <Box sx={{ mt: 3 }}>
            <PaymentListResults payments={payments} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Payment.getLayout = (payment) => <DashboardLayout>{payment}</DashboardLayout>;

export default Payment;
