import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import axios from 'axios';
import { EditUser } from '../../components/user/edit-user';
import { parseCookies } from '../../lib/auth-cookies';

const { NEXT_PUBLIC_API } = process.env;

export const getServerSideProps = async ({ req, res, query }) => {
  let userData, roles;

  const { userId } = query;
  if (!userId || userId === null) {
    return {
      redirect: {
        permanent: false,
        destination: '/user',
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
    const responseUser = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/user/${userId}`,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    if (responseUser.status !== 200) {
      throw new Error('failed to get data user');
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

    userData = responseUser.data;
    roles = responseRole.data;
  } catch (err) {
    userData = { error: { message: err.message } };
    roles = { error: { message: err.message } };
  }

  return { props: { user: userData, roles } };
};

const Edit = (props) => {
  const { user, roles } = props;

  return (
    <>
      <Head>
        <title>Edit User</title>
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
            User
          </Typography>
          <Box sx={{ pt: 3 }}>
            <EditUser user={user} roles={roles} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Edit.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Edit;
