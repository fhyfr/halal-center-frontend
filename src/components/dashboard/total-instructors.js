import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import { formatDateWithoutHourMinutes } from '../../utils/date-converter';
import { People } from '@mui/icons-material';

export const TotalInstructors = ({ dashboardReport }) => {
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
              TOTAL INSTRUCTORS
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {dashboardReport.data.totalInstructors} Instructors
            </Typography>
            <Typography color="textSecondary" gutterBottom variant="overline">
              Date: {formatDateWithoutHourMinutes(new Date())}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: 'warning.main',
                height: 56,
                width: 56,
              }}
            >
              <People />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
