import Head from 'next/head';
import { Box, Button, Container, IconButton, Tooltip, Typography } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { AddCategory } from '../../components/category/add-category';
import axios from 'axios';

const { NEXT_PUBLIC_API } = process.env;

// This function gets called at build time
export const getStaticPaths = async () => {
  // Call an external API endpoint to get posts

  const res = await axios({
    method: 'GET',
    url: `${NEXT_PUBLIC_API}/category?size=500`,
  });

  const { data: categories } = res.data;

  // Get the paths we want to pre-render based on posts
  const paths = categories.map((category) => ({
    params: { slug: category.slug },
  }));

  console.log('PATHS', paths);

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

// This also gets called at build time
export const getStaticProps = async ({ params }) => {
  const res = await axios({
    method: 'GET',
    url: `${NEXT_PUBLIC_API}/category/slug/${params.slug}`,
  });

  return { props: { category: res.data } };
};

const EditCategory = ({ category }) => {
  return (
    <>
      <Head>
        <title>Edit Category</title>
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
            Edit Category
          </Typography>
          <Box sx={{ pt: 3 }}>
            <EditCategory category={category} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

EditCategory.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default EditCategory;
