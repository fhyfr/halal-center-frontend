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
import { formatDate } from '../../utils/date-converter';
import { deleteScore } from '../../services/api/score';

export const ScoreListResults = ({ scores }) => {
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

  const handleDeleteScore = (scoreId) => {
    const confirmation = confirm('Are you sure to delete this score?');
    if (confirmation) {
      deleteScore(scoreId)
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

  const handleUpdateScore = (scoreId) => {
    router.push({
      pathname: '/test/score/edit',
      query: {
        scoreId,
      },
    });
  };

  if (scores.error) {
    return (
      <Typography align="center" variant="h4" style={{ color: 'red' }}>
        error, {scores.error.message}
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
                <TableCell align="center">User ID</TableCell>
                <TableCell align="center">Score</TableCell>
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
              {scores.data?.slice(0, limit).map((score) => (
                <TableRow hover key={score.id}>
                  <TableCell align="center">
                    <Typography color="textPrimary" variant="body2">
                      {score.id}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color="textPrimary" variant="body2">
                      {score.registration.courseId}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color="textPrimary" variant="body2">
                      {score.registration.userId}
                    </Typography>
                  </TableCell>{' '}
                  <TableCell align="center">
                    <Typography color="textPrimary" variant="body2">
                      {score.score}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color="textPrimary" variant="body2">
                      {score.createdBy}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color="textPrimary" variant="body2">
                      {score.updatedBy ? score.updatedBy : 'No update'}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color="textPrimary" variant="body2">
                      {formatDate(score.createdAt)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color="textPrimary" variant="body2">
                      {formatDate(score.updatedAt)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <Button
                        color="secondary"
                        size="small"
                        sx={{
                          mr: 1,
                        }}
                        variant="contained"
                        onClick={() => handleUpdateScore(score.id)}
                      >
                        Update
                      </Button>

                      <Button
                        color="error"
                        variant="contained"
                        size="small"
                        sx={{
                          mr: 1,
                        }}
                        onClick={() => {
                          handleDeleteScore(score.id);
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
        count={scores.itemCount}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

ScoreListResults.propTypes = {
  scores: PropTypes.array.isRequired,
};
