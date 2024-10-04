import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Stack, IconButton, InputAdornment, TextField, CircularProgress, Typography, Button } from '@mui/material';
import { toast } from 'react-toastify';

import Iconify from '../../../components/iconify';
import { getResetPasswordLink } from 'src/helpers/loginHelper';
import { LoadingButton } from '@mui/lab';

export default function ForgotPasswordForm() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [linkSent, setLinkSent] = useState(false);

  const getLink = async () => {
    setErrors({});
    if (!email) {
      setErrors((prev) => ({ ...prev, email: 'Please enter a valid email id' }));
      return;
    }
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!regexEmail.test(email)) {
      setErrors((prev) => ({ ...prev, email: 'Please enter valid email address' }));
      return;
    }

    try {
      setLoading(true);
      await getResetPasswordLink(email);
      setLinkSent(true);
      toast.success('Password Reset link has been sent to your email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Stack spacing={3} sx={{ width: { sm: '80%', lg: '80%', xs: '100%' } }}>
        <>
          {linkSent && (
            <Typography variant="h6" textAlign={'center'}>
              Password reset link has been sent to your email
            </Typography>
          )}
          {!linkSent && (
            <>
              <TextField
                name="Email"
                label="Email id"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                {...(errors.email && {
                  error: true,
                  helperText: errors.email,
                })}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {email ? (
                        <Iconify icon="ic:baseline-cancel" style={{ cursor: 'pointer' }} onClick={() => setEmail('')} />
                      ) : null}
                    </InputAdornment>
                  ),
                }}
              />
              <LoadingButton loading={loading} variant="contained" size="large" onClick={getLink}>
                Send Link
              </LoadingButton>
            </>
          )}
        </>
      </Stack>
      <Link
        to={'/'}
        style={{
          textDecoration: 'none',
          fontWeight: '600',
          marginTop: 15,
        }}
      >
        Go Back
      </Link>
    </>
  );
}
