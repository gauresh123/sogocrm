import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, ButtonGroup, Container, Grid, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import QRCodeCard from '../sections/@dashboard/qrcode/QRCodeCard';
import useAuthContext from '../context/AuthContext';
import { getQRCodes } from '../helpers/qrCodeHelper';
import Iconify from '../components/iconify/Iconify';
import LoadingContainer from '../components/loader/LoadingContainer';
import Categories from '../sections/@dashboard/filters/Categories';
import { axiosInstance } from '../axiosInstance';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

const QrCodes = () => {
  const [qrcodeData, setQrcodeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentFilterVal, setCurrentFilterVal] = useState('All');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const navigate = useNavigate();
  const { currentOrgId } = useAuthContext();

  const getQrcodeList = useCallback(async () => {
    if (!currentOrgId) return;
    setLoading(true);
    await getQRCodes(
      currentOrgId,
      selectedCategories?.length == 0
        ? ['0', ...categories?.map((item) => String(item.categoryid))]
        : selectedCategories
    )
      .then((res) => {
        if (!res.error) {
          setQrcodeData(res.data?.reverse().filter((val) => val.type == 'url'));
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
      console.log('call');
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

  const filterQrCodeData = useMemo(() => {
    return qrcodeData?.filter((data) => {
      if (currentFilterVal === 'All') {
        return data;
      }
      if (currentFilterVal === 'Dynamic') {
        return data.isdynamic;
      }
      return !data.isdynamic;
    });
  }, [qrcodeData, currentFilterVal, categories]);
  
  return (
    <>
      <Container sx={{ marginTop: { sm: -3, xs: -1 } }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4} >
          <Typography variant="h4" gutterBottom>
            QR Codes
          </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => navigate('/app/qrcodes/create')}
            hidden
          >
            Create QR Code
          </Button>
        </Stack>
        <Stack direction={{ sm: 'row', lg: 'row', xs: 'column' }} gap={{ sm: 2, lg: 2, xs: 0 }}>
          <ButtonGroup variant="outlined" aria-label="outlined button group" sx={{ marginBottom: 3 }}>
            <Button
              onClick={() => setCurrentFilterVal('All')}
              variant={currentFilterVal === 'All' ? 'contained' : 'outlined'}
            >
              All
            </Button>
            <Button
              onClick={() => setCurrentFilterVal('Dynamic')}
              variant={currentFilterVal === 'Dynamic' ? 'contained' : 'outlined'}
            >
              Dynamic
            </Button>
            <Button
              onClick={() => setCurrentFilterVal('Static')}
              variant={currentFilterVal === 'Static' ? 'contained' : 'outlined'}
            >
              Static
            </Button>
          </ButtonGroup>
          <Categories
            selectedCategories={selectedCategories}
            setSelectedCategories={(val) => setSelectedCategories(val)}
            categories={categories}
            refresh={refresh}
            setRefresh={(val) => setRefresh(val)}
          />
        </Stack>

        <LoadingContainer loading={loading}>
          <Grid container spacing={3}>
            {filterQrCodeData?.map((val, i) => (
              <Grid key={i} item xs={12} sm={12} md={12}>
                <QRCodeCard qrcode={val} getQrcodeList={getQrcodeList} />
              </Grid>
            ))}
          </Grid>
        </LoadingContainer>
      </Container>
    </>
  );
};

export default QrCodes;
