import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { AddRegistrationPayment } from '../../components/registration-payment/add-registration-payment';

const AddNew = () => {
  return (
    <>
      <Head>
        <title>Add New Registration Payment</title>
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
            <AddRegistrationPayment />
          </Box>
        </Container>
      </Box>
    </>
  );
};

AddNew.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default AddNew;
