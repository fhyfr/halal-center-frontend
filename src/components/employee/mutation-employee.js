import { useState } from 'react';
import {
  Alert,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'yup-phone';
import { useRouter } from 'next/router';
import { Box, Stack } from '@mui/system';
import { handleRedirectOnClick } from '../../utils/handle-event-button';
import { mutationEmployee } from '../../services/api/employee';

export const MutationEmployee = ({ departments, positions, employee }) => {
  const router = useRouter();

  const [info, setInfo] = useState(undefined);
  const [errMessage, setErrMessage] = useState(undefined);

  const formik = useFormik({
    initialValues: {
      positionId: employee.positionId,
      departmentId: employee.departmentId,
    },
    validationSchema: Yup.object({
      positionId: Yup.number().required('Position is required'),
      departmentId: Yup.number().required('Department is required'),
    }),
    onSubmit: async (values) => {
      mutationEmployee(employee.id, values)
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
        error, {departments.error.message}
      </Typography>
    );
  }
  if (positions.error) {
    return (
      <Typography align="center" variant="h4" style={{ color: 'red' }}>
        error, {positions.error.message}
      </Typography>
    );
  }
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
        <CardHeader
          subheader="Fill out this form for mutation employee. You can changes employee department or position"
          title="Mutation Employee"
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

          <FormControl
            sx={{ marginTop: 0, marginBottom: 2, marginX: 1 }}
            fullWidth
            variant="outlined"
          >
            <Stack alignItems="center" direction="row" spacing={2}>
              <Box>
                <Typography variant="h6">Employee Name</Typography>
                <Typography variant="body1">
                  {employee.fullName} ({employee.nik})
                </Typography>
              </Box>
            </Stack>
          </FormControl>

          <FormControl sx={{ marginY: 2 }} fullWidth variant="outlined">
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

          <FormControl sx={{ marginY: 2 }} fullWidth variant="outlined">
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
