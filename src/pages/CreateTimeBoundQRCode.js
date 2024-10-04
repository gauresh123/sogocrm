import React, { useEffect, useState } from 'react';
import {
  Box,
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
import { createQRCode, createTimeBound } from '../helpers/qrCodeHelper';
import useAuthContext from '../context/AuthContext';
import { useSubscriptions } from '../hooks/useSubscriptions';
import { QRCode } from 'react-qrcode-logo';
import { addDays, format } from 'date-fns';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

function CreateTimeBoundQRCode() {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [type, setType] = useState('');
  const [loadingButton, setLoadingButton] = useState(false);
  const [color, setColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [showCustomisation, setShowCustomisation] = useState(false);
  const [noOfDays, setNoOfDays] = useState(null);
  const [startdate, setStartDate] = useState(new Date());
  const [newUrl, setNewUrl] = useState('');
  const navigate = useNavigate();
  const { currentOrgId } = useAuthContext();
  const { getEnabled } = useSubscriptions(currentOrgId);

  const dynamicAllowed = getEnabled('dynamic_qrcode');

  const reset = () => {
    setName('');
    setUrl('');
    setNewUrl('');
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

    if (!noOfDays) {
      setErrors((prev) => ({ ...prev, noOfDays: 'please enter no of days' }));
      return;
    }
    if (loadingButton) return;
    try {
      setLoadingButton(true);

      // Add  days to the start date
      const newDate = addDays(startdate, noOfDays - 1);

      // Format the  date
      const formattedStartDate = format(startdate, 'yyyy-MM-dd');
      const formattedEndDate = format(newDate, 'yyyy-MM-dd');

      let imageUrl = '';
      if (image) {
        const { imgurl, error: imageError } = await IMGBBuploadImage(await getImageBase64(image));
        if (imageError) {
          toast.error('Error', 'There was an error while uploading image');
          return;
        }
        imageUrl = imgurl;
      }

      await createTimeBound(
        currentOrgId,
        name,
        url,
        color,
        bgColor,
        imageUrl,
        {},
        formattedStartDate,
        formattedEndDate,
        newUrl
      )
        .then((res) => {
          if (!res.error) {
            toast.success('Qr Code is generated');
          }
        })
        .finally(() => {
          setLoadingButton(false);
          navigate(-1);
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

    if (/^(ftp|http|https):\/\/[^ "]+$/.test(url) == false) {
      setErrors((prev) => ({ ...prev, url: 'Please enter a valid URL' }));
      return;
    }
    if (noOfDays == 1) {
      setErrors((prev) => ({ ...prev, noOfDays: 'Add more than 1' }));
      return;
    }
    if (!noOfDays) {
      setErrors((prev) => ({ ...prev, noOfDays: 'Please enter no of days' }));
      return;
    }
    if (!newUrl) {
      setShowCustomisation(!showCustomisation);
    } else if (/^(ftp|http|https):\/\/[^ "]+$/.test(newUrl) == false) {
      setErrors((prev) => ({ ...prev, newUrl: 'Please enter a valid URL' }));
      return;
    }
    setShowCustomisation(!showCustomisation);
  };

  const backHandlePress = () => {
    navigate(-1);
  };

  const handleDaysChange = (e) => {
    let inputValue = e.target.value;

    // Ensure the value is greater than 0
    inputValue = Math.max(0, parseFloat(inputValue)) || '';

    // Update the state
    setNoOfDays(inputValue);
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
            {/*  <FormHelperText
              sx={{ width: { sm: '50%', md: '50%', xs: '100%' }, color: 'black', fontWeight: '800' }}
              variant="h6"
            >
              No of days
            </FormHelperText>*/}
            {/* <TextField
              placeholder="Add No of days "
              sx={{ width: { sm: '50%', md: '50%', xs: '100%' } }}
              size="small"
              type="number"
              onChange={handleDaysChange}
              value={noOfDays}
              {...(errors.noOfDays && {
                error: true,
                helperText: errors.noOfDays,
              })}
            />*/}
            <Stack sx={{ width: { sm: '50%', md: '50%', xs: '100%' } }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  inputFormat="MM/dd/yyyy"
                  label="Effective start date"
                  value={startdate}
                  onChange={(newValue) => setStartDate(newValue)}
                  renderInput={(params) => (
                    <TextField {...params} size="small" sx={{ width: { sm: '50%', md: '50%', xs: '100%' } }} />
                  )}
                />
              </LocalizationProvider>
            </Stack>
            <br />
            <TextField
              label="Add No of days "
              sx={{ width: { sm: '50%', md: '50%', xs: '100%' } }}
              size="small"
              type="number"
              onChange={handleDaysChange}
              value={noOfDays}
              {...(errors.noOfDays && {
                error: true,
                helperText: errors.noOfDays,
              })}
            />
            <br />
            <TextField
              placeholder="Enter URL"
              size="small"
              value={newUrl}
              sx={{ width: { sm: '50%', md: '50%', xs: '100%' } }}
              onChange={(e) => setNewUrl(e.target.value)}
              {...(errors.newUrl && {
                error: true,
                helperText: errors.newUrl,
              })}
            />
            <FormHelperText
              sx={{ width: { sm: '50%', md: '50%', xs: '100%' }, color: 'black', fontWeight: 'bold' }}
              variant="h5"
            >
              This URL to redirect when qr code is not active
            </FormHelperText>
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

export default CreateTimeBoundQRCode;
