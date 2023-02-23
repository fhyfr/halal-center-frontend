import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  CardMedia,
  CardActions,
  Button,
  Icon,
} from '@mui/material';
import { Clock as ClockIcon } from '../../icons/clock';
import { Download as DownloadIcon } from '../../icons/download';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import EventIcon from '@mui/icons-material/Event';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

export const ProductCard = ({ product, ...rest }) => (
  <Card
    sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    }}
    {...rest}
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
          <EventIcon color="action" />
          <Typography color="textSecondary" display="inline" sx={{ pl: 1 }} variant="body2">
            {product.startDate} s/d {product.endDate}
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
            Level {product.level}
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
        <CardMedia component="img" height="auto" image={product.banner} alt={product.title} />
      </Box>
      <Typography align="left" color="textPrimary" gutterBottom variant="h5">
        {product.title}
      </Typography>
      <Typography align="left" color="textPrimary" gutterBottom variant="h6">
        {product.subTitle}
      </Typography>
      <Typography align="left" color="textPrimary" variant="body1">
        {product.descriptions}
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
            {product.quota} Kuota
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
            {product.type} Rp {product.price}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  </Card>
);

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};
