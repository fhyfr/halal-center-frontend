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
import 'yup-phone';
import { useRouter } from 'next/router';
import { handleRedirectOnClick } from '../../utils/handle-event-button';
import { editEmployee } from '../../services/api/employee';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CancelRounded } from '@mui/icons-material';

export const EditEmployee = ({ employee }) => {
  const router = useRouter();

  const [info, setInfo] = useState(undefined);
  const [errMessage, setErrMessage] = useState(undefined);
  const [salary, setSalary] = useState(employee.salary);

  const formik = useFormik({
    initialValues: {
      nik: employee.nik,
      fullName: employee.fullName,
      address: employee.address,
      phoneNumber: employee.phoneNumber,
      joinDate: employee.joinDate,
      gender: employee.gender,
    },
    validationSchema: Yup.object({
      nik: Yup.string().required('NIK is required'),
      fullName: Yup.string().required('Full Name is required'),
      address: Yup.string().required('Address is required'),
      phoneNumber: Yup.string().phone('ID').required('Phone Number is required'),
      gender: Yup.string().required('Gender is required'),
      joinDate: Yup.string().required(),
    }),
    onSubmit: async (values) => {
      let employeeSalary;

      const updateEmployee = { ...values };
      if (typeof salary === 'number') {
        employeeSalary = salary;
      } else {
        employeeSalary = parseInt(salary.replace(/[^0-9\.]/gi, ''), 10);
      }

      Object.assign(updateEmployee, {
        salary: employeeSalary,
      });

      editEmployee(employee.id, updateEmployee)
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

  const handleOnChangeSalary = (e) => {
    setSalary(e.target.value.replace(/[^0-9\.]/gi, ''));
  };

  const handleOnBlurSalary = () => {
    if (salary === 0) {
      return;
    }

    if (typeof salary === 'number') {
      return;
    }

    let tempSalary = salary.replace(/[^0-9\.]/gi, '');
    if (tempSalary.match(/\./g) > 1) {
      const [thousands] = tempSalary.split('.');
      tempSalary = `${thousands}`;
    }

    tempSalary = Number(tempSalary).toLocaleString('en-EN', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });

    tempSalary = tempSalary.replace(/\$/g, '');

    setSalary(tempSalary);
  };

  if (employee.error) {
    return (
      <Typography align="center" variant="h4" style={{ color: 'red' }}>
        error, {employee.error.message}
      </Typography>
    );
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader subheader="Fill out this form for edit employee" title="Edit Employee" />
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
          <Grid container spacing={3}>
            <Grid item lg={6} md={6} xs={12}>
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
                <InputLabel id="select-gender">Gender</InputLabel>
                <Select
                  labelId="select-gender"
                  id="select-gender"
                  value={formik.values.gender}
                  label="Gender"
                  onChange={formik.handleChange}
                  name="gender"
                >
                  <MenuItem disabled key="" value="">
                    --- Select Gender ---
                  </MenuItem>
                  <MenuItem key="1" value="MALE">
                    MALE
                  </MenuItem>
                  <MenuItem key="2" value="FEMALE">
                    FEMALE
                  </MenuItem>
                </Select>
                {Boolean(formik.touched.gender && formik.errors.gender) && (
                  <FormHelperText error>{formik.errors.gender}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item lg={6} md={6} xs={12}>
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

              <FormControl sx={{ marginY: 2 }} fullWidth variant="outlined">
                <TextField
                  id="salary"
                  name="salary"
                  onChange={handleOnChangeSalary}
                  onBlur={handleOnBlurSalary}
                  value={salary}
                  inputProps={{
                    inputMode: 'numeric',
                  }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
                    endAdornment: (
                      <InputAdornment position="end">
                        {Boolean(salary) && (
                          <CancelRounded
                            size="small"
                            color="grey"
                            sx={{ padding: 0 }}
                            onClick={() => setSalary(0)}
                          />
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>

              <Stack
                sx={{ marginX: 1, marginY: 2 }}
                alignItems="center"
                direction="row"
                spacing={4}
              >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <InputLabel htmlFor="id-join-date">Join Date</InputLabel>
                  <DatePicker
                    onChange={(value) => {
                      formik.setFieldValue('joinDate', new Date(value).toISOString());
                    }}
                    value={formik.values.joinDate}
                    inputFormat="dd/MM/yyyy"
                    renderInput={(params) => (
                      <TextField
                        id="id-join-date"
                        sx={{ maxWidth: 200 }}
                        error={Boolean(formik.touched.joinDate && formik.errors.joinDate)}
                        helperText={formik.touched.joinDate && formik.errors.joinDate}
                        label="Join Date"
                        name="joinDate"
                        variant="outlined"
                        {...params}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Stack>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  p: 2,
                  marginTop: 3,
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
                  Update
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </form>
  );
};
