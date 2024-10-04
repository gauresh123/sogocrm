import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';
import { Box, Container, Divider, Icon, Stack, Typography } from '@mui/material';
import useResponsive from '../hooks/useResponsive';
import Logo from '../components/logo';
import SignupForm from '../sections/auth/login/SignupForm';

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
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(14, 0),
}));

// ----------------------------------------------------------------------

export default function SignupPage() {
  const mdUp = useResponsive('up', 'md');

  return (
    <>
      <Helmet>
        <title>Sign Up with Sogo</title>
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

        <Container maxWidth="sm">
          <StyledContent>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                width: { sm: '100%', lg: '80%', xs: '100%' },
              }}
            >
              <Typography ml={2} variant="h4">
                Sign Up With <mark style={{ color: 'purple', backgroundColor: 'white' }}>SOGO</mark>
              </Typography>
            </Box>
            <Divider sx={{ my: 3 }}></Divider>
            <SignupForm />
          </StyledContent>
        </Container>
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
      </StyledRoot>
    </>
  );
}
