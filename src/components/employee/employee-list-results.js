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
} from '@mui/material';
import { useRouter } from 'next/router';
import { deleteEmployee } from '../../services/api/employee';

export const EmployeeListResults = ({ employees }) => {
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

  const handleDeleteEmployee = (employeeId) => {
    const confirmation = confirm('Are you sure want to delete this employee?');
    if (confirmation) {
      deleteEmployee(employeeId)
        .then((res) => {
          alert(res);
          router.reload();
        })
        .catch((err) => {
          alert(err.response.data?.message);
        });
    }
    return;
  };

  if (employees.error) {
    return (
      <Typography align="center" variant="h4" style={{ color: 'red' }}>
        error, {employees.error.message}
      </Typography>
    );
  }

  return (
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>NIK</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Phone Number</TableCell>
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
              {employees.data?.slice(0, limit).map((employee) => (
                <TableRow hover key={employee.id}>
                  <TableCell align="center">
                    <Typography color="textPrimary" variant="body2">
                      {employee.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textPrimary" variant="body2">
                      {employee.department.departmentName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textPrimary" variant="body2">
                      {employee.position.positionName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textPrimary" variant="body2">
                      {employee.nik}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textPrimary" variant="body2">
                      {employee.fullName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textPrimary" variant="body2">
                      {employee.gender}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textPrimary" variant="body2">
                      {employee.phoneNumber}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mr: 1,
                      }}
                    >
                      <Button
                        color="warning"
                        sx={{
                          mr: 1,
                        }}
                        variant="contained"
                        size="small"
                        onClick={() => {
                          router.push({
                            pathname: '/employee/mutation',
                            query: {
                              id: employee.id,
                            },
                          });
                        }}
                      >
                        Mutation
                      </Button>
                      <Button
                        color="secondary"
                        sx={{
                          mr: 1,
                        }}
                        variant="contained"
                        size="small"
                        onClick={() => {
                          router.push({
                            pathname: '/employee/edit',
                            query: {
                              id: employee.id,
                            },
                          });
                        }}
                      >
                        Update
                      </Button>
                      <Button
                        color="primary"
                        sx={{
                          mr: 1,
                        }}
                        variant="contained"
                        size="small"
                        onClick={() => {
                          router.push({
                            pathname: '/employee/details',
                            query: {
                              id: employee.id,
                            },
                          });
                        }}
                      >
                        Detail
                      </Button>
                      <Button
                        color="error"
                        variant="contained"
                        size="small"
                        onClick={() => {
                          handleDeleteEmployee(employee.id);
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
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={employees.itemCount}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

EmployeeListResults.propTypes = {
  employees: PropTypes.array.isRequired,
};
