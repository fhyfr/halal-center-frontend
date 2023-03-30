import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { handleRedirectOnClick } from '../../utils/handle-event-button';
import { CancelRounded, PhotoCamera } from '@mui/icons-material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { uploadImage } from '../../services/api/file';
import { createNewPayment } from '../../services/api/payment';

export const AddPayment = (props) => {
  const router = useRouter();

  const [info, setInfo] = useState(undefined);
  const [errMessage, setErrMessage] = useState(undefined);
  const [amount, setAmount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [receipt, setReceipt] = useState(null);

  const formik = useFormik({
    initialValues: {
      courseId: 0,
      userId: 0,
      descriptions: '',
      type: '',
      paymentMethod: '',
      transactionDate: '',
      status: '',
      receiptUrl: '',
    },
    validationSchema: Yup.object({
      courseId: Yup.number().required('Course id is required'),
      userId: Yup.number(),
      descriptions: Yup.string().required('Descriptions is required'),
      type: Yup.string().required('Type is required'),
      paymentMethod: Yup.string().required('Payment method is required'),
      transactionDate: Yup.string().required(),
      status: Yup.string().required('Status is required'),
      receiptUrl: Yup.string().url().required('Receipt url is required'),
    }),
    onSubmit: (values, action) => {
      let paymentAmount, paymentDiscount;

      if (typeof amount === 'number') {
        paymentAmount = amount;
      } else {
        paymentAmount = parseInt(amount.replace(/[^0-9\.]/gi, ''), 10);
      }

      if (typeof discount === 'number') {
        paymentDiscount = discount;
      } else {
        paymentDiscount = parseInt(discount.replace(/[^0-9\.]/gi, ''), 10);
      }

      if (values.userId === 0 && values.type === 'COURSE_UTILITIES') {
        delete values.userId;
      }

      Object.assign(values, {
        amount: paymentAmount,
        discount: paymentDiscount,
      });

      createNewPayment(values)
        .then((res) => {
          setInfo(res);
          setErrMessage(undefined);

          setTimeout(() => {
            router.push('/payment');
          }, 2000);
        })
        .catch((err) => {
          setErrMessage(err.response.data?.message);
          setInfo(undefined);
          action.setSubmitting(false);
        });
    },
  });

  const handleOnChangeAmount = (e) => {
    setAmount(e.target.value.replace(/[^0-9\.]/gi, ''));
  };

  const handleOnChangeDiscount = (e) => {
    setDiscount(e.target.value.replace(/[^0-9\.]/gi, ''));
  };

  const handleOnBlurAmount = () => {
    if (amount === 0) {
      return;
    }

    let tempAmount = amount.replace(/[^0-9\.]/gi, '');
    if (tempAmount.match(/\./g) > 1) {
      const [thousands] = tempAmount.split('.');
      tempAmount = `${thousands}`;
    }

    tempAmount = Number(tempAmount).toLocaleString('en-EN', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });

    tempAmount = tempAmount.replace(/\$/g, '');

    setAmount(tempAmount);
  };

  const handleOnBlurDiscount = () => {
    if (discount === 0) {
      return;
    }

    let tmpDiscount = discount.replace(/[^0-9\.]/gi, '');
    if (tmpDiscount.match(/\./g) > 1) {
      const [thousands] = tmpDiscount.split('.');
      tmpDiscount = `${thousands}`;
    }

    tmpDiscount = Number(tmpDiscount).toLocaleString('en-EN', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });

    tmpDiscount = tmpDiscount.replace(/\$/g, '');

    setDiscount(tmpDiscount);
  };

  const handleUploadReceipt = async (event) => {
    uploadImage(event.target.files[0])
      .then((res) => {
        setInfo(res.message);
        setReceipt(res.data.imagePreview);
        formik.values.receiptUrl = res.data.imagePreview;
        setErrMessage(undefined);
      })
      .catch((err) => {
        setErrMessage(err.response.data?.message);
        setInfo(undefined);
      });
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader subheader="Fill out this form for add new payment" title="Add New Payment" />
        <Divider />
        <CardContent>
          <Grid container spacing={2} sx={{ marginBottom: 3 }}>
            <Grid item lg={12} md={12} xs={12}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <CardMedia
                      component="img"
                      src={receipt}
                      sx={{
                        width: 600,
                      }}
                      alt="Image with size 2 : 1 ratio"
                    />
                  </Box>
                </CardContent>
                <Divider />

                <CardActions>
                  <Button
                    color="primary"
                    fullWidth
                    variant="text"
                    component="label"
                    endIcon={<PhotoCamera />}
                  >
                    Upload Receipt
                    <input
                      id="upload-receipt-id"
                      name="receiptUrl"
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={handleUploadReceipt}
                    />
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>

          {info && (
            <Alert sx={{ marginBottom: 2 }} severity="success">
              {info}
            </Alert>
          )}

          {errMessage && (
            <Alert sx={{ marginBottom: 2 }} severity="error">
              {errMessage}
            </Alert>
          )}

          <Grid container spacing={3}>
            <Grid item lg={6} md={6} xs={12}>
              <FormControl sx={{ marginTop: 1, marginBottom: 2 }} fullWidth variant="outlined">
                <InputLabel id="select-payment-type">Payment Type</InputLabel>
                <Select
                  labelId="select-payment-type"
                  id="select-payment-type"
                  value={formik.values.type}
                  label="Payment Type"
                  onChange={formik.handleChange}
                  name="type"
                >
                  <MenuItem disabled key="" value="">
                    --- Select Type ---
                  </MenuItem>
                  <MenuItem key="registration" value="REGISTRATION">
                    Registration
                  </MenuItem>

                  <MenuItem key="course_utilities" value="COURSE_UTILITIES">
                    Course Utilities
                  </MenuItem>
                </Select>
                {Boolean(formik.touched.departmentId && formik.errors.departmentId) && (
                  <FormHelperText error>{formik.errors.departmentId}</FormHelperText>
                )}
              </FormControl>

              <FormControl sx={{ marginY: 2 }} fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-course-id">Course ID</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-course-id"
                  label="Course ID"
                  name="courseId"
                  type="number"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.courseId}
                />
                {Boolean(formik.touched.courseId && formik.errors.courseId) && (
                  <FormHelperText error>{formik.errors.courseId}</FormHelperText>
                )}
              </FormControl>

              <FormControl sx={{ marginY: 2 }} fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-user-id">User ID</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-user-id"
                  label="User ID"
                  name="userId"
                  type="number"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.userId}
                  disabled={formik.values.type === 'COURSE_UTILITIES'}
                />
                {Boolean(formik.touched.userId && formik.errors.userId) && (
                  <FormHelperText error>{formik.errors.userId}</FormHelperText>
                )}
              </FormControl>

              <FormControl sx={{ marginY: 2 }} fullWidth variant="outlined">
                <TextField
                  id="input-amount"
                  name="amount"
                  label="Amount"
                  onChange={handleOnChangeAmount}
                  onBlur={handleOnBlurAmount}
                  value={amount}
                  inputProps={{
                    inputMode: 'numeric',
                  }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
                    endAdornment: (
                      <InputAdornment position="end">
                        {Boolean(amount) && (
                          <CancelRounded
                            size="small"
                            color="grey"
                            sx={{ padding: 0 }}
                            onClick={() => setAmount(0)}
                          />
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>

              <FormControl sx={{ marginY: 2 }} fullWidth variant="outlined">
                <TextField
                  id="input-discount"
                  name="discount"
                  label="Discount"
                  onChange={handleOnChangeDiscount}
                  onBlur={handleOnBlurDiscount}
                  value={discount}
                  inputProps={{
                    inputMode: 'numeric',
                  }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
                    endAdornment: (
                      <InputAdornment position="end">
                        {Boolean(discount) && (
                          <CancelRounded
                            size="small"
                            color="grey"
                            sx={{ padding: 0 }}
                            onClick={() => setDiscount(0)}
                          />
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
            </Grid>

            <Grid item lg={6} md={6} xs={12}>
              <FormControl sx={{ marginTop: 1, marginBottom: 2 }} fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-descriptions">Descriptions</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-descriptions"
                  label="Descriptions"
                  name="descriptions"
                  type="text"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.descriptions}
                />
                {Boolean(formik.touched.descriptions && formik.errors.descriptions) && (
                  <FormHelperText error>{formik.errors.descriptions}</FormHelperText>
                )}
              </FormControl>

              <FormControl sx={{ marginY: 2 }} fullWidth variant="outlined">
                <InputLabel id="select-payment-method">Payment Method</InputLabel>
                <Select
                  labelId="select-payment-method"
                  id="select-payment-method"
                  value={formik.values.paymentMethod}
                  label="Payment Method"
                  onChange={formik.handleChange}
                  name="paymentMethod"
                >
                  <MenuItem disabled key="" value="">
                    --- Select Payment Method ---
                  </MenuItem>
                  <MenuItem key="bank_transfer" value="BANK_TRANSFER">
                    Bank Transfer
                  </MenuItem>
                  <MenuItem key="cash" value="CASH">
                    Cash
                  </MenuItem>
                </Select>
                {Boolean(formik.touched.departmentId && formik.errors.departmentId) && (
                  <FormHelperText error>{formik.errors.departmentId}</FormHelperText>
                )}
              </FormControl>

              <Stack
                sx={{ marginX: 2, marginTop: 2, marginBottom: 2 }}
                alignItems="center"
                direction="row"
                spacing={4}
              >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <InputLabel htmlFor="id-transaction-date">Transaction Date</InputLabel>
                  <DatePicker
                    onChange={(value) => {
                      formik.setFieldValue('transactionDate', new Date(value).toISOString());
                    }}
                    value={formik.values.transactionDate}
                    inputFormat="dd/MM/yyyy"
                    renderInput={(params) => (
                      <TextField
                        id="id-transaction-date"
                        sx={{ maxWidth: 300 }}
                        error={Boolean(
                          formik.touched.transactionDate && formik.errors.transactionDate,
                        )}
                        helperText={formik.touched.transactionDate && formik.errors.transactionDate}
                        label="Transaction Date"
                        name="transactionDate"
                        variant="outlined"
                        {...params}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Stack>

              <FormControl sx={{ marginY: 2 }} fullWidth variant="outlined">
                <InputLabel id="select-payment-status">Payment Status</InputLabel>
                <Select
                  labelId="select-payment-status"
                  id="select-payment-status"
                  value={formik.values.status}
                  label="Payment Status"
                  onChange={formik.handleChange}
                  name="status"
                >
                  <MenuItem disabled key="" value="">
                    --- Select Payment Status ---
                  </MenuItem>
                  <MenuItem key="PENDING" value="PENDING">
                    PENDING
                  </MenuItem>
                  <MenuItem key="SUCCESS" value="SUCCESS">
                    SUCCESS
                  </MenuItem>
                  <MenuItem key="FAILED" value="FAILED">
                    FAILED
                  </MenuItem>
                </Select>
                {Boolean(formik.touched.status && formik.errors.status) && (
                  <FormHelperText error>{formik.errors.status}</FormHelperText>
                )}
              </FormControl>

              <FormControl sx={{ marginY: 2 }} fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-receipt-url">Receipt URL</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-receipt-url"
                  label="Receipt URL"
                  name="receiptUrl"
                  type="text"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.receiptUrl}
                  disabled
                />
                {Boolean(formik.touched.receiptUrl && formik.errors.receiptUrl) && (
                  <FormHelperText error>{formik.errors.receiptUrl}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2,
          }}
        >
          <Button
            sx={{ mx: 1 }}
            type="button"
            disabled={formik.isSubmitting}
            color="error"
            variant="text"
            onClick={() => {
              handleRedirectOnClick(router, '/payment');
            }}
          >
            Cancel
          </Button>
          <Button
            sx={{ mx: 1 }}
            type="submit"
            disabled={formik.isSubmitting}
            color="primary"
            variant="contained"
          >
            Submit
          </Button>
        </Box>
      </Card>
    </form>
  );
};
