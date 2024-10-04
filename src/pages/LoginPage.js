import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography, Divider, Icon, Box, Stack } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// sections
import { LoginForm } from '../sections/auth/login';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 700,
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
  padding: theme.spacing(14, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');

  return (
    <>
      <Helmet>
        <title>Signin to Sogo Account</title>
      </Helmet>

      <StyledRoot>
        <Icon
          sx={{
            position: 'absolute',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
            fontSize: '50px',
          }}
        >
          <img src="/assets/images/logo512.png" alt="sogo-logo" />
        </Icon>

        {mdUp && (
          <StyledSection>
            <Stack direction={'column'} gap={2} mt={10}>
              <Stack direction={'row'} gap={1} px={5} width={'100%'} justifyContent={'center'} alignItems={'center'}>
                <Icon sx={{ width: 80, height: 80, alignSelf: 'center' }}>
                  <img src="/assets/images/title.png" />
                </Icon>
                <Typography variant="h5">
                  Elevate your Business with <mark style={{ color: 'purple', backgroundColor: 'white' }}>SOGO</mark> -
                  the Promising #1 Customer Engagement Platform
                </Typography>
              </Stack>

              <Stack direction={'row'} gap={1} px={5} width={'100%'} justifyContent={'center'} alignItems={'center'}>
                <Icon sx={{ width: 60, height: 60, alignSelf: 'center' }}>
                  <img src="/assets/images/deals.png" />
                </Icon>
                <Typography variant="body3">
                  Increase customer lifetime value by 4x-with Personalized recommendations and exclusive deals.
                </Typography>
              </Stack>

              <Stack direction={'row'} gap={1} px={5} width={'100%'} justifyContent={'center'} alignItems={'center'}>
                <Icon sx={{ width: 60, height: 60, alignSelf: 'center' }}>
                  <img src="/assets/images/analytics.png" />
                </Icon>
                <Typography variant="body3">
                  Grow your business exponentially with data- driven insights and actionable analysis.
                </Typography>
              </Stack>

              <Stack direction={'row'} gap={1} px={5} width={'100%'} justifyContent={'center'} alignItems={'center'}>
                <Icon sx={{ width: 60, height: 60, alignSelf: 'center' }}>
                  <img src="/assets/images/service.png" />
                </Icon>
                <Typography variant="body3">
                  Create lasting impressions with timely follow-ups and attentive customer service.
                </Typography>
              </Stack>

              <Stack direction={'row'} gap={1} px={5} width={'100%'} justifyContent={'center'} alignItems={'center'}>
                <Icon sx={{ width: 60, height: 60, alignSelf: 'center' }}>
                  <img src="/assets/images/marketing.png" />
                </Icon>
                <Typography variant="body3">
                  Skyrocket your sales by 15x through strategic WhatsApp, Email and SMS marketing.
                </Typography>
              </Stack>

              <Stack direction={'row'} gap={1} px={5} width={'100%'} justifyContent={'center'} alignItems={'center'}>
                <Icon sx={{ width: 60, height: 60, alignSelf: 'center' }}>
                  <img src="/assets/images/campaigns.png" />
                </Icon>
                <Typography variant="body3">
                  Transform leads into your brand advocates with targeted nurturing campaigns.
                </Typography>
              </Stack>
            </Stack>
          </StyledSection>
        )}

        <Container
          maxWidth="sm"
          // sx={{
          //   display: 'flex',
          //   justifyContent: 'center',
          //   alignItems: 'center',
          //   height: '100vh',
          //   flexDirection: 'column',
          // }}
        >
          <StyledContent>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                width: { sm: '100%', lg: '80%', xs: '100%' },
              }}
            >
              {/* <Icon
                sx={{
                  display: { xs: 'block', sm: 'block', md: 'none' },
                  fontSize: '40px',
                }}
              >
                <img width={'100%'} height={'100%'} src="/assets/images/logo512.png" alt="sogo-logo" />
              </Icon> */}
              <Typography variant="h4">
                Welcome to <mark style={{ color: 'purple', backgroundColor: 'white' }}>SOGO</mark>
              </Typography>
              <Typography variant="h4">Sign In</Typography>
            </Box>

            {/*
              <Typography variant="body2" sx={{ mb: 5 }}>
                Don’t have an account? {''}
                <Link variant="subtitle2">Get started</Link>
              </Typography>
        */}

            {/* <Stack direction="row" spacing={2}>
              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:facebook-fill" color="#1877F2" width={22} height={22} />
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={22} height={22} />
              </Button>
      </Stack> */}

            <Divider sx={{ my: 3 }}>
              {/*
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  OR
                </Typography>
    */}
            </Divider>

            <LoginForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
