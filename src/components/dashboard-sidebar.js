import { useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Divider, Drawer, useMediaQuery } from '@mui/material';
import { ChartBar as ChartBarIcon } from '../icons/chart-bar';
import { Cog as CogIcon } from '../icons/cog';
import { Users as UsersIcon } from '../icons/users';
import { NavItem } from './nav-item';
import {
  AccountCircle,
  Bookmarks,
  CardMembership,
  Category,
  FolderCopy,
  LibraryBooks,
  People,
  School,
  Sell,
  ShoppingCartCheckout,
  PlaylistAddCheck,
  FormatListNumbered,
} from '@mui/icons-material';
import useAuth from '../hooks/use-auth';
import Image from 'next/image';
import logo from '../assets/images/logo_sdm_halal.jpeg';

const permissions = {
  TREASURER: ['Dashboard', 'Registration Payments', 'Operational Payments'],
  DIRECTOR: ['Dashboard', 'Registration Payments', 'Operational Payments', 'Courses', 'Report'],
  SUPER_ADMIN: [
    'Dashboard',
    'Users',
    'Courses',
    'Attendances',
    'Tests',
    'Modules',
    'Certificates',
    'Instructors',
    'Registration Payments',
    'Operational Payments',
    'Categories',
    'Account',
    'My Course',
    'Report',
    'Settings',
  ],
  ADMIN_COURSE: [
    'Dashboard',
    'Users',
    'Attendances',
    'Tests',
    'Categories',
    'Courses',
    'Instructors',
    'Modules',
    'Certificates',
  ],
  MEMBER: ['Dashboard', 'Courses', 'My Course', 'Account', 'Settings'],
  INSTRUCTOR: [
    'Dashboard',
    'Courses',
    'Modules',
    'Tests',
    'Attendances',
    'Certificates',
    'Account',
    'Settings',
  ],
};

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
    href: '/module',
    icon: <LibraryBooks fontSize="small" />,
    title: 'Modules',
  },
  {
    href: '/test',
    icon: <FormatListNumbered fontSize="small" />,
    title: 'Tests',
  },
  {
    href: '/attendance',
    icon: <PlaylistAddCheck fontSize="small" />,
    title: 'Attendances',
  },
  {
    href: '/certificate',
    icon: <CardMembership fontSize="small" />,
    title: 'Certificates',
  },
  {
    href: '/instructor',
    icon: <People fontSize="small" />,
    title: 'Instructors',
  },
  {
    href: '/registration-payment',
    icon: <Sell fontSize="small" />,
    title: 'Registration Payments',
  },
  {
    href: '/operational-payment',
    icon: <ShoppingCartCheckout fontSize="small" />,
    title: 'Operational Payments',
  },
  {
    href: '/category',
    icon: <Category fontSize="small" />,
    title: 'Categories',
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
    href: '/report',
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
  const { user } = useAuth();

  const userPermissions = permissions[user?.role?.roleName];

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
                <Image width="40px" height="40px" layout="fixed" src={logo} />
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
          {items.map((item) => {
            if (userPermissions && userPermissions.includes(item.title)) {
              return (
                <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} />
              );
            }
          })}
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
