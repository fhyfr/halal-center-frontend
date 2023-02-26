import React, { useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import Router, { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Grid, Link, TextField, Typography, Alert } from '@mui/material';
import DrawerAppBar from '../../components/navbar';
import Footer from '../../components/footer';
import axios from 'axios';
import Image from 'next/image';
import logo from '../../assets/images/logo_p3jph.jpg';

const { NEXT_PUBLIC_API } = process.env;

const onLogin = async (valueLogin, setErrorMessage) => {
  try {
    const res = await axios({
      method: 'post',
      url: `${NEXT_PUBLIC_API}/auth/login`,
      data: valueLogin,
    });

    return res.data;
  } catch (error) {
    setErrorMessage(error.response.data.message);
    throw error;
  }
};

const Login = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(undefined);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      password: Yup.string().max(255).required('Password is required'),
    }),
    onSubmit: async (values, actions) => {
      const token = await onLogin(values, setErrorMessage);
      // TODO: handle authentications

      router.push('/');
    },
  });

  return (
    <>
      <Head>
        <title>Login | Material Kit</title>
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
          <Grid container spacing={5} sx={{ marginTop: '60px' }}>
            <Grid item xs={6}>
              <Image width="500px" height="500px" layout="responsive" src={logo} />
            </Grid>
            <Grid item xs={6}>
              <form onSubmit={formik.handleSubmit}>
                <Box sx={{ my: 3 }}>
                  <Typography color="textPrimary" variant="h4">
                    Sign in
                  </Typography>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Sign in on the internal platform
                  </Typography>
                </Box>

                {errorMessage && (
                  <Alert hidden={formik.errors} severity="error">
                    {errorMessage}
                  </Alert>
                )}

                <TextField
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={formik.isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign In Now
                  </Button>
                </Box>
                <Typography color="textSecondary" variant="body2">
                  Don&apos;t have an account?{' '}
                  <NextLink href="/member/register">
                    <Link
                      to="/member/register"
                      variant="subtitle2"
                      underline="hover"
                      sx={{
                        cursor: 'pointer',
                      }}
                    >
                      Sign Up
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

export default Login;
