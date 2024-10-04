import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import React from 'react';

const CARD_PROPERTY = {
  borderRadius: 3,
  boxShadow: 0,
  height:400
};
const Loyalty = () => {
  return (
    <>
     <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={6} lg={4} xl={3} sx={{ width: "100%" }}>
        <Card sx={CARD_PROPERTY}>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              sx={{ fontWeight: "bold" }}
              component="div"
            >
              Loyalty Program Management
            </Typography>
            <Typography variant="body1" color="text.secondary">
            Tools for creating and managing loyalty programs, such as points-based systems, tiered rewards, or special offers for frequent buyers.
            </Typography>
          </CardContent>
          <CardMedia
          sx={{width:430,height:180}}
            component="img"
            image="\assets\images\rewards.jpg"
          />
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={4} xl={3} sx={{ width: "100%" }}>
        <Card sx={CARD_PROPERTY}>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              sx={{ fontWeight: "bold" }}
              component="div"
            >
              Points and Rewards Tracking
            </Typography>
            <Typography variant="body1" color="text.secondary">
            Capabilities to track and manage loyalty points earned by customers through purchases, referrals, or other interactions, and to redeem rewards.
            </Typography>
          </CardContent>
          <CardMedia
          sx={{width:400,height:180}}
            component="img"
            image="\assets\images\loyalty.jpg"
          />
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={4} xl={3} sx={{ width: "100%" }}>
        <Card sx={CARD_PROPERTY}>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              sx={{ fontWeight: "bold" }}
              component="div"
            >
             Referral Programs
            </Typography>
            <Typography variant="body1" color="text.secondary">
            Functionality to create and manage referral programs, incentivizing customers to refer others to your business and rewarding them for successful referrals.
            </Typography>
          </CardContent>
          <CardMedia
          sx={{width:430,height:180}}
            component="img"
            image="\assets\images\referal.jpg"
          />
        </Card>
      </Grid>
      </Grid>
    </>
  );
};

export default Loyalty;
