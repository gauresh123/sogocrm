import { LoadingButton } from '@mui/lab';
import {
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Table,
  FormHelperText,
  Box,
  InputAdornment,
  IconButton,
  Grid,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { addShortURL, getURLs } from '../helpers/shortURLHelper';
import useAuthContext from '../context/AuthContext';
import { toast } from 'react-toastify';
import LoadingContainer from '../components/loader/LoadingContainer';
import { NavLink } from 'react-router-dom';
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';
import Iconify from '../components/iconify/Iconify';
import ShortUrlsCard from '../sections/shorturls/ShortUrlsCard';
import { Helmet } from 'react-helmet-async';

const ShortUrls = () => {
  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [error, setError] = useState({});
  const [url, setUrl] = useState('');
  const [customPath, setCustomPath] = useState('');
  const [urls, setUrls] = useState([]);
  const { currentOrgId } = useAuthContext();

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  const generateHandleClicked = async () => {
    if (!url) {
      setError({ ...error, valid: 'please enter a valid URL' });
      toast.error('please enter a valid URL');
      return;
    }

    if (/^(ftp|http|https):\/\/[^ "]+$/.test(url) == false) {
      setError({ ...error, valid: 'please enter a valid URL' });
      toast.error('please enter a valid URL');
      return;
    }
    try {
      setLoadingButton(true);
      const res = await addShortURL(currentOrgId, url, customPath);
      if (!res.error) {
        toast.success('short url is generated');
      }
    } catch {
      //
    } finally {
      setLoadingButton(false);
      getAllUrls();
      setUrl('');
      setCustomPath('');
      setError({});
    }
  };

  const getAllUrls = async () => {
    try {
      setLoading(true);
      const res = await getURLs(currentOrgId);
      if (!res.error) {
        setUrls(res.data?.reverse());
      }
    } catch {
      //
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUrls();
  }, [currentOrgId]);

  const copyHandleClicked = async (val) => {
    try {
      await navigator.clipboard.writeText(`https://gosol.ink/${val?.shortlink}`);
      toast.success('URL copied to clipboard!');
    } catch (err) {
      toast.error('Unable to copy text: ');
    }
  };

  return (
    <>
      <Helmet>
        <title>SOGO</title>
      </Helmet>

      <Container sx={{ marginTop: { sm: -3, xs: -1 } }}>
        <Stack
          direction={{ xs: 'column', lg: 'row' }}
          alignItems="center"
          justifyContent="space-between"
          width={'100%'}
          spacing={{ lg: 1, sm: 2, xs: 2 }}
        >
          <TextField
            size="small"
            sx={{ width: { lg: '60%', xs: '100%', sm: '100%' } }}
            autoFocus
            placeholder="Destination"
            type="url"
            value={url}
            onChange={handleChange}
            required
            error={error?.valid}
          />
          <TextField
            size="small"
            sx={{ width: { lg: '20%', xs: '100%', sm: '100%' }, backgroundColor: '#f4f6fa' }}
            placeholder="gosol.ink"
            type="url"
            //  value={customPath}
            // onChange={(e) => setCustomPath(e.target.value)}
            inputProps={{
              maxLength: 10,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end">
                    <Iconify icon="eva:eye-fill" style={{ color: 'black' }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            disabled
          />

          <TextField
            size="small"
            sx={{ width: { lg: '30%', xs: '100%', sm: '100%' } }}
            placeholder="Custom path (optional)"
            type="url"
            value={customPath}
            onChange={(e) => setCustomPath(e.target.value)}
            inputProps={{
              maxLength: 10,
            }}
          />

          <LoadingButton
            variant="contained"
            sx={{ width: { xs: '100%', lg: 'auto' } }}
            loading={loadingButton}
            onClick={generateHandleClicked}
          >
            Create
          </LoadingButton>
        </Stack>
        {/*error?.valid && <FormHelperText sx={{ color: 'red', mt: 0.5 }}>{error?.valid}</FormHelperText>*/}

        <Container sx={{ mt: 2 }}>
          <LoadingContainer loading={loading}>
            <Grid container spacing={2}>
              {urls?.map((val, i) => (
                <Grid key={i} item xs={12} sm={12} md={12}>
                  <ShortUrlsCard item={val} getURLs={getAllUrls} />
                </Grid>
              ))}
            </Grid>
          </LoadingContainer>
        </Container>
      </Container>
    </>
  );
};

export default ShortUrls;
