import Head from 'next/head';
import { Box, Button, Container, SvgIcon, Typography } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { parseCookies } from '../../lib/auth-cookies';
import axios from 'axios';
import { ReportFinance } from '../../components/report/report-finance';

const { NEXT_PUBLIC_API } = process.env;

// eslint-disable-next-line no-unused-vars, unused-imports/no-unused-vars
export const getServerSideProps = async ({ req, res, query }) => {
  let course, registrationPayments, operationalPayments;

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

    // get registration payments data
    const responseRegistrationPayment = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/registration-payment`,
      params: { courseId, page: 1, size: 1000 },
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    if (responseRegistrationPayment.status !== 200) {
      throw new Error('failed to get data registration payments');
    }

    // get operational payments data
    const responseOperationalPayment = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/operational-payment`,
      params: { courseId, page: 1, size: 1000 },
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    if (responseOperationalPayment.status !== 200) {
      throw new Error('failed to get data operational payments');
    }

    course = responseCourseDetailsReport.data;
    registrationPayments = responseRegistrationPayment.data;
    operationalPayments = responseOperationalPayment.data;
  } catch (err) {
    course = { error: { message: err.message } };
    registrationPayments = { error: { message: err.message } };
    operationalPayments = { error: { message: err.message } };
  }

  return {
    props: {
      course,
      registrationPayments,
      operationalPayments,
    },
  };
};

const Finance = (props) => {
  const router = useRouter();
  const { course, registrationPayments, operationalPayments } = props;

  return (
    <>
      <Head>
        <title>Report Finance | Halal Center</title>
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
            Report Finance
          </Typography>

          <ReportFinance
            course={course}
            registrationPayments={registrationPayments}
            operationalPayments={operationalPayments}
          />
        </Container>
      </Box>
    </>
  );
};

Finance.getLayout = (finance) => <DashboardLayout>{finance}</DashboardLayout>;

export default Finance;
