import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  CardMedia,
  Button,
  Tooltip,
} from '@mui/material';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import EventIcon from '@mui/icons-material/Event';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { useRouter } from 'next/router';
import { formatDateWithoutHourMinutes } from '../../utils/date-converter';
import { formatRupiahCurrency } from '../../utils/currency-converter';
import { Category, InfoOutlined, LoginOutlined } from '@mui/icons-material';
import { deleteCourse, registerCourse } from '../../services/api/course';

export const CourseCard = ({ user, course }) => {
  const router = useRouter();

  if (!user || user === null) {
    router.push('/auth/login');
  }

  const quota = course.quota - course.totalRegistered;

  const handleDeleteCourse = (course) => {
    const now = new Date();

    const confirmation = confirm('Are you sure to delete this course?');
    if (confirmation) {
      if (new Date(course.endDate) > now) {
        return alert('error: course still running');
      }

      if (course.totalRegistered > 0) {
        return alert('error: course participant is not empty');
      }

      deleteCourse(course.id)
        .then((res) => {
          alert(res);
          router.reload();
        })
        .catch((err) => {
          alert(err.response.data?.message);
        });
    }
    return;
  };

  const handleRegisterCourse = (course, user) => {
    if (
      !user.phoneNumber ||
      user.phoneNumber === null ||
      !user.address ||
      user.address === null ||
      !user.profilePicture ||
      user.profilePicture === null
    ) {
      alert('please complete your profile before register to this course!');

      return router.push('/user/account');
    }

    if (course.type === 'FREE') {
      registerCourse(course.id)
        .then((res) => {
          alert(res.message);

          router.push({
            pathname: '/course/details',
            query: { courseId: course.id },
          });
        })
        .catch((err) => {
          alert(err.response.data?.message);
        });
    } else {
      router.push({
        pathname: '/course/payment',
        query: {
          courseId: course.id,
        },
      });
    }
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
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
            <SignalCellularAltIcon color="action" />
            <Typography color="textSecondary" display="inline" sx={{ pl: 1 }} variant="body2">
              Level {course.level}
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
            <EventIcon color="action" />
            <Typography color="textSecondary" display="inline" sx={{ pl: 1 }} variant="body2">
              {formatDateWithoutHourMinutes(course.startDate)} s/d{' '}
              {formatDateWithoutHourMinutes(course.endDate)}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <Box sx={{ flexGrow: 1 }} />
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
        {user && user.role?.roleName === 'MEMBER' ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 4,
            }}
          >
            {course.isRegistered ? (
              <Tooltip title="You are already registered to this course">
                <span>
                  <Button
                    color="info"
                    size="medium"
                    variant="contained"
                    startIcon={<InfoOutlined />}
                    onClick={() => {
                      router.push({
                        pathname: '/course/details',
                        query: { courseId: course.id },
                      });
                    }}
                  >
                    Details Course
                  </Button>
                </span>
              </Tooltip>
            ) : (
              <Tooltip title={new Date(course.endDate) < new Date() ? 'course is expired' : ''}>
                <span>
                  <Button
                    color="primary"
                    size="medium"
                    variant="contained"
                    startIcon={<LoginOutlined />}
                    onClick={() => {
                      handleRegisterCourse(course, user);
                    }}
                    disabled={new Date(course.endDate) < new Date() || course.isRegistered}
                  >
                    Register Course
                  </Button>
                </span>
              </Tooltip>
            )}
          </Box>
        ) : user && user.role?.roleName === 'INSTRUCTOR' ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 4,
            }}
          >
            <span>
              <Button
                color="info"
                size="medium"
                variant="contained"
                startIcon={<InfoOutlined />}
                onClick={() => {
                  router.push({
                    pathname: '/course/details',
                    query: { courseId: course.id },
                  });
                }}
              >
                Details Course
              </Button>
            </span>
          </Box>
        ) : user && user.role?.roleName === 'DIRECTOR' ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 4,
            }}
          >
            <span>
              <Button
                color="info"
                size="medium"
                variant="contained"
                startIcon={<InfoOutlined />}
                onClick={() => {
                  router.push({
                    pathname: '/course/details',
                    query: { courseId: course.id },
                  });
                }}
              >
                Details Course
              </Button>
            </span>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              mt: 4,
            }}
          >
            <Button
              size="small"
              color="info"
              variant="contained"
              onClick={() => {
                router.push({
                  pathname: '/course/details',
                  query: {
                    courseId: course.id,
                  },
                });
              }}
            >
              Detail Course
            </Button>
            <Button
              size="small"
              color="secondary"
              variant="contained"
              onClick={() => {
                router.push({
                  pathname: '/course/edit',
                  query: {
                    id: course.id,
                  },
                });
              }}
            >
              Update Course
            </Button>
            <Button
              size="small"
              color="error"
              variant="contained"
              onClick={() => {
                handleDeleteCourse(course);
              }}
            >
              Delete Course
            </Button>
          </Box>
        )}
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
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
            <PeopleAltIcon color="action" />
            <Typography color="textSecondary" display="inline" sx={{ pl: 1 }} variant="body2">
              Kuota {quota === 0 ? 'penuh' : quota} / {course.quota}
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <LocalOfferIcon color="action" />
            <Typography color="textSecondary" display="inline" sx={{ pl: 1 }} variant="body2">
              {course.type} {formatRupiahCurrency(course.price)}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

CourseCard.propTypes = {
  course: PropTypes.object.isRequired,
};
