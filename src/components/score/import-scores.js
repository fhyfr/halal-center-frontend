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
} from '@mui/material';
import { FileDownload } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { handleRedirectOnClick } from '../../utils/handle-event-button';
import { downloadImportScoresTemplate, importScores } from '../../services/api/score';

export const ImportScores = ({ testId }) => {
  const router = useRouter();

  const [info, setInfo] = useState(undefined);
  const [errMessage, setErrMessage] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const handleDownloadTemplate = async () => {
    setIsLoading(true);

    try {
      await downloadImportScoresTemplate(testId);
      setErrMessage(undefined);
      setInfo('Template downloaded successfully');
    } catch (err) {
      setErrMessage(err.response?.data?.message || 'An error occurred during download.');
      setInfo(undefined);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImportScores = async (event) => {
    setIsLoading(true);

    importScores(event.target.files[0])
      .then((res) => {
        setInfo(res.message);
        setErrMessage(undefined);

        setTimeout(() => {
          router.push(`/test/score?testId=${testId}`);
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
        <Card>
          <CardHeader
            subheader="Click download template button for download the import scores template"
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

            <CardActions>
              <Button
                sx={{ width: '20%', mx: 'auto', p: 1 }}
                color="secondary"
                type="button"
                fullWidth
                variant="contained"
                component="label"
                startIcon={<FileDownload />}
                onClick={handleDownloadTemplate}
              >
                Download Template
              </Button>
            </CardActions>
          </CardContent>
          <Divider />

          <CardHeader
            subheader="Import the scores template file that has been filled in with the data of the scores to be imported"
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
                  onChange={handleImportScores}
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
              color="error"
              variant="text"
              onClick={() => {
                handleRedirectOnClick(router, `/test/score?testId=${testId}`);
              }}
            >
              Cancel
            </Button>
          </Box>
        </Card>
      )}
    </>
  );
};
