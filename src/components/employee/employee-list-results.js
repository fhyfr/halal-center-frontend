import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  Typography,
} from '@mui/material';
import { formatDate } from '../../utils/date-converter';

export const EmployeeListResults = ({ employees }) => {
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedEmployeeIds;

    if (event.target.checked) {
      newSelectedEmployeeIds = employee.map((employee) => employee.id);
    } else {
      newSelectedEmployeeIds = [];
    }

    setSelectedEmployeeIds(newSelectedEmployeeIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedEmployeeIds.indexOf(id);
    let newSelectedEmployeeIds = [];

    if (selectedIndex === -1) {
      newSelectedEmployeeIds = newSelectedEmployeeIds.concat(selectedEmployeeIds, id);
    } else if (selectedIndex === 0) {
      newSelectedEmployeeIds = newSelectedEmployeeIds.concat(selectedEmployeeIds.slice(1));
    } else if (selectedIndex === selectedEmployeeIds.length - 1) {
      newSelectedEmployeeIds = newSelectedEmployeeIds.concat(selectedEmployeeIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedEmployeeIds = newSelectedEmployeeIds.concat(
        selectedEmployeeIds.slice(0, selectedIndex),
        selectedEmployeeIds.slice(selectedIndex + 1),
      );
    }

    setSelectedEmployeeIds(newSelectedEmployeeIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
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
                <TableCell>Position</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>NIK</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Last Updated</TableCell>
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
              {employees.data.slice(0, limit).map((employee) => (
                <TableRow
                  hover
                  key={employee.id}
                  selected={selectedEmployeeIds.indexOf(employee.id) !== -1}
                >
                  <TableCell>
                    <Typography color="textPrimary" variant="body2">
                      {employee.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textPrimary" variant="body2">
                      {employee.position.positionName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textPrimary" variant="body2">
                      {employee.department.departmentName}
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
                      {employee.address}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textPrimary" variant="body2">
                      {employee.phoneNumber}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textPrimary" variant="body2">
                      {formatDate(employee.updatedAt)}
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
                        sx={{
                          mr: 2,
                        }}
                        variant="contained"
                      >
                        Mutation
                      </Button>
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
