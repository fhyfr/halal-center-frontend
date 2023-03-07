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

export const DepartmentListResults = ({ department, ...rest }) => {
  const [selectedDepartmentIds, setSelectedDepartmentIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedDepartmentIds;

    if (event.target.checked) {
      newSelectedDepartmentIds = department.map((department) => department.id);
    } else {
      newSelectedDepartmentIds = [];
    }

    setSelectedDepartmentIds(newSelectedDepartmentIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedDepartmentIds.indexOf(id);
    let newSelectedDepartmentIds = [];

    if (selectedIndex === -1) {
      newSelectedDepartmentIds = newSelectedDepartmentIds.concat(selectedDepartmentIds, id);
    } else if (selectedIndex === 0) {
      newSelectedDepartmentIds = newSelectedDepartmentIds.concat(selectedDepartmentIds.slice(1));
    } else if (selectedIndex === selectedDepartmentIds.length - 1) {
      newSelectedDepartmentIds = newSelectedDepartmentIds.concat(
        selectedDepartmentIds.slice(0, -1),
      );
    } else if (selectedIndex > 0) {
      newSelectedDepartmentIds = newSelectedDepartmentIds.concat(
        selectedDepartmentIds.slice(0, selectedIndex),
        selectedDepartmentIds.slice(selectedIndex + 1),
      );
    }

    setSelectedDepartmentIds(newSelectedDepartmentIds);
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
                    checked={selectedDepartmentIds.length === department.length}
                    color="primary"
                    indeterminate={
                      selectedDepartmentIds.length > 0 &&
                      selectedDepartmentIds.length < department.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Department Name</TableCell>
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
              {department.slice(0, limit).map((department) => (
                <TableRow
                  hover
                  key={department.id}
                  selected={selectedDepartmentIds.indexOf(department.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedDepartmentIds.indexOf(department.id) !== -1}
                      onChange={(event) => handleSelectOne(event, department.id)}
                      value="true"
                    />
                  </TableCell>

                  <TableCell>{department.departmentName}</TableCell>
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
        count={department.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

DepartmentListResults.propTypes = {
  department: PropTypes.array.isRequired,
};
