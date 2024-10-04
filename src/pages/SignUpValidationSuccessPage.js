import React, { useState } from 'react';
import { Stack, Typography, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { signUp } from '../helpers/loginHelper';
import useAuthContext from '../context/AuthContext';
import { LoadingButton } from '@mui/lab';

const SignUpValidationSuccessPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthContext();

  const email = searchParams.get('email');

  const storedEmail = localStorage.getItem('email');
  const storedPassword = localStorage.getItem('password');

  const handleLogin = async () => {
    setLoading(true);
    if (email == storedEmail) {
      await signUp('', email, storedPassword)
        .then((res) => {
          login(res.data);
          localStorage.removeItem('email');
          localStorage.removeItem('password');
          setLoading(false);
          navigate('/app/shortUrl', { replace: true });
        })
        .catch(() => {
          navigate('/');
        });
    }
  };
  return (
    <Stack
      spacing={3}
      p={1}
      sx={{
        width: { sm: '80%', lg: '80%', xs: '100%' },
        margin: 'auto', // Center horizontally
        textAlign: 'center', // Center text inside the Stack
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', // Center vertically
        minHeight: '100vh', // Set minimum height to 100% of the viewport height
      }}
    >
      <Typography variant="h5" component="div">
        Email Validation Successful!
      </Typography>
      <Typography>
        Thank you for verifying your email address. You can now log in to your account using the button below.
      </Typography>
      <LoadingButton
        variant="contained"
        color="primary"
        sx={{ width: { sm: '100%', lg: '40%', xs: '100%' }, alignSelf: 'center' }}
        onClick={handleLogin}
        loading={loading}
      >
        Proceed
      </LoadingButton>
    </Stack>
  );
};

export default SignUpValidationSuccessPage;
