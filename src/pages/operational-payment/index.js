import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { parseCookies } from '../../lib/auth-cookies';
import axios from 'axios';
import { OperationalPaymentListToolbar } from '../../components/operational-payment/operational-payment-list-toolbar';
import { OperationalPaymentListResults } from '../../components/operational-payment/operational-payment-list-results';

const { NEXT_PUBLIC_API } = process.env;

export const getServerSideProps = async ({ req, res, query }) => {
  const page = query.page || 1;
  const size = query.limit || 10;
  const courseId = query.courseId;

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

  let operationalPayments;
  let queryParams = { page, size };

  if (courseId && courseId > 0) {
    Object.assign(queryParams, { courseId });
  }

  try {
    const response = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/operational-payment`,
      params: queryParams,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    if (response.status !== 200) {
      throw new Error('failed to get data operational payments');
    }

    operationalPayments = response.data;
  } catch (err) {
    operationalPayments = { error: { message: err.message } };
  }

  return { props: { operationalPayments } };
};

const OperationalPayment = (props) => {
  const { operationalPayments } = props;

  return (
    <>
      <Head>
        <title>Operational Payments</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <OperationalPaymentListToolbar />
          <Box sx={{ mt: 3 }}>
            <OperationalPaymentListResults operationalPayments={operationalPayments} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

OperationalPayment.getLayout = (operationalPayment) => (
  <DashboardLayout>{operationalPayment}</DashboardLayout>
);

export default OperationalPayment;
