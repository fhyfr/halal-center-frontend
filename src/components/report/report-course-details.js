import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { formatDate, formatDateWithoutHourMinutes } from '../../utils/date-converter';
import { formatRupiahCurrency } from '../../utils/currency-converter';

export const ReportCourseDetails = ({ course, instructors, participants }) => {
  // errors handler

  if (course.error) {
    return (
      <Typography align="center" variant="h4" style={{ color: 'red' }}>
        error, {course.error.message}
      </Typography>
    );
  }

  if (instructors.error) {
    return (
      <Typography align="center" variant="h4" style={{ color: 'red' }}>
        error, {instructors.error.message}
      </Typography>
    );
  }

  if (participants.error) {
    return (
      <Typography align="center" variant="h4" style={{ color: 'red' }}>
        error, {participants.error.message}
      </Typography>
    );
  }

  return (
    <Grid container spacing={3}>
      <Grid item lg={6} md={6} xs={12}>
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <CardHeader subheader="Course Details Information" title="Course" />
          <Divider />

          <CardContent>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                pb: 2,
              }}
            >
              <CardMedia
                component="img"
                height="auto"
                image={course.banner}
                alt={`${course.title} - Batch ${course.batchNumber}`}
              />
            </Box>
            <CardContent sx={{ marginY: -3 }}>
              <Typography variant="h6">Title</Typography>
              <Typography variant="body1" gutterBottom>
                {`${course.title} - Batch ${course.batchNumber}`}
              </Typography>
            </CardContent>
            <Divider />

            <CardContent sx={{ marginY: -3 }}>
              <Typography variant="h6">Sub Title</Typography>
              <Typography variant="body1" gutterBottom>
                {course.subTitle}
              </Typography>
            </CardContent>
            <Divider />

            <CardContent sx={{ marginY: -3 }}>
              <Typography variant="h6">Category</Typography>
              <Typography variant="body1" gutterBottom>
                {course.category.categoryName}
              </Typography>
            </CardContent>
            <Divider />

            <CardContent sx={{ marginY: -3 }}>
              <Typography variant="h6">Descriptions</Typography>
              <Typography variant="body1" gutterBottom>
                {course.descriptions}
              </Typography>
            </CardContent>
            <Divider />

            <CardContent sx={{ marginY: -3 }}>
              <Typography variant="h6">Type & Price</Typography>
              <Typography variant="body1" gutterBottom>
                {course.type} - {formatRupiahCurrency(course.price)}
              </Typography>
            </CardContent>
            <Divider />

            <CardContent sx={{ marginY: -3 }}>
              <Typography variant="h6">Level</Typography>
              <Typography variant="body1" gutterBottom>
                {course.level}
              </Typography>
            </CardContent>
            <Divider />

            <CardContent sx={{ marginY: -3 }}>
              <Typography variant="h6">Quota</Typography>
              <Typography variant="body1" gutterBottom>
                {course.quota} participants
              </Typography>
            </CardContent>
            <Divider />

            <CardContent sx={{ marginY: -3 }}>
              <Typography variant="h6">Date</Typography>
              <Typography variant="body1" gutterBottom>
                {formatDateWithoutHourMinutes(course.startDate)} s/d {''}
                {formatDateWithoutHourMinutes(course.endDate)}
              </Typography>
            </CardContent>
            <Divider />

            <CardContent sx={{ marginY: -3 }}>
              <Typography variant="h6">Created Date</Typography>
              <Typography variant="body1" gutterBottom>
                {formatDate(course.createdAt)}
              </Typography>
            </CardContent>
            <Divider />

            <CardContent sx={{ marginY: -3 }}>
              <Typography variant="h6">Last Updated Date</Typography>
              <Typography variant="body1" gutterBottom>
                {formatDate(course.updatedAt)}
              </Typography>
            </CardContent>
            <Divider />

            <CardContent sx={{ marginY: -3 }}>
              <Typography variant="h6">Total Participants</Typography>
              <Typography variant="body1" gutterBottom>
                {course.totalParticipants} participants
              </Typography>
            </CardContent>
            <Divider />

            <CardContent sx={{ marginY: -3 }}>
              <Typography variant="h6">Total Instructors</Typography>
              <Typography variant="body1" gutterBottom>
                {course.totalInstructors} participants
              </Typography>
            </CardContent>
            <Divider />
          </CardContent>
          <Divider />
        </Card>
      </Grid>

      <Grid item lg={6} md={6} xs={12}>
        <Card sx={{ p: 2 }}>
          <CardHeader subheader="List instructors of the course" title="Instructors" />
          <Divider />

          {instructors.data?.length > 0 ? (
            instructors.data?.map((instructor) => (
              <>
                <CardContent sx={{ marginBottom: -3 }}>
                  <Stack alignItems="center" direction="row" spacing={2}>
                    <Avatar sx={{ width: 60, height: 60 }} src={instructor.profilePicture}></Avatar>
                    <Box>
                      <Typography variant="subtitle1">{instructor.fullName}</Typography>
                      <Typography variant="subtitle2">{instructor.email}</Typography>
                      <Typography variant="subtitle2">{instructor.phoneNumber}</Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </>
            ))
          ) : (
            <>
              <CardContent>
                <Box>
                  <Typography variant="subtitle1">Empty</Typography>
                </Box>
              </CardContent>
            </>
          )}
        </Card>
      </Grid>

      <Grid item lg={6} md={6} xs={12}>
        <Card sx={{ p: 2 }}>
          <CardHeader subheader="List participants of the course" title="Participants" />
          <Divider />

          {participants.data?.length > 0 ? (
            participants.data?.map((participant) => (
              <>
                <CardContent sx={{ marginBottom: -3 }}>
                  <Stack alignItems="center" direction="row" spacing={2}>
                    <Avatar
                      sx={{ width: 60, height: 60 }}
                      src={participant.profilePicture}
                    ></Avatar>
                    <Box>
                      <Typography variant="subtitle1">{participant.fullName}</Typography>
                      <Typography variant="subtitle2">{participant.email}</Typography>
                      <Typography variant="subtitle2">{participant.phoneNumber}</Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </>
            ))
          ) : (
            <>
              <CardContent>
                <Box>
                  <Typography variant="subtitle1">Empty</Typography>
                </Box>
              </CardContent>
            </>
          )}
        </Card>
      </Grid>
    </Grid>
  );
};
