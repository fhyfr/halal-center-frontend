import { useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Divider, Drawer, useMediaQuery } from '@mui/material';
import { ChartBar as ChartBarIcon } from '../icons/chart-bar';
import { Cog as CogIcon } from '../icons/cog';
import { Users as UsersIcon } from '../icons/users';
import { Logo } from './logo';
import { NavItem } from './nav-item';
import {
  AccountCircle,
  Apartment,
  Bookmarks,
  Category,
  FolderCopy,
  FolderOpen,
  Groups,
  Payment,
  People,
  PermContactCalendar,
  School,
} from '@mui/icons-material';

const items = [
  {
    href: '/',
    icon: <ChartBarIcon fontSize="small" />,
    title: 'Dashboard',
  },
  {
    href: '/user',
    icon: <UsersIcon fontSize="small" />,
    title: 'Users',
  },
  {
    href: '/course',
    icon: <School fontSize="small" />,
    title: 'Courses',
  },
  {
    href: '/document',
    icon: <FolderOpen fontSize="small" />,
    title: 'Documents',
  },
  {
    href: '/instructor',
    icon: <People fontSize="small" />,
    title: 'Instructors',
  },
  {
    href: '/payment',
    icon: <Payment fontSize="small" />,
    title: 'Payments',
  },
  {
    href: '/category',
    icon: <Category fontSize="small" />,
    title: 'Categories',
  },
  {
    href: '/department',
    icon: <Apartment fontSize="small" />,
    title: 'Departments',
  },
  {
    href: '/position',
    icon: <PermContactCalendar fontSize="small" />,
    title: 'Positions',
  },
  {
    href: '/employee',
    icon: <Groups fontSize="small" />,
    title: 'Employees',
  },
  {
    href: '/user/account',
    icon: <AccountCircle fontSize="small" />,
    title: 'Account',
  },
  {
    href: '/user/course',
    icon: <Bookmarks fontSize="small" />,
    title: 'My Course',
  },
  {
    href: '#',
    icon: <FolderCopy fontSize="small" />,
    title: 'Report',
  },
  {
    href: '/auth/settings',
    icon: <CogIcon fontSize="small" />,
    title: 'Settings',
  },
];

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false,
  });

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath],
  );

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <NextLink href="/" passHref>
              <a>
                <Logo
                  sx={{
                    height: 42,
                    width: 42,
                  }}
                />
              </a>
            </NextLink>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: '#2D3748',
            marginBottom: 3,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} />
          ))}
        </Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            color: '#FFFFFF',
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
