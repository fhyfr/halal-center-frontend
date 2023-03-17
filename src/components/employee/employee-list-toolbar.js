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

export const EmployeeListToolbar = ({ departments, positions }) => {
  const router = useRouter();

  const handleFilterDepartment = (event) => {
    const path = router.pathname;
    const query = router.query;
    query.departmentId = event.target.value;
    router.push({
      pathname: path,
      query: query,
    });
  };

  const handleFilterPosition = (event) => {
    const path = router.pathname;
    const query = router.query;
    query.positionId = event.target.value;
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
          Employees
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
              handleRedirectOnClick(router, '/employee/add');
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
              <Grid item xs={4} md={8}>
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
                    placeholder="Search employee name"
                    variant="outlined"
                    onChange={handleSearch}
                  />
                </Box>
              </Grid>

              <Grid item xs={4} md={2}>
                <Box sx={{ maxWidth: 200 }}>
                  <FormControl fullWidth>
                    <InputLabel variant="standard" htmlFor="select-role">
                      Department
                    </InputLabel>
                    <NativeSelect
                      defaultValue=""
                      inputProps={{
                        name: 'role',
                        id: 'select-role',
                      }}
                      onChange={handleFilterDepartment}
                    >
                      <option disabled> -- Select Department -- </option>
                      {departments.data.map((department) => (
                        <option key={department.id} value={department.id}>
                          {department.departmentName}
                        </option>
                      ))}
                    </NativeSelect>
                  </FormControl>
                </Box>
              </Grid>

              <Grid item xs={4} md={2}>
                <Box sx={{ maxWidth: 200 }}>
                  <FormControl fullWidth>
                    <InputLabel variant="standard" htmlFor="select-role">
                      Position
                    </InputLabel>
                    <NativeSelect
                      defaultValue=""
                      inputProps={{
                        name: 'role',
                        id: 'select-role',
                      }}
                      onChange={handleFilterPosition}
                    >
                      <option disabled> -- Select Position -- </option>
                      {positions.data.map((position) => (
                        <option key={position.id} value={position.id}>
                          {position.positionName}
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
