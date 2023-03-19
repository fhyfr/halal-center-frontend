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
} from '@mui/material';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import EventIcon from '@mui/icons-material/Event';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { useRouter } from 'next/router';
import { formatDateWithoutHourMinutes } from '../../utils/date-converter';
import { formatRupiahCurrency } from '../../utils/currency-converter';
import { Category } from '@mui/icons-material';

export const CourseCard = ({ course }) => {
  const router = useRouter();

  const quota = course.quota - course.totalRegistered;

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
              Category {course.category.categoryName}
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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            pt: 2,
          }}
        >
          {/* jika role admin */}
          <Button size="big" color="error" variant="contained">
            Delete Course
          </Button>
          <Button size="big" color="secondary" variant="contained">
            Update Course
          </Button>

          {/* jika role customer */}
          <Button size="big" variant="contained">
            Ikuti Course
          </Button>
        </Box>
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
