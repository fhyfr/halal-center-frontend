import { Card, CardContent, CardMedia, Divider, Grid, Link, Typography } from '@mui/material';
import { formatRupiahCurrency } from '../../utils/currency-converter';
import { formatDate, formatDateWithoutHourMinutes } from '../../utils/date-converter';
import { Box } from '@mui/system';

export const RegistrationPaymentDetails = ({ registrationPayment, course, user }) => {
  if (registrationPayment.error) {
    return (
      <Typography align="center" variant="h4" style={{ color: 'red' }}>
        error, {registrationPayment.error.message}
      </Typography>
    );
  }

  if (course.error) {
    return (
      <Typography align="center" variant="h4" style={{ color: 'red' }}>
        error, {course.error.message}
      </Typography>
    );
  }

  if (user.error) {
    return (
      <Typography align="center" variant="h4" style={{ color: 'red' }}>
        error, {user.error.message}
      </Typography>
    );
  }

  return (
    <Card>
      <Grid container spacing={2} sx={{ marginBottom: 3 }}>
        <Grid item lg={12} md={12} xs={12}>
          <Card>
            <CardContent>
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardMedia
                  component="img"
                  src={registrationPayment.receiptUrl}
                  sx={{
                    width: 600,
                  }}
                  alt="Receipt image"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ marginBottom: 3 }}>
        <Grid item lg={6} md={6} xs={12}>
          <CardContent sx={{ marginY: -2 }}>
            <Typography variant="h6">Course</Typography>
            <Typography variant="body1" gutterBottom>
              ID: {registrationPayment.registration.courseId}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Title: {`${course.title} - Batch ${course.batchNumber}`}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Type: {course.type}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Total Participants: {course.totalRegistered}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Date: {formatDateWithoutHourMinutes(course.startDate)} s/d{' '}
              {formatDateWithoutHourMinutes(course.endDate)}
            </Typography>
          </CardContent>
          <Divider />

          <CardContent sx={{ marginY: -2 }}>
            <Typography variant="h6">User</Typography>
            <Typography variant="body1" gutterBottom>
              ID: {user.id}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Username: {user.username}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Email: {user.email}
            </Typography>
          </CardContent>
          <Divider />

          <CardContent sx={{ marginY: -2 }}>
            <Typography variant="h6">Amount</Typography>
            <Typography variant="body1" gutterBottom>
              {formatRupiahCurrency(registrationPayment.amount)}
            </Typography>
          </CardContent>
          <Divider />

          <Divider />
          <CardContent sx={{ marginY: -2 }}>
            <Typography variant="h6">Discount</Typography>
            <Typography variant="body1" gutterBottom>
              {formatRupiahCurrency(registrationPayment.discount)}
            </Typography>
          </CardContent>
          <Divider />
        </Grid>

        <Grid item lg={6} md={6} xs={12}>
          <CardContent sx={{ marginY: -2 }}>
            <Typography variant="h6">Total</Typography>
            <Typography variant="body1" gutterBottom>
              {formatRupiahCurrency(registrationPayment.amount - registrationPayment.discount)}
            </Typography>
          </CardContent>
          <Divider />

          <CardContent sx={{ marginY: -2 }}>
            <Typography variant="h6">Descriptions</Typography>
            <Typography variant="body1" gutterBottom>
              {registrationPayment.descriptions}
            </Typography>
          </CardContent>
          <Divider />

          <CardContent sx={{ marginY: -2 }}>
            <Typography variant="h6" gutterBottom>
              Payment Method
            </Typography>
            <Typography variant="body1" gutterBottom>
              {registrationPayment.paymentMethod}
            </Typography>
          </CardContent>
          <Divider />

          <CardContent sx={{ marginY: -2 }}>
            <Typography variant="h6">Transaction Date</Typography>
            <Typography variant="body1" gutterBottom>
              {formatDateWithoutHourMinutes(registrationPayment.transactionDate)}
            </Typography>
          </CardContent>
          <Divider />

          <CardContent sx={{ marginY: -2 }}>
            <Typography variant="h6">Payment Status</Typography>
            <Typography variant="body1" gutterBottom>
              {registrationPayment.status}
            </Typography>
          </CardContent>
          <Divider />

          <CardContent sx={{ marginY: -2 }}>
            <Typography variant="h6">Last Updated</Typography>
            <Typography variant="body1" gutterBottom>
              {formatDate(registrationPayment.updatedAt)}
            </Typography>
          </CardContent>
          <Divider />
        </Grid>

        <Grid item lg={12} md={12} xs={12}>
          <CardContent sx={{ marginY: -2 }}>
            <Typography variant="h6">Receipt URL</Typography>
            <Typography variant="body1" gutterBottom>
              <Link href={registrationPayment.receiptUrl} target="_blank" underline="hover">
                {registrationPayment.receiptUrl}
              </Link>
            </Typography>
          </CardContent>
          <Divider />
        </Grid>
      </Grid>
    </Card>
  );
};
