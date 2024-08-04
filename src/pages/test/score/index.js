import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../../../components/dashboard-layout';
import { parseCookies } from '../../../lib/auth-cookies';
import axios from 'axios';
import { ScoreListResults } from '../../../components/score/score-list-results';
import { ScoreListToolbar } from '../../../components/score/score-list-toolbar';

const { NEXT_PUBLIC_API } = process.env;

export const getServerSideProps = async ({ req, query }) => {
  const page = query.page || 1;
  const size = query.limit || 10;
  const testId = query.testId;
  const userId = query.userId;

  let scores = null;
  const data = parseCookies(req);
  if (!data.user) {
    return {
      redirect: {
        permanent: false,
        destination: '/auth/login',
      },
      props: {},
    };
  }
  const user = JSON.parse(data.user);

  let queryParams = { page, size };

  if (testId && testId > 0) {
    Object.assign(queryParams, { testId });
  } else {
    return {
      redirect: {
        permanent: false,
        destination: '/test',
      },
      props: {},
    };
  }

  if (userId && userId > 0) {
    Object.assign(queryParams, { userId });
  }

  try {
    const responseScores = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/score`,
      params: queryParams,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    if (responseScores.status !== 200) {
      throw new Error('failed to get data scores');
    }

    scores = responseScores.data;
  } catch (err) {
    scores = { error: { message: err.message } };
  }

  return { props: { scores } };
};

const Score = (props) => {
  const { scores } = props;

  return (
    <>
      <Head>
        <title>Scores | Halal Center</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <ScoreListToolbar />
          <Box sx={{ mt: 3 }}>
            <ScoreListResults scores={scores} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Score.getLayout = (score) => <DashboardLayout>{score}</DashboardLayout>;

export default Score;
