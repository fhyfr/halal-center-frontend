import { Add } from '@mui/icons-material';
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
import { useRouter } from 'next/router';
import { Search as SearchIcon } from '../../icons/search';
import { handleRedirectOnClick } from '../../utils/handle-event-button';
import useAuth from '../../hooks/use-auth';

export const CourseListToolbar = ({ categories }) => {
  const { user } = useAuth();
  const router = useRouter();

  const handleFilterCategory = (event) => {
    const path = router.pathname;
    const query = router.query;
    query.categoryId = event.target.value;

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
          List Course
        </Typography>
        {(user && user?.role?.roleName === 'MEMBER') || user?.role?.roleName === 'INSTRUCTOR' ? (
          <Box sx={{ m: 1 }}></Box>
        ) : (
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
                handleRedirectOnClick(router, '/course/add');
              }}
            >
              Add New
            </Button>
          </Box>
        )}
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={6} md={8}>
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
                    placeholder="Search course name"
                    variant="outlined"
                    onChange={handleSearch}
                  />
                </Box>
              </Grid>

              <Grid item xs={6} md={4}>
                <Box sx={{ maxWidth: 200 }}>
                  <FormControl fullWidth>
                    <InputLabel variant="standard" htmlFor="select-category">
                      Category
                    </InputLabel>
                    <NativeSelect
                      defaultValue=""
                      inputProps={{
                        name: 'role',
                        id: 'select-category',
                      }}
                      onChange={handleFilterCategory}
                    >
                      <option disabled> -- Select Category -- </option>
                      {categories.data.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.categoryName}
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
