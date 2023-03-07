import { useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Divider, TextField } from '@mui/material';

export const AddPayment = (props) => {
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
        <CardHeader subheader="Isikan data berikut ini" title="Add Payment" />
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
            label="User ID"
            margin="normal"
            name="userId"
            onChange={handleChange}
            type="text"
            value={values.userId}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Amount"
            margin="normal"
            name="amount"
            onChange={handleChange}
            type="text"
            value={values.amount}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Discount"
            margin="normal"
            name="discount"
            onChange={handleChange}
            type="text"
            value={values.discount}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Descriptions"
            margin="normal"
            name="descriptions"
            onChange={handleChange}
            type="text"
            value={values.descriptions}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Payment Method"
            margin="normal"
            name="paymentMethod"
            onChange={handleChange}
            type="text"
            value={values.paymentMethod}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Transaction Date"
            margin="normal"
            name="transactionDate"
            onChange={handleChange}
            type="text"
            value={values.transactionDate}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Status"
            margin="normal"
            name="status"
            onChange={handleChange}
            type="text"
            value={values.status}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Receipt Url"
            margin="normal"
            name="receiptUrl"
            onChange={handleChange}
            type="text"
            value={values.receiptUrl}
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
