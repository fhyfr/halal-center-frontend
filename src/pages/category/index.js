import React, { useEffect } from 'react';
import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CategoryListResults } from '../../components/category/category-list-results';
import { CategoryListToolbar } from '../../components/category/category-list-toolbar';
import { DashboardLayout } from '../../components/dashboard-layout';
import axios from 'axios';
import { parseCookies } from '../../lib/auth-cookies';

const { NEXT_PUBLIC_API } = process.env;

export const getServerSideProps = async ({ req, res, query }) => {
  const page = query.page || 1;
  const size = query.limit || 10;
  const search = query.search;

  let categories = null;
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

  let categoryURL;
  if (search && search.length > 0) {
    categoryURL = `${NEXT_PUBLIC_API}/category?page=${page}&size=${size}&query=${search}`;
  } else {
    categoryURL = `${NEXT_PUBLIC_API}/category?page=${page}&size=${size}`;
  }

  try {
    const response = await axios({
      method: 'GET',
      url: categoryURL,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    if (response.status !== 200) {
      throw new Error('failed to get data categories');
    }

    categories = response.data;
  } catch (err) {
    categories = { error: { message: err.message } };
  }

  return { props: { categories } };
};

const Category = (props) => {
  const { categories } = props;

  return (
    <>
      <Head>
        <title>Categories | Halal Center</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <CategoryListToolbar />
          <Box sx={{ mt: 3 }}>
            <CategoryListResults category={categories} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Category.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Category;
