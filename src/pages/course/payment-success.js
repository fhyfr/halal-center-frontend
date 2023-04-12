import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { DashboardLayout } from '../../components/dashboard-layout';
import Head from 'next/head';
import { Box, Container } from '@mui/system';
import Image from 'next/image';
import { handleRedirectOnClick } from '../../utils/handle-event-button';

const PaymentSuccess = (props) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Payment Success | Halal Center</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="md" align="center">
          <Card sx={{ maxWidth: 600 }} align="center">
            <CardMedia
              sx={{ height: 300, width: 300 }}
              image="/static/images/success.jpg"
              title="payment success"
            />
            <Image sx={{ height: 40 }} image="/static/images/success.jpg" title="payment success" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Payment Success
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Thank you for the payment. You are successfully registered to this course. You can
                access the course after admin confirm your payment.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="medium"
                variant="text"
                color="primary"
                onClick={() => {
                  handleRedirectOnClick(router, '/user/course');
                }}
              >
                See my course
              </Button>
            </CardActions>
          </Card>
        </Container>
      </Box>
    </>
  );
};

PaymentSuccess.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default PaymentSuccess;
