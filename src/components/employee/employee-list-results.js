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

export const EmployeeListResults = ({ employee, ...rest }) => {
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

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedEmployeeIds.length === employee.length}
                    color="primary"
                    indeterminate={
                      selectedEmployeeIds.length > 0 && selectedEmployeeIds.length < employee.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Position</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>NIK</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Phone Number</TableCell>
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
              {employee.slice(0, limit).map((employee) => (
                <TableRow
                  hover
                  key={employee.id}
                  selected={selectedEmployeeIds.indexOf(employee.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedEmployeeIds.indexOf(employee.id) !== -1}
                      onChange={(event) => handleSelectOne(event, employee.id)}
                      value="true"
                    />
                  </TableCell>

                  <TableCell>{employee.positionId}</TableCell>
                  <TableCell>{employee.departmentId}</TableCell>
                  <TableCell>{employee.nik}</TableCell>
                  <TableCell>{employee.fullName}</TableCell>
                  <TableCell>{employee.address}</TableCell>
                  <TableCell>{employee.phoneNumber}</TableCell>
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
        count={employee.length}
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
  employee: PropTypes.array.isRequired,
};
