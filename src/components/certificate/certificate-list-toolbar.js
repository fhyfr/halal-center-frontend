import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
  Grid,
} from '@mui/material';
import { Search as SearchIcon } from '../../icons/search';
import { Add, Download } from '@mui/icons-material';
import { handleRedirectOnClick } from '../../utils/handle-event-button';
import { useRouter } from 'next/router';
import useAuth from '../../hooks/use-auth';

export const CertificateListToolbar = () => {
  const { user } = useAuth();
  const router = useRouter();

  const handleFilterCourse = (event) => {
    const path = router.pathname;
    const query = router.query;
    query.courseId = event.target.value;

    router.push({
      pathname: path,
      query: query,
    });
  };

  const handleFilterUser = (event) => {
    const path = router.pathname;
    const query = router.query;
    query.userId = event.target.value;

    router.push({
      pathname: path,
      query: query,
    });
  };

  return (
    <Box>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Certificates
        </Typography>

        {user?.role?.roleName === 'INSTRUCTOR' ? (
          ''
        ) : (
          <>
            <Box sx={{ m: 2 }}>
              <Button
                sx={{ mr: 2 }}
                startIcon={
                  <SvgIcon fontSize="small">
                    <Add />
                  </SvgIcon>
                }
                color="primary"
                variant="contained"
                onClick={() => {
                  handleRedirectOnClick(router, '/certificate/add');
                }}
              >
                Add New
              </Button>

              <Button
                startIcon={
                  <SvgIcon fontSize="small">
                    <Download />
                  </SvgIcon>
                }
                color="warning"
                variant="contained"
                onClick={() => {
                  handleRedirectOnClick(router, '/certificate/import');
                }}
              >
                Import
              </Button>
            </Box>
          </>
        )}
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={3} md={3}>
                <Box sx={{ maxWidth: 400 }}>
                  <TextField
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <SvgIcon color="action" fontSize="small">
                            <SearchIcon />
                          </SvgIcon>
                        </InputAdornment>
                      ),
                    }}
                    placeholder="Filter by Course ID"
                    variant="outlined"
                    type="number"
                    onChange={handleFilterCourse}
                  />
                </Box>
              </Grid>

              {user?.role?.roleName === 'INSTRUCTOR' ? (
                ''
              ) : (
                <Grid item xs={3} md={3}>
                  <Box sx={{ maxWidth: 400 }}>
                    <TextField
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <SvgIcon color="action" fontSize="small">
                              <SearchIcon />
                            </SvgIcon>
                          </InputAdornment>
                        ),
                      }}
                      placeholder="Filter by User ID"
                      variant="outlined"
                      type="number"
                      onChange={handleFilterUser}
                    />
                  </Box>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
