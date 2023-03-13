import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { formatDate } from '../../utils/date-converter';

export const MemberDetails = ({ user }) => {
  if (user.error) {
    return (
      <Typography align="center" variant="h4" style={{ color: 'red' }}>
        error, {user.error.message}
      </Typography>
    );
  }

  return (
    <Grid container spacing={3}>
      <Grid item lg={6} md={6} xs={12}>
        <Card>
          <CardHeader subheader="The information cannot be edited" title="Profile" />
          <Divider />

          <CardContent sx={{ marginBottom: -3 }}>
            <Stack alignItems="center" direction="row" spacing={2}>
              <Avatar sx={{ width: 80, height: 80 }} src={user.profilePicture}></Avatar>
              <Box>
                <Typography variant="h5">{user.username}</Typography>
                <Typography variant="subtitle1">User ID: {user.id}</Typography>
              </Box>
            </Stack>
          </CardContent>

          <CardContent sx={{ marginY: -2 }}>
            <Typography variant="h6">Full Name</Typography>
            <Typography variant="body1" gutterBottom>
              {user.fullName ? user.fullName : 'empty'}
            </Typography>
          </CardContent>
          <Divider />
          <CardContent sx={{ marginY: -2 }}>
            <Typography variant="h6">Email</Typography>
            <Typography variant="body1" gutterBottom>
              {user.email}
            </Typography>
          </CardContent>
          <Divider />
          <CardContent sx={{ marginY: -2 }}>
            <Typography variant="h6">Phone Number</Typography>
            <Typography variant="body1" gutterBottom>
              {user.phoneNumber ? user.phoneNumber : 'empty'}
            </Typography>
          </CardContent>
          <Divider />
          <CardContent sx={{ marginY: -2 }}>
            <Typography variant="h6" gutterBottom>
              Address
            </Typography>
            <Typography variant="body1" gutterBottom>
              {user.address ? user.address : 'empty'}
            </Typography>
          </CardContent>
          <Divider />
          <CardContent sx={{ marginY: -2 }}>
            <Typography variant="h6">Facebook</Typography>
            <Typography variant="body1" gutterBottom>
              {user.facebook ? (
                <Link target="_blank" to={user.facebook}>
                  {user.facebook}
                </Link>
              ) : (
                'empty'
              )}
            </Typography>
          </CardContent>
          <Divider />
          <CardContent sx={{ marginY: -2 }}>
            <Typography variant="h6">LinkedIn</Typography>
            <Typography variant="body1" gutterBottom>
              {user.linkedin ? (
                <Link target="_blank" to={user.linkedin}>
                  {user.linkedin}
                </Link>
              ) : (
                'empty'
              )}
            </Typography>
          </CardContent>
          <Divider />
          <CardContent sx={{ marginY: -2 }}>
            <Typography variant="h6">Registered At</Typography>
            <Typography variant="body1" gutterBottom>
              {formatDate(user.createdAt)}
            </Typography>
          </CardContent>
          <Divider />
          <CardContent sx={{ marginY: -2 }}>
            <Typography variant="h6">Last Updated</Typography>
            <Typography variant="body1" gutterBottom>
              {formatDate(user.updatedAt)}
            </Typography>
          </CardContent>
          <Divider />
        </Card>
      </Grid>

      {/* 
        TODO: add logic for retrieve user courses on below
      */}

      <Grid item lg={6} md={6} xs={12}>
        <Card>
          <CardHeader subheader="List of courses that user has been registered" title="Courses" />
          <Divider />
          <CardContent></CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
