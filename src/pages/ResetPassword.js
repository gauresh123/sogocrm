import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Icon,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
import useResponsive from '../hooks/useResponsive';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Iconify from 'src/components/iconify/Iconify';
import { resetPassword, resetPasswordWithutToken } from 'src/helpers/loginHelper';
import { toast } from 'react-toastify';
import useAuthContext from 'src/context/AuthContext';

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

function ResetPassword({fromApp}) {
  const mdUp = useResponsive('up', 'md');
  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const token = searchParams.get('token');

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setShowconfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {currentOrgId,user}=useAuthContext()
  
  
  function validateInput() {
    const temp = {};
    if (!password) temp.password = 'Password is required';
    if (password !== confirmPassword) temp.confirmPassword = 'Passwords do not match';
    setErrors(temp);

    return Object.entries(temp).filter((e) => e != '').length < 1;
  }

  async function handleSubmit() {
    if (!validateInput()) return;
    if (isLoading) return;
    try {
      setIsLoading(true);
      await resetPassword(password, confirmPassword, token);
      toast.success('Your password has been reset');
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const handleReset = async()=>{
    if (!validateInput()) return;
    if (isLoading) return;
    try {
      setIsLoading(true);
      await resetPasswordWithutToken(confirmPassword, currentOrgId, user?.email);
      toast.success('Your password has been reset');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
      navigate(-1);
    }
  }
  return (
    <>
      <Helmet>
        <title>Reset Password - SOGO CRM</title>
      </Helmet>

      <StyledRoot>
        {mdUp && (
          <StyledSection>
            <Icon
              sx={{
                position: 'fixed',
                top: { xs: 18, sm: 24, md: 40 },
                left: { xs: 16, sm: 24, md: 40 },
                fontSize: '50px',
              }}
            >
              <img width={'100%'} height={'100%'} src="/assets/images/logo512.png" alt="sogo-logo" />
            </Icon>
          </StyledSection>
        )}
      </StyledRoot>

      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          flexDirection: 'column',
          marginTop:fromApp? { sm: -5, xs: -1 }:null
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Icon
            sx={{
              display: { xs: 'block', sm: 'block', md: 'none' },
              fontSize: '40px',
            }}
          >
            <img width={'100%'} height={'100%'} src="/assets/images/logo512.png" alt="sogo-logo" />
          </Icon>
          <Typography ml={2} variant="h4">
            Reset Password
          </Typography>
        </Box>
        <Divider sx={{ my: 3 }}></Divider>
        <Stack spacing={3} sx={{ width: { sm: '80%', lg: '80%', xs: '100%' } }}>
          <TextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            {...(errors.password && {
              error: true,
              helperText: errors.password,
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

          <TextField
            name="Confirm Password"
            label="Confirm Password"
            type={showconfirmPassword ? 'text' : 'password'}
            {...(errors.confirmPassword && {
              error: true,
              helperText: errors.confirmPassword,
            })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowconfirmPassword(!showconfirmPassword)} edge="end">
                    <Iconify icon={showconfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Stack>
        {!fromApp&&
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          onClick={handleSubmit}
          sx={{ my: 3, width: { sm: '80%', lg: '80%', xs: '100%' } }}
        >
          {isLoading ? <CircularProgress sx={{ color: 'white' }} /> : 'Update Password'}
        </LoadingButton>}

        {fromApp&&
          <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          onClick={handleReset}
          sx={{ my: 3, width: { sm: '80%', lg: '80%', xs: '100%' } }}
        >
          {isLoading ? <CircularProgress sx={{ color: 'white' }} /> : 'Reset Password'}
        </LoadingButton>
        }
        <Link
          to={'/'}
          style={{
            textDecoration: 'none',
            fontWeight: '600',
            marginTop: 15,
          }}
        >
          Go to Sign In
        </Link>
      </Container>
    </>
  );
}

export default ResetPassword;
