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
import { formatDateWithoutHourMinutes } from '../../utils/date-converter';

export const ReportListResults = ({ courses }) => {
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

  if (courses.error) {
    return (
      <Typography align="center" variant="h4" style={{ color: 'red' }}>
        error, {courses.error.message}
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
                <TableCell align="left">Category</TableCell>
                <TableCell align="left">Course Title</TableCell>
                <TableCell align="center">Course Level</TableCell>
                <TableCell align="center">Course Date</TableCell>
                <TableCell align="center">Total Participants</TableCell>
                <TableCell align="center">Total Instructors</TableCell>
                <TableCell align="center">
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    Report Action
                  </Box>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.data.slice(0, limit).map((course) => (
                <TableRow hover key={course.id}>
                  <TableCell align="center">
                    <Typography color="textPrimary" variant="body2">
                      {course.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textPrimary" variant="body2">
                      {course.category.categoryName}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography color="textPrimary" variant="body2">
                      {`${course.title} - Batch ${course.batchNumber}`}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color="textPrimary" variant="body2">
                      {course.level}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color="textPrimary" variant="body2">
                      {formatDateWithoutHourMinutes(course.startDate)} s/d{' '}
                      {formatDateWithoutHourMinutes(course.endDate)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color="textPrimary" variant="body2">
                      {course.totalParticipants} participants
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color="textPrimary" variant="body2">
                      {course.totalInstructors} instructors
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
                            pathname: '/report/details',
                            query: { courseId: course.id },
                          });
                        }}
                      >
                        Details
                      </Button>
                      <Button
                        color="warning"
                        size="small"
                        sx={{
                          mr: 2,
                        }}
                        variant="contained"
                        onClick={() => {
                          handleDeleteCategory(course.id);
                        }}
                      >
                        Finance
                      </Button>
                      <Button
                        color="info"
                        size="small"
                        variant="contained"
                        onClick={() => handleUpdateCategory(course.id, course.categoryName)}
                      >
                        Ranking
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
        count={courses.itemCount}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

ReportListResults.propTypes = {
  courses: PropTypes.array.isRequired,
};
