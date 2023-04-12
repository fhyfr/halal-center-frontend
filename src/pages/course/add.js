import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { AddCourse } from '../../components/course/add-course';
import { parseCookies } from '../../lib/auth-cookies';
import axios from 'axios';

const { NEXT_PUBLIC_API } = process.env;

export const getServerSideProps = async ({ req, res }) => {
  const data = parseCookies(req);
  let categories;

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
      url: `${NEXT_PUBLIC_API}/category?page=1&size=50`,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });

    categories = response.data;
  } catch (err) {
    categories = { error: { message: err.message } };
  }

  return { props: { categories } };
};

const AddNew = (props) => {
  const { categories } = props;

  return (
    <>
      <Head>
        <title>Add New Course</title>
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
            Course
          </Typography>
          <Box sx={{ pt: 3 }}>
            <AddCourse categories={categories} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

AddNew.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default AddNew;
