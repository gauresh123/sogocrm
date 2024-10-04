import React, { useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import PricingCard from '../sections/pricing/PricingCard';
import { checkout } from '../helpers/pricesHelper';
import useAuthContext from '../context/AuthContext';
import { useSubscriptions } from '../hooks/useSubscriptions';
//import { pricingData } from '../sections/pricing/PricingData';
import LoadingContainer from 'src/components/loader/LoadingContainer';
import { Pricings } from '../sections/pricing/PricingData';

const Prices = () => {
  const { currentOrgId } = useAuthContext();
  const { getSubscription, setRefresh, refresh, subscription, loading } = useSubscriptions(currentOrgId);
  const { pricingData } = Pricings();

  const checkoutHandler = async (amount, subscriptionId) => {
    try {
      const modifiedAmount = amount * 100;
      const { data } = await checkout(modifiedAmount);

      var options = {
        key: 'rzp_test_4kkLxgT197p33p', // Enter the Key ID generated from the Dashboard
        amount: modifiedAmount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: 'INR',
        name: 'Payment',
        description: 'Test Transaction',
        image: 'https://i.ibb.co/NWXbts5/favicon.png',
        order_id: data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url: `https://api.gosol.ink/api/crm/payment/paymentverification/${currentOrgId}/${subscriptionId}`,
        prefill: {
          name: 'Gaurav Kumar',
          email: 'gaurav.kumar@example.com',
          contact: '9000090000',
        },
        notes: {
          address: 'Razorpay Corporate Office',
        },
        theme: {
          color: '#528FFO',
        },
      };

      const rzp1 = new window.Razorpay(options);

      rzp1.on('payment.failed', function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });

      rzp1.open();
    } finally {
      getSubscription();
    }
  };

  return (
    <Container>
      <LoadingContainer loading={loading}>
        <Grid container spacing={3} p={1} sx={{ marginTop: { sm: -3, xs: -1 } }}>
          {pricingData?.map((val, i) => (
            <Grid key={val?.id} item xs={12} sm={6} md={3} lg={4}>
              <PricingCard item={val} checkoutHandler={checkoutHandler} subscription={subscription} />
            </Grid>
          ))}
        </Grid>
      </LoadingContainer>
    </Container>
  );
};

export default Prices;
