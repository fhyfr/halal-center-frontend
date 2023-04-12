import { Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import { formatRupiahCurrency } from '../../utils/currency-converter';
import { formatDate, formatDateWithoutHourMinutes } from '../../utils/date-converter';

export const EmployeeDetails = ({ employee }) => {
  if (employee.error) {
    return (
      <Typography align="center" variant="h4" style={{ color: 'red' }}>
        error, {employee.error.message}
      </Typography>
    );
  }

  return (
    <Card>
      <CardHeader subheader="The information cannot be edited" title="Profile" />
      <Divider />

      <CardContent sx={{ marginY: -2 }}>
        <Typography variant="h6">Department</Typography>
        <Typography variant="body1" gutterBottom>
          {employee.department.departmentName}
        </Typography>
      </CardContent>
      <Divider />

      <CardContent sx={{ marginY: -2 }}>
        <Typography variant="h6">Position</Typography>
        <Typography variant="body1" gutterBottom>
          {employee.position.positionName}
        </Typography>
      </CardContent>
      <Divider />

      <CardContent sx={{ marginY: -2 }}>
        <Typography variant="h6">Full Name</Typography>
        <Typography variant="body1" gutterBottom>
          {employee.fullName ? employee.fullName : 'empty'}
        </Typography>
      </CardContent>
      <Divider />

      <CardContent sx={{ marginY: -2 }}>
        <Typography variant="h6">Gender</Typography>
        <Typography variant="body1" gutterBottom>
          {employee.gender ? employee.gender : 'empty'}
        </Typography>
      </CardContent>
      <Divider />

      <Divider />
      <CardContent sx={{ marginY: -2 }}>
        <Typography variant="h6">NIK (Employee Identification Number)</Typography>
        <Typography variant="body1" gutterBottom>
          {employee.nik ? employee.nik : 'empty'}
        </Typography>
      </CardContent>
      <Divider />

      <CardContent sx={{ marginY: -2 }}>
        <Typography variant="h6">Phone Number</Typography>
        <Typography variant="body1" gutterBottom>
          {employee.phoneNumber ? employee.phoneNumber : 'empty'}
        </Typography>
      </CardContent>
      <Divider />

      <CardContent sx={{ marginY: -2 }}>
        <Typography variant="h6" gutterBottom>
          Address
        </Typography>
        <Typography variant="body1" gutterBottom>
          {employee.address ? employee.address : 'empty'}
        </Typography>
      </CardContent>
      <Divider />

      <CardContent sx={{ marginY: -2 }}>
        <Typography variant="h6">Join Date</Typography>
        <Typography variant="body1" gutterBottom>
          {employee.joinDate ? formatDateWithoutHourMinutes(employee.joinDate) : 'empty'}
        </Typography>
      </CardContent>
      <Divider />

      <CardContent sx={{ marginY: -2 }}>
        <Typography variant="h6">Current Salary</Typography>
        <Typography variant="body1" gutterBottom>
          {formatRupiahCurrency(employee.salary)}
        </Typography>
      </CardContent>
      <Divider />

      <CardContent sx={{ marginY: -2 }}>
        <Typography variant="h6">Last Updated</Typography>
        <Typography variant="body1" gutterBottom>
          {formatDate(employee.updatedAt)}
        </Typography>
      </CardContent>
      <Divider />
    </Card>
  );
};
