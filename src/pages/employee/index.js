import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { EmployeeListResults } from '../../components/employee/employee-list-results';
import { EmployeeListToolbar } from '../../components/employee/employee-list-toolbar';
import { DashboardLayout } from '../../components/dashboard-layout';
import { employee } from '../../__mocks__/employee';

const Page = () => (
  <>
    <Head>
      <title>Employee</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <EmployeeListToolbar />
        <Box sx={{ mt: 3 }}>
          <EmployeeListResults employee={employee} />
        </Box>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
