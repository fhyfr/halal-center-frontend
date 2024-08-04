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
import { deleteCertificate } from '../../services/api/certificate';
import { Download } from '@mui/icons-material';
import useAuth from '../../hooks/use-auth';

export const CertificateListResults = ({ certificates }) => {
  const { user } = useAuth();
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

  const handleDeleteCertificate = (id) => {
    const confirmation = confirm('Are you sure to delete this certificate?');
    if (confirmation) {
      deleteCertificate(id)
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

  if (certificates.error) {
    return (
      <Typography align="center" variant="h4" style={{ color: 'red' }}>
        error, {certificates.error.message}
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
              {certificates.data?.slice(0, limit).map((certificate) => (
                <TableRow hover key={certificate.id}>
                  <TableCell align="center">
                    <Typography color="textPrimary" variant="body2">
                      {certificate.id}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color="textPrimary" variant="body2">
                      {certificate.courseId}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color="textPrimary" variant="body2">
                      {certificate.userId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textPrimary" variant="body2">
                      <Link href={certificate.url} target="_blank" underline="hover">
                        {certificate.url}
                      </Link>
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color="textPrimary" variant="body2">
                      {certificate.createdBy}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textPrimary" variant="body2">
                      {formatDate(certificate.createdAt)}
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
                      {user?.role?.roleName === 'INSTRUCTOR' ? (
                        <Button
                          color="secondary"
                          size="small"
                          sx={{
                            mr: 2,
                          }}
                          variant="contained"
                          startIcon={<Download />}
                          href={certificate.url}
                          target="_blank"
                        >
                          Download
                        </Button>
                      ) : (
                        <Button
                          color="error"
                          variant="contained"
                          size="small"
                          onClick={() => {
                            handleDeleteCertificate(certificate.id);
                          }}
                        >
                          Delete
                        </Button>
                      )}
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
        count={certificates.itemCount}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CertificateListResults.propTypes = {
  certificates: PropTypes.array.isRequired,
};
