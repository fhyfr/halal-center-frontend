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

export const InstructorListResults = ({ instructor, ...rest }) => {
  const [selectedInstructorIds, setSelectedInstructorIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedInstructorIds;

    if (event.target.checked) {
      newSelectedInstructorIds = instructor.map((instructor) => instructor.id);
    } else {
      newSelectedInstructorIds = [];
    }

    setSelectedInstructorIds(newSelectedInstructorIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedInstructorIds.indexOf(id);
    let newSelectedInstructorIds = [];

    if (selectedIndex === -1) {
      newSelectedInstructorIds = newSelectedInstructorIds.concat(selectedInstructorIds, id);
    } else if (selectedIndex === 0) {
      newSelectedInstructorIds = newSelectedInstructorIds.concat(selectedInstructorIds.slice(1));
    } else if (selectedIndex === selectedInstructorIds.length - 1) {
      newSelectedInstructorIds = newSelectedInstructorIds.concat(
        selectedInstructorIds.slice(0, -1),
      );
    } else if (selectedIndex > 0) {
      newSelectedInstructorIds = newSelectedInstructorIds.concat(
        selectedInstructorIds.slice(0, selectedIndex),
        selectedInstructorIds.slice(selectedIndex + 1),
      );
    }

    setSelectedInstructorIds(newSelectedInstructorIds);
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
                    checked={selectedInstructorIds.length === instructor.length}
                    color="primary"
                    indeterminate={
                      selectedInstructorIds.length > 0 &&
                      selectedInstructorIds.length < instructor.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Email</TableCell>
                <TableCell>CourseIds</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Profile Picture</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Facebook</TableCell>
                <TableCell>LinkedIn</TableCell>
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
              {instructor.slice(0, limit).map((instructor) => (
                <TableRow
                  hover
                  key={instructor.id}
                  selected={selectedInstructorIds.indexOf(instructor.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedInstructorIds.indexOf(instructor.id) !== -1}
                      onChange={(event) => handleSelectOne(event, instructor.id)}
                      value="true"
                    />
                  </TableCell>

                  <TableCell>{instructor.email}</TableCell>
                  <TableCell>{instructor.courseIds}</TableCell>
                  <TableCell>{instructor.fullName}</TableCell>
                  <TableCell>{instructor.profilePicture}</TableCell>
                  <TableCell>{instructor.address}</TableCell>
                  <TableCell>{instructor.phoneNumber}</TableCell>
                  <TableCell>{instructor.facebook}</TableCell>
                  <TableCell>{instructor.linkedin}</TableCell>
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
        count={instructor.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

InstructorListResults.propTypes = {
  instructor: PropTypes.array.isRequired,
};
