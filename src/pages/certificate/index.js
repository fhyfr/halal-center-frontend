import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { parseCookies } from '../../lib/auth-cookies';
import axios from 'axios';
import { CertificateListToolbar } from '../../components/certificate/certificate-list-toolbar';
import { CertificateListResults } from '../../components/certificate/certificate-list-results';

const { NEXT_PUBLIC_API } = process.env;

export const getServerSideProps = async ({ req, query }) => {
  const page = query.page || 1;
  const size = query.limit || 10;
  const courseId = query.courseId;
  const userId = query.userId;

  let certificates = null;
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

  if (userId && userId > 0) {
    Object.assign(queryParams, { userId });
  }

  try {
    const response = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/certificate`,
      params: queryParams,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    if (response.status !== 200) {
      throw new Error('failed to get data certificates');
    }

    certificates = response.data;
  } catch (err) {
    certificates = { error: { message: err.message } };
  }

  return { props: { certificates: certificates } };
};

const Certificate = (props) => {
  const { certificates } = props;

  return (
    <>
      <Head>
        <title>Certificates | Halal Center</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <CertificateListToolbar />
          <Box sx={{ mt: 3 }}>
            <CertificateListResults certificates={certificates} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Certificate.getLayout = (certificate) => <DashboardLayout>{certificate}</DashboardLayout>;

export default Certificate;
