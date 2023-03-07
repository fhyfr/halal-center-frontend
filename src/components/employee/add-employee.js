import { useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Divider, TextField } from '@mui/material';

export const AddEmployee = (props) => {
  const [values, setValues] = useState({
    // password: '',
    // confirm: '',
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form {...props}>
      <Card>
        <CardHeader subheader="Isikan data berikut ini" title="Add Employee" />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Position ID"
            margin="normal"
            name="positionId"
            onChange={handleChange}
            type="text"
            value={values.positionId}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Department ID"
            margin="normal"
            name="departmentId"
            onChange={handleChange}
            type="text"
            value={values.departmentId}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="NIK"
            margin="normal"
            name="nik"
            onChange={handleChange}
            type="text"
            value={values.nik}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Full Name"
            margin="normal"
            name="fullName"
            onChange={handleChange}
            type="text"
            value={values.fullName}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Address"
            margin="normal"
            name="address"
            onChange={handleChange}
            type="text"
            value={values.address}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Phone Number"
            margin="normal"
            name="phoneNumber"
            onChange={handleChange}
            type="text"
            value={values.phoneNumber}
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2,
          }}
        >
          <Button color="primary" variant="contained">
            Submit
          </Button>
        </Box>
      </Card>
    </form>
  );
};
