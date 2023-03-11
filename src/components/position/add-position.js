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
} from '@mui/material';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { handleRedirectOnClick } from '../../utils/handle-event-button';
import * as Yup from 'yup';
import { createNewPosition } from '../../services/api/position';

export const AddPosition = (props) => {
  const router = useRouter();

  const [info, setInfo] = useState(undefined);
  const [errMessage, setErrMessage] = useState(undefined);

  const formik = useFormik({
    initialValues: {
      positionName: '',
    },
    validationSchema: Yup.object({
      positionName: Yup.string().required('Position Name is required'),
    }),
    onSubmit: async (values) => {
      createNewPosition(values.positionName)
        .then((res) => {
          setInfo(res);
          setErrMessage(undefined);
          setTimeout(() => {
            router.push('/position');
          }, 2000);
        })
        .catch((err) => {
          setErrMessage(err.response.data?.message);
          setInfo(undefined);
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader subheader="Fill out this form for add new position" title="Add New Position" />
        <Divider />
        <CardContent>
          {info && (
            <Alert sx={{ marginY: 1 }} severity="success">
              {info}
            </Alert>
          )}

          {errMessage && (
            <Alert sx={{ marginY: 1 }} severity="error">
              {errMessage}
            </Alert>
          )}

          <FormControl sx={{ marginY: 1 }} fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-position-name">Position Name</InputLabel>
            <OutlinedInput
              id="outlined-adornment-position-name"
              label="Position Name"
              name="positionName"
              type="text"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.positionName}
            />
            {Boolean(formik.touched.positionName && formik.errors.positionName) && (
              <FormHelperText error>{formik.errors.positionName}</FormHelperText>
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
              handleRedirectOnClick(router, '/position');
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
