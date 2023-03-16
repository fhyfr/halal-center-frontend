import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { AddEmployee } from '../../components/employee/add-employee';
import { parseCookies } from '../../lib/auth-cookies';
import axios from 'axios';
import { MutationEmployee } from '../../components/employee/mutation-employee';

const { NEXT_PUBLIC_API } = process.env;

export const getServerSideProps = async ({ req, res, query }) => {
  if (!query.id || query.id === null) {
    return {
      redirect: {
        permanent: false,
        destination: '/employee',
      },
      props: {},
    };
  }

  const data = parseCookies(req);
  let departments, positions, employee;

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

    const responseEmployee = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/employee/${query.id}`,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });

    departments = responseDepartment.data;
    positions = responsePosition.data;
    employee = responseEmployee.data;
  } catch (err) {
    departments = { error: { message: err.message } };
    positions = { error: { message: err.message } };
    employee = { error: { message: err.message } };
  }

  return { props: { departments, positions, employee } };
};

const Mutation = (props) => {
  const { departments, positions, employee } = props;

  return (
    <>
      <Head>
        <title>Mutation Employee</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="sm">
          <Typography sx={{ mb: 3 }} variant="h4">
            Employee
          </Typography>
          <Box sx={{ pt: 3 }}>
            <MutationEmployee departments={departments} positions={positions} employee={employee} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Mutation.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Mutation;
