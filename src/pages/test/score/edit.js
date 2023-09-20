import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '../../../components/dashboard-layout';
import { parseCookies } from '../../../lib/auth-cookies';
import axios from 'axios';
import { EditScore } from '../../../components/score/edit-score';

const { NEXT_PUBLIC_API } = process.env;

export const getServerSideProps = async ({ req, query }) => {
  let score;
  const scoreId = query.scoreId;

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

  if (!scoreId) {
    return {
      redirect: {
        permanent: false,
        destination: '/test',
      },
      props: {},
    };
  }

  try {
    const responseScore = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/score/${scoreId}`,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    if (responseScore.status !== 200) {
      throw new Error('failed to get data score');
    }

    score = responseScore.data;
  } catch (err) {
    score = { error: { message: err.message } };
  }

  return { props: { score } };
};

const Edit = (props) => {
  const { score } = props;

  return (
    <>
      <Head>
        <title>Edit Score</title>
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
            Edit Score
          </Typography>
          <Box sx={{ pt: 3 }}>
            <EditScore score={score} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Edit.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Edit;
