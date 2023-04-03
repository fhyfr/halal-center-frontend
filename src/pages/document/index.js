import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DocumentListResults } from '../../components/document/document-list-results';
import { DocumentListToolbar } from '../../components/document/document-list-toolbar';
import { DashboardLayout } from '../../components/dashboard-layout';
import { parseCookies } from '../../lib/auth-cookies';
import axios from 'axios';

const { NEXT_PUBLIC_API } = process.env;

export const getServerSideProps = async ({ req, res, query }) => {
  const page = query.page || 1;
  const size = query.limit || 10;
  const courseId = query.courseId;
  const userId = query.userId;
  const type = query.type;

  let documents = null;
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

  let payments;
  let queryParams = { page, size };

  if (type && type.length > 0) {
    Object.assign(queryParams, { type });
  }

  if (courseId && courseId > 0) {
    Object.assign(queryParams, { courseId });
  }

  if (userId && userId > 0) {
    Object.assign(queryParams, { userId });
  }

  try {
    const response = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/document`,
      params: queryParams,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    if (response.status !== 200) {
      throw new Error('failed to get data documents');
    }

    documents = response.data;
  } catch (err) {
    documents = { error: { message: err.message } };
  }

  return { props: { documents } };
};

const Document = (props) => {
  const { documents } = props;

  return (
    <>
      <Head>
        <title>Documents | Halal Center</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <DocumentListToolbar />
          <Box sx={{ mt: 3 }}>
            <DocumentListResults documents={documents} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Document.getLayout = (document) => <DashboardLayout>{document}</DashboardLayout>;

export default Document;
