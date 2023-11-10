import Head from 'next/head';
import { Box, Button, Container, SvgIcon, Typography } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { parseCookies } from '../../lib/auth-cookies';
import axios from 'axios';
import { ReportRank } from '../../components/report/report-rank';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/router';

const { NEXT_PUBLIC_API } = process.env;

export const getServerSideProps = async ({ req, query }) => {
  const courseId = query.courseId;

  let ranks = null;
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
    const responseReportRank = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/report/courses/${courseId}/rank`,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    if (responseReportRank.status !== 200) {
      throw new Error('failed to get data report rank');
    }

    ranks = responseReportRank.data;
  } catch (err) {
    ranks = { error: { message: err.message } };
  }

  return { props: { ranks } };
};

const ReportRankPage = (props) => {
  const router = useRouter();
  const { ranks } = props;

  return (
    <>
      <Head>
        <title>Report Ranking | Halal Center</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
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
                router.back();
              }}
            >
              Back
            </Button>
          </Box>
          <Typography sx={{ mb: 3 }} variant="h4">
            Report Ranking
          </Typography>

          <Box sx={{ pt: 3 }}>
            <ReportRank ranks={ranks} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

ReportRankPage.getLayout = (reportRankPage) => <DashboardLayout>{reportRankPage}</DashboardLayout>;

export default ReportRankPage;
