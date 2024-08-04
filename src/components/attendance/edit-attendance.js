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
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { handleRedirectOnClick } from '../../utils/handle-event-button';
import { Stack } from '@mui/system';
import { DesktopDateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { updateAttendance } from '../../services/api/attendance';

export const EditAttendance = ({ attendance }) => {
  const router = useRouter();

  const [info, setInfo] = useState(undefined);
  const [errMessage, setErrMessage] = useState(undefined);

  const formik = useFormik({
    initialValues: {
      courseId: attendance.courseId,
      title: attendance.title,
      endDate: attendance.endDate,
      active: attendance.active,
    },
    validationSchema: Yup.object({
      courseId: Yup.number().required('Course ID is required'),
      title: Yup.string().required('Title is required'),
      endDate: Yup.string().required('End Date is required'),
      active: Yup.string().required('Status is required'),
    }),
    onSubmit: (values, action) => {
      updateAttendance(attendance.id, values)
        .then((res) => {
          setInfo(res);
          setErrMessage(undefined);

          setTimeout(() => {
            router.push('/attendance');
          }, 2000);
        })
        .catch((err) => {
          setErrMessage(err.response.data?.message);
          setInfo(undefined);
          action.setSubmitting(false);
        });
    },
  });

  if (attendance.error) {
    return (
      <Typography align="center" variant="h4" style={{ color: 'red' }}>
        error, {attendance.error.message}
      </Typography>
    );
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader
          subheader="Fill out this form for edit the attendance data"
          title="Edit Attendance"
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
            <InputLabel htmlFor="outlined-adornment-course-id">Course ID</InputLabel>
            <OutlinedInput
              id="outlined-adornment-course-id"
              label="Course ID"
              name="courseId"
              type="number"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.courseId}
            />
            {Boolean(formik.touched.courseId && formik.errors.courseId) && (
              <FormHelperText error>{formik.errors.courseId}</FormHelperText>
            )}
          </FormControl>

          <FormControl sx={{ marginY: 2 }} fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-title">Title</InputLabel>
            <OutlinedInput
              id="outlined-adornment-title"
              label="Title"
              name="title"
              type="text"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.title}
            />
            {Boolean(formik.touched.title && formik.errors.title) && (
              <FormHelperText error>{formik.errors.title}</FormHelperText>
            )}
          </FormControl>

          <Stack
            sx={{ marginX: 2, marginTop: 6, marginBottom: 3 }}
            alignItems="center"
            direction="row"
            spacing={4}
          >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <InputLabel htmlFor="id-end-date">End Date</InputLabel>
              <DesktopDateTimePicker
                onChange={(value) => {
                  formik.setFieldValue('endDate', value);
                }}
                value={formik.values.endDate}
                inputFormat="dd/MM/yyyy HH:mm"
                ampm={false}
                renderInput={(params) => (
                  <TextField
                    id="id-end-date"
                    sx={{ maxWidth: 600 }}
                    error={Boolean(formik.touched.endDate && formik.errors.endDate)}
                    helperText={formik.touched.endDate && formik.errors.endDate}
                    label="End Date"
                    name="endDate"
                    variant="outlined"
                    {...params}
                  />
                )}
              />
            </LocalizationProvider>
          </Stack>

          <FormControl sx={{ marginTop: 1, marginBottom: 2 }} fullWidth variant="outlined">
            <InputLabel id="select-status">Status</InputLabel>
            <Select
              labelId="select-status"
              id="select-status"
              value={formik.values.active}
              label="Status"
              onChange={formik.handleChange}
              name="active"
            >
              <MenuItem disabled key="" value="">
                --- Select Status ---
              </MenuItem>
              <MenuItem key="1" value="true">
                Active
              </MenuItem>
              <MenuItem key="2" value="false">
                Inactive
              </MenuItem>
            </Select>
            {Boolean(formik.touched.active && formik.errors.active) && (
              <FormHelperText error>{formik.errors.active}</FormHelperText>
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
              handleRedirectOnClick(router, '/attendance');
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
