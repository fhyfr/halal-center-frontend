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
import { deleteOperationalPayment } from '../../services/api/operational-payment';

export const OperationalPaymentListResults = ({ operationalPayments }) => {
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

  const handleDeleteOperationalPayment = (operationalPaymentId) => {
    const confirmation = confirm('Are you sure to delete this operational payment?');
    if (confirmation) {
      deleteOperationalPayment(operationalPaymentId)
        .then((res) => {
          alert(res);
          router.push(`/operational-payment`);
        })
        .catch((err) => {
          alert(err.response.data?.message);
        });
    }
    return;
  };

  if (operationalPayments.error) {
    return (
      <Typography align="center" variant="h4" style={{ color: 'red' }}>
        error, {operationalPayments.error.message}
      </Typography>
    );
  }

  return (
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">ID</TableCell>
                  <TableCell>Course ID</TableCell>
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
                {operationalPayments.data?.slice(0, limit).map((operationalPayment) => (
                  <TableRow hover key={operationalPayment.id}>
                    <TableCell align="center">
                      <Typography color="textPrimary" variant="body2">
                        1
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography color="textPrimary" variant="body2">
                        {operationalPayment.courseId}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textPrimary" variant="body2">
                        {formatRupiahCurrency(
                          operationalPayment.amount - operationalPayment.discount,
                        )}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textPrimary" variant="body2">
                        {operationalPayment.paymentMethod}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textPrimary" variant="body2">
                        {formatDateWithoutHourMinutes(operationalPayment.transactionDate)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textPrimary" variant="body2">
                        {operationalPayment.status}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textPrimary" variant="body2">
                        <Link
                          href={operationalPayment.receiptUrl}
                          target="_blank"
                          underline="hover"
                        >
                          {operationalPayment.receiptUrl}
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
                              pathname: '/operational-payment/details',
                              query: {
                                id: operationalPayment.id,
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
                              pathname: '/operational-payment/edit',
                              query: {
                                id: operationalPayment.id,
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
                            handleDeleteOperationalPayment(operationalPayment.id);
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
        count={operationalPayments.itemCount}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

OperationalPaymentListResults.propTypes = {
  operationalPayment: PropTypes.array.isRequired,
};
