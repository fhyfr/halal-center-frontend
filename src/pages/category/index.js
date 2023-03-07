import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CategoryListResults } from '../../components/category/category-list-results';
import { CategoryListToolbar } from '../../components/category/category-list-toolbar';
import { DashboardLayout } from '../../components/dashboard-layout';
import { category } from '../../__mocks__/category';

const Page = () => (
  <>
    <Head>
      <title>Category</title>
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
          <CategoryListResults category={category} />
        </Box>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
