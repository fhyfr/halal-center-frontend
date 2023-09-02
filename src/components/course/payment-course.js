import { PhotoCamera } from '@mui/icons-material';
import {
  Alert,
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
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { Box, Stack } from '@mui/system';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useState } from 'react';
import * as Yup from 'yup';
import { uploadImage } from '../../services/api/file';
import { handleRedirectOnClick } from '../../utils/handle-event-button';
import { formatRupiahCurrency } from '../../utils/currency-converter';
import { createNewRegistrationPayment } from '../../services/api/registration-payment';
import { registerCourse } from '../../services/api/course';

export const PaymentCourse = ({ course, user }) => {
  const router = useRouter();

  const [info, setInfo] = useState(undefined);
  const [errMessage, setErrMessage] = useState(undefined);

  const [receipt, setReceipt] = useState(null);

  const formik = useFormik({
    initialValues: {
      amount: course.price,
      discount: 0,
      descriptions: 'User Course Registration',
      transactionDate: new Date().toISOString(),
      status: 'PENDING',
      receiptUrl: '',
    },
    validationSchema: Yup.object({
      descriptions: Yup.string().required('Descriptions is required'),
      transactionDate: Yup.string().required(),
      status: Yup.string().required('Status is required'),
      receiptUrl: Yup.string().url().required('Receipt url is required'),
    }),
    onSubmit: (values, action) => {
      Object.assign(values, {
        paymentMethod: 'BANK_TRANSFER',
      });

      registerCourse(course.id)
        .then((res) => {
          // create payment after registration success
          Object.assign(values, {
            registrationId: res.data.id,
          });
          createNewRegistrationPayment(values);

          setInfo(res.message);
          setErrMessage(undefined);

          setTimeout(() => {
            router.push('/course/payment-success');
          }, 1000);
        })
        .catch((err) => {
          setErrMessage(err.response.data?.message);
          setInfo(undefined);
          action.setSubmitting(false);
        });
    },
  });

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

  if (course.error) {
    return (
      <Typography align="center" variant="h4" style={{ color: 'red' }}>
        error, {course.error.message}
      </Typography>
    );
  }

  if (user.error) {
    return (
      <Typography align="center" variant="h4" style={{ color: 'red' }}>
        error, {user.error.message}
      </Typography>
    );
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <Grid item lg={10} md={10} xs={12}>
          <Card
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <CardHeader subheader="Course Payment Information" title="Payment" />
            <Divider />

            <CardContent sx={{ minWidth: 275 }} align="center">
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Payment Details
              </Typography>
              <Typography variant="h5" component="div">
                Amount: {formatRupiahCurrency(course.price)}
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 1.5 }} color="text.primary">
                Discount: - {formatRupiahCurrency(0)}
              </Typography>
              <Typography variant="h5" component="div" sx={{ marginBottom: 2 }}>
                Total: {formatRupiahCurrency(course.price)}
              </Typography>
              <Divider />
              <Typography variant="body1" sx={{ marginTop: 2 }} maxWidth={600}>
                Please make payment for this course according to the total to be paid above. <br />
                For payment, you can use the bank transfer method. For the bank transfer method,
                please transfer to the following account according to the total above.
                <br />
                Please contact the course admin if you have any problems.
              </Typography>
            </CardContent>

            <Box
              sx={{ maxWidth: 400, border: 1, borderColor: 'primary.main', borderRadius: 4 }}
              alignSelf="center"
            >
              <CardContent sx={{ minWidth: 200 }} align="center">
                <Stack alignItems="center" direction="row" spacing={2}>
                  <CardMedia
                    component="img"
                    sx={{ width: 100 }}
                    image="https://www.freepnglogos.com/uploads/logo-bca-png/bank-central-asia-logo-bank-central-asia-bca-format-cdr-png-gudril-1.png"
                    alt="Live from space album cover"
                  />

                  <Typography component="div" variant="h6">
                    9876543210
                    <Typography variant="subtitle2" color="text.secondary" component="div">
                      Admin Halal Center
                    </Typography>
                  </Typography>
                </Stack>
              </CardContent>
            </Box>

            <CardContent>
              <Grid container sx={{ p: 2 }}>
                <FormControl sx={{ marginTop: 1, marginBottom: 2 }} fullWidth variant="outlined">
                  <Card>
                    <CardActions>
                      <Button
                        color="primary"
                        fullWidth
                        variant="outlined"
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
                          src={receipt ? receipt : ''}
                          sx={{
                            width: 600,
                          }}
                          alt="Image with size 2 : 1 ratio"
                        />
                      </Box>
                    </CardContent>
                  </Card>

                  {Boolean(formik.touched.receiptUrl && formik.errors.receiptUrl) &&
                    formik.values.receiptUrl.length <= 0 && (
                      <Alert sx={{ marginY: 2 }} severity="error">
                        {formik.errors.receiptUrl}
                      </Alert>
                    )}

                  {info && (
                    <Alert sx={{ marginY: 2 }} severity="success">
                      {info}
                    </Alert>
                  )}

                  {errMessage && (
                    <Alert sx={{ marginY: 2 }} severity="error">
                      {errMessage}
                    </Alert>
                  )}
                </FormControl>
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
                  handleRedirectOnClick(router, '/course');
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
        </Grid>
      </Grid>
    </form>
  );
};
