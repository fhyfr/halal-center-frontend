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
import { createNewDocument } from '../../services/api/document';
import { useRouter } from 'next/router';
import { handleRedirectOnClick } from '../../utils/handle-event-button';

export const AddDocument = () => {
  const router = useRouter();

  const [info, setInfo] = useState(undefined);
  const [errMessage, setErrMessage] = useState(undefined);

  const formik = useFormik({
    initialValues: {
      type: '',
      courseId: 0,
      userId: 0,
      url: '',
    },
    validationSchema: Yup.object({
      type: Yup.string().required('Type is required'),
      courseId: Yup.number().required('Course id is required'),
      userId: Yup.number(),
      url: Yup.string().url().required('Document url is required'),
    }),
    onSubmit: (values, action) => {
      if (values.userId === 0 && values.type !== 'CERTIFICATE') {
        delete values.userId;
      }

      createNewDocument(values)
        .then((res) => {
          setInfo(res);
          setErrMessage(undefined);

          setTimeout(() => {
            router.push('/document');
          }, 2000);
        })
        .catch((err) => {
          setErrMessage(err.response.data?.message);
          setInfo(undefined);
          action.setSubmitting(false);
        });
    },
  });

  const handleUploadDocument = async (event) => {
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
        <CardHeader subheader="Fill out this form for add new document" title="Add New Document" />
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
              Upload Document
              <input
                id="upload-document-id"
                name="url"
                hidden
                accept="application/pdf"
                type="file"
                onChange={handleUploadDocument}
              />
            </Button>
          </CardActions>

          <FormControl sx={{ marginTop: 1, marginBottom: 2 }} fullWidth variant="outlined">
            <InputLabel id="select-document-type">Document Type</InputLabel>
            <Select
              labelId="select-document-type"
              id="select-document-type"
              value={formik.values.type}
              label="Document Type"
              onChange={formik.handleChange}
              name="type"
            >
              <MenuItem disabled key="" value="">
                --- Select Type ---
              </MenuItem>
              <MenuItem key="MODULE" value="MODULE">
                MODULE
              </MenuItem>
              <MenuItem key="CERTIFICATE" value="CERTIFICATE">
                CERTIFICATE
              </MenuItem>
            </Select>
            {Boolean(formik.touched.departmentId && formik.errors.departmentId) && (
              <FormHelperText error>{formik.errors.departmentId}</FormHelperText>
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
              disabled={formik.values.type !== 'CERTIFICATE'}
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
              handleRedirectOnClick(router, '/document');
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
