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
  IconButton,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@mui/material';
import useAuth from '../../hooks/use-auth';
import { setIn, useFormik } from 'formik';
import * as Yup from 'yup';
import 'yup-phone';
import { updateProfile } from '../../services/api/member';
import { PhotoCamera } from '@mui/icons-material';
import { uploadImage } from '../../services/api/file';
import { useRouter } from 'next/router';

export const AccountProfileDetails = (props) => {
  const { user } = useAuth();
  const router = useRouter();

  let initialValues = {
    username: '',
    fullName: '',
    address: '',
    phoneNumber: '',
    facebook: '',
    linkedin: '',
    profilePicture: '',
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
    };
  }

  const [info, setInfo] = useState(undefined);
  const [errMessage, setErrMessage] = useState(undefined);
  const [profilePictureUrl, setProfilePictureUrl] = useState(undefined);

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      username: Yup.string().min(2).max(255).required('Username is required'),
      fullName: Yup.string().max(255).required('Full name is required'),
      address: Yup.string().max(255).required('Address is required'),
      phoneNumber: Yup.string().phone('ID').required(),
      facebook: Yup.string().url(),
      linkedin: Yup.string().url(),
      profilePicture: Yup.string().url(),
    }),
    onSubmit: async (values) => {
      if (profilePictureUrl) {
        values.profilePicture = profilePictureUrl;
      }

      updateProfile(values)
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
        });
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

  return (
    <form autoComplete="off" onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <Grid item lg={4} md={6} xs={12}>
          <Card {...props}>
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
                    user && user.profilePicture !== null
                      ? user.profilePicture
                      : '/static/images/avatars/avatar_1.png'
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
                <Typography color="textSecondary" variant="body2">
                  {user ? user.address : ''}
                </Typography>
                <Typography color="textSecondary" variant="body2">
                  GMT+7
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
