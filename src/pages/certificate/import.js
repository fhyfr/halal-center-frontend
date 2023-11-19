import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { ImportCertificates } from '../../components/certificate/import-certificates';

const ImportCertificatePage = () => (
  <>
    <Head>
      <title>Import Certificates</title>
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
          Import Certificates
        </Typography>
        <Box sx={{ pt: 3 }}>
          <ImportCertificates />
        </Box>
      </Container>
    </Box>
  </>
);

ImportCertificatePage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ImportCertificatePage;
