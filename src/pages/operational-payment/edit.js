import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { parseCookies } from '../../lib/auth-cookies';
import axios from 'axios';
import { EditOperationalPayment } from '../../components/operational-payment/edit-operational-payment';

const { NEXT_PUBLIC_API } = process.env;

export const getServerSideProps = async ({ req, query }) => {
  const { id } = query;
  if (!id || id === null) {
    return {
      redirect: {
        permanent: false,
        destination: '/operational-payment',
      },
      props: {},
    };
  }

  const data = parseCookies(req);
  let operationalPayment;

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
      url: `${NEXT_PUBLIC_API}/operational-payment/${id}`,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    if (response.status !== 200) {
      throw new Error('failed to get data operational payment');
    }

    operationalPayment = response.data;
  } catch (err) {
    operationalPayment = { error: { message: err.message } };
  }

  return { props: { operationalPayment } };
};

const Edit = (props) => {
  const { operationalPayment } = props;

  return (
    <>
      <Head>
        <title>Edit Operational Payment</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography sx={{ mb: 3 }} variant="h4">
            Operational Payment
          </Typography>
          <Box sx={{ pt: 3 }}>
            <EditOperationalPayment operationalPayment={operationalPayment} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Edit.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Edit;
