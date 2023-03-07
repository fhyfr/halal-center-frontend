import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from '@mui/material';
import useAuth from '../../hooks/use-auth';

export const AccountProfile = (props) => {
  const { user } = useAuth();

  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Avatar
            src={
              user && user.profilePicture !== null
                ? user.profilePicture
                : '/static/images/avatars/avatar_1.png'
            }
            sx={{
              height: 64,
              mb: 2,
              width: 64,
            }}
          />
          <Typography color="textPrimary" gutterBottom variant="h5">
            {user ? user.fullName : ''}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {user ? user.address : ''}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            GMT+7
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color="primary" fullWidth variant="text">
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
};
