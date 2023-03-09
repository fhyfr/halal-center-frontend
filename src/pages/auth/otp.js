import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Container, Typography, FormHelperText, Alert } from '@mui/material';
import DrawerAppBar from '../../components/navbar';
import Footer from '../../components/footer';
import Head from 'next/head';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { resendOTP, verifyOTP } from '../../services/api/member';

const OTP = () => {
  const router = useRouter();
  const query = router.query;

  if (!query.email) {
    router.push('/auth/login');
  }

  const { control, handleSubmit } = useForm({
    defaultValues: {
      otp: '',
    },
  });

  const onSubmit = async (data) => {
    verifyOTP(query.email, data.otp)
      .then((res) => {
        setInfo(res.message);
        setErrMessage(undefined);

        setTimeout(() => {
          router.push({
            pathname: '/auth/reset-password',
            query: { email: query.email, id: res.data.id },
          });
        }, 2000);
      })
      .catch((err) => {
        setErrMessage(err.response.data?.message);
        setInfo(undefined);
      });
  };

  const handleResendOTP = async () => {
    setSeconds(60);
    setInfo(undefined);

    resendOTP(query.email)
      .then((res) => {
        setInfo(res);
        setErrMessage(undefined);
      })
      .catch((err) => {
        setErrMessage(err.response.data?.message);
        setInfo(undefined);
      });
  };

  const [info, setInfo] = useState(undefined);
  const [errMessage, setErrMessage] = useState(undefined);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

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
            <Box sx={{ marginBottom: 8, marginTop: 2 }}>
              <Typography color="textPrimary" variant="h4" sx={{ marginBottom: 1 }}>
                OTP Verification
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Enter OTP sent to your email <strong>{query.email}</strong>
              </Typography>
              {info && (
                <Alert sx={{ marginTop: 2, marginBottom: -5 }} severity="success">
                  {info}
                </Alert>
              )}
            </Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Controller
                  name="otp"
                  control={control}
                  rules={{ valueAsNumber: true, validate: (value) => value.length === 6 }}
                  render={({ field, fieldState }) => (
                    <Box>
                      <MuiOtpInput sx={{ gap: 1 }} {...field} length={6} />
                      {errMessage && <FormHelperText error>{errMessage}</FormHelperText>}

                      {fieldState.invalid ? (
                        <FormHelperText error>OTP invalid</FormHelperText>
                      ) : null}
                    </Box>
                  )}
                />
              </Grid>
              <Box sx={{ py: 2, mt: 4 }}>
                <Button color="primary" fullWidth size="large" type="submit" variant="contained">
                  Verify
                </Button>
              </Box>
            </form>
            <Box>
              <Typography color="textSecondary" gutterBottom variant="body2">
                {seconds > 0 ? (
                  <p>Time Remaining: {seconds < 10 ? `0${seconds}` : seconds}</p>
                ) : (
                  <p>Don&apos;t recieve the code?</p>
                )}
              </Typography>
              <Button disabled={seconds > 0} variant="text" onClick={handleResendOTP}>
                Resend OTP
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      <Footer />
    </>
  );
};

export default OTP;
