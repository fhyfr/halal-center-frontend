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
import { deleteDocument } from '../../services/api/document';

export const DocumentListResults = ({ documents }) => {
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

  const handleDeleteDocument = (documentId) => {
    const confirmation = confirm('Are you sure want to delete this document?');
    if (confirmation) {
      deleteDocument(documentId)
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

  if (documents.error) {
    return (
      <Typography align="center" variant="h4" style={{ color: 'red' }}>
        error, {documents.error.message}
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
                <TableCell>Type</TableCell>
                <TableCell>Course ID</TableCell>
                <TableCell>User ID</TableCell>
                <TableCell>URL</TableCell>
                <TableCell>Created By</TableCell>
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
              {documents.data?.slice(0, limit).map((document) => (
                <TableRow hover key={document.id}>
                  <TableCell align="center">
                    <Typography color="textPrimary" variant="body2">
                      {document.id}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography color="textPrimary" variant="body2">
                      {document.type}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textPrimary" variant="body2">
                      {document.courseId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textPrimary" variant="body2">
                      {document.userId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textPrimary" variant="body2">
                      <Link href={document.url} target="_blank" underline="hover">
                        {document.url}
                      </Link>
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textPrimary" variant="body2">
                      {document.createdBy}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textPrimary" variant="body2">
                      {formatDate(document.createdAt)}
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
                        color="error"
                        variant="contained"
                        size="small"
                        onClick={() => {
                          handleDeleteDocument(document.id);
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
        count={documents.itemCount}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

DocumentListResults.propTypes = {
  document: PropTypes.array.isRequired,
};
