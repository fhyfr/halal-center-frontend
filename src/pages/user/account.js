import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { AccountProfileDetails } from '../../components/account/account-profile-details';
import { DashboardLayout } from '../../components/dashboard-layout';
import axios from 'axios';
import { parseCookies } from '../../lib/auth-cookies';

const { NEXT_PUBLIC_API } = process.env;

export const getServerSideProps = async ({ req }) => {
  let provinces, cities;
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

  try {
    const responseProvinces = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/province?page=1&size=200`,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    if (responseProvinces.status !== 200) {
      throw new Error('failed to get data cities');
    }

    const responseCities = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/city?page=1&size=200`,
      params: { provinceId: responseProvinces.data.id },
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    if (responseCities.status !== 200) {
      throw new Error('failed to get data cities');
    }

    provinces = responseProvinces.data;
    cities = responseCities.data;
  } catch (err) {
    provinces = { error: { message: err.message } };
    cities = { error: { message: err.message } };
  }

  return { props: { provinces, cities } };
};

const Account = (props) => {
  const { provinces, cities } = props;

  return (
    <>
      <Head>
        <title>Account</title>
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
            Account
          </Typography>
          <AccountProfileDetails provinces={provinces} cities={cities} />
        </Container>
      </Box>
    </>
  );
};

Account.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Account;
