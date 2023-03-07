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

export const PositionListResults = ({ position, ...rest }) => {
  const [selectedPositionIds, setSelectedPositionIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedPositionIds;

    if (event.target.checked) {
      newSelectedPositionIds = position.map((position) => position.id);
    } else {
      newSelectedPositionIds = [];
    }

    setSelectedPositionIds(newSelectedPositionIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedPositionIds.indexOf(id);
    let newSelectedPositionIds = [];

    if (selectedIndex === -1) {
      newSelectedPositionIds = newSelectedPositionIds.concat(selectedPositionIds, id);
    } else if (selectedIndex === 0) {
      newSelectedPositionIds = newSelectedPositionIds.concat(selectedPositionIds.slice(1));
    } else if (selectedIndex === selectedPositionIds.length - 1) {
      newSelectedPositionIds = newSelectedPositionIds.concat(selectedPositionIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedPositionIds = newSelectedPositionIds.concat(
        selectedPositionIds.slice(0, selectedIndex),
        selectedPositionIds.slice(selectedIndex + 1),
      );
    }

    setSelectedPositionIds(newSelectedPositionIds);
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
                    checked={selectedPositionIds.length === position.length}
                    color="primary"
                    indeterminate={
                      selectedPositionIds.length > 0 && selectedPositionIds.length < position.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Position Name</TableCell>
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
              {position.slice(0, limit).map((position) => (
                <TableRow
                  hover
                  key={position.id}
                  selected={selectedPositionIds.indexOf(position.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedPositionIds.indexOf(position.id) !== -1}
                      onChange={(event) => handleSelectOne(event, position.id)}
                      value="true"
                    />
                  </TableCell>

                  <TableCell>{position.positionName}</TableCell>
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
        count={position.length}
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
