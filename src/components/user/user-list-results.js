import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
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
import { formatDate } from '../../utils/date-converter';
import { useRouter } from 'next/router';
import { deleteUser } from '../../services/api/user';

export const UserListResults = ({ users }) => {
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

  const handleUpdateUser = (userId) => {
    router.push({
      pathname: '/user/edit',
      query: {
        userId,
      },
    });
  };

  const handleDetailUser = (userId) => {
    router.push({
      pathname: '/member/details',
      query: {
        userId,
      },
    });
  };

  const handleDeleteUser = (userId) => {
    const confirmation = confirm('Are you sure to delete this user?');
    if (confirmation) {
      deleteUser(userId)
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

  if (users.error) {
    return (
      <Typography align="center" variant="h4" style={{ color: 'red' }}>
        error, {users.error.message}
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
                <TableCell align="left">Role</TableCell>
                <TableCell align="left">Username</TableCell>
                <TableCell align="left">Email</TableCell>
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
                <TableCell align="left">Last Updated</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.data.slice(0, limit).map((user) =>
                user.role.roleName === 'SUPER_ADMIN' ? (
                  ''
                ) : (
                  <TableRow hover key={user.id}>
                    <TableCell align="center">
                      <Typography color="textPrimary" variant="body2">
                        {user.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textPrimary" variant="body2">
                        {user.role.roleName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textPrimary" variant="body2">
                        {user.username}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textPrimary" variant="body2">
                        {user.email}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {user.role.roleName === 'MEMBER' ? (
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
                            onClick={() => handleDetailUser(user.id)}
                          >
                            Detail
                          </Button>
                        </Box>
                      ) : (
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
                            onClick={() => handleUpdateUser(user.id)}
                          >
                            Update
                          </Button>
                          <Button
                            color="error"
                            size="small"
                            sx={{
                              mr: 2,
                            }}
                            variant="contained"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            Delete
                          </Button>
                          <Button
                            color="warning"
                            size="small"
                            sx={{
                              mr: 2,
                            }}
                            variant="contained"
                            onClick={() => {
                              router.push({
                                pathname: '/user/reset-password',
                                query: {
                                  userId: user.id,
                                },
                              });
                            }}
                          >
                            Reset Password
                          </Button>
                        </Box>
                      )}
                    </TableCell>
                    <TableCell>
                      <Typography color="textPrimary" variant="body2">
                        {formatDate(user.updatedAt)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ),
              )}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={users.itemCount}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

UserListResults.propTypes = {
  users: PropTypes.array.isRequired,
};
