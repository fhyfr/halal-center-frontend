import { Card, CardContent, CardMedia, Divider, Grid, Link, Typography } from '@mui/material';
import { formatRupiahCurrency } from '../../utils/currency-converter';
import { formatDate, formatDateWithoutHourMinutes } from '../../utils/date-converter';
import { Box } from '@mui/system';

export const OperationalPaymentDetails = ({ operationalPayment, course }) => {
  if (operationalPayment.error) {
    return (
      <Typography align="center" variant="h4" style={{ color: 'red' }}>
        error, {operationalPayment.error.message}
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
                  src={operationalPayment.receiptUrl}
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
              ID: {operationalPayment.courseId}
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
            <Typography variant="h6">Amount</Typography>
            <Typography variant="body1" gutterBottom>
              {formatRupiahCurrency(operationalPayment.amount)}
            </Typography>
          </CardContent>
          <Divider />

          <Divider />
          <CardContent sx={{ marginY: -2 }}>
            <Typography variant="h6">Discount</Typography>
            <Typography variant="body1" gutterBottom>
              {formatRupiahCurrency(operationalPayment.discount)}
            </Typography>
          </CardContent>
          <Divider />

          <CardContent sx={{ marginY: -2 }}>
            <Typography variant="h6">Total</Typography>
            <Typography variant="body1" gutterBottom>
              {formatRupiahCurrency(operationalPayment.amount - operationalPayment.discount)}
            </Typography>
          </CardContent>
          <Divider />
        </Grid>

        <Grid item lg={6} md={6} xs={12}>
          <CardContent sx={{ marginY: -2 }}>
            <Typography variant="h6">Descriptions</Typography>
            <Typography variant="body1" gutterBottom>
              {operationalPayment.descriptions}
            </Typography>
          </CardContent>
          <Divider />

          <CardContent sx={{ marginY: -2 }}>
            <Typography variant="h6" gutterBottom>
              Payment Method
            </Typography>
            <Typography variant="body1" gutterBottom>
              {operationalPayment.paymentMethod}
            </Typography>
          </CardContent>
          <Divider />

          <CardContent sx={{ marginY: -2 }}>
            <Typography variant="h6">Transaction Date</Typography>
            <Typography variant="body1" gutterBottom>
              {formatDateWithoutHourMinutes(operationalPayment.transactionDate)}
            </Typography>
          </CardContent>
          <Divider />

          <CardContent sx={{ marginY: -2 }}>
            <Typography variant="h6">Payment Status</Typography>
            <Typography variant="body1" gutterBottom>
              {operationalPayment.status}
            </Typography>
          </CardContent>
          <Divider />

          <CardContent sx={{ marginY: -2 }}>
            <Typography variant="h6">Last Updated</Typography>
            <Typography variant="body1" gutterBottom>
              {formatDate(operationalPayment.updatedAt)}
            </Typography>
          </CardContent>
          <Divider />
        </Grid>

        <Grid item lg={12} md={12} xs={12}>
          <CardContent sx={{ marginY: -2 }}>
            <Typography variant="h6">Receipt URL</Typography>
            <Typography variant="body1" gutterBottom>
              <Link href={operationalPayment.receiptUrl} target="_blank" underline="hover">
                {operationalPayment.receiptUrl}
              </Link>
            </Typography>
          </CardContent>
          <Divider />
        </Grid>
      </Grid>
    </Card>
  );
};
