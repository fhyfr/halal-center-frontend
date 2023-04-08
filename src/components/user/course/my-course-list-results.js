import {
  Box,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { formatDate, formatDateWithoutHourMinutes } from '../../../utils/date-converter';
import { InfoOutlined } from '@mui/icons-material';

export const MyCourseListResults = ({ courses }) => {
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
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Level</TableCell>
                <TableCell align="left">Participants</TableCell>
                <TableCell align="left">Course Date</TableCell>
                <TableCell align="left">Register Date</TableCell>
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
              {courses.data?.slice(0, limit).map((course) => (
                <TableRow hover key={course.id}>
                  <TableCell align="center">
                    <Typography color="textPrimary" variant="body2">
                      {course.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textPrimary" variant="body2">
                      {course.category ? course.category.categoryName : ''}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textPrimary" variant="body2">
                      {course.title}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textPrimary" variant="body2">
                      {course.level}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textPrimary" variant="body2">
                      {course.totalRegistered} / {course.quota}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textPrimary" variant="body2">
                      {formatDateWithoutHourMinutes(course.startDate)} - {''}
                      {formatDateWithoutHourMinutes(course.endDate)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textPrimary" variant="body2">
                      {formatDate(course.registeredAt)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <Button
                        color="info"
                        size="small"
                        variant="contained"
                        startIcon={<InfoOutlined />}
                        onClick={() => {
                          router.push({
                            pathname: '/course/details',
                            query: {
                              courseId: course.id,
                            },
                          });
                        }}
                      >
                        Detail
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

MyCourseListResults.propTypes = {
  courses: PropTypes.array.isRequired,
};
