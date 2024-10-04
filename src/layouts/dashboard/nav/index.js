import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Drawer, Typography, Icon, Stack, Button, IconButton } from '@mui/material';
// mock
// hooks
import useResponsive from '../../../hooks/useResponsive';
import useAuthContext from '../../../context/AuthContext';

// components
import Scrollbar from '../../../components/scrollbar';
import NavSection from '../../../components/nav-section';
//
import navConfig, { navConfigFreePlan } from './config';
import { useSubscriptions } from '../../../hooks/useSubscriptions';
import { Pricings } from '../../../sections/pricing/PricingData';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;
const COLLAPSED_NAV_WIDTH = 30;

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();
  const { user, currentOrgId, organisations } = useAuthContext();
  const { subscription, getEnabled } = useSubscriptions(currentOrgId);
  const { pricingData } = Pricings();
  const [isExpanded, setIsExpanded] = useState(true);

  const isDesktop = useResponsive('up', 'lg');

  const activesubscription = pricingData.find((val, i) => val?.id == subscription?.subscription_plan_id);

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box sx={{ px: 2.5, py: 1.5, display: 'flex', alignItems: 'center' }}>
        <Icon fontSize="large">
          <img width={'100%'} height={'100%'} src="/assets/images/logo512.png" alt="sogo-logo" />
        </Icon>
        <Typography variant="h5" ml={2}>
          SOGO
        </Typography>
      </Box>

      {/* <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none">
          <StyledAccount>
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {user.userName}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {organisations.find((org) => org.organisationid === currentOrgId)?.organisationname}
              </Typography>
            </Box>
          </StyledAccount>
    </Link>
      </Box>*/}

      <NavSection
        data={subscription?.subscription_plan_id == 1 ? navConfigFreePlan : navConfig}
        subscription={subscription}
        // isExpanded={isExpanded}
      />
      <Box sx={{ flexGrow: 1 }} />
      {/*working*/}
      {subscription?.subscription_plan_id == activesubscription?.id ? (
        <>
          {
            <Box
              sx={{ mb: 3, mx: 2.5, mt: { sm: 6, lg: 6, xs: 6 }, cursor: 'pointer', pb: 3 }}
              component={NavLink}
              to={'/app/pricing'}
            >
              <Typography variant="h6" sx={{ color: 'text.primary' }} ml={2} mb={2}>
                Your current plan
              </Typography>
              <Link>
                <StyledAccount>
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                      {subscription && subscription.subscription_name}
                    </Typography>
                    {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {subscription &&
                        (subscription.price / 100).toLocaleString('en-US', { style: 'currency', currency: 'usd' })}
                    </Typography> */}
                  </Box>
                </StyledAccount>
              </Link>
            </Box>
          }
        </>
      ) : (
        <Box sx={{ px: 1, pb: 2 }}>
          <Stack alignItems="center" spacing={3} sx={{ pt: 5, borderRadius: 2, position: 'relative' }}>
            {/* subscription == undefined ? (
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Your Account will expire in
                </Typography>
                <Typography variant="h5" sx={{ color: 'red' }}>
                  14 days
                </Typography>
              </Box>
            ) : (
              <Typography variant="h5">{subscription && subscription.subscription_name}</Typography>
            )*/}

            {/*working price*/}
            {/* {subscription?.subscription_plan_id == 1 && (
              <Button
                variant="contained"
                size="large"
                fullWidth
                sx={{
                  backgroundColor: '#fcbf49',
                  ':hover': {
                    bgcolor: '#fcbf49',
                    color: 'black',
                  },
                }}
                component={NavLink}
                to={'/app/pricing'}
              >
                <Typography variant="h6" color={'black'}>
                  Upgrade Now
                </Typography>
              </Button>
            )} */}
          </Stack>
        </Box>
      )}
    </Scrollbar>
  );

  return (
    <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
      <Box
        component="nav"
        sx={{
          flexShrink: { lg: 0 },
          width: { lg: isExpanded ? NAV_WIDTH : COLLAPSED_NAV_WIDTH },
          transition: 'width 0.3s',
        }}
      >
        {isDesktop ? (
          <Drawer
            open={isExpanded}
            variant="persistent"
            PaperProps={{
              sx: {
                width: isExpanded ? NAV_WIDTH : COLLAPSED_NAV_WIDTH,
                bgcolor: 'background.default',
                borderRightStyle: 'dashed',
              },
            }}
          >
            {renderContent}
          </Drawer>
        ) : (
          <Drawer
            open={openNav}
            onClose={onCloseNav}
            ModalProps={{
              keepMounted: true,
            }}
            PaperProps={{
              sx: { width: NAV_WIDTH },
            }}
          >
            {renderContent}
          </Drawer>
        )}
      </Box>

      <IconButton
        onClick={() => setIsExpanded(!isExpanded)}
        sx={{
          position: 'fixed',
          left: isExpanded ? NAV_WIDTH - 20 : COLLAPSED_NAV_WIDTH - 20,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1300,
          '&:hover': {
            bgcolor: 'transparent',
          },
          display: isDesktop ? 'block' : 'none',
        }}
      >
        {isExpanded ? <ArrowBackIos style={{ color: '#89939b' }} /> : <ArrowForwardIos style={{ color: '#89939b' }} />}
      </IconButton>
    </Box>
  );
}
