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
import * as Yup from 'yup';
import { createNewDepartment } from '../../services/api/department';
import { handleRedirectOnClick } from '../../utils/handle-event-button';

export const AddDepartment = (props) => {
  const router = useRouter();

  const [info, setInfo] = useState(undefined);
  const [errMessage, setErrMessage] = useState(undefined);

  const formik = useFormik({
    initialValues: {
      departmentName: '',
    },
    validationSchema: Yup.object({
      departmentName: Yup.string().required('Department Name is required'),
    }),
    onSubmit: async (values) => {
      createNewDepartment(values.departmentName)
        .then((res) => {
          setInfo(res);
          setErrMessage(undefined);
          setTimeout(() => {
            router.push('/department');
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
        <CardHeader
          subheader="Fill out this form for add new department"
          title="Add New Department"
        />
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
            <InputLabel htmlFor="outlined-adornment-department-name">Department Name</InputLabel>
            <OutlinedInput
              id="outlined-adornment-department-name"
              label="Department Name"
              name="departmentName"
              type="text"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.departmentName}
            />
            {Boolean(formik.touched.departmentName && formik.errors.departmentName) && (
              <FormHelperText error>{formik.errors.departmentName}</FormHelperText>
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
              handleRedirectOnClick(router, '/department');
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
