import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';
import { TotalCourses } from '../components/dashboard/total-courses';
import { TotalInstructors } from '../components/dashboard/total-instructors';
import { TotalMembers } from '../components/dashboard/total-members';
import { TotalSuccessCourse } from '../components/dashboard/total-success-courses';
import { DashboardLayout } from '../components/dashboard-layout';
import useAuth from '../hooks/use-auth';
import { parseCookies } from '../lib/auth-cookies';
import axios from 'axios';

const { NEXT_PUBLIC_API } = process.env;

export const getServerSideProps = async ({ req }) => {
  let dashboardReport = null;

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
    const responseReport = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/report/dashboard`,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });

    if (responseReport.status !== 200) {
      throw new Error('failed to get data report dashboard');
    }

    dashboardReport = responseReport.data;
  } catch (err) {
    dashboardReport = { error: { message: err.message } };
  }

  return { props: { dashboardReport } };
};

const Dashboard = (props) => {
  const { user } = useAuth();
  const { dashboardReport } = props;

  return (
    <>
      <Head>
        <title>Dashboard | Halal Center</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 12,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TotalCourses dashboardReport={dashboardReport} />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TotalMembers dashboardReport={dashboardReport} />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TotalInstructors dashboardReport={dashboardReport} />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TotalSuccessCourse dashboardReport={dashboardReport} sx={{ height: '100%' }} />
            </Grid>

            <Grid container item direction="column" alignItems="center" justify="center">
              <Typography
                variant="h2"
                sx={{
                  marginY: 2,
                }}
              >
                Welcome to Halal Center
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  marginY: 2,
                }}
              >
                Hello, {user?.fullName ? user?.fullName : user?.username}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  marginY: 2,
                }}
              >
                This is your personalized dashboard. Explore the features and tools available to you
                to manage your account and stay updated on your activities.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Dashboard.getLayout = (dashboard) => <DashboardLayout>{dashboard}</DashboardLayout>;

export default Dashboard;
