import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import { Users as UsersIcon } from '../../icons/users';
import { formatDateWithoutHourMinutes } from '../../utils/date-converter';

export const TotalMembers = ({ dashboardReport }) => {
  if (dashboardReport.error) {
    return (
      <Typography align="center" variant="h4" style={{ color: 'red' }}>
        error, {dashboardReport.error.message}
      </Typography>
    );
  }

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              TOTAL MEMBERS
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {dashboardReport.data.totalMembers} Members
            </Typography>
            <Typography color="textSecondary" gutterBottom variant="overline">
              Date: {formatDateWithoutHourMinutes(new Date())}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: 'success.main',
                height: 56,
                width: 56,
              }}
            >
              <UsersIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
