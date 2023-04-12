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
  Tooltip,
} from '@mui/material';
import { useRouter } from 'next/router';
import { formatDate } from '../../utils/date-converter';
import { deleteDepartment } from '../../services/api/department';

export const DepartmentListResults = ({ departments }) => {
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

  const handleUpdateDepartment = (departmentId, departmentName) => {
    router.push({
      pathname: '/department/edit',
      query: {
        departmentId,
        departmentName,
      },
    });
  };

  const handleDeleteDepartment = (departmentId) => {
    const confirmation = confirm('Are you sure want to delete this department?');
    if (confirmation) {
      deleteDepartment(departmentId)
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

  if (departments.error) {
    return (
      <Typography align="center" variant="h4" style={{ color: 'red' }}>
        error, {departments.error.message}
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
                <TableCell align="left">Department Name</TableCell>
                <TableCell align="center">Total Employees</TableCell>
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
                <TableCell align="center">Last Updated</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {departments.data.slice(0, limit).map((department) => (
                <TableRow hover key={department.id}>
                  <TableCell align="center">
                    <Typography color="textPrimary" variant="body2">
                      {department.id}
                    </Typography>
                  </TableCell>{' '}
                  <TableCell>
                    <Typography color="textPrimary" variant="body2">
                      {department.departmentName}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color="textPrimary" variant="body2">
                      {department.totalEmployees}
                    </Typography>
                  </TableCell>{' '}
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
                        size="small"
                        sx={{
                          mr: 2,
                        }}
                        variant="contained"
                        onClick={() =>
                          handleUpdateDepartment(department.id, department.departmentName)
                        }
                      >
                        Update
                      </Button>
                      <Tooltip
                        title={department.totalEmployees !== 0 ? 'department not empty' : ''}
                      >
                        <span>
                          <Button
                            disabled={department.totalEmployees !== 0}
                            size="small"
                            color="error"
                            variant="contained"
                            onClick={() => {
                              handleDeleteDepartment(department.id);
                            }}
                          >
                            Delete
                          </Button>
                        </span>
                      </Tooltip>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color="textPrimary" variant="body2">
                      {formatDate(department.updatedAt)}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={departments.itemCount}
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
  departments: PropTypes.array.isRequired,
};
