import { useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Divider, TextField } from '@mui/material';

export const AddInstructor = (props) => {
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
        <CardHeader subheader="Isikan data berikut ini" title="Add Instructor" />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            name="email"
            onChange={handleChange}
            type="text"
            value={values.email}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="courseIds"
            margin="normal"
            name="courseIds"
            onChange={handleChange}
            type="text"
            value={values.courseIds}
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
            label="Profile Picture"
            margin="normal"
            name="profilePicture"
            onChange={handleChange}
            type="text"
            value={values.profilePicture}
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
          <TextField
            fullWidth
            label="Facebook"
            margin="normal"
            name="facebook"
            onChange={handleChange}
            type="text"
            value={values.facebook}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="LinkedIn"
            margin="normal"
            name="linkedin"
            onChange={handleChange}
            type="text"
            value={values.linkedin}
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
