import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import Iconify from '../components/iconify/Iconify';
import { useNavigate } from 'react-router-dom';
import useAuthContext from '../context/AuthContext';
import { getQRCodes_v2 } from '../helpers/qrCodeHelper';
import LoadingContainer from '../components/loader/LoadingContainer';
import QRCodeCard from '../sections/@dashboard/qrcode/QRCodeCard';
import Categories from '../sections/@dashboard/filters/Categories';
import { axiosInstance } from '../axiosInstance';
import { Helmet } from 'react-helmet-async';

const AppLink = () => {
  const navigate = useNavigate();
  const { currentOrgId } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [qrcodeData, setQrcodeData] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const getQrcodeList = useCallback(async () => {
    if (!currentOrgId) return;
    setLoading(true);
    await getQRCodes_v2(
      currentOrgId,
      selectedCategories?.length == 0
        ? ['0', ...categories?.map((item) => String(item.categoryid))]
        : selectedCategories
    )
      .then((res) => {
        if (!res.error) {
          setQrcodeData(res.data?.reverse().filter((val) => val.type == 'applink'));
        }
      })
      .finally(() => {
        if (loadingCategories == false) {
          setLoading(false);
        }
      });
  }, [currentOrgId, selectedCategories, categories, loadingCategories]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        setLoadingCategories(true);
        const { data } = await axiosInstance.get(`/crm/${currentOrgId}/category`);
        setCategories(data.data);
      } catch {
        //
      } finally {
        setLoadingCategories(false);
      }
    };
    getCategories();
  }, [currentOrgId, refresh]);

  useEffect(() => {
    getQrcodeList();
  }, [getQrcodeList]);

  return (
    <>
      <Container sx={{ marginTop: { sm: -3, xs: -1 } }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h4" gutterBottom>
            App Links
          </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => navigate('/app/appLink/createAppLink')}
          >
            Create
          </Button>
        </Stack>
        <Box mb={3}>
          <Categories
            selectedCategories={selectedCategories}
            setSelectedCategories={(val) => setSelectedCategories(val)}
            refresh={refresh}
            setRefresh={(val) => setRefresh(val)}
          />
        </Box>
        <LoadingContainer loading={loading}>
          <Grid container spacing={3}>
            {qrcodeData?.map((val, i) => (
              <Grid key={i} item xs={12} sm={12} md={12}>
                <QRCodeCard qrcode={val} />
              </Grid>
            ))}
          </Grid>
        </LoadingContainer>
      </Container>
    </>
  );
};

export default AppLink;
