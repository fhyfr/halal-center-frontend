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
import 'yup-phone';
import { useRouter } from 'next/router';
import { handleRedirectOnClick } from '../../utils/handle-event-button';
import { createNewEmployee } from '../../services/api/employee';

export const AddEmployee = ({ departments, positions }) => {
  const router = useRouter();

  const [info, setInfo] = useState(undefined);
  const [errMessage, setErrMessage] = useState(undefined);

  const formik = useFormik({
    initialValues: {
      positionId: '',
      departmentId: '',
      nik: '',
      fullName: '',
      address: '',
      phoneNumber: '',
    },
    validationSchema: Yup.object({
      positionId: Yup.number().required('Position is required'),
      departmentId: Yup.number().required('Department is required'),
      nik: Yup.string().required('NIK is required'),
      fullName: Yup.string().required('Full Name is required'),
      address: Yup.string().required('Address is required'),
      phoneNumber: Yup.string().phone('ID').required('Phone Number is required'),
    }),
    onSubmit: async (values) => {
      createNewEmployee(values)
        .then((res) => {
          setInfo(res);
          setErrMessage(undefined);
          setTimeout(() => {
            router.push('/employee');
          }, 2000);
        })
        .catch((err) => {
          setErrMessage(err.response.data?.message);
          setInfo(undefined);
        });
    },
  });

  if (departments.error) {
    return (
      <Typography align="center" variant="h4" style={{ color: 'red' }}>
        error, {roles.error.message}
      </Typography>
    );
  }
  if (positions.error) {
    return (
      <Typography align="center" variant="h4" style={{ color: 'red' }}>
        error, {roles.error.message}
      </Typography>
    );
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader subheader="Fill out this form for add new employee" title="Add New Employee" />
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
            <InputLabel id="select-department">Department</InputLabel>
            <Select
              labelId="select-department"
              id="select-department"
              value={formik.values.departmentId}
              label="Department"
              onChange={formik.handleChange}
              name="departmentId"
            >
              <MenuItem disabled key="" value="">
                --- Select Department ---
              </MenuItem>

              {departments.data.map((department) => (
                <MenuItem key={department.id} value={department.id}>
                  {department.departmentName}
                </MenuItem>
              ))}
            </Select>
            {Boolean(formik.touched.departmentId && formik.errors.departmentId) && (
              <FormHelperText error>{formik.errors.departmentId}</FormHelperText>
            )}
          </FormControl>

          <FormControl sx={{ marginTop: 1, marginBottom: 2 }} fullWidth variant="outlined">
            <InputLabel id="select-position">Position</InputLabel>
            <Select
              labelId="select-position"
              id="select-position"
              value={formik.values.positionId}
              label="Position"
              onChange={formik.handleChange}
              name="positionId"
            >
              <MenuItem disabled key="" value="">
                --- Select Position ---
              </MenuItem>

              {positions.data.map((position) => (
                <MenuItem key={position.id} value={position.id}>
                  {position.positionName}
                </MenuItem>
              ))}
            </Select>
            {Boolean(formik.touched.positionId && formik.errors.positionId) && (
              <FormHelperText error>{formik.errors.positionId}</FormHelperText>
            )}
          </FormControl>

          <FormControl sx={{ marginY: 2 }} fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-nik">
              NIK (Employee Identification Number)
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-nik"
              label="NIK (Employee Identification Number)"
              name="nik"
              type="text"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.nik}
            />
            {Boolean(formik.touched.nik && formik.errors.nik) && (
              <FormHelperText error>{formik.errors.nik}</FormHelperText>
            )}
          </FormControl>

          <FormControl sx={{ marginY: 2 }} fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-full-name">Full Name</InputLabel>
            <OutlinedInput
              id="outlined-adornment-full-name"
              label="Full Name"
              name="fullName"
              type="text"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.fullName}
            />
            {Boolean(formik.touched.fullName && formik.errors.fullName) && (
              <FormHelperText error>{formik.errors.fullName}</FormHelperText>
            )}
          </FormControl>

          <FormControl sx={{ marginY: 2 }} fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-address">Address</InputLabel>
            <OutlinedInput
              id="outlined-adornment-address"
              label="Address"
              name="address"
              type="text"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.address}
            />
            {Boolean(formik.touched.address && formik.errors.address) && (
              <FormHelperText error>{formik.errors.address}</FormHelperText>
            )}
          </FormControl>

          <FormControl sx={{ marginY: 2 }} fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-phone-number">Phone Number</InputLabel>
            <OutlinedInput
              id="outlined-adornment-phone-number"
              label="Phone Number"
              name="phoneNumber"
              type="text"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.phoneNumber}
            />
            {Boolean(formik.touched.phoneNumber && formik.errors.phoneNumber) && (
              <FormHelperText error>{formik.errors.phoneNumber}</FormHelperText>
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
              handleRedirectOnClick(router, '/employee');
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
