import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  Typography,
  Link,
  TableContainer,
} from '@mui/material';
import { formatDateWithoutHourMinutes } from '../../utils/date-converter';
import { useRouter } from 'next/router';
import { formatRupiahCurrency } from '../../utils/currency-converter';
import { deleteRegistrationPayment } from '../../services/api/registration-payment';

export const RegistrationPaymentListResults = ({ registrationPayments }) => {
  const router = useRouter();

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    const path = router.pathname;
    const query = router.query;
    query.limit = event.target.value;

    setLimit(event.target.value);

    router.push({
      pathname: path,
      query: query,
    });
  };

  const handlePageChange = (event, newPage) => {
    const path = router.pathname;
    const query = router.query;
    query.page = newPage + 1;

    setPage(newPage);

    router.push({
      pathname: path,
      query: query,
    });
  };

  const handleDeleteRegistrationPayment = (registrationPaymentId) => {
    const confirmation = confirm('Are you sure to delete this registration payment?');
    if (confirmation) {
      deleteRegistrationPayment(registrationPaymentId)
        .then((res) => {
          alert(res);
          router.push(`/registration-payment`);
        })
        .catch((err) => {
          alert(err.response.data?.message);
        });
    }
    return;
  };

  if (registrationPayments.error) {
    return (
      <Typography align="center" variant="h4" style={{ color: 'red' }}>
        error, {registrationPayments.error.message}
      </Typography>
    );
  }

  return (
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">ID</TableCell>
                  <TableCell>Registration ID</TableCell>
                  <TableCell>Course ID</TableCell>
                  <TableCell>User ID</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Payment Method</TableCell>
                  <TableCell>Transaction Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Receipt Url</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      Action
                    </Box>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {registrationPayments.data?.slice(0, limit).map((registrationPayment) => (
                  <TableRow hover key={registrationPayment.id}>
                    <TableCell align="center">
                      <Typography color="textPrimary" variant="body2">
                        1
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography color="textPrimary" variant="body2">
                        {registrationPayment.registrationId}
                      </Typography>
                    </TableCell>{' '}
                    <TableCell align="center">
                      <Typography color="textPrimary" variant="body2">
                        {registrationPayment.registration?.courseId}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography color="textPrimary" variant="body2">
                        {registrationPayment.registration?.userId}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textPrimary" variant="body2">
                        {formatRupiahCurrency(
                          registrationPayment.amount - registrationPayment.discount,
                        )}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textPrimary" variant="body2">
                        {registrationPayment.paymentMethod}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textPrimary" variant="body2">
                        {formatDateWithoutHourMinutes(registrationPayment.transactionDate)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textPrimary" variant="body2">
                        {registrationPayment.status}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textPrimary" variant="body2">
                        <Link
                          href={registrationPayment.receiptUrl}
                          target="_blank"
                          underline="hover"
                        >
                          {registrationPayment.receiptUrl}
                        </Link>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          mr: 2,
                        }}
                      >
                        <Button
                          color="primary"
                          size="small"
                          sx={{
                            mr: 2,
                          }}
                          variant="contained"
                          onClick={() => {
                            router.push({
                              pathname: '/registration-payment/details',
                              query: {
                                id: registrationPayment.id,
                              },
                            });
                          }}
                        >
                          Detail
                        </Button>
                        <Button
                          color="secondary"
                          sx={{
                            mr: 2,
                          }}
                          variant="contained"
                          size="small"
                          onClick={() => {
                            router.push({
                              pathname: '/registration-payment/edit',
                              query: {
                                id: registrationPayment.id,
                              },
                            });
                          }}
                        >
                          Update
                        </Button>
                        <Button
                          color="error"
                          variant="contained"
                          size="small"
                          onClick={() => {
                            handleDeleteRegistrationPayment(registrationPayment.id);
                          }}
                        >
                          Delete
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={registrationPayments.itemCount}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

RegistrationPaymentListResults.propTypes = {
  registrationPayment: PropTypes.array.isRequired,
};
