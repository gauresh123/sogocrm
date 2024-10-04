import { CircularProgress, Stack } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PageToRedirectQRcode = () => {
  const { shortLink } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const redirect = async () => {
      const IP = await axios.get('https://ifconfig.me/');
      try {
        setLoading(true);
        await axios.post(`https://api.gosol.ink/api/crm/scanDetail/${shortLink}`, { IP: IP?.data });
      } catch {
        //
      } finally {
        setLoading(false);
        await window.location.assign(`https://api.gosol.ink/${shortLink}`);
      }
    };
    redirect();
  }, [shortLink]);
  return loading ? (
    <Stack justifyContent={'center'} alignItems={'center'} mt={2}>
      <CircularProgress sx={{ color: 'blue' }} />
    </Stack>
  ) : null;
};

export default PageToRedirectQRcode;
