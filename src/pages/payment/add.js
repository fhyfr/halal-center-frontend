import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { AddPayment } from '../../components/payment/add-payment';

const AddNew = () => {
  return (
    <>
      <Head>
        <title>Add New Payment</title>
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
            Payment
          </Typography>
          <Box sx={{ pt: 3 }}>
            <AddPayment />
          </Box>
        </Container>
      </Box>
    </>
  );
};

AddNew.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default AddNew;
