import { Stack, Typography } from '@mui/material';
import React from 'react';

const SignUpValidationPage = () => {
  return (
    <Stack
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
      <Typography variant="h6">
        Thank you for signing up with us! To ensure the security of your account, we need to verify your email address.
        Please check your email inbox for a verification message.
      </Typography>
    </Stack>
  );
};

export default SignUpValidationPage;
