import { Card, CardContent, CardMedia, Divider, Grid, Link, Typography } from '@mui/material';
import { formatRupiahCurrency } from '../../utils/currency-converter';
import { formatDate, formatDateWithoutHourMinutes } from '../../utils/date-converter';
import { Box } from '@mui/system';

export const PaymentDetails = ({ payment }) => {
  if (payment.error) {
    return (
      <Typography align="center" variant="h4" style={{ color: 'red' }}>
        error, {payment.error.message}
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
                  src={payment.receiptUrl}
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
            <Typography variant="h6">Payment Type</Typography>
            <Typography variant="body1" gutterBottom>
              {payment.type}
            </Typography>
          </CardContent>
          <Divider />

          <CardContent sx={{ marginY: -2 }}>
            <Typography variant="h6">Course</Typography>
            <Typography variant="body1" gutterBottom>
              ID: {payment.courseId}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Title: {payment.course.title}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Type: {payment.course.type}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Total Participants: {payment.course.totalRegistered}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Date: {formatDateWithoutHourMinutes(payment.course.startDate)} s/d{' '}
              {formatDateWithoutHourMinutes(payment.course.endDate)}
            </Typography>
          </CardContent>
          <Divider />

          {payment.type === 'REGISTRATION' ? (
            <>
              <CardContent sx={{ marginY: -2 }}>
                <Typography variant="h6">User</Typography>
                <Typography variant="body1" gutterBottom>
                  ID: {payment.user.id}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Username: {payment.user.username}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Email: {payment.user.email}
                </Typography>
              </CardContent>
              <Divider />
            </>
          ) : (
            ''
          )}

          <CardContent sx={{ marginY: -2 }}>
            <Typography variant="h6">Amount</Typography>
            <Typography variant="body1" gutterBottom>
              {formatRupiahCurrency(payment.amount)}
            </Typography>
          </CardContent>
          <Divider />

          <Divider />
          <CardContent sx={{ marginY: -2 }}>
            <Typography variant="h6">Discount</Typography>
            <Typography variant="body1" gutterBottom>
              {formatRupiahCurrency(payment.discount)}
            </Typography>
          </CardContent>
          <Divider />
        </Grid>

        <Grid item lg={6} md={6} xs={12}>
          <CardContent sx={{ marginY: -2 }}>
            <Typography variant="h6">Total</Typography>
            <Typography variant="body1" gutterBottom>
              {formatRupiahCurrency(payment.amount - payment.discount)}
            </Typography>
          </CardContent>
          <Divider />

          <CardContent sx={{ marginY: -2 }}>
            <Typography variant="h6">Descriptions</Typography>
            <Typography variant="body1" gutterBottom>
              {payment.descriptions}
            </Typography>
          </CardContent>
          <Divider />

          <CardContent sx={{ marginY: -2 }}>
            <Typography variant="h6" gutterBottom>
              Payment Method
            </Typography>
            <Typography variant="body1" gutterBottom>
              {payment.paymentMethod}
            </Typography>
          </CardContent>
          <Divider />

          <CardContent sx={{ marginY: -2 }}>
            <Typography variant="h6">Transaction Date</Typography>
            <Typography variant="body1" gutterBottom>
              {formatDateWithoutHourMinutes(payment.transactionDate)}
            </Typography>
          </CardContent>
          <Divider />

          <CardContent sx={{ marginY: -2 }}>
            <Typography variant="h6">Payment Status</Typography>
            <Typography variant="body1" gutterBottom>
              {payment.status}
            </Typography>
          </CardContent>
          <Divider />

          <CardContent sx={{ marginY: -2 }}>
            <Typography variant="h6">Receipt URL</Typography>
            <Typography variant="body1" gutterBottom>
              <Link href={payment.receiptUrl} target="_blank" underline="hover">
                {payment.receiptUrl}
              </Link>
            </Typography>
          </CardContent>
          <Divider />

          <CardContent sx={{ marginY: -2 }}>
            <Typography variant="h6">Last Updated</Typography>
            <Typography variant="body1" gutterBottom>
              {formatDate(payment.updatedAt)}
            </Typography>
          </CardContent>
          <Divider />
        </Grid>
      </Grid>
    </Card>
  );
};
