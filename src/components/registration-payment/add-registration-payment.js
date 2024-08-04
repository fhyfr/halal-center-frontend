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
import { createNewRegistrationPayment } from '../../services/api/registration-payment';

export const AddRegistrationPayment = () => {
  const router = useRouter();

  const [info, setInfo] = useState(undefined);
  const [errMessage, setErrMessage] = useState(undefined);
  const [amount, setAmount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [receipt, setReceipt] = useState(null);

  const formik = useFormik({
    initialValues: {
      registrationId: '',
      descriptions: '',
      transactionDate: '',
      status: '',
      receiptUrl: '',
    },
    validationSchema: Yup.object({
      registrationId: Yup.number().required('Registration id is required'),
      descriptions: Yup.string().required('Descriptions is required'),
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

      Object.assign(values, {
        amount: paymentAmount,
        discount: paymentDiscount,
        paymentMethod: 'BANK_TRANSFER',
      });

      createNewRegistrationPayment(values)
        .then((res) => {
          setInfo(res);
          setErrMessage(undefined);

          setTimeout(() => {
            router.push('/registration-payment');
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
        <CardHeader
          subheader="Fill out this form for add new registration payment"
          title="Add New Registration Payment"
        />
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
              <FormControl sx={{ marginY: 2 }} fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-registration-id">
                  Registration ID
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-registration-id"
                  label="Course ID"
                  name="registrationId"
                  type="number"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.registrationId}
                />
                {Boolean(formik.touched.registrationId && formik.errors.registrationId) && (
                  <FormHelperText error>{formik.errors.registrationId}</FormHelperText>
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
            </Grid>

            <Grid item lg={6} md={6} xs={12}>
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
                <InputLabel id="select-registration-payment-status">
                  Registration Payment Status
                </InputLabel>
                <Select
                  labelId="select-registration-payment-status"
                  id="select-registration-payment-status"
                  value={formik.values.status}
                  label="Registration Payment Status"
                  onChange={formik.handleChange}
                  name="status"
                >
                  <MenuItem disabled key="" value="">
                    --- Select Registration Payment Status ---
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
              handleRedirectOnClick(router, '/registration-payment');
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
