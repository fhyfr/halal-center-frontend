import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { formatDateWithoutHourMinutes } from '../../utils/date-converter';
import { formatRupiahCurrency } from '../../utils/currency-converter';

export const ReportFinance = ({ course, registrationPayments, operationalPayments }) => {
  // errors handler
  if (course.error) {
    return (
      <Typography align="center" variant="h4" style={{ color: 'red' }}>
        error, {course.error.message}
      </Typography>
    );
  }

  if (registrationPayments.error) {
    return (
      <Typography align="center" variant="h4" style={{ color: 'red' }}>
        error, {registrationPayments.error.message}
      </Typography>
    );
  }

  if (operationalPayments.error) {
    return (
      <Typography align="center" variant="h4" style={{ color: 'red' }}>
        error, {operationalPayments.error.message}
      </Typography>
    );
  }

  const totalRegistrationPayments = 0;
  registrationPayments.data?.forEach((registrationPayment) => {
    totalRegistrationPayments += registrationPayment.amount - registrationPayment.discount;
  });

  const totalOperationalPayments = 0;
  operationalPayments.data?.forEach((operationalPayment) => {
    totalOperationalPayments += operationalPayment.amount - operationalPayment.discount;
  });

  return (
    <Grid container spacing={3}>
      <Grid item lg={12} md={12} xs={12}>
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <CardHeader subheader="Report Finance of the Course" title="Report Finance" />
          <Divider />

          <CardContent>
            <Grid container spacing={3}>
              <Grid item lg={6} md={6} xs={12}>
                <CardContent sx={{ marginY: -3 }}>
                  <Typography variant="h6">Course Title</Typography>
                  <Typography variant="body1" gutterBottom>
                    {`${course.title} - Batch ${course.batchNumber}`}
                  </Typography>
                </CardContent>
                <Divider />

                <CardContent sx={{ marginY: -3 }}>
                  <Typography variant="h6">Course Type & Price</Typography>
                  <Typography variant="body1" gutterBottom>
                    {course.type} - {formatRupiahCurrency(course.price)}
                  </Typography>
                </CardContent>
                <Divider />

                <CardContent sx={{ marginY: -3 }}>
                  <Typography variant="h6">Quota</Typography>
                  <Typography variant="body1" gutterBottom>
                    {course.quota} participants
                  </Typography>
                </CardContent>
                <Divider />

                <CardContent sx={{ marginY: -3 }}>
                  <Typography variant="h6">Date</Typography>
                  <Typography variant="body1" gutterBottom>
                    {formatDateWithoutHourMinutes(course.startDate)} s/d {''}
                    {formatDateWithoutHourMinutes(course.endDate)}
                  </Typography>
                </CardContent>
              </Grid>

              <Grid item lg={6} md={6} xs={12}>
                <CardContent sx={{ marginY: -3 }}>
                  <Typography variant="h6">Total Participants</Typography>
                  <Typography variant="body1" gutterBottom>
                    {course.totalParticipants} participants
                  </Typography>
                </CardContent>
                <Divider />

                <CardContent sx={{ marginY: -3 }}>
                  <Typography variant="h6">Total Instructors</Typography>
                  <Typography variant="body1" gutterBottom>
                    {course.totalInstructors} participants
                  </Typography>
                </CardContent>
                <Divider />

                <CardContent sx={{ marginY: -3 }}>
                  <Typography variant="h6">Total Incomes</Typography>
                  <Typography variant="body1" gutterBottom>
                    {formatRupiahCurrency(totalRegistrationPayments)}
                  </Typography>
                </CardContent>
                <Divider />

                <CardContent sx={{ marginY: -3 }}>
                  <Typography variant="h6">Total Expenses</Typography>
                  <Typography variant="body1" gutterBottom>
                    {formatRupiahCurrency(totalOperationalPayments)}
                  </Typography>
                </CardContent>
              </Grid>

              <Divider />
            </Grid>

            <Divider />

            <TableContainer component={Paper} sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Registration Payments (Incomes)
              </Typography>

              <Table sx={{ minWidth: 650 }} aria-label="registration payment">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Payment ID</TableCell>
                    <TableCell align="center">User ID</TableCell>
                    <TableCell align="center">Amount</TableCell>
                    <TableCell align="center">Payment Method</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Transaction Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {registrationPayments.data?.length > 0 &&
                    registrationPayments.data?.map((registrationPayment) => (
                      <>
                        <TableRow
                          key={registrationPayment.name}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell align="center">{registrationPayment.id}</TableCell>
                          <TableCell align="center">
                            {registrationPayment.registration.userId}
                          </TableCell>
                          <TableCell align="center">
                            {formatRupiahCurrency(
                              registrationPayment.amount - registrationPayment.discount,
                            )}
                          </TableCell>
                          <TableCell align="center">{registrationPayment.paymentMethod}</TableCell>
                          <TableCell align="center">{registrationPayment.status}</TableCell>
                          <TableCell align="center">
                            {formatDateWithoutHourMinutes(registrationPayment.transactionDate)}
                          </TableCell>
                        </TableRow>
                      </>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TableContainer component={Paper} sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Operational Payments (Expenses)
              </Typography>

              <Table sx={{ minWidth: 650 }} aria-label="operational payment">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Payment ID</TableCell>
                    <TableCell align="center">Amount</TableCell>
                    <TableCell align="center">Payment Method</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Transaction Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {operationalPayments.data?.length > 0 &&
                    operationalPayments.data?.map((operationalPayment) => (
                      <>
                        <TableRow
                          key={operationalPayment.name}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell align="center">{operationalPayment.id}</TableCell>
                          <TableCell align="center">
                            {formatRupiahCurrency(
                              operationalPayment.amount - operationalPayment.discount,
                            )}
                          </TableCell>
                          <TableCell align="center">{operationalPayment.paymentMethod}</TableCell>
                          <TableCell align="center">{operationalPayment.status}</TableCell>
                          <TableCell align="center">
                            {formatDateWithoutHourMinutes(operationalPayment.transactionDate)}
                          </TableCell>
                        </TableRow>
                      </>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
          <Divider />
        </Card>
      </Grid>
    </Grid>
  );
};
