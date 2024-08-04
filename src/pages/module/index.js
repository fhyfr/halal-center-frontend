import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { parseCookies } from '../../lib/auth-cookies';
import axios from 'axios';
import { ModuleListToolbar } from '../../components/module/module-list-toolbar';
import { ModuleListResults } from '../../components/module/module-list-results';

const { NEXT_PUBLIC_API } = process.env;

export const getServerSideProps = async ({ req, query }) => {
  const page = query.page || 1;
  const size = query.limit || 10;
  const courseId = query.courseId;

  let modules = null;
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

  try {
    const response = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/module`,
      params: queryParams,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    if (response.status !== 200) {
      throw new Error('failed to get data modules');
    }

    modules = response.data;
  } catch (err) {
    modules = { error: { message: err.message } };
  }

  return { props: { modules } };
};

const Module = (props) => {
  const { modules } = props;

  return (
    <>
      <Head>
        <title>Modules | Halal Center</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <ModuleListToolbar />
          <Box sx={{ mt: 3 }}>
            <ModuleListResults modules={modules} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Module.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Module;
