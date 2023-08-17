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

export const CourseDetails = ({ course, instructors, user, documents, certificates, payments }) => {
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

  if (documents.error) {
    return (
      <Typography align="center" variant="h4" style={{ color: 'red' }}>
        error, {documents.error.message}
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

  if (payments.error) {
    return (
      <Typography align="center" variant="h4" style={{ color: 'red' }}>
        error, {payments.error.message}
      </Typography>
    );
  }

  const quota = course.quota - course.totalRegistered;
  const currentDate = formatDateWithoutHourMinutes(new Date());
  const isCoursePaid =
    payments.itemCount > 0
      ? course.type === 'PAID' &&
        payments.data[0].type === 'REGISTRATION' &&
        payments.data[0].status === 'SUCCESS'
      : false;

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
              <CardMedia component="img" height="auto" image={course.banner} alt={course.title} />
            </Box>
            <Typography align="left" color="textPrimary" gutterBottom variant="h5">
              {course.title}
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
              <TableCell align="left">Module ID</TableCell>
              <TableCell align="left">Type</TableCell>
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
              {(documents.data?.length > 0 && course.type === 'FREE') ||
              (course.type === 'PAID' && isCoursePaid) ? (
                documents.data?.map((document) => {
                  if (document.type !== 'CERTIFICATE') {
                    return (
                      <TableRow key={document.id}>
                        <TableCell>
                          <Typography>{document.id}</Typography>
                        </TableCell>
                        <TableCell>{document.type}</TableCell>
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
                              href={document.url}
                              target="_blank"
                            >
                              Download
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                  }
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
              <TableCell align="left">Certificate ID</TableCell>
              <TableCell align="left">Type</TableCell>
              <TableCell align="left">Username</TableCell>
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
              {certificates.data?.length > 0 ? (
                certificates.data?.map((certificate) => {
                  if (
                    course.isRegistered &&
                    currentDate > formatDateWithoutHourMinutes(course.endDate)
                  ) {
                    return (
                      <TableRow key={certificate.id}>
                        <TableCell>
                          <Typography>{certificate.id}</Typography>
                        </TableCell>
                        <TableCell>{certificate.type}</TableCell>
                        <TableCell>{user.username}</TableCell>
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
                              href={certificate.url}
                              target="_blank"
                            >
                              Download
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                  }
                })
              ) : (
                <>
                  <CardContent>
                    <Box>
                      {currentDate < formatDateWithoutHourMinutes(course.endDate) ? (
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
