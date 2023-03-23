import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { handleRedirectOnClick } from '../../utils/handle-event-button';
import { CancelRounded, PhotoCamera } from '@mui/icons-material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { uploadImage } from '../../services/api/file';
import { createNewCourse } from '../../services/api/course';

export const AddCourse = ({ categories }) => {
  const router = useRouter();

  const [info, setInfo] = useState(undefined);
  const [errMessage, setErrMessage] = useState(undefined);
  const [price, setPrice] = useState(0);
  const [banner, setBanner] = useState(null);

  const formik = useFormik({
    initialValues: {
      categoryId: '',
      title: '',
      subTitle: '',
      descriptions: '',
      type: '',
      level: '',
      quota: '',
      startDate: '',
      endDate: '',
    },
    validationSchema: Yup.object({
      categoryId: Yup.number().required('Category is required'),
      title: Yup.string().required('Title is required'),
      subTitle: Yup.string().required('Sub title is required'),
      descriptions: Yup.string().required('Description is required'),
      type: Yup.string().required('Type is required'),
      level: Yup.string().required('Level is required'),
      quota: Yup.number().min(1).required('Quota is required'),
      startDate: Yup.string().required(),
      endDate: Yup.string().required(),
    }),
    onSubmit: (values, action) => {
      let coursePrice;

      if (typeof price === 'number') {
        coursePrice = price;
      } else {
        coursePrice = parseInt(price.replace(/[^0-9\.]/gi, ''), 10);
      }

      Object.assign(values, {
        banner,
        price: coursePrice,
      });

      Object.assign(values, {
        banner,
        price: coursePrice,
      });

      createNewCourse(values)
        .then((res) => {
          setInfo(res);
          setErrMessage(undefined);

          setTimeout(() => {
            router.push('/course');
          }, 2000);
        })
        .catch((err) => {
          setErrMessage(err.response.data?.message);
          setInfo(undefined);
          action.setSubmitting(false);
        });
    },
  });

  const handleOnChangePrice = (e) => {
    setPrice(e.target.value.replace(/[^0-9\.]/gi, ''));
  };

  const handleOnBlurPrice = () => {
    if (price === 0) {
      return;
    }

    let tempPrice = price.replace(/[^0-9\.]/gi, '');
    if (tempPrice.match(/\./g) > 1) {
      const [thousands] = tempPrice.split('.');
      tempPrice = `${thousands}`;
    }

    tempPrice = Number(tempPrice).toLocaleString('en-EN', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });

    tempPrice = tempPrice.replace(/\$/g, '');

    setPrice(tempPrice);
  };

  const handleUploadBanner = async (event) => {
    uploadImage(event.target.files[0])
      .then((res) => {
        setInfo(res.message);
        setBanner(res.data.imagePreview);
        setErrMessage(undefined);
      })
      .catch((err) => {
        setErrMessage(err.response.data?.message);
        setInfo(undefined);
      });
  };

  if (categories.error) {
    return (
      <Typography align="center" variant="h4" style={{ color: 'red' }}>
        error, {categories.error.message}
      </Typography>
    );
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader subheader="Fill out this form for add new course" title="Add New Course" />
        <Divider />
        <CardContent>
          <Grid container spacing={2} sx={{ marginBottom: 3 }}>
            <Grid item lg={12} md={12} xs={12}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <CardMedia
                      component="img"
                      src={banner}
                      sx={{
                        width: 600,
                      }}
                      alt="Banner with size 2 : 1 ratio"
                    />
                  </Box>
                </CardContent>
                <Divider />

                <CardActions>
                  <Button
                    color="primary"
                    fullWidth
                    variant="text"
                    component="label"
                    endIcon={<PhotoCamera />}
                  >
                    Upload Banner
                    <input
                      id="profile-picture"
                      name="profilePicture"
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={handleUploadBanner}
                    />
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>

          {info && (
            <Alert sx={{ marginY: 2 }} severity="success">
              {info}
            </Alert>
          )}

          {errMessage && (
            <Alert sx={{ marginY: 2 }} severity="error">
              {errMessage}
            </Alert>
          )}

          <Grid container spacing={3}>
            <Grid item lg={6} md={6} xs={12}>
              <FormControl sx={{ marginTop: 1, marginBottom: 2 }} fullWidth variant="outlined">
                <InputLabel id="select-category">Category</InputLabel>
                <Select
                  labelId="select-category"
                  id="select-category"
                  value={formik.values.categoryId}
                  label="Category"
                  onChange={formik.handleChange}
                  name="categoryId"
                >
                  <MenuItem disabled key="" value="">
                    --- Select Category ---
                  </MenuItem>

                  {categories.data.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.categoryName}
                    </MenuItem>
                  ))}
                </Select>
                {Boolean(formik.touched.categoryId && formik.errors.categoryId) && (
                  <FormHelperText error>{formik.errors.categoryId}</FormHelperText>
                )}
              </FormControl>
              <FormControl sx={{ marginY: 2 }} fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-title">Title</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-title"
                  label="Title"
                  name="title"
                  type="text"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.title}
                />
                {Boolean(formik.touched.title && formik.errors.title) && (
                  <FormHelperText error>{formik.errors.title}</FormHelperText>
                )}
              </FormControl>

              <FormControl sx={{ marginY: 2 }} fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-sub-title">Subtitle</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-sub-title"
                  label="Subtitle"
                  name="subTitle"
                  type="text"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.subTitle}
                />
                {Boolean(formik.touched.subTitle && formik.errors.subTitle) && (
                  <FormHelperText error>{formik.errors.subTitle}</FormHelperText>
                )}
              </FormControl>

              <FormControl sx={{ marginY: 2 }} fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-descriptions">Descriptions</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-descriptions"
                  label="Descriptions"
                  name="descriptions"
                  type="text"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.descriptions}
                  multiline="true"
                  minRows={4}
                />
                {Boolean(formik.touched.descriptions && formik.errors.descriptions) && (
                  <FormHelperText error>{formik.errors.descriptions}</FormHelperText>
                )}
              </FormControl>

              <FormControl sx={{ marginTop: 1, marginBottom: 2 }} fullWidth variant="outlined">
                <InputLabel id="select-level">Level</InputLabel>
                <Select
                  labelId="select-level"
                  id="select-level"
                  value={formik.values.level}
                  label="Level"
                  onChange={formik.handleChange}
                  name="level"
                >
                  <MenuItem disabled key="" value="">
                    --- Select Level ---
                  </MenuItem>
                  <MenuItem key="1" value="BEGINNER">
                    BEGINNER
                  </MenuItem>
                  <MenuItem key="2" value="INTERMEDIATE">
                    INTERMEDIATE
                  </MenuItem>
                  <MenuItem key="3" value="ADVANCE">
                    ADVANCE
                  </MenuItem>
                </Select>
                {Boolean(formik.touched.level && formik.errors.level) && (
                  <FormHelperText error>{formik.errors.level}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item lg={6} md={6} xs={12}>
              <FormControl sx={{ marginTop: 1, marginBottom: 2 }} fullWidth variant="outlined">
                <InputLabel id="select-type">Type</InputLabel>
                <Select
                  labelId="select-type"
                  id="select-type"
                  value={formik.values.type}
                  label="Type"
                  onChange={formik.handleChange}
                  name="type"
                >
                  <MenuItem disabled key="" value="">
                    --- Select Type ---
                  </MenuItem>
                  <MenuItem key="1" value="FREE">
                    FREE
                  </MenuItem>
                  <MenuItem key="2" value="PAID">
                    PAID
                  </MenuItem>
                </Select>
                {Boolean(formik.touched.type && formik.errors.type) && (
                  <FormHelperText error>{formik.errors.type}</FormHelperText>
                )}
              </FormControl>

              <FormControl sx={{ marginY: 2 }} fullWidth variant="outlined">
                <TextField
                  disabled={formik.values.type === 'FREE'}
                  id="input-price"
                  name="price"
                  label="Price"
                  onChange={handleOnChangePrice}
                  onBlur={handleOnBlurPrice}
                  value={price}
                  inputProps={{
                    inputMode: 'numeric',
                  }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
                    endAdornment: (
                      <InputAdornment position="end">
                        {Boolean(price) && (
                          <CancelRounded
                            size="small"
                            color="grey"
                            sx={{ padding: 0 }}
                            onClick={() => setPrice(0)}
                          />
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>

              <FormControl sx={{ marginY: 2 }} fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-quota">Quota</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-quota"
                  label="Quota"
                  name="quota"
                  type="number"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.quota}
                />
                {Boolean(formik.touched.quota && formik.errors.quota) && (
                  <FormHelperText error>{formik.errors.quota}</FormHelperText>
                )}
              </FormControl>

              <Stack
                sx={{ marginX: 2, marginTop: 6, marginBottom: 3 }}
                alignItems="center"
                direction="row"
                spacing={4}
              >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <InputLabel htmlFor="id-start-date">Start Date</InputLabel>
                  <DatePicker
                    onChange={(value) => {
                      formik.setFieldValue('startDate', new Date(value).toISOString());
                    }}
                    value={formik.values.startDate}
                    inputFormat="dd/MM/yyyy"
                    renderInput={(params) => (
                      <TextField
                        id="id-start-date"
                        sx={{ maxWidth: 300 }}
                        error={Boolean(formik.touched.startDate && formik.errors.startDate)}
                        helperText={formik.touched.startDate && formik.errors.startDate}
                        label="Start Date"
                        name="startDate"
                        variant="outlined"
                        {...params}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Stack>

              <Stack
                sx={{ marginX: 3, marginTop: 7, marginBottom: 3 }}
                alignItems="center"
                direction="row"
                spacing={4}
              >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <InputLabel htmlFor="id-end-date">End Date</InputLabel>
                  <DatePicker
                    onChange={(value) => {
                      formik.setFieldValue('endDate', new Date(value).toISOString());
                    }}
                    value={formik.values.endDate}
                    inputFormat="dd/MM/yyyy"
                    renderInput={(params) => (
                      <TextField
                        id="id-end-date"
                        sx={{ maxWidth: 300 }}
                        error={Boolean(formik.touched.endDate && formik.errors.endDate)}
                        helperText={formik.touched.endDate && formik.errors.endDate}
                        label="End Date"
                        name="endDate"
                        variant="outlined"
                        {...params}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Stack>
            </Grid>
          </Grid>
          <Divider />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              pt: 2,
            }}
          >
            <Button
              sx={{ mx: 1 }}
              type="button"
              disabled={formik.isSubmitting}
              color="error"
              variant="text"
              onClick={() => {
                handleRedirectOnClick(router, '/course');
              }}
            >
              Cancel
            </Button>
            <Button
              sx={{ mx: 1 }}
              type="submit"
              disabled={formik.isSubmitting}
              color="primary"
              variant="contained"
            >
              Submit
            </Button>
          </Box>
        </CardContent>
      </Card>
    </form>
  );
};
