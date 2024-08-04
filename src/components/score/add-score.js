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
import { handleRedirectOnClick } from '../../utils/handle-event-button';
import { createNewScore } from '../../services/api/score';

export const AddScore = ({ test }) => {
  const router = useRouter();

  const [info, setInfo] = useState(undefined);
  const [errMessage, setErrMessage] = useState(undefined);

  const formik = useFormik({
    initialValues: {
      testId: test.id,
      userId: '',
      score: '',
    },
    validationSchema: Yup.object({
      testId: Yup.number().required('Test ID is required'),
      userId: Yup.number().required('User ID is required'),
      score: Yup.number().min(0).max(100).required('Score is required'),
    }),
    onSubmit: (values, action) => {
      createNewScore(values)
        .then((res) => {
          setInfo(res);
          setErrMessage(undefined);

          setTimeout(() => {
            router.push(`/test/score?testId=${test.id}`);
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
        <CardHeader subheader="Fill out this form for add new score" title="Add New Score" />
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
            <InputLabel htmlFor="outlined-adornment-test-id">Test ID</InputLabel>
            <OutlinedInput
              id="outlined-adornment-test-id"
              label="Test ID"
              name="testId"
              type="number"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.testId}
              disabled
            />
            {Boolean(formik.touched.testId && formik.errors.testId) && (
              <FormHelperText error>{formik.errors.testId}</FormHelperText>
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
            />
            {Boolean(formik.touched.userId && formik.errors.userId) && (
              <FormHelperText error>{formik.errors.userId}</FormHelperText>
            )}
          </FormControl>

          <FormControl sx={{ marginY: 2 }} fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-score">Score</InputLabel>
            <OutlinedInput
              id="outlined-adornment-score"
              label="Score"
              name="score"
              type="number"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.score}
            />
            {Boolean(formik.touched.score && formik.errors.score) && (
              <FormHelperText error>{formik.errors.score}</FormHelperText>
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
              handleRedirectOnClick(router, `/test/score?testId=${router.query.testId}`);
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
