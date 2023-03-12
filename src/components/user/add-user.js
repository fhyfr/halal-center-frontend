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
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from '@mui/material';
import { Field, useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { handleRedirectOnClick } from '../../utils/handle-event-button';
import { createNewUser } from '../../services/api/user';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export const AddUser = ({ roles }) => {
  const router = useRouter();

  const [info, setInfo] = useState(undefined);
  const [errMessage, setErrMessage] = useState(undefined);
  const [showPassword, setShowPassword] = useState(true);

  const handleShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      roleId: '',
      username: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      roleId: Yup.number().required('Role is required'),
      username: Yup.string().min(2).max(255).required('Username is required'),
      email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      password: Yup.string().min(8).max(255).required('Password is required'),
    }),
    onSubmit: async (values) => {
      createNewUser(values)
        .then((res) => {
          setInfo(res);
          setErrMessage(undefined);
          setTimeout(() => {
            router.push('/user');
          }, 2000);
        })
        .catch((err) => {
          setErrMessage(err.response.data?.message);
          setInfo(undefined);
        });
    },
  });

  if (roles.error) {
    return (
      <Typography align="center" variant="h4" style={{ color: 'red' }}>
        error, {roles.error.message}
      </Typography>
    );
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader subheader="Fill out this form for add new user" title="Add New User" />
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

          <FormControl sx={{ marginTop: 1, marginBottom: 2 }} fullWidth variant="outlined">
            <InputLabel id="select-role">Role</InputLabel>
            <Select
              labelId="select-role"
              id="demo-simple-select"
              value={formik.values.roleId}
              label="Role"
              onChange={formik.handleChange}
              name="roleId"
            >
              {roles.data.map((role) =>
                role.roleName === 'SUPER_ADMIN' ? (
                  <MenuItem disabled key={role.id} value={role.id}>
                    --- Select Role ---
                  </MenuItem>
                ) : (
                  <MenuItem key={role.id} value={role.id}>
                    {role.roleName}
                  </MenuItem>
                ),
              )}
            </Select>
            {Boolean(formik.touched.roleId && formik.errors.roleId) && (
              <FormHelperText error>{formik.errors.roleId}</FormHelperText>
            )}
          </FormControl>

          <FormControl sx={{ marginY: 2 }} fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>
            <OutlinedInput
              id="outlined-adornment-username"
              label="Username"
              name="username"
              type="text"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            {Boolean(formik.touched.username && formik.errors.username) && (
              <FormHelperText error>{formik.errors.username}</FormHelperText>
            )}
          </FormControl>

          <FormControl sx={{ marginY: 2 }} fullWidth variant="outlined">
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

          <FormControl sx={{ marginTop: 2, marginBottom: 1 }} fullWidth variant="outlined">
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
            Submit
          </Button>
        </Box>
      </Card>
    </form>
  );
};
