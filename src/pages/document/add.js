import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { AddDocument } from '../../components/document/add-document';

const Page = () => (
  <>
    <Head>
      <title>Add New Document</title>
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
          Document
        </Typography>
        <Box sx={{ pt: 3 }}>
          <AddDocument />
        </Box>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
