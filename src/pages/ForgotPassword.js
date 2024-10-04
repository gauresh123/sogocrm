import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography, Divider, Icon, Box, Stack } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// sections
import { LoginForm } from '../sections/auth/login';
import ForgotPasswordForm from '../sections/auth/forgotpassword/ForgotPasswordForm';

// ----------------------------------------------------------------------

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

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  marginRight: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function ForgotPassword() {
  const mdUp = useResponsive('up', 'md');

  return (
    <>
      <Helmet>
        <title>SOGO CRM</title>
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
            Forgot Password
          </Typography>
        </Box>
        <Divider sx={{ my: 3 }}></Divider>
        <ForgotPasswordForm />
      </Container>
    </>
  );
}
