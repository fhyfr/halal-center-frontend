import { useState } from 'react';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  ListItemIcon,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { PhotoCamera, Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'yup-phone';
import { uploadImage } from '../../services/api/file';
import { handleRedirectOnClick } from '../../utils/handle-event-button';
import { createNewInstructor } from '../../services/api/instructor';
import { getCitiesByProvinceId } from '../../services/api/city';

export const AddInstructor = ({ courses, provinces, cities }) => {
  const router = useRouter();

  const [info, setInfo] = useState(undefined);
  const [errMessage, setErrMessage] = useState(undefined);
  const [profilePictureUrl, setProfilePictureUrl] = useState(undefined);
  const [selectedCourseIds, setSelectedCourseIds] = useState([]);
  const [citiesData, setCitiesData] = useState(cities);
  const [selectedProvinceId, setSelectedProvinceId] = useState(0);
  const [selectedCityId, setSelectedCityId] = useState(0);
  const [showPassword, setShowPassword] = useState(true);

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
      fullName: '',
      address: '',
      phoneNumber: '',
      facebook: '',
      linkedin: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Must be a valid email').required('Email is required'),
      username: Yup.string().min(2).max(255).required('Username is required'),
      password: Yup.string().min(8).max(255).required('Password is required'),
      fullName: Yup.string().required('Full Name is required'),
      address: Yup.string().required('Address is required'),
      phoneNumber: Yup.string().phone('ID').required('Phone Number is required'),
      facebook: Yup.string().url().required(),
      linkedin: Yup.string().url().required(),
    }),
    onSubmit: (values, action) => {
      const newInstructor = { ...values };

      Object.assign(newInstructor, {
        courseIds: selectedCourseIds,
      });

      if (selectedProvinceId && selectedProvinceId !== null) {
        Object.assign(newInstructor, {
          provinceId: selectedProvinceId,
        });
      }

      if (selectedCityId && selectedCityId !== null) {
        Object.assign(newInstructor, {
          cityId: selectedCityId,
        });
      }

      if (profilePictureUrl && profilePictureUrl !== null) {
        Object.assign(newInstructor, {
          profilePicture: profilePictureUrl,
        });
      }

      createNewInstructor(newInstructor)
        .then((res) => {
          setInfo(res);
          setErrMessage(undefined);

          setTimeout(() => {
            router.push('/instructor');
          }, 2000);
        })
        .catch((err) => {
          setErrMessage(err.response.data?.message);
          setInfo(undefined);
          action.setSubmitting(false);
        });
    },
  });

  const handleChangeCourseIds = (event) => {
    const value = event.target.value;
    setSelectedCourseIds(value);
  };

  const handleUploadProfilePicture = async (event) => {
    uploadImage(event.target.files[0])
      .then((res) => {
        setInfo(res.message);
        setProfilePictureUrl(res.data.imagePreview);
        setErrMessage(undefined);
      })
      .catch((err) => {
        setErrMessage(err.response.data?.message);
        setInfo(undefined);
      });
  };

  const handleChangeProvinceId = async (event) => {
    const value = event.target.value;
    setSelectedProvinceId(value);

    const cities = await getCitiesByProvinceId(value);
    setCitiesData(cities);
  };

  const handleChangeCityId = (event) => {
    const value = event.target.value;
    setSelectedCityId(value);
  };

  const handleShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  if (courses.error) {
    return (
      <Typography align="center" variant="h4" style={{ color: 'red' }}>
        error, {courses.error.message}
      </Typography>
    );
  }

  if (provinces.error) {
    return (
      <Typography align="center" variant="h4" style={{ color: 'red' }}>
        error, {provinces.error.message}
      </Typography>
    );
  }

  if (cities.error) {
    return (
      <Typography align="center" variant="h4" style={{ color: 'red' }}>
        error, {cities.error.message}
      </Typography>
    );
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <Grid item lg={4} md={6} xs={12}>
          <Card>
            <CardContent>
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Avatar
                  src={profilePictureUrl}
                  sx={{
                    height: 120,
                    width: 120,
                  }}
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
                Upload Picture
                <input
                  id="profile-picture"
                  name="profilePicture"
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handleUploadProfilePicture}
                />
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item lg={8} md={6} xs={12}>
          <Card>
            <CardHeader subheader="Fill out this form for add new instructor" title="Profile" />
            <Divider />

            <CardContent>
              {info && (
                <Alert sx={{ marginBottom: 3 }} severity="success">
                  {info}
                </Alert>
              )}

              {errMessage && (
                <Alert sx={{ marginBottom: 3 }} severity="error">
                  {errMessage}
                </Alert>
              )}

              <FormControl sx={{ marginTop: 1, marginBottom: 2 }} fullWidth variant="outlined">
                <InputLabel id="mutiple-select-course">Course Ids</InputLabel>
                <Select
                  labelId="mutiple-select-course"
                  multiple
                  value={selectedCourseIds}
                  label="Course Ids"
                  onChange={handleChangeCourseIds}
                  renderValue={(selected) => selected.join(', ')}
                  name="courseIds"
                >
                  {courses.data.map((course) => (
                    <MenuItem key={course.id} value={course.id}>
                      <ListItemIcon>
                        <Checkbox checked={selectedCourseIds.indexOf(course.id) > -1} />
                      </ListItemIcon>
                      <ListItemText primary={`${course.title} - Batch ${course.batchNumber}`} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-full-name" required>
                      Full Name
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-full-name"
                      label="Full Name"
                      name="fullName"
                      type="text"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.fullName}
                      required
                    />
                    {Boolean(formik.touched.fullName && formik.errors.fullName) && (
                      <FormHelperText error>{formik.errors.fullName}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-username" required>
                      Username
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-username"
                      label="Username"
                      name="username"
                      type="text"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      required
                    />
                    {Boolean(formik.touched.username && formik.errors.username) && (
                      <FormHelperText error>{formik.errors.username}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-email" required>
                      Email
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-email"
                      label="Email"
                      name="email"
                      type="email"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      required
                    />
                    {Boolean(formik.touched.email && formik.errors.email) && (
                      <FormHelperText error>{formik.errors.email}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      label="Password"
                      name="password"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type={showPassword ? 'text' : 'password'}
                      value={formik.values.password}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {Boolean(formik.touched.password && formik.errors.password) && (
                      <FormHelperText error>{formik.errors.password}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-phone-number" required>
                      Phone Number
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-phone-number"
                      label="Phone Number"
                      name="phoneNumber"
                      type="text"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.phoneNumber}
                      required
                    />
                    {Boolean(formik.touched.phoneNumber && formik.errors.phoneNumber) && (
                      <FormHelperText error>{formik.errors.phoneNumber}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="single-select-province" required>
                      Province
                    </InputLabel>
                    <Select
                      labelId="single-select-province"
                      value={selectedProvinceId}
                      label="Province"
                      onChange={handleChangeProvinceId}
                      name="provinceId"
                      required
                    >
                      {provinces.data.map((province) => (
                        <MenuItem key={province.id} value={province.id}>
                          {province.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="single-select-city" required>
                      City
                    </InputLabel>
                    <Select
                      labelId="single-select-city"
                      value={selectedCityId}
                      label="City"
                      onChange={handleChangeCityId}
                      name="cityId"
                      required
                    >
                      {citiesData?.data?.map((city) => (
                        <MenuItem key={city.id} value={city.id}>
                          {city.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-address" required>
                      Address
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-address"
                      label="Address"
                      name="address"
                      type="text"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.address}
                      required
                    />
                    {Boolean(formik.touched.address && formik.errors.address) && (
                      <FormHelperText error>{formik.errors.address}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-facebook" required>
                      Facebook
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-facebook"
                      label="Facebook"
                      name="facebook"
                      type="text"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.facebook}
                      required
                    />
                    {Boolean(formik.touched.facebook && formik.errors.facebook) && (
                      <FormHelperText error>{formik.errors.facebook}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-linkedin" required>
                      LinkedIn
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-linkedin"
                      label="LinkedIn"
                      name="linkedin"
                      type="text"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.linkedin}
                      required
                    />
                    {Boolean(formik.touched.linkedin && formik.errors.linkedin) && (
                      <FormHelperText error>{formik.errors.linkedin}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                p: 2,
              }}
            >
              <Button
                sx={{ mx: 1 }}
                type="button"
                disabled={formik.isSubmitting}
                color="error"
                variant="text"
                onClick={() => {
                  handleRedirectOnClick(router, '/instructor');
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
          </Card>
        </Grid>
      </Grid>
    </form>
  );
};
