import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Button,
  CircularProgress,
  Container,
  FormControlLabel,
  FormLabel,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import useAuthContext from '../context/AuthContext';
import { editQrCode, getQRCode } from '../helpers/qrCodeHelper';
import LoadingContainer from '../components/loader/LoadingContainer';

const EditApplink = () => {
  const [name, setName] = useState('');
  const [android, setAndroid] = useState('');
  const [ios, setIos] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingButton, setloadingButton] = useState(false);
  const [activate, setActivate] = useState(false);
  const [errors, setErrors] = useState({});
  const { codeId } = useParams();
  const { currentOrgId } = useAuthContext();
  const navigate = useNavigate();

  const getCode = async () => {
    setLoading(true);
    await getQRCode(currentOrgId, codeId)
      .then((res) => {
        if (!res.error) {
          setName(res.data.name);
          setAndroid(res.data.data.android);
          setIos(res.data.data.ios);
          setActivate(res.data.isactive);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getCode();
  }, [currentOrgId, codeId]);

  const editHandlePress = async (e) => {
    e.preventDefault();
    setErrors({});
    if (!name) {
      setErrors({ ...errors, name: 'name is required' });
      return;
    }
    if (!android && !ios) {
      setErrors({ ...errors, applink: 'applink is required' });
      return;
    }
    if (loadingButton) return;
    try {
      setloadingButton(true);

      let data = { android: android, ios: ios };

      const res = await editQrCode(currentOrgId, codeId, name, 'applink', '', activate, '', '', '', data);

      if (!res.error) {
        toast.success('Qr Code is edited!');
        navigate(-1);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setloadingButton(false);
    }
  };

  return (
    <>
      <LoadingContainer loading={loading}>
        <Container sx={{ marginTop: { sm: -6, xs: -2 } }}>
          <Button variant="contained" sx={{ marginLeft: 2 }} onClick={() => navigate(-1)}>
            Go Back
          </Button>
          <Stack alignItems={'center'} sx={{ padding: 2 }}>
            <Typography sx={{ textAlign: 'center' }} mt={1} mb={3} variant="h5">
              Edit QR Code
            </Typography>

            <TextField
              placeholder="Name"
              size="small"
              value={name}
              sx={{ width: { sm: '50%', md: '50%', xs: '100%' } }}
              onChange={(e) => setName(e.target.value)}
              {...(errors.name && {
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

            <Stack direction="row" spacing={0.5} alignItems="center">
              <Typography>Deactivate</Typography>
              <FormControlLabel
                control={<Switch checked={activate ? true : false} onChange={() => setActivate(!activate)} />}
                label="Activate"
              />
            </Stack>
            <br />
            <LoadingButton
              sx={{ width: { sm: '50%', md: '50%', xs: '100%' } }}
              size="large"
              type="submit"
              variant="contained"
              onClick={editHandlePress}
              loading={loadingButton}
            >
              Edit
            </LoadingButton>
          </Stack>
        </Container>
      </LoadingContainer>
    </>
  );
};

export default EditApplink;
