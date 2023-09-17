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
  FormControl,
  InputLabel,
  NativeSelect,
} from '@mui/material';
import { Search as SearchIcon } from '../../icons/search';
import { Add } from '@mui/icons-material';
import { handleRedirectOnClick } from '../../utils/handle-event-button';
import { useRouter } from 'next/router';

export const TestListToolbar = () => {
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

  const handleFilterType = (event) => {
    const path = router.pathname;
    const query = router.query;
    query.type = event.target.value;

    router.push({
      pathname: path,
      query: query,
    });
  };

  const handleFilterStatus = (event) => {
    const path = router.pathname;
    const query = router.query;
    query.status = event.target.value;

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
          Tests
        </Typography>

        <Box sx={{ m: 1 }}>
          <Button
            startIcon={
              <SvgIcon fontSize="small">
                <Add />
              </SvgIcon>
            }
            color="primary"
            variant="contained"
            onClick={() => {
              handleRedirectOnClick(router, '/test/add');
            }}
          >
            Add New
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={3} md={3}>
                <Box sx={{ maxWidth: 300 }}>
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
              <Grid item xs={2} md={2}>
                <Box sx={{ maxWidth: 200 }}>
                  <FormControl fullWidth>
                    <InputLabel variant="standard" htmlFor="select-type">
                      Type
                    </InputLabel>
                    <NativeSelect
                      defaultValue=""
                      inputProps={{
                        name: 'type',
                        id: 'select-type',
                      }}
                      onChange={handleFilterType}
                    >
                      <option disabled> -- Select Type -- </option>
                      <option key="1" value="PRE_TEST">
                        PRE TEST
                      </option>
                      <option key="2" value="POST_TEST">
                        POST TEST
                      </option>
                    </NativeSelect>
                  </FormControl>
                </Box>
              </Grid>

              <Grid item xs={2} md={2}>
                <Box sx={{ maxWidth: 200 }}>
                  <FormControl fullWidth>
                    <InputLabel variant="standard" htmlFor="select-status">
                      Status
                    </InputLabel>
                    <NativeSelect
                      defaultValue=""
                      inputProps={{
                        name: 'status',
                        id: 'select-status',
                      }}
                      onChange={handleFilterStatus}
                    >
                      <option disabled> -- Select Status -- </option>
                      <option key="1" value="true">
                        Active
                      </option>
                      <option key="2" value="false">
                        Inactive
                      </option>
                    </NativeSelect>
                  </FormControl>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
