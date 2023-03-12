import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { ResetPasswordUser } from '../../components/user/reset-password';

const ResetPassword = () => {
  return (
    <>
      <Head>
        <title>Reset Password User</title>
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
            User
          </Typography>
          <Box sx={{ pt: 3 }}>
            <ResetPasswordUser />
          </Box>
        </Container>
      </Box>
    </>
  );
};

ResetPassword.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ResetPassword;
