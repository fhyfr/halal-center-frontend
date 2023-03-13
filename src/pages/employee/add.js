import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { AddEmployee } from '../../components/employee/add-employee';
import { parseCookies } from '../../lib/auth-cookies';
import axios from 'axios';
import { positions } from '@mui/system';

const { NEXT_PUBLIC_API } = process.env;

export const getServerSideProps = async ({ req, res }) => {
  const data = parseCookies(req);
  let departments, positions;

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
    const responseDepartment = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/department?page=1&size=50`,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });

    const responsePosition = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/position?page=1&size=50`,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });

    departments = responseDepartment.data;
    positions = responsePosition.data;
  } catch (error) {
    departments = { error: { message: err.message } };
    positions = { error: { message: err.message } };
  }

  return { props: { departments, positions } };
};

const AddNew = (props) => {
  const { departments, positions } = props;

  return (
    <>
      <Head>
        <title>Add New Employee</title>
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
            <AddEmployee departments={departments} positions={positions} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

AddNew.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default AddNew;
