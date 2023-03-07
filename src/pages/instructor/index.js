import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { InstructorListResults } from '../../components/instructor/instructor-list-results';
import { InstructorListToolbar } from '../../components/instructor/instructor-list-toolbar';
import { DashboardLayout } from '../../components/dashboard-layout';
import { instructor } from '../../__mocks__/instructor';

const Page = () => (
  <>
    <Head>
      <title>Instructor</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <InstructorListToolbar />
        <Box sx={{ mt: 3 }}>
          <InstructorListResults instructor={instructor} />
        </Box>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
