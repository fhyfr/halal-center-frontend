import PropTypes from 'prop-types';
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TableContainer,
  Paper,
  Link,
} from '@mui/material';

export const ReportRank = ({ ranks }) => {
  if (ranks.error) {
    return (
      <Typography align="center" variant="h4" style={{ color: 'red' }}>
        error, {ranks.error.message}
      </Typography>
    );
  }

  return (
    <Card>
      <TableContainer component={Paper} sx={{ p: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="registration payment">
          <TableHead>
            <TableRow>
              <TableCell align="center">Rank</TableCell>
              <TableCell align="center">User ID</TableCell>
              <TableCell align="center">Full Name</TableCell>
              <TableCell align="center">Vector S Age</TableCell>
              <TableCell align="center">Vector S Education</TableCell>
              <TableCell align="center">Vector S Attendance</TableCell>
              <TableCell align="center">Vector S Score</TableCell>
              <TableCell align="center">Vector S Experience</TableCell>
              <TableCell align="center">Result of Si</TableCell>
              <TableCell align="center">Result of Vi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ranks.length > 0 &&
              ranks.map((rank, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">
                    <Link href={`/member/details?userId=${rank.userId}`}>{rank.userId}</Link>
                  </TableCell>
                  <TableCell align="center">{rank.fullName}</TableCell>
                  <TableCell align="center">
                    {Number.isInteger(rank.vectorSAge)
                      ? rank.vectorSAge
                      : rank.vectorSAge.toFixed(4)}
                  </TableCell>
                  <TableCell align="center">
                    {Number.isInteger(rank.vectorSEducation)
                      ? rank.vectorSEducation
                      : rank.vectorSEducation.toFixed(4)}
                  </TableCell>
                  <TableCell align="center">
                    {Number.isInteger(rank.vectorSAttendance)
                      ? rank.vectorSAttendance
                      : rank.vectorSAttendance.toFixed(4)}
                  </TableCell>
                  <TableCell align="center">
                    {Number.isInteger(rank.vectorSScore)
                      ? rank.vectorSScore
                      : rank.vectorSScore.toFixed(4)}
                  </TableCell>
                  <TableCell align="center">
                    {Number.isInteger(rank.vectorSExperience)
                      ? rank.vectorSExperience
                      : rank.vectorSExperience.toFixed(4)}
                  </TableCell>
                  <TableCell align="center">
                    {Number.isInteger(rank.resultOfSi)
                      ? rank.resultOfSi
                      : rank.resultOfSi.toFixed(4)}
                  </TableCell>
                  <TableCell align="center">
                    {Number.isInteger(rank.resultOfVi)
                      ? rank.resultOfVi
                      : rank.resultOfVi.toFixed(4)}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

ReportRank.propTypes = {
  courses: PropTypes.array.isRequired,
};
