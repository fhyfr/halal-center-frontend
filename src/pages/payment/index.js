import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { PaymentListResults } from '../../components/payment/payment-list-results';
import { PaymentListToolbar } from '../../components/payment/payment-list-toolbar';
import { DashboardLayout } from '../../components/dashboard-layout';
import { payment } from '../../__mocks__/payment';

const Page = () => (
  <>
    <Head>
      <title>Payment</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <PaymentListToolbar />
        <Box sx={{ mt: 3 }}>
          <PaymentListResults payment={payment} />
        </Box>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
