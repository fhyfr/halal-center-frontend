import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Button,
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';

export const PaymentListResults = ({ payment, ...rest }) => {
  const [selectedPaymentIds, setSelectedPaymentIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedPaymentIds;

    if (event.target.checked) {
      newSelectedPaymentIds = payment.map((payment) => payment.id);
    } else {
      newSelectedPaymentIds = [];
    }

    setSelectedPaymentIds(newSelectedPaymentIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedPaymentIds.indexOf(id);
    let newSelectedPaymentIds = [];

    if (selectedIndex === -1) {
      newSelectedPaymentIds = newSelectedPaymentIds.concat(selectedPaymentIds, id);
    } else if (selectedIndex === 0) {
      newSelectedPaymentIds = newSelectedPaymentIds.concat(selectedPaymentIds.slice(1));
    } else if (selectedIndex === selectedPaymentIds.length - 1) {
      newSelectedPaymentIds = newSelectedPaymentIds.concat(selectedPaymentIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedPaymentIds = newSelectedPaymentIds.concat(
        selectedPaymentIds.slice(0, selectedIndex),
        selectedPaymentIds.slice(selectedIndex + 1),
      );
    }

    setSelectedPaymentIds(newSelectedPaymentIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedPaymentIds.length === payment.length}
                    color="primary"
                    indeterminate={
                      selectedPaymentIds.length > 0 && selectedPaymentIds.length < payment.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Course ID</TableCell>
                <TableCell>User ID</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Discount</TableCell>
                <TableCell>Descriptions</TableCell>
                <TableCell>Payment Method</TableCell>
                <TableCell>Transaction Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Receipt Url</TableCell>
                <TableCell>
                  {' '}
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
              {payment.slice(0, limit).map((payment) => (
                <TableRow
                  hover
                  key={payment.id}
                  selected={selectedPaymentIds.indexOf(payment.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedPaymentIds.indexOf(payment.id) !== -1}
                      onChange={(event) => handleSelectOne(event, payment.id)}
                      value="true"
                    />
                  </TableCell>

                  <TableCell>{payment.courseId}</TableCell>
                  <TableCell>{payment.userId}</TableCell>
                  <TableCell>{payment.amount}</TableCell>
                  <TableCell>{payment.discount}</TableCell>
                  <TableCell>{payment.descriptions}</TableCell>
                  <TableCell>{payment.paymentMethod}</TableCell>
                  <TableCell>{payment.transactionDate}</TableCell>
                  <TableCell>{payment.status}</TableCell>
                  <TableCell>{payment.receiptUrl}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mr: 2,
                      }}
                    >
                      <Button
                        color="secondary"
                        sx={{
                          mr: 2,
                        }}
                        variant="contained"
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
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={payment.length}
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
