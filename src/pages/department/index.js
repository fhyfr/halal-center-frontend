import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DepartmentListResults } from '../../components/department/department-list-results';
import { DepartmentListToolbar } from '../../components/department/department-list-toolbar';
import { DashboardLayout } from '../../components/dashboard-layout';
import { parseCookies } from '../../lib/auth-cookies';
import axios from 'axios';

const { NEXT_PUBLIC_API } = process.env;

export const getServerSideProps = async ({ req, res, query }) => {
  const page = query.page || 1;
  const size = query.limit || 10;
  const search = query.search;

  let departments = null;
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

  let departmentURL;
  if (search && search.length > 0) {
    departmentURL = `${NEXT_PUBLIC_API}/department?page=${page}&size=${size}&query=${search}`;
  } else {
    departmentURL = `${NEXT_PUBLIC_API}/department?page=${page}&size=${size}`;
  }

  try {
    const response = await axios({
      method: 'GET',
      url: departmentURL,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    if (response.status !== 200) {
      throw new Error('failed to get data departments');
    }

    departments = response.data;
  } catch (err) {
    departments = { error: { message: err.message } };
  }

  return { props: { departments } };
};

const Page = (props) => {
  const { departments } = props;

  return (
    <>
      <Head>
        <title>Departments | Halal Center</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <DepartmentListToolbar />
          <Box sx={{ mt: 3 }}>
            <DepartmentListResults department={departments} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
