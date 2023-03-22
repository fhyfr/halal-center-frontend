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
import { handleRedirectOnClick } from '../../utils/handle-event-button';
import { useRouter } from 'next/router';
import { Add } from '@mui/icons-material';

export const InstructorListToolbar = ({ courses }) => {
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

  const handleSearch = (event) => {
    const path = router.pathname;
    const query = router.query;
    query.search = event.target.value;

    router.push({
      pathname: path,
      query: query,
    });
  };

  if (courses.error) {
    return (
      <Typography align="center" variant="h4" style={{ color: 'red' }}>
        error, {courses.error.message}
      </Typography>
    );
  }

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
          Instructor
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
              handleRedirectOnClick(router, '/instructor/add');
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
              <Grid item xs={6} md={6}>
                <Box sx={{ maxWidth: 500 }}>
                  <TextField
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SvgIcon color="action" fontSize="small">
                            <SearchIcon />
                          </SvgIcon>
                        </InputAdornment>
                      ),
                    }}
                    placeholder="Search instructor name"
                    variant="outlined"
                    onChange={handleSearch}
                  />
                </Box>
              </Grid>
              <Grid item xs={6} md={6}>
                <Box sx={{ maxWidth: 200 }}>
                  <FormControl fullWidth>
                    <InputLabel variant="standard" htmlFor="select-course">
                      Course
                    </InputLabel>
                    <NativeSelect
                      defaultValue=""
                      inputProps={{
                        name: 'role',
                        id: 'select-course',
                      }}
                      onChange={handleFilterCourse}
                    >
                      <option disabled> -- Select Course -- </option>
                      {courses.data?.map((course) => (
                        <option key={course.id} value={course.id}>
                          {course.title}
                        </option>
                      ))}
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
