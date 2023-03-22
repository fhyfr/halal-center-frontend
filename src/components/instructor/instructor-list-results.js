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
  Typography,
  Button,
} from '@mui/material';

export const InstructorListResults = ({ instructors }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  if (instructors.error) {
    return (
      <Typography align="center" variant="h4" style={{ color: 'red' }}>
        error, {instructors.error.message}
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
                <TableCell>Full Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell align="left">Last Updated</TableCell>
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
              {instructors.data.slice(0, limit).map((instructor) => (
                <TableRow hover key={instructor.id}>
                  <TableCell align="center">
                    <Typography color="textPrimary" variant="body2">
                      {instructor.id}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography color="textPrimary" variant="body2">
                      {instructor.fullName}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography color="textPrimary" variant="body2">
                      {instructor.email}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography color="textPrimary" variant="body2">
                      {instructor.phoneNumber}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography color="textPrimary" variant="body2">
                      {instructor.updatedAt}
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
                        size="small"
                        color="secondary"
                        sx={{
                          mr: 2,
                        }}
                        variant="contained"
                      >
                        Update
                      </Button>
                      <Button size="small" color="error" variant="contained">
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
        count={instructors.itemCount}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

InstructorListResults.propTypes = {
  instructor: PropTypes.array.isRequired,
};
