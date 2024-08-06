import React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

const SlashScreenRoot = styled('div')({
  alignItems: 'center',
  backgroundColor: (theme) => theme.palette.background.default,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  justifyContent: 'center',
  left: 0,
  padding: (theme) => theme.spacing(3),
  position: 'fixed',
  top: 0,
  width: '100%',
  zIndex: 2000,
});

const SlashScreen = () => {
  return (
    <SlashScreenRoot>
      <Box width={400}>
        <LinearProgress />
      </Box>
    </SlashScreenRoot>
  );
};

export default SlashScreen;
