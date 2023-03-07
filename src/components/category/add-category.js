import { useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Divider, TextField } from '@mui/material';

export const AddCategory = (props) => {
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
        <CardHeader subheader="Isikan data berikut ini" title="Add Category" />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Category Name"
            margin="normal"
            name="categoryName"
            onChange={handleChange}
            type="text"
            value={values.categoryName}
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
