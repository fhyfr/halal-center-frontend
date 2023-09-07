import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { parseCookies } from '../../lib/auth-cookies';
import axios from 'axios';
import { EditRegistrationPayment } from '../../components/registration-payment/edit-registration-payment';

const { NEXT_PUBLIC_API } = process.env;

export const getServerSideProps = async ({ req, query }) => {
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
  let registrationPayment;

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
      url: `${NEXT_PUBLIC_API}/registration-payment/${id}`,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    if (response.status !== 200) {
      throw new Error('failed to get data registration payment');
    }

    registrationPayment = response.data;
  } catch (err) {
    registrationPayment = { error: { message: err.message } };
  }

  return { props: { registrationPayment: registrationPayment } };
};

const Edit = (props) => {
  const { registrationPayment } = props;

  return (
    <>
      <Head>
        <title>Edit Registration Payment</title>
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
            Registration Payment
          </Typography>
          <Box sx={{ pt: 3 }}>
            <EditRegistrationPayment registrationPayment={registrationPayment} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Edit.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Edit;
