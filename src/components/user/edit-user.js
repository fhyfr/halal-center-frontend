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
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { handleRedirectOnClick } from '../../utils/handle-event-button';
import { updateUser } from '../../services/api/user';

export const EditUser = ({ user, roles }) => {
  const router = useRouter();

  const [info, setInfo] = useState(undefined);
  const [errMessage, setErrMessage] = useState(undefined);

  const formik = useFormik({
    initialValues: {
      roleId: user.roleId,
      username: user.username,
      email: user.email,
    },
    validationSchema: Yup.object({
      roleId: Yup.number().required('Role is required'),
      username: Yup.string().min(2).max(255).required('Username is required'),
      email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
    }),
    onSubmit: (values, action) => {
      updateUser(user.id, values)
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
          action.setSubmitting(false);
        });
    },
  });

  if (user.error) {
    return (
      <Typography align="center" variant="h4" style={{ color: 'red' }}>
        error, {user.error.message}
      </Typography>
    );
  }

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
        <CardHeader subheader="Fill out this form for edit user" title="Edit User" />
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
            Update
          </Button>
        </Box>
      </Card>
    </form>
  );
};
