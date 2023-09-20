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
import { Add, ArrowBack } from '@mui/icons-material';
import { handleRedirectOnClick } from '../../utils/handle-event-button';
import { useRouter } from 'next/router';

export const ScoreListToolbar = () => {
  const router = useRouter();

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
        }}
      >
        <Box sx={{ marginY: 2 }}>
          <Button
            startIcon={
              <SvgIcon fontSize="small">
                <ArrowBack />
              </SvgIcon>
            }
            color="primary"
            variant="contained"
            onClick={() => {
              handleRedirectOnClick(router, '/test');
            }}
          >
            Back
          </Button>
        </Box>

        <Typography sx={{ m: 1 }} variant="h4">
          Scores for Test ID: {router.query.testId}
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
              handleRedirectOnClick(router, `/test/score/add?testId=${router.query.testId}`);
            }}
          >
            Add New Score
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
                    placeholder="Filter by User ID"
                    variant="outlined"
                    type="number"
                    onChange={handleFilterUser}
                  />
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
