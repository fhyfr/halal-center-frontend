import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Button,
} from '@mui/material';

export const RoleListResults = ({ role, ...rest }) => {
  const [selectedRoleIds, setSelectedRoleIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedRoleIds;

    if (event.target.checked) {
      newSelectedRoleIds = role.map((role) => role.id);
    } else {
      newSelectedRoleIds = [];
    }

    setSelectedRoleIds(newSelectedRoleIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedRoleIds.indexOf(id);
    let newSelectedRoleIds = [];

    if (selectedIndex === -1) {
      newSelectedRoleIds = newSelectedRoleIds.concat(selectedRoleIds, id);
    } else if (selectedIndex === 0) {
      newSelectedRoleIds = newSelectedRoleIds.concat(selectedRoleIds.slice(1));
    } else if (selectedIndex === selectedRoleIds.length - 1) {
      newSelectedRoleIds = newSelectedRoleIds.concat(selectedRoleIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedRoleIds = newSelectedRoleIds.concat(
        selectedRoleIds.slice(0, selectedIndex),
        selectedRoleIds.slice(selectedIndex + 1),
      );
    }

    setSelectedRoleIds(newSelectedRoleIds);
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
                    checked={selectedRoleIds.length === role.length}
                    color="primary"
                    indeterminate={
                      selectedRoleIds.length > 0 && selectedRoleIds.length < role.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Role Name</TableCell>
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
              {role.slice(0, limit).map((role) => (
                <TableRow hover key={role.id} selected={selectedRoleIds.indexOf(role.id) !== -1}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedRoleIds.indexOf(role.id) !== -1}
                      onChange={(event) => handleSelectOne(event, role.id)}
                      value="true"
                    />
                  </TableCell>

                  <TableCell>{role.roleName}</TableCell>
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
        count={role.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

RoleListResults.propTypes = {
  role: PropTypes.array.isRequired,
};
