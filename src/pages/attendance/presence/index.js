import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../../../components/dashboard-layout';
import { parseCookies } from '../../../lib/auth-cookies';
import axios from 'axios';
import { PresenceListToolbar } from '../../../components/presence/presence-list-toolbar';
import { PresenceListResults } from '../../../components/presence/presence-list-results';

const { NEXT_PUBLIC_API } = process.env;

export const getServerSideProps = async ({ req, query }) => {
  const page = query.page || 1;
  const size = query.limit || 10;
  const attendanceId = query.attendanceId;
  const userId = query.userId;

  let presences = null;
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

  if (attendanceId && attendanceId > 0) {
    Object.assign(queryParams, { attendanceId });
  } else {
    return {
      redirect: {
        permanent: false,
        destination: '/attendance',
      },
      props: {},
    };
  }

  if (userId && userId > 0) {
    Object.assign(queryParams, { userId });
  }

  try {
    const responsePresences = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/presence`,
      params: queryParams,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    if (responsePresences.status !== 200) {
      throw new Error('failed to get data presences');
    }

    presences = responsePresences.data;
  } catch (err) {
    presences = { error: { message: err.message } };
  }

  return { props: { presences } };
};

const Presence = (props) => {
  const { presences } = props;

  return (
    <>
      <Head>
        <title>Presences | Halal Center</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <PresenceListToolbar />
          <Box sx={{ mt: 3 }}>
            <PresenceListResults presences={presences} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Presence.getLayout = (presence) => <DashboardLayout>{presence}</DashboardLayout>;

export default Presence;
