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
  Link,
} from '@mui/material';
import { useRouter } from 'next/router';
import { formatDate } from '../../utils/date-converter';
import { deleteTest } from '../../services/api/test';

export const TestListResults = ({ tests }) => {
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

  const handleDeleteTest = (id) => {
    const confirmation = confirm('Are you sure to delete this test?');
    if (confirmation) {
      deleteTest(id)
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

  const handleUpdateTest = (id) => {
    router.push({
      pathname: '/test/edit',
      query: {
        id,
      },
    });
  };

  if (tests.error) {
    return (
      <Typography align="center" variant="h4" style={{ color: 'red' }}>
        error, {tests.error.message}
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
                <TableCell align="center">Type</TableCell>
                <TableCell align="center">Period</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">URL</TableCell>
                <TableCell align="center">Created By</TableCell>
                <TableCell align="center">Created Date</TableCell>
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
              {tests.data?.slice(0, limit).map((test) => (
                <TableRow hover key={test.id}>
                  <TableCell align="center">
                    <Typography color="textPrimary" variant="body2">
                      {test.id}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color="textPrimary" variant="body2">
                      {test.courseId}
                    </Typography>
                  </TableCell>{' '}
                  <TableCell align="center">
                    <Typography color="textPrimary" variant="body2">
                      {test.type}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color="textPrimary" variant="body2">
                      {formatDate(test.startDate)} s/d {formatDate(test.endDate)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color="textPrimary" variant="body2">
                      {test.active ? 'Active' : 'Inactive'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textPrimary" variant="body2">
                      <Link href={test.url} target="_blank" underline="hover">
                        {test.url}
                      </Link>
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color="textPrimary" variant="body2">
                      {test.createdBy}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textPrimary" variant="body2">
                      {formatDate(test.createdAt)}
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
                        // onClick={() => handleUpdateCategory(category.id, category.categoryName)}
                      >
                        Detail
                      </Button>

                      <Button
                        color="secondary"
                        size="small"
                        sx={{
                          mr: 1,
                        }}
                        variant="contained"
                        onClick={() => handleUpdateTest(test.id)}
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
                          handleDeleteTest(test.id);
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
        count={tests.itemCount}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

TestListResults.propTypes = {
  tests: PropTypes.array.isRequired,
};
