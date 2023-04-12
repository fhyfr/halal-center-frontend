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
  const departmentId = query.departmentId;
  const positionId = query.positionId;

  let employees,
    departments,
    positions = null;
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
  if (search && search.length > 2) {
    Object.assign(queryParams, { query: search });
  }

  if (departmentId && departmentId > 0) {
    Object.assign(queryParams, { departmentId });
  }

  if (positionId && positionId > 0) {
    Object.assign(queryParams, { positionId });
  }

  try {
    const response = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/employee`,
      params: queryParams,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    if (response.status !== 200) {
      throw new Error('failed to get data employees');
    }

    const responseDepartments = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/department?page=1&size=50`,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    if (response.status !== 200) {
      throw new Error('failed to get data departments');
    }

    const reponsePositions = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/position?page=1&size=50`,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    if (response.status !== 200) {
      throw new Error('failed to get data positions');
    }

    employees = response.data;
    departments = responseDepartments.data;
    positions = reponsePositions.data;
  } catch (err) {
    employees = { error: { message: err.message } };
    departments = { error: { message: err.message } };
    positions = { error: { message: err.message } };
  }

  return { props: { employees, departments, positions } };
};

const Employee = (props) => {
  const { employees, departments, positions } = props;

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
          <EmployeeListToolbar departments={departments} positions={positions} />
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
