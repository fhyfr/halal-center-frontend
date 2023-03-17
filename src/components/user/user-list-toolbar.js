import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
  FormControl,
  InputLabel,
  NativeSelect,
  Grid,
} from '@mui/material';
import { Search as SearchIcon } from '../../icons/search';
import { Add } from '@mui/icons-material';
import { handleRedirectOnClick } from '../../utils/handle-event-button';
import { useRouter } from 'next/router';

export const UserListToolbar = ({ roles }) => {
  const router = useRouter();

  const handleFilterRole = (event) => {
    const path = router.pathname;
    const query = router.query;
    query.roleId = event.target.value;
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
          Users
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
              handleRedirectOnClick(router, '/user/add');
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
                    placeholder="Search username"
                    variant="outlined"
                    onChange={handleSearch}
                  />
                </Box>
              </Grid>

              <Grid item xs={6} md={4}>
                <Box sx={{ maxWidth: 200 }}>
                  <FormControl fullWidth>
                    <InputLabel variant="standard" htmlFor="select-role">
                      Role
                    </InputLabel>
                    <NativeSelect
                      defaultValue=""
                      inputProps={{
                        name: 'role',
                        id: 'select-role',
                      }}
                      onChange={handleFilterRole}
                    >
                      <option disabled> -- Select Role -- </option>
                      {roles.data.map((role) =>
                        role.roleName === 'SUPER_ADMIN' ? (
                          ''
                        ) : (
                          <option key={role.id} value={role.id}>
                            {role.roleName}
                          </option>
                        ),
                      )}
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
