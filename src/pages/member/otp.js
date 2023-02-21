import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Container,
} from '@mui/material';
import DrawerAppBar from '../../components/navbar';
import Footer from '../../components/footer';
import Head from 'next/head';
import axios from 'axios';

const otp = () => {
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
          textAlign: 'center',
        }}
      >
        <Container maxWidth="sm">
          <Box sx={{ bgcolor: '#fff', padding: '50px', borderRadius: '30px' }}>
            <Box sx={{ marginBottom: '20px' }}>
              <h1>OTP Verification</h1>
              <span>Enter the OTP you received at</span>
              <b>+62******0</b>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <Box sx={{ bgcolor: '#cfe8fc', height: '50px' }} />
                </Grid>
                <Grid item xs={2}>
                  <Box sx={{ bgcolor: '#cfe8fc', height: '50px' }} />
                </Grid>
                <Grid item xs={2}>
                  <Box sx={{ bgcolor: '#cfe8fc', height: '50px' }} />
                </Grid>
                <Grid item xs={2}>
                  <Box sx={{ bgcolor: '#cfe8fc', height: '50px' }} />
                </Grid>
                <Grid item xs={2}>
                  <Box sx={{ bgcolor: '#cfe8fc', height: '50px' }} />
                </Grid>
                <Grid item xs={2}>
                  <Box sx={{ bgcolor: '#cfe8fc', height: '50px' }} />
                </Grid>
              </Grid>
              <Box sx={{ marginTop: '20px' }}>
                <b>Resend OTP</b>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      <Footer />
    </>
  );
};

export default otp;
