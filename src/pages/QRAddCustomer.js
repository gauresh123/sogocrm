import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  InputAdornment,
  Alert,
  Slide,
  FormControl,
  FormLabel,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CheckCircleOutline } from '@mui/icons-material';
import { axiosInstance } from '../axiosInstance';
import Iconify from '../components/iconify';
import { useOrganisation } from '../hooks/useOrganisation';

const QRAddCustomer = () => {
  const { id } = useParams(); // organisation id
  const { organisation } = useOrganisation(id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mobileNo, setMobileNo] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const validateInput = () => {
    const temp = {};
    if (mobileNo.length < 10) temp.mobile = 'Please enter a valid number';
    if (!mobileNo) temp.mobile = 'Mobile no is required';
    if (!firstName) temp.firstName = 'First Name is required';
    setErrors(temp);
    return Object.values(temp).filter((item) => item != undefined).length < 1;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!validateInput()) return;
    setIsSubmitting(true);
    try {
      const res = await axiosInstance.post(`/crm/${id}/customer`, { mobileNo, firstName, lastName, email });
      if (!res.data.data.customerid) throw Error('There was an error');
      setIsSuccess(true);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    setFirstName('');
    setLastName('');
    setMobileNo('');
    setEmail('');
    setOpen(false);
  };

  return (
    <Box sx={{ width: '100%', backgroundColor: isSuccess ? 'white' : '#f9c2ad' }}>
      <Box
        sx={{
          width: { sm: '50%', lg: '30%', xs: '90%' },
          height: 'auto',
          margin: 'auto',
          paddingTop: 5,
        }}
      >
        {isSuccess ? (
          <Box sx={{ height: '100vh' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Slide direction="up" in={isSuccess} mountOnEnter unmountOnExit>
                <Alert severity="success" icon={<CheckCircleOutline fontSize="large" />}>
                  <Typography variant={'h6'}>Saved successfully!</Typography>
                </Alert>
              </Slide>
            </Box>
          </Box>
        ) : (
          <>
            {/*<Typography variant="h4" gutterBottom sx={{ paddingBottom: 3 }}>
              {organisation?.organisationname}
        </Typography>*/}
            <img
              src="https://i.ibb.co/j6GLsfH/IMG-20230829-154848.jpg"
              alt="brand/img"
              style={{ minWidth: '100%', height: 90, marginBottom: 12 }}
            />
            <Box
              sx={{
                padding: 3,
                borderRadius: 1,
                backgroundColor: '#ffffff',
                borderColor: 'black',
                marginBottom: 3,
                borderTop: 7,
                borderTopColor: 'red',
              }}
            >
              <Typography variant="h4" mb={2}>
                Claim your free gift worth Rs.99!
              </Typography>
              <Typography variant="body2">
                Dear Patron, Thanks for your purchase with {organisation?.organisationname}. After you fill out this
                gift redemption request, our partners will dispatch the free gift to your door step. You will receive a
                health supplement product as a free gift. By submitting this form, you agree to redeem the gift voucher.
                If you would like to discuss with us more on this gift redemption, WhatsApp us at +91 76038 38611.
              </Typography>
            </Box>
            <FormControl
              fullWidth
              sx={{
                padding: 3,
                borderRadius: 1,
                backgroundColor: '#ffffff',
                border: 1,
                borderColor: 'silver',
              }}
            >
              <FormLabel required sx={{ marginBottom: 3, color: 'black', fontWeight: '500' }}>
                First Name
              </FormLabel>
              <TextField
                fullWidth
                autoFocus
                type="text"
                variant="standard"
                color="error"
                placeholder="Your answer"
                value={firstName}
                {...(errors.firstName && {
                  error: true,
                  helperText: errors.firstName,
                })}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </FormControl>{' '}
            <br /> <br />
            <FormControl
              fullWidth
              sx={{
                padding: 3,
                borderRadius: 1,
                backgroundColor: '#ffffff',
                border: 1,
                borderColor: 'silver',
              }}
            >
              <FormLabel sx={{ marginBottom: 3, color: 'black', fontWeight: '500' }}>Last Name</FormLabel>
              <TextField
                fullWidth
                type="text"
                variant="standard"
                placeholder="Your answer"
                color="error"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </FormControl>
            <br /> <br />
            <FormControl
              fullWidth
              sx={{
                padding: 3,
                borderRadius: 1,
                backgroundColor: '#ffffff',
                border: 1,
                borderColor: 'silver',
              }}
            >
              <FormLabel required sx={{ marginBottom: 3, color: 'black', fontWeight: '500' }}>
                Mobile Number
              </FormLabel>
              <TextField
                onChange={(e) => {
                  if (/^\d*$/.test(e.target.value)) setMobileNo(e.target.value.substring(0, 10));
                }}
                value={mobileNo}
                fullWidth
                variant="standard"
                color="error"
                placeholder="Your answer"
                {...(errors.mobile && {
                  error: true,
                  helperText: errors.mobile,
                })}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {mobileNo ? (
                        <Iconify
                          icon="ic:baseline-cancel"
                          style={{ cursor: 'pointer' }}
                          onClick={() => setMobileNo('')}
                        />
                      ) : null}
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <br /> <br />
            <FormControl
              fullWidth
              sx={{
                padding: 3,
                borderRadius: 1,
                backgroundColor: '#ffffff',
                border: 1,
                borderColor: 'silver',
              }}
            >
              <FormLabel sx={{ marginBottom: 3, color: 'black', fontWeight: '500' }}>Email</FormLabel>
              <TextField
                color="error"
                fullWidth
                type="email"
                variant="standard"
                placeholder="Your answer"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <Box display={'flex'} justifyContent={'space-between'}>
              <Button
                onClick={handleSubmit}
                variant="contained"
                sx={{
                  marginTop: 3,
                  width: '30%',
                  marginBottom: 2,
                  backgroundColor: 'red',
                  ':hover': {
                    bgcolor: '#FF3333',
                    color: 'white',
                  },
                }}
              >
                {isSubmitting ? <CircularProgress sx={{ color: 'white' }} size={24} /> : 'Submit '}
              </Button>

              <Typography
                color={'red'}
                mt={3}
                mb={2}
                variant="button"
                sx={{ cursor: 'pointer' }}
                onClick={() => setOpen(true)}
              >
                Clear form
              </Typography>
            </Box>
          </>
        )}
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Clear form?</DialogTitle>
        <DialogContent>
          <DialogContentText>This will remove your answers from all questions, and cannot be undone</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button color="error" onClick={handleClear}>
            Clear form
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default QRAddCustomer;
