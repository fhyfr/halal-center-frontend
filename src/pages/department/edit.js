import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { useRouter } from 'next/router';
import { EditDepartment } from '../../components/department/edit-department';

const Edit = () => {
  let department;
  const router = useRouter();
  if (router.query.departmentId && router.query.departmentName) {
    department = {
      departmentId: router.query.departmentId,
      departmentName: router.query.departmentName,
    };
  } else {
    router.push('/department');
  }

  return (
    <>
      <Head>
        <title>Edit Department</title>
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
            Department
          </Typography>
          <Box sx={{ pt: 3 }}>
            <EditDepartment department={department} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Edit.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Edit;
