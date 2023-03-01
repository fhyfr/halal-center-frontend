import Head from 'next/head';
import NextLink from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Link, TextField, Typography, Grid, Alert } from '@mui/material';
import DrawerAppBar from '../../components/navbar';
import Footer from '../../components/footer';
import { useRouter } from 'next/router';
import logo from '../../assets/images/logo_p3jph.jpg';
import Image from 'next/image';
import useAuth from '../../hooks/use-auth';
import { useState } from 'react';

const Register = () => {
  const router = useRouter();
  const { register } = useAuth();
  const [info, setInfo] = useState(undefined);
  const [errMessage, setErrMessage] = useState(undefined);

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      fullName: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().max(255).required('Username is required'),
      email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      password: Yup.string().max(255).required('Password is required'),
      fullName: Yup.string().max(255).required('Full Name is required'),
    }),
    onSubmit: async (values) => {
      register(values.username, values.email, values.password, values.fullName)
        .then((res) => {
          setInfo(res);
          setErrMessage(undefined);
          setTimeout(() => {
            router.push('/auth/login');
          }, 3000);
        })
        .catch((err) => {
          setErrMessage(err.message);
        });
    },
  });

  return (
    <>
      <Head>
        <title>Register | Halal Center</title>
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
          <Grid container spacing={5} sx={{ marginTop: '60px', marginBottom: '60px' }}>
            <Grid item xs={6}>
              <Image width="500px" height="500px" layout="responsive" src={logo} priority="true" />
            </Grid>
            <Grid item xs={6}>
              <Box
                component="main"
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  flexGrow: 1,
                  minHeight: '100%',
                }}
              >
                <Container maxWidth="sm">
                  <form onSubmit={formik.handleSubmit}>
                    <Box sx={{ my: 3 }}>
                      <Typography color="textPrimary" variant="h4">
                        Create a new account
                      </Typography>
                      <Typography color="textSecondary" gutterBottom variant="body2">
                        Use your email to create a new account
                      </Typography>
                    </Box>

                    {info && <Alert severity="success">{info}</Alert>}

                    {errMessage && <Alert severity="error">{errMessage}</Alert>}

                    <TextField
                      error={Boolean(formik.touched.fullName && formik.errors.fullName)}
                      fullWidth
                      helperText={formik.touched.fullName && formik.errors.fullName}
                      label="Full Name"
                      margin="normal"
                      name="fullName"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.fullName}
                      variant="outlined"
                    />
                    <TextField
                      error={Boolean(formik.touched.username && formik.errors.username)}
                      fullWidth
                      helperText={formik.touched.username && formik.errors.username}
                      label="Username"
                      margin="normal"
                      name="username"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      variant="outlined"
                    />
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
                        Sign Up Now
                      </Button>
                    </Box>
                    <Typography color="textSecondary" variant="body2">
                      Have an account?{' '}
                      <NextLink href="/auth/login" passHref>
                        <Link variant="subtitle2" underline="hover">
                          Sign In
                        </Link>
                      </NextLink>
                    </Typography>
                  </form>
                </Container>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default Register;
