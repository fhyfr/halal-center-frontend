import Head from 'next/head';
import { Box, Button, Container, SvgIcon, Typography } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { MemberDetails } from '../../components/member/member-details';
import { ArrowBack } from '@mui/icons-material';
import { handleRedirectOnClick } from '../../utils/handle-event-button';
import { useRouter } from 'next/router';
import { parseCookies } from '../../lib/auth-cookies';
import axios from 'axios';

const { NEXT_PUBLIC_API } = process.env;

export const getServerSideProps = async ({ req, query }) => {
  let userData, courses;
  const page = query.page || 1;
  const size = query.limit || 20;

  const { userId } = query;
  if (!userId || userId === null) {
    return {
      redirect: {
        permanent: false,
        destination: '/user',
      },
      props: {},
    };
  }

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
    const response = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/user/${userId}`,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    if (response.status !== 200) {
      throw new Error('failed to get data user');
    }

    const responseCourse = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/course`,
      params: {
        page,
        size,
        userId,
      },
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    if (responseCourse.status !== 200) {
      throw new Error('failed to get data courses');
    }

    userData = response.data;
    courses = responseCourse.data;
  } catch (err) {
    userData = { error: { message: err.message } };
    courses = { error: { message: err.message } };
  }

  return { props: { user: userData, courses } };
};

const Details = (props) => {
  const router = useRouter();
  const { user, courses } = props;

  return (
    <>
      <Head>
        <title>Member Details</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ marginY: 2 }}>
            <Button
              startIcon={
                <SvgIcon fontSize="small">
                  <ArrowBack />
                </SvgIcon>
              }
              color="primary"
              variant="contained"
              onClick={() => {
                handleRedirectOnClick(router, '/user');
              }}
            >
              Back
            </Button>
          </Box>
          <Typography sx={{ mb: 3 }} variant="h4">
            Member Details
          </Typography>

          <MemberDetails user={user} courses={courses} />
        </Container>
      </Box>
    </>
  );
};

Details.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Details;
