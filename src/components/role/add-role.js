import { useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Divider, TextField } from '@mui/material';

export const AddRole = (props) => {
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
        <CardHeader subheader="Isikan data berikut ini" title="Add Role" />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Role Name"
            margin="normal"
            name="roleName"
            onChange={handleChange}
            type="text"
            value={values.roleName}
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
