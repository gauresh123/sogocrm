import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// @mui
import { Stack, IconButton, InputAdornment, TextField, CircularProgress, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';

// components
import Iconify from '../../../components/iconify';
import { signIn } from '../../../helpers/loginHelper';
import useAuthContext from '../../../context/AuthContext';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  const { login, setOrganisations } = useAuthContext();

  const handleClick = (e) => {
    e.preventDefault();
    setErrors({});
    if (!email) {
      setErrors((prev) => ({ ...prev, email: 'Please enter a valid Email id' }));
      return;
    }
    if (!password) {
      setErrors((prev) => ({ ...prev, pin: 'Please enter a valid Pin' }));
      return;
    }
    if (isLoading) return;
    setIsLoading(true);
    signIn(email, password)
      .then((res) => {
        if (!res.error) {
          login(res.data);
          setOrganisations(res.data.organisations);
          navigate('/app/shortUrl', { replace: true });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Stack spacing={3} sx={{ width: { sm: '100%', lg: '80%', xs: '100%' } }}>
        <TextField
          name="Email"
          label="Enter your email address"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          autoFocus
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

        {/*
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <Checkbox name="remember" label="Remember me" />
          <Link variant="subtitle2" underline="hover">
            Forgot password?
          </Link>
        </Stack>
        */}
      </Stack>
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleClick}
        sx={{ my: 3, width: { sm: '100%', lg: '80%', xs: '100%' } }}
      >
        {isLoading ? <CircularProgress sx={{ color: 'white' }} /> : 'Login'}
      </LoadingButton>
      <Stack sx={{ width: { sm: '100%', lg: '80%', xs: '100%' } }}>
        <Typography variant="body1" textAlign={'center'}>
          Don't have an account?{' '}
          <Link
            to={'/signup'}
            style={{
              textDecoration: 'none',
              fontWeight: '600',
            }}
          >
            Sign Up
          </Link>{' '}
        </Typography>
        <Typography mt={1} textAlign={'center'}>
          <Link
            to={'/forgotPassword'}
            style={{
              textDecoration: 'none',
              fontWeight: '600',
            }}
          >
            Forgot Password?
          </Link>
        </Typography>
      </Stack>
    </>
  );
}
