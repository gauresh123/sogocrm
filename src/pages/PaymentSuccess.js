import React, { useEffect, useState } from 'react';
import { Typography, Container, Paper, Button, Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { updateSubscription } from '../helpers/checkoutHelper';
import { toast } from 'react-toastify';
import LoadingContainer from '../components/loader/LoadingContainer';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { organisationId, subscriptionId, paymentId } = useParams();
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       setLoading(true);
  //       await updateSubscription(organisationId, subscriptionId);
  //     } catch (error) {
  //       //
  //     } finally {
  //       toast.success('Payment Successful!');
  //       setLoading(false);
  //     }
  //   })();
  // }, [organisationId, subscriptionId]);

  return (
    <Container maxWidth="sm">
      <LoadingContainer loading={loading}>
        <Paper elevation={3} style={{ padding: '20px', marginTop: '50px' }}>
          <Typography variant="h4" gutterBottom>
            Payment Successful
          </Typography>

          <div className="success-message">
            <Typography variant="body1">Your payment has been successfully processed.</Typography>
          </div>

          <div className="success-message">
            <Typography variant="body1">Payment Id = {paymentId}</Typography>
          </div>

          <Button variant="contained" size="small" onClick={() => navigate(-1)} sx={{ marginTop: '20px' }}>
            Go to the application
          </Button>
          {/* Add any additional information or links here */}
        </Paper>
      </LoadingContainer>
    </Container>
  );
};

export default PaymentSuccess;
