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
  Tooltip,
} from '@mui/material';
import { useRouter } from 'next/router';
import { formatDate } from '../../utils/date-converter';
import { deletePosition } from '../../services/api/position';

export const PositionListResults = ({ position }) => {
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

  const handleUpdatePosition = (positionId, positionName) => {
    router.push({
      pathname: '/position/edit',
      query: {
        positionId,
        positionName,
      },
    });
  };

  const handleDeletePosition = (positionId) => {
    const confirmation = confirm('Are you sure want to delete this position?');
    if (confirmation) {
      deletePosition(positionId)
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

  if (position.error) {
    return (
      <Typography align="center" variant="h4" style={{ color: 'red' }}>
        error, {position.error.message}
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
                <TableCell align="left">Position Name</TableCell>
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
              {position.data.slice(0, limit).map((position) => (
                <TableRow hover key={position.id}>
                  <TableCell align="center">
                    <Typography color="textPrimary" variant="body2">
                      {position.id}
                    </Typography>
                  </TableCell>{' '}
                  <TableCell>
                    <Typography color="textPrimary" variant="body2">
                      {position.positionName}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color="textPrimary" variant="body2">
                      {position.totalEmployees}
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
                        onClick={() => handleUpdatePosition(position.id, position.positionName)}
                      >
                        Update
                      </Button>
                      <Tooltip title={position.totalEmployees !== 0 ? 'position not empty' : ''}>
                        <span>
                          <Button
                            disabled={position.totalEmployees !== 0}
                            size="small"
                            color="error"
                            variant="contained"
                            onClick={() => {
                              handleDeletePosition(position.id);
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
                      {formatDate(position.updatedAt)}
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
        count={position.itemCount}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

PositionListResults.propTypes = {
  position: PropTypes.array.isRequired,
};
