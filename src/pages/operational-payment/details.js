import Head from 'next/head';
import { Box, Button, Container, SvgIcon, Typography } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { ArrowBack } from '@mui/icons-material';
import { handleRedirectOnClick } from '../../utils/handle-event-button';
import { useRouter } from 'next/router';
import { parseCookies } from '../../lib/auth-cookies';
import axios from 'axios';
import { OperationalPaymentDetails } from '../../components/operational-payment/details-operational-payment';

const { NEXT_PUBLIC_API } = process.env;

export const getServerSideProps = async ({ req, res, query }) => {
  let operationalPaymentData, courseData;

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
    const responseOperationalPayment = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/operational-payment/${id}`,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    if (responseOperationalPayment.status !== 200) {
      throw new Error('failed to get data operational payment');
    }

    const responseCourse = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/course/${responseOperationalPayment.data.courseId}`,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    if (responseCourse.status !== 200) {
      throw new Error('failed to get data course');
    }

    operationalPaymentData = responseOperationalPayment.data;
    courseData = responseCourse.data;
  } catch (err) {
    operationalPaymentData = { error: { message: err.message } };
    courseData = { error: { message: err.message } };
  }

  return { props: { operationalPaymentData, courseData } };
};

const Details = (props) => {
  const router = useRouter();
  const { operationalPaymentData, courseData } = props;

  return (
    <>
      <Head>
        <title>Operational Payment Details</title>
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
                handleRedirectOnClick(router, '/operational-payment');
              }}
            >
              Back
            </Button>
          </Box>
          <Typography sx={{ mb: 3 }} variant="h4">
            Operational Payment Details
          </Typography>

          <OperationalPaymentDetails
            operationalPayment={operationalPaymentData}
            course={courseData}
          />
        </Container>
      </Box>
    </>
  );
};

Details.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Details;
