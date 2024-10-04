import { Grid, Card, CardContent, Typography, CardMedia, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useAuthContext from '../context/AuthContext';
import { getCustomers } from '../helpers/customerHelper';
import { testEmailCampignBulk } from '../helpers/testingCampaignHelper';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Campaigns = () => {
  const { currentOrgId } = useAuthContext();
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const navigate = useNavigate();
  const getCustomerList = async () => {
    setLoading(true);
    try {
      const result = await getCustomers(currentOrgId, '1');
      setEmails(result.data?.map((val) => val.email));
    } catch (error) {
      //
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCustomerList();
  }, [currentOrgId]);

  const sendhandlePressed = async () => {
    setLoadingButton(true);
    try {
      const res = await testEmailCampignBulk([
        'gauresh@thesogo.com',
        'waranggauresh@gmail.com',
        'keerthanathevarajan1106@gmail.com',
        'keerthana@thesogo.com',
        'pattabi@thesogo.com',
      ]);
      if (res.success) {
        toast.success(res.success);
      }
    } catch {
      //
    } finally {
      setLoadingButton(false);
    }
  };
  const CARD_PROPERTY = {
    borderRadius: 3,
    boxShadow: 0,
  };

  let htmlString = ``;
  return (
    <>
      {/* <div dangerouslySetInnerHTML={{ __html: htmlString }} /> */}

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={6} lg={4} xl={3} sx={{ width: '100%', cursor: 'pointer' }}>
          <Card sx={CARD_PROPERTY} onClick={() => navigate('/app/campaigns/whatsappcampaign')}>
            <CardContent>
              <Typography gutterBottom variant="h5" sx={{ fontWeight: 'bold' }} component="div">
                Whatsapp Campaigns
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Engage customers directly with targeted messages, fostering stronger connections and boosting brand
                loyalty.
              </Typography>
            </CardContent>
            <CardMedia sx={{ width: 430, height: 180 }} component="img" image="\assets\images\WhatsApp.jpg" />
          </Card>
        </Grid>
        {/* <Grid item xs={12} sm={6} md={6} lg={4} xl={3} sx={{ width: '100%', cursor: 'pointer' }}>
          <Card sx={CARD_PROPERTY} onClick={() => navigate('/app/campaigns/emailcampaign')}>
            <CardContent>
              <Typography gutterBottom variant="h5" sx={{ fontWeight: 'bold' }} component="div">
                Email Campaigns
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Reach your audience effectively with personalized messages, driving engagement and conversions.
              </Typography>
            </CardContent>
            <CardMedia sx={{ width: 430, height: 180 }} component="img" image="\assets\images\gmail.jpg" />
          </Card>
        </Grid> */}
        {/* <Grid item xs={12} sm={6} md={6} lg={4} xl={3} sx={{ width: '100%' }}>
          <Card sx={CARD_PROPERTY}>
            <CardContent>
              <Typography gutterBottom variant="h5" sx={{ fontWeight: 'bold' }} component="div">
                SMS Campaigns
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Deliver timely and concise messages to your audience, increasing engagement and driving action
              </Typography>
            </CardContent>
            <CardMedia sx={{ width: 430, height: 180 }} component="img" image="\assets\images\sms.jpg" />
          </Card>
        </Grid> */}
      </Grid>
    </>
  );
};

export default Campaigns;
