import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { parseCookies } from '../../lib/auth-cookies';
import axios from 'axios';
import { TestListResults } from '../../components/test/test-list-results';
import { TestListToolbar } from '../../components/test/test-list-toolbar';

const { NEXT_PUBLIC_API } = process.env;

export const getServerSideProps = async ({ req, query }) => {
  const page = query.page || 1;
  const size = query.limit || 10;
  const courseId = query.courseId;
  const type = query.type;
  const active = query.status;

  let tests = null;
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

  if (courseId && courseId > 0) {
    Object.assign(queryParams, { courseId });
  }

  if (type) {
    Object.assign(queryParams, { type });
  }

  if (active) {
    const status = active === 'true';

    Object.assign(queryParams, { active: status });
  }

  try {
    const responseTests = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/test`,
      params: queryParams,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    if (responseTests.status !== 200) {
      throw new Error('failed to get data tests');
    }

    tests = responseTests.data;
  } catch (err) {
    tests = { error: { message: err.message } };
  }

  return { props: { tests: tests } };
};

const Test = (props) => {
  const { tests } = props;

  return (
    <>
      <Head>
        <title>Tests | Halal Center</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <TestListToolbar />
          <Box sx={{ mt: 3 }}>
            <TestListResults tests={tests} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Test.getLayout = (test) => <DashboardLayout>{test}</DashboardLayout>;

export default Test;
