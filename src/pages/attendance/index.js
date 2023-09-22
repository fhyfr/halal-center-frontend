import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { parseCookies } from '../../lib/auth-cookies';
import axios from 'axios';
import { AttendanceListToolbar } from '../../components/attendance/attendance-list-toolbar';
import { AttendanceListResults } from '../../components/attendance/attendance-list-results';

const { NEXT_PUBLIC_API } = process.env;

export const getServerSideProps = async ({ req, query }) => {
  const page = query.page || 1;
  const size = query.limit || 10;
  const courseId = query.courseId;
  const type = query.type;
  const active = query.status;

  let attendances = null;
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

  if (type) {
    Object.assign(queryParams, { type });
  }

  if (active) {
    const status = active === 'true';

    Object.assign(queryParams, { active: status });
  }

  try {
    const responseAttendances = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/attendance`,
      params: queryParams,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    if (responseAttendances.status !== 200) {
      throw new Error('failed to get data attendances');
    }

    attendances = responseAttendances.data;
  } catch (err) {
    attendances = { error: { message: err.message } };
  }

  return { props: { attendances } };
};

const Attendance = (props) => {
  const { attendances } = props;

  return (
    <>
      <Head>
        <title>Attendances | Halal Center</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <AttendanceListToolbar />
          <Box sx={{ mt: 3 }}>
            <AttendanceListResults attendances={attendances} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Attendance.getLayout = (attendance) => <DashboardLayout>{attendance}</DashboardLayout>;

export default Attendance;
