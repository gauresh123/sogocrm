import { Button, Card, Link, Stack, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { checkOutFunction } from '../../helpers/checkoutHelper';
import useAuthContext from '../../context/AuthContext';

const PricingCard = ({ item, checkoutHandler, subscription }) => {
  const { plan, price, id } = item;
  const navigate = useNavigate();
  const { currentOrgId } = useAuthContext();

  const handlePay = async () => {
    const response = await checkOutFunction(currentOrgId, id, plan, Number(price) * 100);
    window.location.href = response?.data?.url;
  }

  
  return (
    <Card
      sx={{
        height: '100%',
        border: subscription?.subscription_plan_id == id ? 1 : null,
        borderColor: subscription?.subscription_plan_id == id ? 'silver' : 'null',
      }}
    >
      <Stack spacing={1} sx={{ p: 1 }} alignItems={'center'} width={'100%'}>
        <Link color="inherit" underline="hover">
          <Typography variant="h6" noWrap color={'primary'} fontFamily={'inherit'}>
            {plan}
          </Typography>
        </Link>
        <Typography fontFamily={'inherit'} variant="h4">
        ₹{price}{price !== 0 && "+GST"}
        </Typography>
        <Typography variant="body2" color={'gray'}>
          {subscription?.subscription_plan_id == id ? 'Active Plan' : 'per month, billed annually'}
        </Typography>
      </Stack>
      {subscription?.subscription_plan_id !== id && subscription?.subscription_plan_id == 1 && (
        <Stack alignItems={'center'} width={'100%'} mt={2} p={1}>
          <Button
            fullWidth
            sx={{ borderRadius: 8 }}
            variant="contained"
            size="large"
            onClick={() => checkoutHandler(price, id)}
            //  onClick={handlePay}
          >
            BUY NOW
          </Button>
        </Stack>
      )}

      {/* <Stack spacing={1} mt={2} p={2} alignItems={'center'} width={'100%'}>
        <Typography>Generate QR Codes</Typography>
      </Stack> */}
    </Card>
  );
};

export default PricingCard;
