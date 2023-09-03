import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { AddOperationalPayment } from '../../components/operational-payment/add-operational-payment';

const AddNew = () => {
  return (
    <>
      <Head>
        <title>Add New Operational Payment</title>
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
            <AddOperationalPayment />
          </Box>
        </Container>
      </Box>
    </>
  );
};

AddNew.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default AddNew;
