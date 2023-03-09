import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormHelperText,
  Alert,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Typography,
} from '@mui/material';
import DrawerAppBar from '../../components/navbar';
import Footer from '../../components/footer';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { resetPassword } from '../../services/api/member';

const ResetPassword = () => {
  const router = useRouter();
  const query = router.query;

  if (!query.email) {
    router.push('/auth/login');
  }

  const [info, setInfo] = useState(undefined);
  const [errMessage, setErrMessage] = useState(undefined);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewPasswordConfirmation, setShowNewPasswordConfirmation] = useState(false);

  const handleCliekShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleCliekShowNewPasswordConfirmation = () =>
    setShowNewPasswordConfirmation((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      newPassword: '',
      newPasswordConfirmation: '',
    },
    validationSchema: Yup.object({
      newPassword: Yup.string().min(8).max(255).required('New password is required'),
      newPasswordConfirmation: Yup.string().oneOf(
        [Yup.ref('newPassword'), null],
        'New password must match',
      ),
    }),
    onSubmit: async (values) => {
      resetPassword(query.id, values.newPassword, values.newPasswordConfirmation)
        .then((res) => {
          setInfo(res);
          setErrMessage(undefined);

          setTimeout(() => {
            router.push('/auth/login');
          }, 2000);
        })
        .catch((err) => {
          setErrMessage(err.response.data.message);
          setInfo(undefined);
        });
    },
  });

  return (
    <>
      <Head>
        <title>Verify OTP | Halal Center</title>
      </Head>
      <DrawerAppBar />
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%',
          textAlign: 'center',
        }}
      >
        <Container maxWidth="sm">
          <Box sx={{ bgcolor: '#fff', padding: '40px', borderRadius: '30px' }}>
            <Box sx={{ marginY: 2 }}>
              <Typography color="textPrimary" variant="h4" sx={{ marginBottom: 1 }}>
                Reset Password
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Reset password for your email <strong>{query.email}</strong>
              </Typography>
              {info && (
                <Alert sx={{ marginY: 2 }} severity="success">
                  {info}
                </Alert>
              )}

              {errMessage && (
                <Alert sx={{ m: 2, marginY: 1 }} severity="error">
                  {errMessage}
                </Alert>
              )}
            </Box>
            <form onSubmit={formik.handleSubmit}>
              <FormControl sx={{ marginY: 2 }} fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-new-password">New password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-new-password"
                  label="New password"
                  name="newPassword"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type={showNewPassword ? 'text' : 'password'}
                  value={formik.values.newPassword}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleCliekShowNewPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {Boolean(formik.touched.newPassword && formik.errors.newPassword) && (
                  <FormHelperText error>{formik.errors.newPassword}</FormHelperText>
                )}
              </FormControl>

              <FormControl sx={{ marginY: 2 }} fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-new-password-confirmation">
                  Confirm new password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-new-password-confirmation"
                  label="Confirm new password"
                  name="newPasswordConfirmation"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type={showNewPasswordConfirmation ? 'text' : 'password'}
                  value={formik.values.newPasswordConfirmation}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleCliekShowNewPasswordConfirmation}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showNewPasswordConfirmation ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {Boolean(
                  formik.touched.newPasswordConfirmation && formik.errors.newPasswordConfirmation,
                ) && <FormHelperText error>{formik.errors.newPasswordConfirmation}</FormHelperText>}
              </FormControl>
              <Box sx={{ m: 2 }}>
                <Button color="primary" fullWidth size="large" type="submit" variant="contained">
                  Verify
                </Button>
              </Box>
            </form>
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default ResetPassword;
