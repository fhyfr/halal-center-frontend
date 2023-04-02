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
  Tabs,
  Tab,
  Typography,
  Link,
} from '@mui/material';
import { formatDateWithoutHourMinutes } from '../../utils/date-converter';
import { useRouter } from 'next/router';
import { formatRupiahCurrency } from '../../utils/currency-converter';

export const PaymentListResults = ({ payments }) => {
  const router = useRouter();

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [valueType, setValueType] = useState('registration');

  const handleFilterType = (event, newValue) => {
    const path = router.pathname;
    const query = router.query;
    query.type = newValue;

    setValueType(newValue);

    router.push({
      pathname: path,
      query: query,
    });
  };

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

  return (
    <Card>
      <Box sx={{ maxWidth: 1050, marginY: 2 }}>
        <Tabs value={valueType} onChange={handleFilterType} aria-label="wrapped label tabs example">
          <Tab value="registration" label="Registration Users" />
          <Tab value="course_utilities" label="Course Utilities" />
        </Tabs>
      </Box>

      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            {valueType === 'registration' ? (
              <>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">ID</TableCell>
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
                  {payments.data?.slice(0, limit).map((payment) => (
                    <TableRow hover key={payment.id}>
                      <TableCell align="center">
                        <Typography color="textPrimary" variant="body2">
                          1
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textPrimary" variant="body2">
                          {payment.courseId}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textPrimary" variant="body2">
                          {payment.userId}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textPrimary" variant="body2">
                          {formatRupiahCurrency(payment.amount - payment.discount)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textPrimary" variant="body2">
                          {payment.paymentMethod}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textPrimary" variant="body2">
                          {formatDateWithoutHourMinutes(payment.transactionDate)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textPrimary" variant="body2">
                          {payment.status}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textPrimary" variant="body2">
                          <Link href={payment.receiptUrl} target="_blank" underline="hover">
                            {payment.receiptUrl}
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
                          >
                            Detail
                          </Button>
                          <Button
                            color="secondary"
                            sx={{
                              mr: 2,
                            }}
                            variant="contained"
                            onClick={() => {
                              router.push({
                                pathname: '/payment/edit',
                                query: {
                                  id: payment.id,
                                },
                              });
                            }}
                          >
                            Update
                          </Button>
                          <Button color="error" variant="contained">
                            Delete
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </>
            ) : (
              <>
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
                  {payments.data?.slice(0, limit).map((payment) => (
                    <TableRow hover key={payment.id}>
                      <TableCell align="center">
                        <Typography color="textPrimary" variant="body2">
                          1
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textPrimary" variant="body2">
                          {payment.courseId}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textPrimary" variant="body2">
                          {formatRupiahCurrency(payment.amount - payment.discount)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textPrimary" variant="body2">
                          {payment.paymentMethod}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textPrimary" variant="body2">
                          {formatDateWithoutHourMinutes(payment.transactionDate)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textPrimary" variant="body2">
                          {payment.status}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textPrimary" variant="body2">
                          <Link href={payment.receiptUrl} target="_blank" underline="hover">
                            {payment.receiptUrl}
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
                            onClick={() => handleDetailUser(user.id)}
                          >
                            Detail
                          </Button>
                          <Button
                            color="secondary"
                            sx={{
                              mr: 2,
                            }}
                            variant="contained"
                            onClick={() => {
                              router.push({
                                pathname: '/payment/edit',
                                query: {
                                  id: payment.id,
                                },
                              });
                            }}
                          >
                            Update
                          </Button>
                          <Button color="error" variant="contained">
                            Delete
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </>
            )}
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={payments.itemCount}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

PaymentListResults.propTypes = {
  payment: PropTypes.array.isRequired,
};
