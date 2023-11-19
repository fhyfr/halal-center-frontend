import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '../../../components/dashboard-layout';
import { ImportScores } from '../../../components/score/import-scores';

export const getServerSideProps = async ({ query }) => {
  const testId = query.testId;

  if (testId === undefined || testId === null) {
    return {
      redirect: {
        permanent: false,
        destination: '/test',
      },
      props: {},
    };
  }

  return { props: { testId } };
};

const ImportScoresPage = (props) => {
  const { testId } = props;

  return (
    <>
      <Head>
        <title>Import Scores</title>
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
            Import Scores
          </Typography>
          <Box sx={{ pt: 3 }}>
            <ImportScores testId={testId} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

ImportScoresPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ImportScoresPage;
