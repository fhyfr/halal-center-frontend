import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { EmployeeListResults } from '../../components/employee/employee-list-results';
import { EmployeeListToolbar } from '../../components/employee/employee-list-toolbar';
import { DashboardLayout } from '../../components/dashboard-layout';
import { parseCookies } from '../../lib/auth-cookies';
import axios from 'axios';

const { NEXT_PUBLIC_API } = process.env;

export const getServerSideProps = async ({ req, res, query }) => {
  const page = query.page || 1;
  const size = query.limit || 10;
  const search = query.search;

  let employees = null;
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

  let employeeURL;
  if (search && search.length > 0) {
    employeeURL = `${NEXT_PUBLIC_API}/employee?page=${page}&size=${size}&query=${search}`;
  } else {
    employeeURL = `${NEXT_PUBLIC_API}/employee?page=${page}&size=${size}`;
  }

  try {
    const response = await axios({
      method: 'GET',
      url: employeeURL,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    if (response.status !== 200) {
      throw new Error('failed to get data users');
    }

    employees = response.data;
  } catch (err) {
    employees = { error: { message: err.message } };
  }

  return { props: { employees } };
};

const Employee = (props) => {
  const { employees } = props;

  return (
    <>
      <Head>
        <title>Employees | Halal Center</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <EmployeeListToolbar />
          <Box sx={{ mt: 3 }}>
            <EmployeeListResults employees={employees} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Employee.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Employee;
