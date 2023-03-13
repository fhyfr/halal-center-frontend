import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { UserListToolbar } from '../../components/user/user-list-toolbar';
import { UserListResults } from '../../components/user/user-list-results';
import { parseCookies } from '../../lib/auth-cookies';
import axios from 'axios';

const { NEXT_PUBLIC_API } = process.env;

export const getServerSideProps = async ({ req, res, query }) => {
  const page = query.page || 1;
  const size = query.limit || 10;
  const search = query.search;
  const roleId = query.roleId;

  let users,
    roles = null;
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

  let userURL;
  if (search && search.length > 0 && roleId) {
    userURL = `${NEXT_PUBLIC_API}/user?page=${page}&size=${size}&query=${search}&roleId=${roleId}`;
  } else if (search && search.length > 0) {
    userURL = `${NEXT_PUBLIC_API}/user?page=${page}&size=${size}&query=${search}`;
  } else if (roleId) {
    userURL = `${NEXT_PUBLIC_API}/user?page=${page}&size=${size}&roleId=${roleId}`;
  } else {
    userURL = `${NEXT_PUBLIC_API}/user?page=${page}&size=${size}`;
  }

  try {
    const responseUser = await axios({
      method: 'GET',
      url: userURL,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    if (responseUser.status !== 200) {
      throw new Error('failed to get data users');
    }

    const responseRole = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/role?page=1&size=20`,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    if (responseRole.status !== 200) {
      throw new Error('failed to get data roles');
    }

    roles = responseRole.data;
    users = responseUser.data;
  } catch (err) {
    users = { error: { message: err.message } };
    roles = { error: { message: err.message } };
  }

  return { props: { users, roles } };
};

const User = (props) => {
  const { users, roles } = props;

  return (
    <>
      <Head>
        <title>Users | Halal Center</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <UserListToolbar roles={roles} />
          <Box sx={{ mt: 3 }}>
            <UserListResults users={users} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

User.getLayout = (user) => <DashboardLayout>{user}</DashboardLayout>;

export default User;
