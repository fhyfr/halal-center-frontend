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
import { deleteCategory } from '../../services/api/category';

export const CategoryListResults = ({ categories }) => {
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

  const handleUpdateCategory = (categoryId, categoryName) => {
    router.push({
      pathname: '/category/edit',
      query: {
        categoryId,
        categoryName,
      },
    });
  };

  const handleDeleteCategory = (categoryId) => {
    const confirmation = confirm('Are you sure want to delete this category?');
    if (confirmation) {
      deleteCategory(categoryId)
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

  if (categories.error) {
    return (
      <Typography align="center" variant="h4" style={{ color: 'red' }}>
        error, {categories.error.message}
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
                <TableCell align="left">Category Name</TableCell>
                <TableCell align="center">Total Courses</TableCell>
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
                <TableCell align="center">Last Updated</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.data.slice(0, limit).map((category) => (
                <TableRow hover key={category.id}>
                  <TableCell align="center">
                    <Typography color="textPrimary" variant="body2">
                      {category.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textPrimary" variant="body2">
                      {category.categoryName}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color="textPrimary" variant="body2">
                      {category.totalCourses}
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
                        color="secondary"
                        size="small"
                        sx={{
                          mr: 2,
                        }}
                        variant="contained"
                        onClick={() => handleUpdateCategory(category.id, category.categoryName)}
                      >
                        Update
                      </Button>
                      <Tooltip title={category.totalCourses !== 0 ? 'category not empty' : ''}>
                        <span>
                          <Button
                            disabled={category.totalCourses !== 0}
                            size="small"
                            color="error"
                            variant="contained"
                            onClick={() => {
                              handleDeleteCategory(category.id);
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
                      {formatDate(category.updatedAt)}
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
        count={categories.itemCount}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CategoryListResults.propTypes = {
  categories: PropTypes.array.isRequired,
};
