import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FileUpload, PhotoCamera } from '@mui/icons-material';
import { uploadDocument } from '../../services/api/file';
import { useRouter } from 'next/router';
import { handleRedirectOnClick } from '../../utils/handle-event-button';
import { createNewCertificate } from '../../services/api/certificate';

export const AddCertificate = () => {
  const router = useRouter();

  const [info, setInfo] = useState(undefined);
  const [errMessage, setErrMessage] = useState(undefined);

  const formik = useFormik({
    initialValues: {
      courseId: '',
      userId: '',
      type: '',
      url: 'upload certificate to fill this document url',
    },
    validationSchema: Yup.object({
      courseId: Yup.string().required('Course id is required'),
      userId: Yup.string().required('User id is required'),
      type: Yup.string().required(),
      url: Yup.string().url().required('Document url is required'),
    }),
    onSubmit: (values, action) => {
      createNewCertificate(values)
        .then((res) => {
          setInfo(res);
          setErrMessage(undefined);

          setTimeout(() => {
            router.push('/certificate');
          }, 2000);
        })
        .catch((err) => {
          setErrMessage(err.response.data?.message);
          setInfo(undefined);
          action.setSubmitting(false);
        });
    },
  });

  const handleUploadCertificate = async (event) => {
    uploadDocument(event.target.files[0])
      .then((res) => {
        setInfo(res.message);
        formik.values.url = res.data.documentUrl;
        setErrMessage(undefined);
      })
      .catch((err) => {
        setErrMessage(err.response.data?.message);
        setInfo(undefined);
      });
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader
          subheader="Fill out this form for add new certificate"
          title="Add New Certificate"
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
          <CardActions>
            <Button
              color="primary"
              fullWidth
              variant="text"
              component="label"
              endIcon={<FileUpload />}
            >
              Upload Certificate
              <input
                id="upload-certificate-id"
                name="url"
                hidden
                accept="application/pdf"
                type="file"
                onChange={handleUploadCertificate}
              />
            </Button>
          </CardActions>

          <FormControl sx={{ marginTop: 1, marginBottom: 2 }} fullWidth variant="outlined">
            <InputLabel id="select-certificate-type">Certificate Type</InputLabel>
            <Select
              labelId="select-certificate-type"
              id="select-certificate-type"
              value={formik.values.type}
              label="Certificate Type"
              onChange={formik.handleChange}
              name="type"
            >
              <MenuItem disabled key="" value="">
                --- Select Certificate Type ---
              </MenuItem>
              <MenuItem key="1" value="CERTIFICATE_MEMBER">
                CERTIFICATE_MEMBER
              </MenuItem>
              <MenuItem key="2" value="CERTIFICATE_INSTRUCTOR">
                CERTIFICATE_INSTRUCTOR
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
            <InputLabel htmlFor="outlined-adornment-document-url">Document URL</InputLabel>
            <OutlinedInput
              id="outlined-adornment-document-url"
              label="Document URL"
              name="url"
              type="text"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.url}
              disabled
            />
            {Boolean(formik.touched.url && formik.errors.url) && (
              <FormHelperText error>{formik.errors.url}</FormHelperText>
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
              handleRedirectOnClick(router, '/certificate');
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
