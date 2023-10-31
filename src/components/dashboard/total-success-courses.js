import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import { Check } from '@mui/icons-material';
import { formatDateWithoutHourMinutes } from '../../utils/date-converter';

export const TotalSuccessCourse = ({ dashboardReport }) => {
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
              TOTAL SUCCESS COURSES
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {dashboardReport.data.totalSuccessCourses} Courses
            </Typography>
            <Typography color="textSecondary" gutterBottom variant="overline">
              Date: {formatDateWithoutHourMinutes(new Date())}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: 'primary.main',
                height: 56,
                width: 56,
              }}
            >
              <Check />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
