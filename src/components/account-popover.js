import { useContext } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import useAuth from '../hooks/use-auth';
import { ENABLE_AUTH } from '../lib/auth';

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open, ...other } = props;
  const { logout } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    onClose?.();

    console.log('CLICK');

    // Check if authentication is enabled
    // If not enabled, then redirect is not required
    if (!ENABLE_AUTH) {
      return;
    }

    try {
      logout();

      // Redirect to login page
      router.push('/auth/login').catch(console.error);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom',
      }}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: { width: '300px' },
      }}
      {...other}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
        }}
      >
        <Typography variant="overline">Account</Typography>
        <Typography color="text.secondary" variant="body2">
          John Doe
        </Typography>
      </Box>
      <MenuList
        disablePadding
        sx={{
          '& > *': {
            '&:first-of-type': {
              borderTopColor: 'divider',
              borderTopStyle: 'solid',
              borderTopWidth: '1px',
            },
            padding: '12px 16px',
          },
        }}
      >
        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
};
