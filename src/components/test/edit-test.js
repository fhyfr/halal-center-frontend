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
import { updateTest } from '../../services/api/test';

export const EditTest = ({ test }) => {
  const router = useRouter();

  const [info, setInfo] = useState(undefined);
  const [errMessage, setErrMessage] = useState(undefined);

  const formik = useFormik({
    initialValues: {
      courseId: test.courseId,
      url: test.url,
      type: test.type,
      startDate: test.startDate,
      endDate: test.endDate,
      active: test.active,
    },
    validationSchema: Yup.object({
      courseId: Yup.string().required('Course id is required'),
      url: Yup.string().url().required('Test URL is required'),
      type: Yup.string().required(),
      startDate: Yup.string().required(),
      endDate: Yup.string().required(),
      active: Yup.string().required('Status is required'),
    }),
    onSubmit: (values, action) => {
      updateTest(test.id, values)
        .then((res) => {
          setInfo(res);
          setErrMessage(undefined);

          setTimeout(() => {
            router.push('/test');
          }, 2000);
        })
        .catch((err) => {
          setErrMessage(err.response.data?.message);
          setInfo(undefined);
          action.setSubmitting(false);
        });
    },
  });

  if (test.error) {
    return (
      <Typography align="center" variant="h4" style={{ color: 'red' }}>
        error, {test.error.message}
      </Typography>
    );
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader subheader="Fill out this form for edit the test data" title="Edit Test" />
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
            <InputLabel id="select-test-type">Test Type</InputLabel>
            <Select
              labelId="select-test-type"
              id="select-test-type"
              value={formik.values.type}
              label="Test Type"
              onChange={formik.handleChange}
              name="type"
            >
              <MenuItem disabled key="" value="">
                --- Select Test Type ---
              </MenuItem>
              <MenuItem key="1" value="PRE_TEST">
                PRE TEST
              </MenuItem>
              <MenuItem key="2" value="POST_TEST">
                POST TEST
              </MenuItem>
            </Select>
            {Boolean(formik.touched.type && formik.errors.type) && (
              <FormHelperText error>{formik.errors.type}</FormHelperText>
            )}
          </FormControl>

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

          <FormControl sx={{ marginY: 2 }} fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-test-url">Test URL</InputLabel>
            <OutlinedInput
              id="outlined-adornment-test-url"
              label="Test URL"
              name="url"
              type="text"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.url}
            />
            {Boolean(formik.touched.url && formik.errors.url) && (
              <FormHelperText error>{formik.errors.url}</FormHelperText>
            )}
          </FormControl>

          <Stack
            sx={{ marginX: 2, marginTop: 6, marginBottom: 3 }}
            alignItems="center"
            direction="row"
            spacing={4}
          >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <InputLabel htmlFor="id-start-date">Start Date</InputLabel>
              <DesktopDateTimePicker
                onChange={(value) => {
                  formik.setFieldValue('startDate', value);
                }}
                value={formik.values.startDate}
                inputFormat="dd/MM/yyyy HH:mm"
                ampm={false}
                renderInput={(params) => (
                  <TextField
                    id="id-start-date"
                    sx={{ maxWidth: 600 }}
                    error={Boolean(formik.touched.startDate && formik.errors.startDate)}
                    helperText={formik.touched.startDate && formik.errors.startDate}
                    label="Start Date"
                    name="startDate"
                    variant="outlined"
                    {...params}
                  />
                )}
              />
            </LocalizationProvider>
          </Stack>

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
              handleRedirectOnClick(router, '/test');
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
