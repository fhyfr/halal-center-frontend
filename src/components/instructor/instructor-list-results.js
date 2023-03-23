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
import { useRouter } from 'next/router';
import { deleteInstructor } from '../../services/api/instructor';

export const InstructorListResults = ({ instructors }) => {
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

  const handleDetailInstructor = (instructorId) => {
    router.push({
      pathname: '/instructor/details',
      query: {
        instructorId,
      },
    });
  };

  const handleDeleteInstructor = (instructorId) => {
    const confirmation = confirm('Are you sure want to delete this instructor?');
    if (confirmation) {
      deleteInstructor(instructorId)
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
                        color="primary"
                        size="small"
                        sx={{
                          mr: 2,
                        }}
                        variant="contained"
                        onClick={() => handleDetailInstructor(instructor.id)}
                      >
                        Detail
                      </Button>

                      <Button
                        size="small"
                        color="secondary"
                        sx={{
                          mr: 2,
                        }}
                        variant="contained"
                        onClick={() => {
                          router.push({
                            pathname: '/instructor/edit',
                            query: {
                              id: instructor.id,
                            },
                          });
                        }}
                      >
                        Update
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        variant="contained"
                        onClick={() => {
                          handleDeleteInstructor(instructor.id);
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
