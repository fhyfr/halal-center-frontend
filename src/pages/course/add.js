import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { AddCourse } from '../../components/course/add-course';

const AddNew = () => (
  <>
    <Head>
      <title>Add New Course</title>
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
          Course
        </Typography>
        <Box sx={{ pt: 3 }}>
          <AddCourse />
        </Box>
      </Container>
    </Box>
  </>
);

AddNew.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default AddNew;
