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
import { deleteAttendance } from '../../services/api/attendance';

export const AttendanceListResults = ({ attendances }) => {
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

  const handleDeleteAttendance = (attendanceId) => {
    const confirmation = confirm('Are you sure to delete this attendance?');
    if (confirmation) {
      deleteAttendance(attendanceId)
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

  const handleUpdateAttendance = (id) => {
    router.push({
      pathname: '/attendance/edit',
      query: {
        id,
      },
    });
  };

  const handleDetailPresence = (attendanceId) => {
    router.push({
      pathname: '/attendance/presence',
      query: {
        attendanceId,
      },
    });
  };

  if (attendances.error) {
    return (
      <Typography align="center" variant="h4" style={{ color: 'red' }}>
        error, {attendances.error.message}
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
                <TableCell align="center">Course ID</TableCell>
                <TableCell align="center">Title</TableCell>
                <TableCell align="center">End Date</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Created By</TableCell>
                <TableCell align="center">Updated By</TableCell>
                <TableCell align="center">Created Date</TableCell>
                <TableCell align="center">Updated Date</TableCell>
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
              {attendances.data?.slice(0, limit).map((attendance) => (
                <TableRow hover key={attendance.id}>
                  <TableCell align="center">
                    <Typography color="textPrimary" variant="body2">
                      {attendance.id}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color="textPrimary" variant="body2">
                      {attendance.courseId}
                    </Typography>
                  </TableCell>{' '}
                  <TableCell align="center">
                    <Typography color="textPrimary" variant="body2">
                      {attendance.title}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color="textPrimary" variant="body2">
                      {formatDate(attendance.endDate)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color="textPrimary" variant="body2">
                      {attendance.active ? 'Active' : 'Inactive'}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color="textPrimary" variant="body2">
                      {attendance.createdBy}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color="textPrimary" variant="body2">
                      {attendance.updatedBy ? attendance.updatedBy : 'No update'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textPrimary" variant="body2">
                      {formatDate(attendance.createdAt)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textPrimary" variant="body2">
                      {formatDate(attendance.updatedAt)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mr: 4,
                      }}
                    >
                      <Button
                        color="primary"
                        size="small"
                        sx={{
                          mr: 1,
                        }}
                        variant="contained"
                        onClick={() => handleDetailPresence(attendance.id)}
                      >
                        Presences
                      </Button>

                      <Button
                        color="secondary"
                        size="small"
                        sx={{
                          mr: 1,
                        }}
                        variant="contained"
                        onClick={() => handleUpdateAttendance(attendance.id)}
                      >
                        Update
                      </Button>

                      <Tooltip
                        title={attendance.totalPresenceData !== 0 ? 'attendance not empty' : ''}
                      >
                        <span>
                          <Button
                            color="error"
                            variant="contained"
                            size="small"
                            sx={{
                              mr: 1,
                            }}
                            onClick={() => {
                              handleDeleteAttendance(attendance.id);
                            }}
                            disabled={attendance.totalPresenceData !== 0}
                          >
                            Delete
                          </Button>
                        </span>
                      </Tooltip>
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
        count={attendances.itemCount}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

AttendanceListResults.propTypes = {
  attendances: PropTypes.array.isRequired,
};
