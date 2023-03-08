import Head from 'next/head';
import NextLink from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Container,
  Link,
  Typography,
  Grid,
  Alert,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
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
  const [showPassword, setShowPassword] = useState(true);

  const handleShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      fullName: '',
      username: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      fullName: Yup.string().max(255).required('Full name is required'),
      username: Yup.string().max(255).required('Username is required'),
      email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      password: Yup.string().max(255).required('Password is required'),
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
          setInfo(undefined);
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
                        Fill out the form to create a new account
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

                    <FormControl sx={{ marginY: 1 }} fullWidth variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-full-name">Full Name</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-full-name"
                        label="Full Name"
                        name="fullName"
                        type="text"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.fullName}
                      />
                      {Boolean(formik.touched.fullName && formik.errors.fullName) && (
                        <FormHelperText error>{formik.errors.fullName}</FormHelperText>
                      )}
                    </FormControl>

                    <FormControl sx={{ marginY: 1 }} fullWidth variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-username"
                        label="Username"
                        name="username"
                        type="text"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.username}
                      />
                      {Boolean(formik.touched.username && formik.errors.username) && (
                        <FormHelperText error>{formik.errors.username}</FormHelperText>
                      )}
                    </FormControl>

                    <FormControl sx={{ marginY: 1 }} fullWidth variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-email"
                        label="Email"
                        name="email"
                        type="email"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
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
