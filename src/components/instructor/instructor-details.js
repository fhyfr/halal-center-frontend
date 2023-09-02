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
import { formatDate, formatDateWithoutHourMinutes } from '../../utils/date-converter';

export const InstructorDetails = ({ instructor, courses }) => {
  if (instructor.error) {
    return (
      <Typography align="center" variant="h4" style={{ color: 'red' }}>
        error, {instructor.error.message}
      </Typography>
    );
  }

  if (courses.error) {
    return (
      <Typography align="center" variant="h4" style={{ color: 'red' }}>
        error, {courses.error.message}
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
              <Avatar sx={{ width: 80, height: 80 }} src={instructor.profilePicture}></Avatar>
              <Box>
                <Typography variant="h5">{instructor.username}</Typography>
                <Typography variant="subtitle1">Instructor ID: {instructor.id}</Typography>
              </Box>
            </Stack>
          </CardContent>

          <CardContent sx={{ marginY: -2 }}>
            <Typography variant="h6">Full Name</Typography>
            <Typography variant="body1" gutterBottom>
              {instructor.fullName ? instructor.fullName : 'empty'}
            </Typography>
          </CardContent>
          <Divider />
          <CardContent sx={{ marginY: -2 }}>
            <Typography variant="h6">Email</Typography>
            <Typography variant="body1" gutterBottom>
              {instructor.email}
            </Typography>
          </CardContent>
          <Divider />
          <CardContent sx={{ marginY: -2 }}>
            <Typography variant="h6">Phone Number</Typography>
            <Typography variant="body1" gutterBottom>
              {instructor.phoneNumber ? instructor.phoneNumber : 'empty'}
            </Typography>
          </CardContent>
          <Divider />
          <CardContent sx={{ marginY: -2 }}>
            <Typography variant="h6" gutterBottom>
              Address
            </Typography>
            <Typography variant="body1" gutterBottom>
              {instructor.address ? instructor.address : 'empty'}
            </Typography>
          </CardContent>
          <Divider />
          <CardContent sx={{ marginY: -2 }}>
            <Typography variant="h6">Facebook</Typography>
            <Typography variant="body1" gutterBottom>
              {instructor.facebook ? (
                <Link target="_blank" to={instructor.facebook}>
                  {instructor.facebook}
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
              {instructor.linkedin ? (
                <Link target="_blank" to={instructor.linkedin}>
                  {instructor.linkedin}
                </Link>
              ) : (
                'empty'
              )}
            </Typography>
          </CardContent>
          <Divider />
          <CardContent sx={{ marginY: -2 }}>
            <Typography variant="h6">Last Updated</Typography>
            <Typography variant="body1" gutterBottom>
              {formatDate(instructor.updatedAt)}
            </Typography>
          </CardContent>
          <Divider />
        </Card>
      </Grid>

      <Grid item lg={6} md={6} xs={12}>
        <Card>
          <CardHeader subheader="List courses of instructor" title="Courses" />
          <Divider />
          <CardContent>
            {courses.length > 0
              ? courses.map((course) => (
                  <>
                    <Stack sx={{ marginBottom: 2 }}>
                      <Typography variant="h6">Course ID: {course.id}</Typography>
                      <Typography variant="body1" gutterBottom>
                        Title: {`${course.title} - Batch ${course.batchNumber}`}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        Date: {formatDateWithoutHourMinutes(course.startDate)} s/d{' '}
                        {formatDateWithoutHourMinutes(course.endDate)}
                      </Typography>
                    </Stack>
                  </>
                ))
              : ''}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
