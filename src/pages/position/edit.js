import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { useRouter } from 'next/router';
import { EditPosition } from '../../components/position/edit-position';

const Edit = () => {
  let position;
  const router = useRouter();
  if (router.query.positionId && router.query.positionName) {
    position = {
      positionId: router.query.positionId,
      positionName: router.query.positionName,
    };
  } else {
    router.push('/position');
  }

  return (
    <>
      <Head>
        <title>Edit Position</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography sx={{ mb: 3 }} variant="h4">
            Position
          </Typography>
          <Box sx={{ pt: 3 }}>
            <EditPosition position={position} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Edit.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Edit;
