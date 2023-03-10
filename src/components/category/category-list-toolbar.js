import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
} from '@mui/material';
import { Search as SearchIcon } from '../../icons/search';
import { useRouter } from 'next/router';
import { handleRedirectOnClick } from '../../utils/handle-event-button';

export const CategoryListToolbar = (props) => {
  const router = useRouter();

  const handleSearch = (event) => {
    const path = router.pathname;
    const query = router.query;
    query.search = event.target.value;

    if (event.target.value.length > 2) {
      router.push({
        pathname: path,
        query: query,
      });
    } else {
      router.push({
        pathname: path,
      });
    }
  };

  return (
    <Box {...props}>
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
          Categories
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              handleRedirectOnClick(router, '/category/add');
            }}
          >
            Add New
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
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
                placeholder="Search category"
                variant="outlined"
                onChange={handleSearch}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
