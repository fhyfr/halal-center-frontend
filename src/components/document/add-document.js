import { useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Divider, TextField } from '@mui/material';

export const AddDocument = (props) => {
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
        <CardHeader subheader="Isikan data berikut ini" title="Add Document" />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Course ID"
            margin="normal"
            name="courseId"
            onChange={handleChange}
            type="text"
            value={values.courseId}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="URL"
            margin="normal"
            name="url"
            onChange={handleChange}
            type="text"
            value={values.url}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Type"
            margin="normal"
            name="type"
            onChange={handleChange}
            type="text"
            value={values.type}
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
