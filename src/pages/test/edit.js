import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { EditTest } from '../../components/test/edit-test';
import { parseCookies } from '../../lib/auth-cookies';
import axios from 'axios';

const { NEXT_PUBLIC_API } = process.env;

export const getServerSideProps = async ({ req, query }) => {
  let test;
  const { id } = query;
  if (!id || id === null) {
    return {
      redirect: {
        permanent: false,
        destination: '/test',
      },
      props: {},
    };
  }

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

  try {
    const responseTest = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/test/${id}`,
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

const Edit = (props) => {
  const { test } = props;

  return (
    <>
      <Head>
        <title>Edit Test</title>
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
            Test
          </Typography>
          <Box sx={{ pt: 3 }}>
            <EditTest test={test} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Edit.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Edit;
