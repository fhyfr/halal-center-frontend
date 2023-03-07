import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DocumentListResults } from '../../components/document/document-list-results';
import { DocumentListToolbar } from '../../components/document/document-list-toolbar';
import { DashboardLayout } from '../../components/dashboard-layout';
import { document } from '../../__mocks__/document';

const Page = () => (
  <>
    <Head>
      <title>Document</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <DocumentListToolbar />
        <Box sx={{ mt: 3 }}>
          <DocumentListResults document={document} />
        </Box>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
