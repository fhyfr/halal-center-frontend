import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { handleRedirectOnClick } from '../../utils/handle-event-button';
import { resetPasswordUser } from '../../services/api/user';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export const ResetPasswordUser = () => {
  const router = useRouter();
  const { query } = router;

  if (!query.userId) {
    router.push('/user');
  }

  const [info, setInfo] = useState(undefined);
  const [errMessage, setErrMessage] = useState(undefined);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewPasswordConfirmation, setShowNewPasswordConfirmation] = useState(false);

  const handleCliekShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleCliekShowNewPasswordConfirmation = () =>
    setShowNewPasswordConfirmation((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      newPassword: '',
      newPasswordConfirmation: '',
    },
    validationSchema: Yup.object({
      newPassword: Yup.string().min(8).max(255).required('New password is required'),
      newPasswordConfirmation: Yup.string().oneOf(
        [Yup.ref('newPassword'), null],
        'New password must match',
      ),
    }),
    onSubmit: (values, action) => {
      resetPasswordUser(query.userId, values.newPassword, values.newPasswordConfirmation)
        .then((res) => {
          setInfo(res);
          setErrMessage(undefined);

          setTimeout(() => {
            router.push('/user');
          }, 2000);
        })
        .catch((err) => {
          setErrMessage(err.response.data.message);
          setInfo(undefined);
          action.setSubmitting(false);
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader
          subheader="Fill out this form for reset user password"
          title="Reset User Password"
        />
        <Divider />
        <CardContent>
          {info && (
            <Alert sx={{ marginBottom: 2 }} severity="success">
              {info}
            </Alert>
          )}

          {errMessage && (
            <Alert sx={{ marginBottom: 2 }} severity="error">
              {errMessage}
            </Alert>
          )}

          <FormControl sx={{ marginY: 2 }} fullWidth variant="outlined">
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

          <FormControl sx={{ marginY: 2 }} fullWidth variant="outlined">
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
              handleRedirectOnClick(router, '/user');
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
            Reset Password
          </Button>
        </Box>
      </Card>
    </form>
  );
};
