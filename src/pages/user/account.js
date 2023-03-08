import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';
import { AccountProfileDetails } from '../../components/account/account-profile-details';
import { DashboardLayout } from '../../components/dashboard-layout';

const Page = () => (
  <>
    <Head>
      <title>Account | Halal Center</title>
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
          Account
        </Typography>
        <AccountProfileDetails />
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
