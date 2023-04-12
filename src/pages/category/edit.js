import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { EditCategory } from '../../components/category/edit-category';
import { useRouter } from 'next/router';

const Edit = () => {
  let category;
  const router = useRouter();
  if (router.query.categoryId && router.query.categoryName) {
    category = {
      categoryId: router.query.categoryId,
      categoryName: router.query.categoryName,
    };
  } else {
    router.push('/category');
  }

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
            Category
          </Typography>
          <Box sx={{ pt: 3 }}>
            <EditCategory category={category} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Edit.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Edit;
