import { Container, Grid, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { AppWidgetSummary, AppWebsiteVisits, AppCurrentVisits, AppConversionRates } from '../sections/@dashboard/app';
import { getDashboardCount } from 'src/helpers/dashboardHelper';
import useAuthContext from 'src/context/AuthContext';
import LoadingContainer from 'src/components/loader/LoadingContainer';

const Analytics = () => {
  const { currentOrgId } = useAuthContext();
  const theme = useTheme();
  const [count, setCount] = useState({});
  const [loading, setLoading] = useState(false);

  const getCount = async () => {
    try {
      setLoading(true);
      const result = await getDashboardCount(currentOrgId);
      setCount(result?.data?.data);
    } catch (error) {
      //
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCount();
  }, []);

  return (
    <>
      <Helmet>
        <title>SOGO</title>
      </Helmet>

      <Container sx={{ marginTop: { sm: -7, xs: -1 } }}>
        <LoadingContainer loading={loading}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary title="No of QR Codes" total={count?.qr || '0'} icon={'bi:qr-code-scan'} />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="No of App Links"
                color="info"
                total={count?.link || '0'}
                icon={'mage:playstore'}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="No of URLs"
                total={count?.url || '0'}
                color="warning"
                icon={'arcticons:urlsanitizer'}
              />
            </Grid>
          {/*  <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary title="No of Campaigns" color="error" total={30} icon={'material-symbols:campaign'} />
            </Grid>

            <Grid item xs={12} md={6} lg={8}>
              <AppWebsiteVisits
                title="Website Visits"
                subheader="(+43%) than last year"
                chartLabels={[
                  '01/01/2023',
                  '02/01/2023',
                  '03/01/2023',
                  '04/01/2023',
                  '05/01/2023',
                  '06/01/2023',
                  '07/01/2023',
                  '08/01/2023',
                  '09/01/2023',
                  '10/01/2023',
                  '11/01/2023',
                ]}
                chartData={[
                  {
                    name: 'Team A',
                    type: 'column',
                    fill: 'solid',
                    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                  },
                  {
                    name: 'Team B',
                    type: 'area',
                    fill: 'gradient',
                    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                  },
                  {
                    name: 'Team C',
                    type: 'line',
                    fill: 'solid',
                    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                  },
                ]}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <AppCurrentVisits
                title="Cities"
                subheader={'No of Customers'}
                chartData={[
                  { label: 'Mumbai', value: 4344 },
                  { label: 'Tamilnadu', value: 5435 },
                  { label: 'Chennai', value: 1443 },
                  { label: 'Pune', value: 4443 },
                ]}
                chartColors={[
                  theme.palette.primary.main,
                  theme.palette.info.main,
                  theme.palette.warning.main,
                  theme.palette.error.main,
                ]}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={8}>
              <AppConversionRates
                title="Records"
                subheader="No of scans"
                chartData={[
                  { label: 'Dynamic QR Codes', value: 400, type: 'line' },
                  { label: 'App Links', value: 430 },
                  { label: 'LeadGen Forms', value: 448 },
                ]}
              />
            </Grid>*/}
          </Grid>
        </LoadingContainer>
      </Container>
    </>
  );
};

export default Analytics;