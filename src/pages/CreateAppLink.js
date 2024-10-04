import {
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  circularProgressClasses,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createQRCode } from '../helpers/qrCodeHelper';
import useAuthContext from '../context/AuthContext';
import { LoadingButton } from '@mui/lab';

const CreateAppLink = () => {
  const [name, setName] = useState('');
  const [android, setAndroid] = useState('');
  const [ios, setIos] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { currentOrgId } = useAuthContext();

  const createQrCodePressed = async () => {
    if (!name) {
      setErrors({ ...errors, name: 'name is required' });
      return;
    }
    if (!android && !ios) {
      setErrors({ ...errors, applink: 'applink is required' });
      return;
    }
    let data = { android: android, ios: ios };
    setLoading(true);
    await createQRCode(currentOrgId, name, 'applink', '', true, '', '', '', data)
      .then((res) => {
        if (!res.error) {
          toast.success('QR Code is generated');
        }
      })
      .finally(() => {
        navigate('/app/appLink');
        setLoading(false);
        setName('');
        setAndroid('');
        setIos('');
      });
  };

  return (
    <Container>
      <Button variant="contained" sx={{ marginLeft: 2 }} onClick={() => navigate(-1)}>
        Go Back
      </Button>
      <Stack alignItems={'center'} paddingLeft={2} paddingRight={2}>
        <>
          <Typography sx={{ textAlign: 'center' }} mt={1} mb={3} variant="h5">
            Generate QR Code
          </Typography>
          <TextField
            placeholder="Name"
            size="small"
            value={name}
            type="text"
            sx={{ width: { sm: '50%', md: '50%', xs: '100%' } }}
            onChange={(e) => setName(e.target.value)}
            {...(errors.name &&
              !name && {
                error: true,
                helperText: errors.name,
              })}
          />
          <br />
          <TextField
            placeholder="Play Store Link (Android)"
            size="small"
            value={android}
            type="url"
            sx={{ width: { sm: '50%', md: '50%', xs: '100%' } }}
            onChange={(e) => setAndroid(e.target.value)}
            {...(errors.applink && {
              error: true,
              helperText: errors.applink,
            })}
          />
          <br />
          <TextField
            placeholder="App Store Link (iOS)"
            size="small"
            value={ios}
            type="url"
            sx={{ width: { sm: '50%', md: '50%', xs: '100%' } }}
            onChange={(e) => setIos(e.target.value)}
            {...(errors.applink && {
              error: true,
              helperText: errors.applink,
            })}
          />
          <br />
        </>
        <LoadingButton
          sx={{ width: { sm: '50%', md: '50%', xs: '100%' } }}
          size="large"
          variant={'contained'}
          onClick={createQrCodePressed}
          loading={loading}
        >
          Generate
        </LoadingButton>
      </Stack>
    </Container>
  );
};

export default CreateAppLink;
