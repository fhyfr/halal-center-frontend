import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { AddUser } from '../../components/user/add-user';
import { parseCookies } from '../../lib/auth-cookies';
import axios from 'axios';

const { NEXT_PUBLIC_API } = process.env;

export const getServerSideProps = async ({ req }) => {
  const data = parseCookies(req);
  let roles;

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
    const response = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/role?page=1&size=20`,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });

    roles = response.data;
  } catch (error) {
    roles = { error: { message: err.message } };
  }

  return { props: { roles } };
};

const AddNew = (props) => {
  const { roles } = props;

  return (
    <>
      <Head>
        <title>Add New User</title>
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
            <AddUser roles={roles} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

AddNew.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default AddNew;
