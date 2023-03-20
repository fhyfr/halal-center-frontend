import React, { useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { setIn, useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  Typography,
  Alert,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from '@mui/material';
import DrawerAppBar from '../../components/navbar';
import Footer from '../../components/footer';
import Image from 'next/image';
import logo from '../../assets/images/logo_p3jph.png';
import { forgotPassword } from '../../services/api/member';

const ForgotPassword = () => {
  const router = useRouter();
  const [info, setInfo] = useState(undefined);
  const [errMessage, setErrMessage] = useState(undefined);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
    }),
    onSubmit: async (values) => {
      forgotPassword(values.email)
        .then((res) => {
          setInfo(res);
          setErrMessage(undefined);

          setTimeout(() => {
            router.push({
              pathname: '/auth/otp',
              query: { email: values.email },
            });
          }, 2000);
        })
        .catch((err) => {
          setErrMessage(err.response.data?.message);
          setInfo(undefined);
        });
    },
  });

  return (
    <>
      <Head>
        <title>Forgot Password | Halal Center</title>
      </Head>
      <DrawerAppBar />
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%',
        }}
      >
        <Container>
          <Grid container spacing={5}>
            <Grid item xs={6}>
              <Image width="500px" height="500px" layout="responsive" src={logo} priority="true" />
            </Grid>
            <Grid item xs={6} sx={{ marginTop: 20 }}>
              <form onSubmit={formik.handleSubmit}>
                <Box sx={{ my: 3 }}>
                  <Typography color="textPrimary" variant="h4">
                    Forgot Password
                  </Typography>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Enter your email to receive verification code for reset your password
                  </Typography>
                </Box>

                {info && (
                  <Alert sx={{ marginY: 1 }} severity="success">
                    {info}
                  </Alert>
                )}

                {errMessage && (
                  <Alert sx={{ marginY: 1 }} severity="error">
                    {errMessage}
                  </Alert>
                )}

                <FormControl sx={{ marginY: 2 }} fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-email"
                    label="Email"
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="email"
                    value={formik.values.email}
                  />
                  {Boolean(formik.touched.email && formik.errors.email) && (
                    <FormHelperText error>{formik.errors.email}</FormHelperText>
                  )}
                </FormControl>

                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={formik.isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Send Verification Code
                  </Button>
                </Box>

                <Typography color="textSecondary" variant="body2">
                  <NextLink href="/auth/login">
                    <Link
                      to="/auth/login"
                      variant="subtitle2"
                      underline="hover"
                      sx={{
                        cursor: 'pointer',
                      }}
                    >
                      Remember Your Password?
                    </Link>
                  </NextLink>
                </Typography>
              </form>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default ForgotPassword;
