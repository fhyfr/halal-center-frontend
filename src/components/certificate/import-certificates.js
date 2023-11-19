import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FileDownload } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { handleRedirectOnClick } from '../../utils/handle-event-button';
import {
  downloadImportCertificatesTemplate,
  importCertificates,
} from '../../services/api/certificate';

export const ImportCertificates = () => {
  const router = useRouter();

  const [info, setInfo] = useState(undefined);
  const [errMessage, setErrMessage] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      courseId: '',
    },
    validationSchema: Yup.object({
      courseId: Yup.string().required('Course id is required'),
    }),
  });

  const handleDownloadTemplate = async () => {
    setIsLoading(true);

    try {
      await downloadImportCertificatesTemplate(formik.values.courseId);
      setErrMessage(undefined);
      setInfo('Template downloaded successfully');
    } catch (err) {
      setErrMessage(err.response?.data?.message || 'An error occurred during download.');
      setInfo(undefined);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImportCertificates = async (event) => {
    setIsLoading(true);

    importCertificates(event.target.files[0])
      .then((res) => {
        setInfo(res.message);
        setErrMessage(undefined);

        setTimeout(() => {
          router.push('/certificate');
        }, 2000);
      })
      .catch((err) => {
        setErrMessage(err.response.data?.message);
        setInfo(undefined);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      {isLoading ? (
        <CircularProgress sx={{ position: 'absolute', top: '50%', left: '55%' }} />
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <Card>
            <CardHeader
              subheader="Please enter the course id for download the import certificate template"
              title="Download Template"
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

              <CardActions>
                <Button
                  sx={{ width: '20%', mx: 'auto', p: 1 }}
                  color="secondary"
                  type="button"
                  fullWidth
                  variant="contained"
                  component="label"
                  startIcon={<FileDownload />}
                  disabled={formik.values.courseId === ''}
                  onClick={handleDownloadTemplate}
                >
                  Download Template
                </Button>
              </CardActions>
            </CardContent>
            <Divider />

            <CardHeader
              subheader="Import the certificates template file that has been filled in with the data of the certificates to be imported"
              title="Import Certificates"
            />
            <Divider />
            <CardContent>
              <CardActions>
                <Button
                  color="warning"
                  fullWidth
                  variant="contained"
                  component="label"
                  startIcon={<FileDownload />}
                  sx={{ width: '20%', mx: 'auto', p: 1 }}
                >
                  Import Certificates
                  <input
                    id="import-certificates-id"
                    name="url"
                    hidden
                    type="file"
                    onChange={handleImportCertificates}
                  />
                </Button>
              </CardActions>
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
            </Box>
          </Card>
        </form>
      )}
    </>
  );
};
