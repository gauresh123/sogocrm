import { Box, Card, CardActions, CardContent, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import Iconify from '../../components/iconify';
import { toast } from 'react-toastify';
import EditShortUrlPopup from './EditShortUrlPopup';
import ShareShortUrlPopup from './ShareShortUrlPopup';
import { NavLink } from 'react-router-dom';

const ShortUrlsCard = ({ item, getURLs }) => {
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [sohwSharePopup, setSohwSharePopup] = useState(false);

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
      <Card sx={{ height: '100%', width: '100%' }} id="card">
        <CardContent>
          <Stack direction={'column'} spacing={2}>
            <Box
              display={'flex'}
              flexWrap={'wrap'}
              width={{ lg: '100%', sm: '100%', xs: '90%' }}
              alignSelf={{ xs: 'flex-start' }}
            >
              <Typography
                variant="h6"
                component={NavLink}
                to={item?.originallink}
                width={{ lg: '100%', sm: '70%', xs: '100%' }}
                noWrap
                sx={{ textDecoration: 'none', color: 'inherit' }}
              >
                {item?.originallink}
              </Typography>
            </Box>
            <Stack direction={{ lg: 'row', sm: 'row', xs: 'column' }} mt={2} spacing={2}>
              <Typography variant="body1" color={'blue'}>{`https://gosol.ink/${item?.shortlink}`}</Typography>
              <Stack direction={'row'} spacing={2}>
                <Iconify icon="solar:copy-bold" style={{ cursor: 'pointer' }} onClick={() => copyHandleClicked(item)} />
                <Iconify
                  icon="material-symbols:edit"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setShowEditPopup(true)}
                />
                <Iconify icon="mdi:share" style={{ cursor: 'pointer' }} onClick={() => setSohwSharePopup(true)} />
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
      <EditShortUrlPopup
        showEditPopup={showEditPopup}
        setShowEditPopup={(val) => setShowEditPopup(val)}
        item={item}
        getURLs={getURLs}
      />
      <ShareShortUrlPopup
        sohwSharePopup={sohwSharePopup}
        setSohwSharePopup={(val) => setSohwSharePopup(val)}
        item={item}
      />
    </>
  );
};

export default ShortUrlsCard;
