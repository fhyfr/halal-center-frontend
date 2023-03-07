import React, { useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  Typography,
  Alert,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import DrawerAppBar from '../../components/navbar';
import Footer from '../../components/footer';
import Image from 'next/image';
import logo from '../../assets/images/logo_p3jph.jpg';
import useAuth from '../../hooks/use-auth';

const Login = () => {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    router.back();
  }

  const [errMessage, setErrMessage] = useState(undefined);
  const [showPassword, setShowPassword] = useState(true);

  const handleShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      password: Yup.string().max(255).required('Password is required'),
    }),
    onSubmit: async (values) => {
      login(values.email, values.password)
        .then(() => {
          router.push('/');
        })
        .catch((err) => {
          setErrMessage(err.message);
        });
    },
  });

  return (
    <>
      <Head>
        <title>Login | Halal Center</title>
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
              <Image width="500px" height="500px" layout="responsive" src={logo} priority="true" />
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

                {errMessage && <Alert severity="error">{errMessage}</Alert>}

                <FormControl sx={{ marginY: 2 }} fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-email"
                    error={Boolean(formik.touched.email && formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
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

                <FormControl sx={{ marginY: 2 }} fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    error={Boolean(formik.touched.password && formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    label="Password"
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type={showPassword ? 'text' : 'password'}
                    value={formik.values.password}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {Boolean(formik.touched.password && formik.errors.password) && (
                    <FormHelperText error>{formik.errors.password}</FormHelperText>
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
                    Sign In Now
                  </Button>
                </Box>
                <Typography color="textSecondary" variant="body2">
                  Don&apos;t have an account?{' '}
                  <NextLink href="/auth/register">
                    <Link
                      to="/auth/register"
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
