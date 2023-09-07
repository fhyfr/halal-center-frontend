import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { formatDateWithoutHourMinutes } from '../../utils/date-converter';
import {
  Category,
  Download,
  Event,
  LocalOffer,
  PeopleAlt,
  SignalCellularAlt,
} from '@mui/icons-material';
import { formatRupiahCurrency } from '../../utils/currency-converter';

export const CourseDetails = ({
  course,
  instructors,
  user,
  modules,
  certificates,
  registrationPayments,
}) => {
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

  if (modules.error) {
    return (
      <Typography align="center" variant="h4" style={{ color: 'red' }}>
        error, {modules.error.message}
      </Typography>
    );
  }

  if (certificates.error) {
    return (
      <Typography align="center" variant="h4" style={{ color: 'red' }}>
        error, {certificates.error.message}
      </Typography>
    );
  }

  if (registrationPayments.error) {
    return (
      <Typography align="center" variant="h4" style={{ color: 'red' }}>
        error, {registrationPayments.error.message}
      </Typography>
    );
  }

  const quota = course.quota - course.totalRegistered;
  const currentDate = formatDateWithoutHourMinutes(new Date());
  const isCoursePaid =
    registrationPayments.itemCount > 0
      ? course.type === 'PAID' && registrationPayments.data[0].status === 'SUCCESS'
      : false;

  const isCoursesEnded = currentDate > formatDateWithoutHourMinutes(course.endDate);

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

          <Box sx={{ p: 2 }}>
            <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
              <Grid
                item
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                }}
              >
                <Category color="action" />
                <Typography color="textSecondary" display="inline" sx={{ pl: 1 }} variant="body2">
                  Category {course.category ? course.category.categoryName : ''}
                </Typography>
              </Grid>

              <Grid
                item
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                }}
              >
                <SignalCellularAlt color="action" />
                <Typography color="textSecondary" display="inline" sx={{ pl: 1 }} variant="body2">
                  Level {course.level}
                </Typography>
              </Grid>
            </Grid>
          </Box>
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
            <Typography align="left" color="textPrimary" gutterBottom variant="h5">
              {`${course.title} - Batch ${course.batchNumber}`}
            </Typography>
            <Typography align="left" color="textPrimary" gutterBottom variant="h6">
              {course.subTitle}
            </Typography>
            <Typography align="left" color="textPrimary" variant="body1">
              {course.descriptions}
            </Typography>
          </CardContent>
          <Divider />

          <Box sx={{ p: 2 }}>
            <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
              <Grid
                item
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                }}
              >
                <Event color="action" />
                <Typography color="textSecondary" display="inline" sx={{ pl: 1 }} variant="body2">
                  {formatDateWithoutHourMinutes(course.startDate)} s/d{' '}
                  {formatDateWithoutHourMinutes(course.endDate)}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Divider />

          <Box sx={{ p: 2 }}>
            <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
              <Grid
                item
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                }}
              >
                <PeopleAlt color="action" />
                <Typography color="textSecondary" display="inline" sx={{ pl: 1 }} variant="body2">
                  Kuota {quota === 0 ? 'penuh' : quota} / {course.quota}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Divider />

          <Box sx={{ p: 2 }}>
            <Grid
              item
              sx={{
                alignItems: 'center',
                display: 'flex',
              }}
            >
              <LocalOffer color="action" />
              <Typography color="textSecondary" display="inline" sx={{ pl: 1 }} variant="body2">
                {course.type} {formatRupiahCurrency(course.price)}
              </Typography>
            </Grid>
          </Box>
        </Card>
      </Grid>

      <Grid item lg={6} md={6} xs={12}>
        <Card sx={{ p: 2 }}>
          <CardHeader subheader="List instructors of course" title="Instructors" />
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
        <Card>
          <CardHeader subheader="Modules of the Course" title="Modules" />
          <Divider />

          <Table>
            <TableHead>
              <TableCell align="center">Module ID</TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  Action
                </Box>
              </TableCell>
            </TableHead>
            <TableBody>
              {(modules.data?.length > 0 && course.type === 'FREE') ||
              (course.type === 'PAID' && isCoursePaid) ? (
                modules.data?.map((module) => {
                  return (
                    <TableRow key={module.id}>
                      <TableCell align="center">
                        <Typography>{module.id}</Typography>
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                          }}
                        >
                          <Button
                            color="secondary"
                            size="small"
                            sx={{
                              mr: 2,
                            }}
                            variant="contained"
                            startIcon={<Download />}
                            href={module.url}
                            target="_blank"
                          >
                            Download
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <>
                  <CardContent>
                    <Box>
                      {!isCoursePaid &&
                      course.type === 'PAID' &&
                      user?.role?.roleName === 'MEMBER' ? (
                        <Typography variant="subtitle2">
                          You can download the modules if your payments is success (admin would
                          check your payment)
                        </Typography>
                      ) : (
                        <Typography variant="subtitle1">Empty</Typography>
                      )}
                    </Box>
                  </CardContent>
                </>
              )}
            </TableBody>
          </Table>
        </Card>
      </Grid>
      <Grid item lg={6} md={6} xs={12}>
        <Card>
          <CardHeader subheader="Certificate of Completion" title="Certificate" />
          <Divider />

          <Table>
            <TableHead>
              <TableCell align="center">Certificate ID</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell align="center">Username</TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  Action
                </Box>
              </TableCell>
            </TableHead>
            <TableBody>
              {certificates.data?.length > 0 && course.isRegistered && isCoursesEnded ? (
                certificates.data?.map((certificate) => {
                  return (
                    <TableRow key={certificate.id}>
                      <TableCell align="center">
                        <Typography>{certificate.id}</Typography>
                      </TableCell>
                      <TableCell align="center">{certificate.type}</TableCell>
                      <TableCell align="center">{user.username}</TableCell>
                      <TableCell align="center">
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                          }}
                        >
                          <Button
                            color="secondary"
                            size="small"
                            sx={{
                              mr: 2,
                            }}
                            variant="contained"
                            startIcon={<Download />}
                            href={certificate.url}
                            target="_blank"
                          >
                            Download
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <>
                  <CardContent>
                    <Box>
                      {!isCoursesEnded ? (
                        <Typography variant="subtitle1">Empty</Typography>
                      ) : (
                        <Typography variant="subtitle2">
                          You can download your certificate for this course after the course is
                          ended and you have fulfilled the requirements
                        </Typography>
                      )}
                    </Box>
                  </CardContent>
                </>
              )}
            </TableBody>
          </Table>
        </Card>
      </Grid>
    </Grid>
  );
};
