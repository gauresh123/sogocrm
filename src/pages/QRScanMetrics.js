import { Helmet } from 'react-helmet-async';
// @mui
import ReactToPrint from 'react-to-print';
import format from 'date-fns/format';
import { useTheme } from '@emotion/react';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { AppConversionRates, AppCurrentVisits, AppWidgetSummary } from '../sections/@dashboard/app';
import { getScanMetrics } from '../helpers/dashboardHelper';
import useAuthContext from '../context/AuthContext';
import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingContainer from '../components/loader/LoadingContainer';

// ----------------------------------------------------------------------

export default function QRScanMetrics() {
  const [metricsData, setMtricsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const { currentOrgId } = useAuthContext();
  const { codeId } = useParams();
  const reportRef = useRef(null);
  const navigate = useNavigate();

  const getMetrics = async () => {
    if (!currentOrgId) return;
    setLoading(true);
    try {
      const res = await getScanMetrics(currentOrgId, codeId);
      if (!res.error) {
        setMtricsData(res.data);
      }
    } finally {
      setLoading(false);
    }
  };

  const fileName = `${codeId}_ScanReport_${format(new Date(), 'ddMMyyyy')}.pdf`;

  useEffect(() => {
    getMetrics();
  }, [currentOrgId, codeId]);

  const getConvertedArray = (obj, sortDesc, slice = 0) => {
    const convertedArray = Object.entries(obj).map(([data, value]) => ({
      label: data,
      value: value,
    }));
    if (sortDesc) convertedArray.sort((a, b) => b.value - a.value);
    if (slice) return convertedArray.slice(0, slice);
    return convertedArray;
  };
  console.log(metricsData?.metrics, 'data');
  return (
    <LoadingContainer loading={loading}>
      <Helmet>
        <title>QR Code Scan Metrics</title>
      </Helmet>

      <Container maxWidth="xl" sx={{ marginTop: { sm: -3, xs: -1 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" sx={{ marginBottom: 2 }} onClick={() => navigate(-1)}>
            Go Back
          </Button>
          <ReactToPrint
            trigger={() => (
              <Button variant="outlined" sx={{ marginBottom: 2 }}>
                Download
              </Button>
            )}
            content={() => reportRef.current}
            documentTitle={fileName}
          />
        </Box>

        <Box sx={{ p: 2 }} ref={reportRef}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" mb={1}>
                Code ID: {codeId}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="No of scans"
                total={metricsData ? metricsData.metrics.scan_count : 0}
                icon={'ph:scan-fill'}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Countries"
                total={metricsData?.metrics?.countries ? Object.keys(metricsData?.metrics?.countries).length : '0'}
                color="info"
                icon={'charm:organisation'}
              />
            </Grid>

            {metricsData?.metrics.regions && (
              <Grid item xs={12} md={6} lg={8}>
                <AppConversionRates
                  title="Regions"
                  subheader={'Number of scans'}
                  chartData={getConvertedArray(metricsData && metricsData.metrics.regions, true, 15)}
                />
              </Grid>
            )}

            {metricsData?.metrics.countries && (
              <Grid item xs={12} md={6} lg={4}>
                <AppCurrentVisits
                  title="Countries"
                  subheader={'Number of scans'}
                  chartData={getConvertedArray(metricsData && metricsData.metrics.countries)}
                  chartColors={[
                    theme.palette.primary.main,
                    theme.palette.info.main,
                    theme.palette.warning.main,
                    theme.palette.error.main,
                  ]}
                />
              </Grid>
            )}

            {metricsData?.metrics.cities && (
              <Grid item xs={12} md={12} lg={12}>
                <AppConversionRates
                  title="Cities"
                  subheader={'Number of scans'}
                  chartData={getConvertedArray(metricsData && metricsData.metrics.cities, true, 15)}
                />
              </Grid>
            )}

            {metricsData?.metrics.operating_systems && (
              <Grid item xs={12} md={6} lg={8}>
                <AppConversionRates
                  title="Operating systems"
                  subheader={'Number of scans'}
                  chartData={getConvertedArray(metricsData && metricsData.metrics.operating_systems, true, 10)}
                />
              </Grid>
            )}

            {metricsData?.metrics.browsers && (
              <Grid item xs={12} md={6} lg={4}>
                <AppCurrentVisits
                  title="Browsers"
                  subheader={'Number of scans'}
                  chartData={getConvertedArray(metricsData && metricsData.metrics.browsers)}
                  chartColors={[
                    theme.palette.primary.main,
                    theme.palette.info.main,
                    theme.palette.warning.main,
                    theme.palette.error.main,
                  ]}
                />
              </Grid>
            )}
          </Grid>
        </Box>
      </Container>
    </LoadingContainer>
  );
}
