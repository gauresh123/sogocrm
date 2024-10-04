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
import { IMGBBuploadImage, getImageBase64 } from '../helpers/imageHelper';
import { QRCodeSVG } from 'qrcode.react';
import { QRCode } from 'react-qrcode-logo';

const EditQrcode = () => {
  const [qrcode, setQrcode] = useState({});
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingButton, setloadingButton] = useState(false);
  const [activate, setActivate] = useState(false);
  const [errors, setErrors] = useState({});
  const [color, setColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [image, setImage] = useState(null);
  const [newImage, setNewImage] = useState('');
  const [showCustomisation, setShowCustomisation] = useState(false);

  const { codeId } = useParams();
  const { currentOrgId } = useAuthContext();
  const navigate = useNavigate();

  const getCode = async () => {
    await getQRCode(currentOrgId, codeId)
      .then((res) => {
        if (!res.error) {
          setQrcode(res.data);
          setName(res.data.name);
          setUrl(res.data.content);
          setActivate(res.data.isactive);
          setColor(res.data.color);
          setBgColor(res.data.bg_color);
          setImage(res.data.logo);
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
      setErrors((prev) => ({ ...prev, name: 'Please enter a name' }));
    }
    if (!url) {
      setErrors((prev) => ({ ...prev, url: 'Please enter a url' }));
    }
    if (loadingButton) return;
    try {
      setloadingButton(true);
      let imageUrl = image;
      if (newImage) {
        const { imgurl, error: imageError } = await IMGBBuploadImage(await getImageBase64(newImage));
        if (imageError) {
          toast.error('Error', 'There was an error while uploading image');
          return;
        }
        imageUrl = imgurl;
      }
      const res = await editQrCode(currentOrgId, codeId, name, 'url', url, activate, color, bgColor, imageUrl);

      if (!res.error) {
        toast.success('Qr Code is edited!');
        navigate('/app/qrcodes');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setloadingButton(false);
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
      setNewImage(file);
    }
  };
  const nextHandlePress = () => {
    setErrors({});
    if (!name) {
      setErrors((prev) => ({ ...prev, name: 'Please enter a name' }));
    }
    if (!url) {
      setErrors((prev) => ({ ...prev, url: 'Please enter a url' }));
    }
    setShowCustomisation(!showCustomisation);
  };

  const targetEditable = qrcode.isdynamic && qrcode.type === 'url';

  return (
    <>
      <LoadingContainer loading={loading}>
        <Container sx={{ marginTop: { sm: -6, xs: -2 } }}>
          {!showCustomisation && (
            <Button variant="contained" sx={{ marginLeft: 2 }} onClick={() => navigate(-1)}>
              Go Back
            </Button>
          )}
          <Stack alignItems={'center'} sx={{ padding: 2 }}>
            {!showCustomisation && (
              <>
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
                {targetEditable && (
                  <>
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
                  </>
                )}

                <Stack direction="row" spacing={0.5} alignItems="center">
                  <Typography>Deactivate</Typography>
                  <FormControlLabel
                    control={<Switch checked={activate ? true : false} onChange={() => setActivate(!activate)} />}
                    label="Activate"
                  />
                </Stack>
              </>
            )}
            <br />

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
                logoImage={image ? URL.createObjectURL(image) : newImage}
                logoWidth={image || newImage ? 25 : 0}
                logoHeight={image || newImage ? 25 : 0}
                enableCORS={image || newImage ? true : false}
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
                  <TextField
                    size="small"
                    type="file"
                    onChange={onImageChange}
                    sx={{ width: { sm: '40%', xs: '60%' } }}
                  />
                </Stack>
                <br />
                <LoadingButton
                  sx={{ width: { sm: '50%', md: '50%', xs: '100%' } }}
                  size="large"
                  type="submit"
                  variant="contained"
                  onClick={editHandlePress}
                >
                  {loadingButton ? <CircularProgress sx={{ color: 'white' }} /> : 'Edit'}
                </LoadingButton>
              </>
            )}
          </Stack>
        </Container>
      </LoadingContainer>
    </>
  );
};

export default EditQrcode;
