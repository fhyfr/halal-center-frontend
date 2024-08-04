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
  OutlinedInput,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { createNewPresence } from '../../services/api/presence';
import { handleRedirectOnClick } from '../../utils/handle-event-button';

export const AddPresence = ({ attendance }) => {
  const router = useRouter();

  const [info, setInfo] = useState(undefined);
  const [errMessage, setErrMessage] = useState(undefined);

  const formik = useFormik({
    initialValues: {
      attendanceId: attendance.id,
      userId: router.query.userId,
      summary: '',
    },
    validationSchema: Yup.object({
      attendanceId: Yup.number().required('Attendance ID is required'),
      userId: Yup.number().required('User ID is required'),
      summary: Yup.string().required('Summary is required'),
    }),
    onSubmit: (values, action) => {
      createNewPresence(values)
        .then((res) => {
          setInfo(res);
          setErrMessage(undefined);

          setTimeout(() => {
            router.push(`/course/details?courseId=${attendance.courseId}`);
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
          subheader={`Fill out this form for add new presence for ${attendance.title}`}
          title={attendance.title}
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
            <InputLabel htmlFor="outlined-adornment-attendance-id">Attendance ID</InputLabel>
            <OutlinedInput
              id="outlined-adornment-attendance-id"
              label="Attendance ID"
              name="attendanceId"
              type="number"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.attendanceId}
              disabled
            />
            {Boolean(formik.touched.attendanceId && formik.errors.attendanceId) && (
              <FormHelperText error>{formik.errors.attendanceId}</FormHelperText>
            )}
          </FormControl>

          <FormControl sx={{ marginY: 2 }} fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-user-id">User ID</InputLabel>
            <OutlinedInput
              id="outlined-adornment-user-id"
              label="User ID"
              name="userId"
              type="number"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.userId}
              disabled
            />
            {Boolean(formik.touched.userId && formik.errors.userId) && (
              <FormHelperText error>{formik.errors.userId}</FormHelperText>
            )}
          </FormControl>

          <FormControl sx={{ marginY: 2 }} fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-summary">Summary</InputLabel>
            <OutlinedInput
              id="outlined-adornment-summary"
              label="Summary"
              name="summary"
              type="text"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.summary}
              multiline="true"
              minRows={10}
            />
            {Boolean(formik.touched.summary && formik.errors.summary) && (
              <FormHelperText error>{formik.errors.summary}</FormHelperText>
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
              handleRedirectOnClick(router, `/course/details?courseId=${attendance.courseId}`);
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
