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
  Divider,
  FormControl,
  FormHelperText,
  Grid,
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
import 'yup-phone';
import { updateProfileMember } from '../../services/api/member';
import { PhotoCamera } from '@mui/icons-material';
import { uploadImage } from '../../services/api/file';
import { useRouter } from 'next/router';
import { getCitiesByProvinceId } from '../../services/api/city';
import { updateInstructor } from '../../services/api/instructor';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export const AccountProfileDetails = ({ user, provinces, cities }) => {
  const router = useRouter();

  let initialValues = {
    username: '',
    fullName: '',
    address: '',
    phoneNumber: '',
    facebook: '',
    linkedin: '',
    profilePicture: '',
    dateOfBirth: '',
    education: '',
    workExperience: '',
  };

  if (user) {
    initialValues = {
      username: user.username,
      fullName: user.fullName,
      address: user.address,
      phoneNumber: user.phoneNumber,
      facebook: user.facebook,
      linkedin: user.linkedin,
      profilePicture: user.profilePicture,
      dateOfBirth: user.dateOfBirth,
      education: user.education,
      workExperience: user.workExperience,
    };
  }

  const [info, setInfo] = useState(undefined);
  const [errMessage, setErrMessage] = useState(undefined);
  const [profilePictureUrl, setProfilePictureUrl] = useState(undefined);
  const [selectedProvinceId, setSelectedProvinceId] = useState(user?.provinceId);
  const [selectedCityId, setSelectedCityId] = useState(user?.cityId);
  const [citiesData, setCitiesData] = useState(cities);

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      username: Yup.string().min(2).max(255).required('Username is required'),
      fullName: Yup.string().max(255).required('Full name is required'),
      address: Yup.string().max(255).required('Address is required'),
      phoneNumber: Yup.string().phone('ID').required('Phone Number is required'),
      facebook: Yup.string().url(),
      linkedin: Yup.string().url(),
      dateOfBirth: Yup.string().required(),
      education: Yup.string().required('Education is required'),
      workExperience: Yup.number().required('Work Experience is required'),
    }),
    onSubmit: (values, action) => {
      if (profilePictureUrl) {
        values.profilePicture = profilePictureUrl;
      }

      if (selectedProvinceId) {
        Object.assign(values, {
          provinceId: selectedProvinceId,
        });
      }

      if (selectedCityId) {
        Object.assign(values, {
          cityId: selectedCityId,
        });
      }

      switch (user.role?.roleName) {
        case 'MEMBER':
          updateProfileMember(values)
            .then((res) => {
              setInfo(undefined);
              setInfo(res);
              setErrMessage(undefined);
              setTimeout(() => {
                router.reload();
              }, 2000);
            })
            .catch((err) => {
              setErrMessage(err.response.data?.message);
              setInfo(undefined);
              action.setSubmitting(false);
            });
          break;
        case 'INSTRUCTOR':
          Object.assign(values, {
            email: user.email,
          });

          updateInstructor(user.id, values)
            .then((res) => {
              setInfo(undefined);
              setInfo(res);
              setErrMessage(undefined);
              setTimeout(() => {
                router.reload();
              }, 2000);
            })
            .catch((err) => {
              setErrMessage(err.response.data?.message);
              setInfo(undefined);
              action.setSubmitting(false);
            });
          break;
          break;
        default:
          break;
      }
    },
  });

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
    <form autoComplete="off" onSubmit={formik.handleSubmit}>
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
                  src={
                    profilePictureUrl && user && profilePictureUrl !== null
                      ? profilePictureUrl
                      : user?.profilePicture
                  }
                  sx={{
                    height: 64,
                    mb: 2,
                    width: 64,
                  }}
                />
                <Typography color="textPrimary" gutterBottom variant="h5">
                  {user ? user.fullName : ''}
                </Typography>
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
            <CardHeader subheader="The information can be edited" title="Profile" />
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
                color="primary"
                disabled={formik.isSubmitting}
                type="submit"
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
