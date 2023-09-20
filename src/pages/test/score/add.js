import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '../../../components/dashboard-layout';
import { parseCookies } from '../../../lib/auth-cookies';
import axios from 'axios';
import { AddScore } from '../../../components/score/add-score';

const { NEXT_PUBLIC_API } = process.env;

export const getServerSideProps = async ({ req, query }) => {
  let test;
  const testId = query.testId;

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

  if (!testId) {
    return {
      redirect: {
        permanent: false,
        destination: '/test',
      },
      props: {},
    };
  }

  try {
    const responseTest = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/test/${testId}`,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    if (responseTest.status !== 200) {
      throw new Error('failed to get data test');
    }

    test = responseTest.data;
  } catch (err) {
    test = { error: { message: err.message } };
  }

  return { props: { test } };
};

const AddNew = (props) => {
  const { test } = props;

  return (
    <>
      <Head>
        <title>Add New Score</title>
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
            Add New Score
          </Typography>
          <Box sx={{ pt: 3 }}>
            <AddScore test={test} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

AddNew.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default AddNew;
