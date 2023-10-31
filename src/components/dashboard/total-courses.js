import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import { School } from '@mui/icons-material';
import { formatDateWithoutHourMinutes } from '../../utils/date-converter';

export const TotalCourses = ({ dashboardReport }) => {
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
              TOTAL COURSES
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {dashboardReport.data.totalCourses} Courses
            </Typography>
            <Typography color="textSecondary" gutterBottom variant="overline">
              Date: {formatDateWithoutHourMinutes(new Date())}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: 'error.main',
                height: 56,
                width: 56,
              }}
            >
              <School />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
