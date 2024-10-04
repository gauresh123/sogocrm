import { Box, Button, CircularProgress, Container, Grid, Stack, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuthContext from '../context/AuthContext';
import { getForms } from '../helpers/formHelper';
import Iconify from '../components/iconify/Iconify';
import LoadingContainer from '../components/loader/LoadingContainer';
import QRCodeCard from '../sections/@dashboard/qrcode/QRCodeCard';
import Categories from '../sections/@dashboard/filters/Categories';
import { axiosInstance } from '../axiosInstance';
import { Helmet } from 'react-helmet-async';

const Forms = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const { currentOrgId } = useAuthContext();
  const navigate = useNavigate();

  const getFormList = useCallback(async () => {
    if (!currentOrgId) return;
    setLoading(true);
    await getForms(
      currentOrgId,
      selectedCategories?.length == 0
        ? ['0', ...categories?.map((item) => String(item.categoryid))]
        : selectedCategories
    )
      .then((res) => {
        if (!res.error) {
          const getData = res.data?.reverse().map((val) => {
            const newdata = {
              codeid: val.qrcodeid,
              name: val.formtitle,
              formid: val.formid,
              scanlink: val.scanlink,
              bg_color: val.bgcolor,
              color: val.color,
              isdynamic: val.isdynamic,
              logo: val.logo,
              type: 'form',
            };
            return newdata;
          });
          setForms(getData);
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
    getFormList();
  }, [getFormList]);

  const handleDownload = async (val) => {
    try {
      const response = await fetch(
        `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=http://178.128.137.133/crm/qrcode/addCustomer/${currentOrgId}`
      );
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Customer Data.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      toast.error('Error downloading image:');
    } finally {
      toast.success('Your Qr Code is downloaded successfully');
    }
  };

  return (
    <>
      <Container sx={{ marginTop: { sm: -3, xs: -1 } }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
          <Typography variant="h4" gutterBottom>
            LeadGen Forms
          </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            component={NavLink}
            to="/app/form/createForm"
          >
            Create
          </Button>
        </Stack>
        <Box mb={3}>
          <Categories
            selectedCategories={selectedCategories}
            setSelectedCategories={(val) => setSelectedCategories(val)}
            categories={categories}
            refresh={refresh}
            setRefresh={(val) => setRefresh(val)}
          />
        </Box>
        <LoadingContainer loading={loading}>
          <Grid container spacing={3}>
            {forms?.map((val, i) => (
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

export default Forms;
