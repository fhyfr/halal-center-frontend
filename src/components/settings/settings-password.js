import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
  Alert,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updatePassword } from '../../services/api/member';

export const SettingsPassword = (props) => {
  const [info, setInfo] = useState(undefined);
  const [errMessage, setErrMessage] = useState(undefined);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewPasswordConfirmation, setShowNewPasswordConfirmation] = useState(false);

  const handleClickShowCurrentPassword = () => setShowCurrentPassword((show) => !show);
  const handleCliekShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleCliekShowNewPasswordConfirmation = () =>
    setShowNewPasswordConfirmation((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      newPasswordConfirmation: '',
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().min(8).max(255).required('Current password is required'),
      newPassword: Yup.string().min(8).max(255).required('New password is required'),
      newPasswordConfirmation: Yup.string().oneOf(
        [Yup.ref('newPassword'), null],
        'New password must match',
      ),
    }),
    onSubmit: async (values) => {
      updatePassword(values.currentPassword, values.newPassword, values.newPasswordConfirmation)
        .then((res) => {
          setInfo(res);
          setErrMessage(undefined);
          formik.resetForm();
        })
        .catch((err) => {
          setErrMessage(err.response.data.message);
          setInfo(undefined);
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader subheader="Update password" title="Password" />
        <Divider />
        <CardContent>
          <Box
            sx={{
              marginLeft: 20,
              marginRight: 20,
            }}
          >
            {info && (
              <Alert sx={{ m: 2, marginY: 1 }} severity="success">
                {info}
              </Alert>
            )}

            {errMessage && (
              <Alert sx={{ m: 2, marginY: 1 }} severity="error">
                {errMessage}
              </Alert>
            )}

            <FormControl sx={{ m: 2 }} fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-current-password">
                Current password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-current-password"
                label="Current password"
                name="currentPassword"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type={showCurrentPassword ? 'text' : 'password'}
                value={formik.values.currentPassword}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowCurrentPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {Boolean(formik.touched.currentPassword && formik.errors.currentPassword) && (
                <FormHelperText error>{formik.errors.currentPassword}</FormHelperText>
              )}
            </FormControl>

            <FormControl sx={{ m: 2 }} fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-new-password">New password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-new-password"
                label="New password"
                name="newPassword"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type={showNewPassword ? 'text' : 'password'}
                value={formik.values.newPassword}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleCliekShowNewPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {Boolean(formik.touched.newPassword && formik.errors.newPassword) && (
                <FormHelperText error>{formik.errors.newPassword}</FormHelperText>
              )}
            </FormControl>

            <FormControl sx={{ m: 2, marginTop: 0 }} fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-new-password-confirmation">
                Confirm new password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-new-password-confirmation"
                label="Confirm new password"
                name="newPasswordConfirmation"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type={showNewPasswordConfirmation ? 'text' : 'password'}
                value={formik.values.newPasswordConfirmation}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleCliekShowNewPasswordConfirmation}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showNewPasswordConfirmation ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {Boolean(
                formik.touched.newPasswordConfirmation && formik.errors.newPasswordConfirmation,
              ) && <FormHelperText error>{formik.errors.newPasswordConfirmation}</FormHelperText>}
            </FormControl>
          </Box>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2,
          }}
        >
          <Button color="primary" disabled={formik.isSubmitting} type="submit" variant="contained">
            Update
          </Button>
        </Box>
      </Card>
    </form>
  );
};
