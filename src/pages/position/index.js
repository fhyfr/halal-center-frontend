import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { PositionListResults } from '../../components/position/position-list-results';
import { PositionListToolbar } from '../../components/position/position-list-toolbar';
import { DashboardLayout } from '../../components/dashboard-layout';
import { position } from '../../__mocks__/position';

const Page = () => (
  <>
    <Head>
      <title>Position</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <PositionListToolbar />
        <Box sx={{ mt: 3 }}>
          <PositionListResults position={position} />
        </Box>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
