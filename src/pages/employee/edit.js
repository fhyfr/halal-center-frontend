import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { parseCookies } from '../../lib/auth-cookies';
import axios from 'axios';
import { EditEmployee } from '../../components/employee/edit-employee';

const { NEXT_PUBLIC_API } = process.env;

export const getServerSideProps = async ({ req, res, query }) => {
  const { id } = query;
  if (!id || id === null) {
    return {
      redirect: {
        permanent: false,
        destination: '/employee',
      },
      props: {},
    };
  }

  const data = parseCookies(req);
  let employee;

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
      url: `${NEXT_PUBLIC_API}/employee/${id}`,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    if (response.status !== 200) {
      throw new Error('failed to get data employee');
    }

    employee = response.data;
  } catch (err) {
    employee = { error: { message: err.message } };
  }

  return { props: { employee } };
};

const Edit = (props) => {
  const { employee } = props;

  return (
    <>
      <Head>
        <title>Edit Employee</title>
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
            Employee
          </Typography>
          <Box sx={{ pt: 3 }}>
            <EditEmployee employee={employee} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Edit.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Edit;
