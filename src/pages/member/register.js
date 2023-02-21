import Head from 'next/head';
import NextLink from 'next/link';
import Router from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  Grid,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DrawerAppBar from '../../components/navbar';
import Footer from '../../components/footer';
import axios from 'axios';
import { useRouter } from 'next/router';

const postDataToAPI = (valueRegister) => {
  axios
    .post('https://halal-hrd-service.onrender.com/api/v1/auth/register', valueRegister)
    .then(function (response) {
      // handle success
      console.log(response);
    });
};

const Register = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      fullName: '',
      // policy: false,
    },
    validationSchema: Yup.object({
      username: Yup.string().max(255).required('Username is required'),
      email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      password: Yup.string().max(255).required('Password is required'),
      fullName: Yup.string().max(255).required('Full Name is required'),
      // policy: Yup.boolean().oneOf([true], 'This field must be checked'),
    }),
    onSubmit: async (values) => {
      // console.log(values);
      await postDataToAPI(values);
      router.push('/member/login');
    },
  });

  return (
    <>
      <Head>
        <title>Register | Material Kit</title>
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
              <img width="500px" src="https://halalcenter.id/uploads/system/sign_up.png"></img>
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
                  {/* <NextLink href="/" passHref>
                    <Button component="a" startIcon={<ArrowBackIcon fontSize="small" />}>
                      Dashboard
                    </Button>
                  </NextLink> */}
                  <form onSubmit={formik.handleSubmit}>
                    <Box sx={{ my: 3 }}>
                      <Typography color="textPrimary" variant="h4">
                        Create a new account
                      </Typography>
                      <Typography color="textSecondary" gutterBottom variant="body2">
                        Use your email to create a new account
                      </Typography>
                    </Box>
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
                    {/* <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex',
                        ml: -1,
                      }}
                    >
                      <Checkbox
                        checked={formik.values.policy}
                        name="policy"
                        onChange={formik.handleChange}
                      />
                      <Typography color="textSecondary" variant="body2">
                        I have read the{' '}
                        <NextLink href="#" passHref>
                          <Link color="primary" underline="always" variant="subtitle2">
                            Terms and Conditions
                          </Link>
                        </NextLink>
                      </Typography>
                    </Box>
                    {Boolean(formik.touched.policy && formik.errors.policy) && (
                      <FormHelperText error>{formik.errors.policy}</FormHelperText>
                    )} */}
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
                      <NextLink href="/member/login" passHref>
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
