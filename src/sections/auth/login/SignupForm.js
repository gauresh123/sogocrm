import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// @mui
import { Stack, IconButton, InputAdornment, TextField, CircularProgress, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';

// components
import Iconify from '../../../components/iconify';
import { signUp, validateSignUp } from '../../../helpers/loginHelper';

// ----------------------------------------------------------------------

export default function SignupForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  const handleClick = async (e) => {
    e.preventDefault();
    setErrors({});
    if (!email) {
      setErrors((prev) => ({ ...prev, email: 'Please enter a valid email id' }));
      return;
    }
    if (!password) {
      setErrors((prev) => ({ ...prev, pin: 'Please enter a valid Password' }));
      return;
    }
    try {
      setIsLoading(true);
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
      await validateSignUp(email).then(() => {
        navigate('/signupvalidation');
      });
    } finally {
      setIsLoading(false);
    }

    // if (isLoading) return;
    // setIsLoading(true);
    // signUp('', email, password)
    //   .then((res) => {
    //     if (!res.error) {
    //       toast.success('Signed Up successfully!');
    //       navigate('/');
    //     }
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
  };

  return (
    <>
      <Stack spacing={3} sx={{ width: { sm: '100%', lg: '80%', xs: '100%' } }}>
        <TextField
          name="email"
          label="Enter your email address"
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

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          {...(errors.pin && {
            error: true,
            helperText: errors.pin,
          })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleClick}
        sx={{ my: 3, width: { sm: '100%', lg: '80%', xs: '100%' } }}
      >
        {isLoading ? <CircularProgress sx={{ color: 'white' }} /> : 'Sign Up'}
      </LoadingButton>
      <Stack sx={{ width: { sm: '100%', lg: '80%', xs: '100%' } }}>
      <Typography variant="body1" textAlign={'center'}>
        Already have an account?{' '}
        <Link
          to={'/'}
          style={{
            textDecoration: 'none',
            fontWeight: '600',
          }}
        >
          Sign In
        </Link>{' '}
      </Typography>
      </Stack>
    </>
  );
}
