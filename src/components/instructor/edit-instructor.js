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
  InputLabel,
  ListItemIcon,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { PhotoCamera } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'yup-phone';
import { uploadImage } from '../../services/api/file';
import { handleRedirectOnClick } from '../../utils/handle-event-button';
import { updateInstructor } from '../../services/api/instructor';
import { getCitiesByProvinceId } from '../../services/api/city';
import { Stack } from '@mui/system';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export const EditInstructor = ({ instructor, provinces, cities, courses, instructorCourseIds }) => {
  const router = useRouter();

  const [info, setInfo] = useState(undefined);
  const [errMessage, setErrMessage] = useState(undefined);
  const [profilePictureUrl, setProfilePictureUrl] = useState(instructor.profilePicture);
  const [selectedCourseIds, setSelectedCourseIds] = useState(instructorCourseIds);
  const [citiesData, setCitiesData] = useState(cities);
  const [selectedProvinceId, setSelectedProvinceId] = useState(instructor.provinceId);
  const [selectedCityId, setSelectedCityId] = useState(instructor.cityId);

  const formik = useFormik({
    initialValues: {
      email: instructor.email,
      fullName: instructor.fullName,
      username: instructor.username,
      address: instructor.address,
      phoneNumber: instructor.phoneNumber,
      dateOfBirth: instructor.dateOfBirth,
      education: instructor.education,
      workExperience: instructor.workExperience,
      facebook: instructor.facebook,
      linkedin: instructor.linkedin,
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Must be a valid email').required('Email is required'),
      fullName: Yup.string().required('Full Name is required'),
      username: Yup.string().required('Username is required'),
      address: Yup.string().required('Address is required'),
      phoneNumber: Yup.string().phone('ID').required('Phone Number is required'),
      dateOfBirth: Yup.string().required(),
      education: Yup.string().required('Education is required'),
      workExperience: Yup.number().required('Work Experience is required'),
      facebook: Yup.string().url(),
      linkedin: Yup.string().url(),
    }),
    onSubmit: (values, action) => {
      const updateInstructorData = { ...values };

      Object.assign(updateInstructorData, {
        courseIds: selectedCourseIds,
        provinceId: selectedProvinceId,
        cityId: selectedCityId,
      });

      if (profilePictureUrl && profilePictureUrl !== null) {
        Object.assign(updateInstructorData, {
          profilePicture: profilePictureUrl,
        });
      }

      updateInstructor(instructor.id, updateInstructorData)
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
            <CardHeader
              subheader="Fill out this form for edit instructor profile"
              title="Profile"
            />
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
                    <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-email"
                      label="Email"
                      name="email"
                      type="email"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                    {Boolean(formik.touched.email && formik.errors.email) && (
                      <FormHelperText error>{formik.errors.email}</FormHelperText>
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
                  <Stack sx={{ marginX: 2 }} alignItems="center" direction="row" spacing={4}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <InputLabel htmlFor="id-date-of-birth">Date of Birth</InputLabel>
                      <DatePicker
                        onChange={(value) => {
                          formik.setFieldValue('dateOfBirth', new Date(value).toISOString());
                        }}
                        value={formik.values.dateOfBirth}
                        inputFormat="dd/MM/yyyy"
                        renderInput={(params) => (
                          <TextField
                            id="id-date-of-birth"
                            sx={{ maxWidth: 180 }}
                            error={Boolean(formik.touched.dateOfBirth && formik.errors.dateOfBirth)}
                            helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
                            label="Date of Birth"
                            name="dateOfBirth"
                            variant="outlined"
                            {...params}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Stack>
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="single-select-education" required>
                      Education
                    </InputLabel>
                    <Select
                      labelId="single-select-education"
                      value={formik.values.education}
                      label="Education"
                      onChange={formik.handleChange}
                      name="education"
                      required
                    >
                      <MenuItem key="1" value="SLTA">
                        SLTA (SMA, SMK, MA, sederajat)
                      </MenuItem>
                      <MenuItem key="2" value="D1">
                        Diploma 1 (D1)
                      </MenuItem>
                      <MenuItem key="3" value="D2">
                        Diploma 2 (D2)
                      </MenuItem>
                      <MenuItem key="4" value="D3">
                        Diploma 3 (D3)
                      </MenuItem>
                      <MenuItem key="5" value="S1_OR_D4">
                        Strata 1 (S1) atau Diploma 4 (D4)
                      </MenuItem>
                      <MenuItem key="6" value="S2">
                        Strata 2 (S2)
                      </MenuItem>
                      <MenuItem key="7" value="S3">
                        Strata 3 (S3)
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-work-experience" required>
                      Work Experience (Years)
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-work-experience"
                      label="Work Experience (Years)"
                      name="workExperience"
                      type="number"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.workExperience}
                      required
                    />
                    {Boolean(formik.touched.workExperience && formik.errors.workExperience) && (
                      <FormHelperText error>{formik.errors.workExperience}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-facebook">Facebook</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-facebook"
                      label="Facebook"
                      name="facebook"
                      type="text"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.facebook}
                    />
                    {Boolean(formik.touched.facebook && formik.errors.facebook) && (
                      <FormHelperText error>{formik.errors.facebook}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-linkedin">LinkedIn</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-linkedin"
                      label="LinkedIn"
                      name="linkedin"
                      type="text"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.linkedin}
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
                Update
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </form>
  );
};
