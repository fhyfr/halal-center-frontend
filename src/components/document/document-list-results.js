import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Button,
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';

export const DocumentListResults = ({ document, ...rest }) => {
  const [selectedDocumentIds, setSelectedDocumentIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedDocumentIds;

    if (event.target.checked) {
      newSelectedDocumentIds = document.map((document) => document.id);
    } else {
      newSelectedDocumentIds = [];
    }

    setSelectedDocumentIds(newSelectedDocumentIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedDocumentIds.indexOf(id);
    let newSelectedDocumentIds = [];

    if (selectedIndex === -1) {
      newSelectedDocumentIds = newSelectedDocumentIds.concat(selectedDocumentIds, id);
    } else if (selectedIndex === 0) {
      newSelectedDocumentIds = newSelectedDocumentIds.concat(selectedDocumentIds.slice(1));
    } else if (selectedIndex === selectedDocumentIds.length - 1) {
      newSelectedDocumentIds = newSelectedDocumentIds.concat(selectedDocumentIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedDocumentIds = newSelectedDocumentIds.concat(
        selectedDocumentIds.slice(0, selectedIndex),
        selectedDocumentIds.slice(selectedIndex + 1),
      );
    }

    setSelectedDocumentIds(newSelectedDocumentIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedDocumentIds.length === document.length}
                    color="primary"
                    indeterminate={
                      selectedDocumentIds.length > 0 && selectedDocumentIds.length < document.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Course ID</TableCell>
                <TableCell>URL</TableCell>
                <TableCell>Type</TableCell>
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
              </TableRow>
            </TableHead>
            <TableBody>
              {document.slice(0, limit).map((document) => (
                <TableRow
                  hover
                  key={document.id}
                  selected={selectedDocumentIds.indexOf(document.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedDocumentIds.indexOf(document.id) !== -1}
                      onChange={(event) => handleSelectOne(event, document.id)}
                      value="true"
                    />
                  </TableCell>

                  <TableCell>{document.courseId}</TableCell>
                  <TableCell>{document.url}</TableCell>
                  <TableCell>{document.type}</TableCell>
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
                        sx={{
                          mr: 2,
                        }}
                        variant="contained"
                      >
                        Update
                      </Button>
                      <Button color="error" variant="contained">
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
        count={document.length}
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
