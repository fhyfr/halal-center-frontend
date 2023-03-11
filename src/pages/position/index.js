import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { PositionListResults } from '../../components/position/position-list-results';
import { PositionListToolbar } from '../../components/position/position-list-toolbar';
import { DashboardLayout } from '../../components/dashboard-layout';
import axios from 'axios';
import { parseCookies } from '../../lib/auth-cookies';

const { NEXT_PUBLIC_API } = process.env;

export const getServerSideProps = async ({ req, res, query }) => {
  const page = query.page || 1;
  const size = query.limit || 10;
  const search = query.search;

  let positions = null;
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

  let positionURL;
  if (search && search.length > 0) {
    positionURL = `${NEXT_PUBLIC_API}/position?page=${page}&size=${size}&query=${search}`;
  } else {
    positionURL = `${NEXT_PUBLIC_API}/position?page=${page}&size=${size}`;
  }

  try {
    const response = await axios({
      method: 'GET',
      url: positionURL,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    if (response.status !== 200) {
      throw new Error('failed to get data positions');
    }

    positions = response.data;
  } catch (err) {
    positions = { error: { message: err.message } };
  }

  return { props: { positions } };
};

const Position = (props) => {
  const { positions } = props;

  return (
    <>
      <Head>
        <title>Positions | Halal Center</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <PositionListToolbar />
          <Box sx={{ mt: 3 }}>
            <PositionListResults position={positions} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Position.getLayout = (position) => <DashboardLayout>{position}</DashboardLayout>;

export default Position;
