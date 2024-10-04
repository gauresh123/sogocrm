import React, { useState } from 'react';
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
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import { QRCodeSVG } from 'qrcode.react';
import { NavLink, useNavigate } from 'react-router-dom';
import { IMGBBuploadImage, getImageBase64 } from '../helpers/imageHelper';
import { createQRCode } from '../helpers/qrCodeHelper';
import useAuthContext from '../context/AuthContext';
import { useSubscriptions } from '../hooks/useSubscriptions';
import { QRCode } from 'react-qrcode-logo';

function CreateQRCode() {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [type, setType] = useState('');
  const [loadingButton, setLoadingButton] = useState(false);
  const [color, setColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [showCustomisation, setShowCustomisation] = useState(false);
  const navigate = useNavigate();
  const { currentOrgId } = useAuthContext();
  const { getEnabled } = useSubscriptions(currentOrgId);

  const dynamicAllowed = getEnabled('dynamic_qrcode');

  const reset = () => {
    setName('');
    setUrl('');
    setType('');
    setImage(null);
    setBgColor('#ffffff');
    setColor('#000000');
    setShowCustomisation(false);
  };

  const qrcodeGenerated = async (e) => {
    e.preventDefault();
    setErrors({});
    if (!name) {
      setErrors((prev) => ({ ...prev, name: 'Please enter a name' }));
      return;
    }
    if (!url) {
      setErrors((prev) => ({ ...prev, url: 'Please enter a url' }));
      return;
    }
    if (!type) {
      setErrors((prev) => ({ ...prev, type: 'Please Select Type' }));
      return;
    }
    if (loadingButton) return;
    try {
      setLoadingButton(true);
      const getType = () => {
        if (type === 'dynamic') {
          return true;
        }
        return false;
      };

      let imageUrl = '';
      if (image) {
        const { imgurl, error: imageError } = await IMGBBuploadImage(await getImageBase64(image));
        if (imageError) {
          toast.error('Error', 'There was an error while uploading image');
          return;
        }
        imageUrl = imgurl;
      }

      await createQRCode(currentOrgId, name, 'url', url, getType(), color, bgColor, imageUrl, {})
        .then((res) => {
          if (!res.error) {
            toast.success('Qr Code is generated');
          }
        })
        .finally(() => {
          setLoadingButton(false);
          navigate('/app/qrcodes');
          reset();
        });
    } catch (err) {
    } finally {
      setLoadingButton(false);
    }
  };

  const changeColor = (color) => {
    setColor(color.target.value);
  };

  const changebgColor = (color) => {
    setBgColor(color.target.value);
  };

  const onImageChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];

      setImage(file);
    }
  };

  const nextHandlePress = () => {
    setErrors({});
    if (!name) {
      setErrors((prev) => ({ ...prev, name: 'Please enter a name' }));
      return;
    }
    if (!url) {
      setErrors((prev) => ({ ...prev, url: 'Please enter a url' }));
      return;
    }
    if (!type) {
      setErrors((prev) => ({ ...prev, type: 'Please Select Type' }));
      return;
    }
    setShowCustomisation(!showCustomisation);
  };

  const backHandlePress = () => {
    navigate(-1);
  };

  return (
    <Container sx={{ marginTop: { sm: -3, xs: -1 } }}>
      <Button variant="contained" onClick={backHandlePress} sx={{ marginLeft: 2 }}>
        Go Back
      </Button>
      <Stack alignItems={'center'} paddingLeft={2} paddingRight={2}>
        {!showCustomisation && (
          <>
            <Typography sx={{ textAlign: 'center' }} mt={1} mb={3} variant="h5">
              Generate QR Code
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
              placeholder="Enter Url"
              size="small"
              type="url"
              sx={{ width: { sm: '50%', md: '50%', xs: '100%' } }}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              {...(errors.url && {
                error: true,
                helperText: errors.url,
              })}
            />
            <br />
            <Stack alignItems={'center'} sx={{ width: '100%', marginLeft: { sm: '50%' } }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">QR Code Type</InputLabel>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Qr Code Type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  sx={{ width: { sm: '50%', md: '50%', xs: '100%' } }}
                >
                  <MenuItem value={'static'}>Static</MenuItem>
                  <MenuItem value={'dynamic'}>Dynamic</MenuItem>
                </Select>
                {errors.type && <FormHelperText error>{errors.type}</FormHelperText>}
                {/*!dynamicAllowed && (
                  <FormHelperText
                    component={NavLink}
                    variant="standard"
                    to={'/app/pricing'}
                    sx={{ cursor: 'pointer', color: 'black' }}
                  >
                    <strong>Click here to subscribe and generate dynamic Qr Codes</strong>
                  </FormHelperText>
                )*/}
              </FormControl>
            </Stack>
            <br />
          </>
        )}

        <Button
          onClick={nextHandlePress}
          sx={{ width: { sm: '50%', md: '50%', xs: '100%' } }}
          size="large"
          variant={showCustomisation ? 'text' : 'contained'}
        >
          {!showCustomisation ? 'Next' : 'Go Back'}
        </Button>
        <br />

        {showCustomisation && (
          <QRCode
            value={url}
            ecLevel={'H'}
            fgColor={color}
            bgColor={bgColor}
            logoImage={image && URL.createObjectURL(image)}
            logoWidth={image ? 25 : 0}
            logoHeight={image ? 25 : 0}
            enableCORS={image ? true : false}
            size={170}
            logoPadding={3}
            qrStyle="dots"
          />
        )}
        <br />

        {showCustomisation && (
          <>
            <Stack sx={{ width: '100%' }} direction={'column'} justifyContent={'center'} alignItems={'center'}>
              <FormLabel>
                <strong>Select color:</strong>
              </FormLabel>
              &nbsp;&nbsp;
              <TextField
                sx={{
                  width: { sm: '30%', xs: '40%' },
                  input: { cursor: 'pointer' },
                  border: 1,
                  borderColor: 'black',
                }}
                size="small"
                type="color"
                value={color}
                onChange={changeColor}
              />
            </Stack>
            <br />
            <Stack sx={{ width: '100%' }} direction={'column'} alignItems={'center'}>
              <FormLabel>
                <strong>Background color:</strong>
              </FormLabel>
              &nbsp;&nbsp;
              <TextField
                sx={{
                  width: { sm: '30%', xs: '40%' },
                  input: { cursor: 'pointer' },
                  border: 1,
                  borderColor: 'black',
                }}
                size="small"
                type="color"
                onChange={changebgColor}
                value={bgColor}
              />
            </Stack>
            <br />
            <Stack sx={{ width: '100%', marginLeft: { sm: '50%' } }} direction={'row'} alignItems={'center'}>
              <FormLabel>
                <strong>Select logo:</strong>
              </FormLabel>
              &nbsp;&nbsp;
              <TextField size="small" type="file" onChange={onImageChange} sx={{ width: { sm: '40%', xs: '60%' } }} />
            </Stack>

            <br />
            <LoadingButton
              sx={{ width: { sm: '50%', md: '50%', xs: '100%' } }}
              size="large"
              type="submit"
              variant="contained"
              onClick={qrcodeGenerated}
            >
              {loadingButton ? <CircularProgress sx={{ color: 'white' }} /> : 'Generate'}
            </LoadingButton>
          </>
        )}
      </Stack>
    </Container>
  );
}

export default CreateQRCode;
