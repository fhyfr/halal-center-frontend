import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { RoleListResults } from '../../components/role/role-list-results';
import { RoleListToolbar } from '../../components/role/role-list-toolbar';
import { DashboardLayout } from '../../components/dashboard-layout';
import { role } from '../../__mocks__/role';

const Page = () => (
  <>
    <Head>
      <title>Role</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <RoleListToolbar />
        <Box sx={{ mt: 3 }}>
          <RoleListResults role={role} />
        </Box>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
