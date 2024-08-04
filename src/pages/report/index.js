import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { parseCookies } from '../../lib/auth-cookies';
import axios from 'axios';
import { ReportListToolbar } from '../../components/report/report-list-toolbar';
import { ReportListResults } from '../../components/report/report-list-result';

const { NEXT_PUBLIC_API } = process.env;

export const getServerSideProps = async ({ req, query }) => {
  const page = query.page || 1;
  const size = query.limit || 10;
  const courseId = query.courseId;

  let courses = null;
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

  try {
    const responseCourse = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/report/courses`,
      params: queryParams,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    if (responseCourse.status !== 200) {
      throw new Error('failed to get data courses');
    }

    courses = responseCourse.data;
  } catch (err) {
    courses = { error: { message: err.message } };
  }

  return { props: { courses } };
};

const Report = (props) => {
  const { courses } = props;

  return (
    <>
      <Head>
        <title>Report | Halal Center</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <ReportListToolbar />
          <Box sx={{ pt: 3 }}>
            <ReportListResults courses={courses} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Report.getLayout = (report) => <DashboardLayout>{report}</DashboardLayout>;

export default Report;
