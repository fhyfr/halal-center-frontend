import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DepartmentListResults } from '../../components/department/department-list-results';
import { DepartmentListToolbar } from '../../components/department/department-list-toolbar';
import { DashboardLayout } from '../../components/dashboard-layout';
import { department } from '../../__mocks__/department';

const Page = () => (
  <>
    <Head>
      <title>Department</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <DepartmentListToolbar />
        <Box sx={{ mt: 3 }}>
          <DepartmentListResults department={department} />
        </Box>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
