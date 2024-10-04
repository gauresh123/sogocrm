import { Box, Button, Container, Dialog, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useAuthContext from '../context/AuthContext';
import { getCustomers } from '../helpers/customerHelper';
import { SendWhatsappCampignBulk } from '../helpers/dashboardHelper';
import { toast } from 'react-toastify';
import { LoadingButton } from '@mui/lab';
import { useWatiSettings } from 'src/hooks/useWatiSettings';

const WhatsappCampaign = () => {
  const { currentOrgId } = useAuthContext();
  const [customers, setCustomers] = useState([]);
  const [currentTab, setCurrentTab] = useState(null);
  const [showContent, setShowContent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [template, setTemplate] = useState('');
  const [content, setContent] = useState(
    "We're excited to have you with us and look forward to providing you with the best service."
  );
  const {watiData} = useWatiSettings(currentOrgId);


  const getCustomerList = async () => {
    try {
      const result = await getCustomers(currentOrgId, '1');
      const filtereddata = result?.data.filter((val) => val.phone);
      setCustomers(filtereddata);
    } catch (error) {
      //
    } finally {
      //
    }
  };

  const handleSend = async () => {
    if (!content) {
      toast.error('Please add some content!');
      return;
    }

    if (!template) {
      toast.error('Please give template name!');
      return;
    }

    if(!watiData?.token){
      toast.error('Can not get Wati token from settings!');
      return;
    }


    try {
      setIsLoading(true);

      const transformedData = customers
        ?.filter((val) => val.phone)
        ?.map((item) => ({
          customParams: [
            { name: 'name', value: item.first_name },
            { name: 'message', value: content },
          ],
          whatsappNumber: item?.phone,
        }));
      const res = await SendWhatsappCampignBulk(transformedData && transformedData, template, template,watiData?.token,
        watiData?.endpoint);
      if (res?.success.errors.error) {
        toast.error(res?.success.errors.error);
      } else {
        toast.success('Your message has been sent!');
      }
    } catch {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCustomerList();
  }, [currentOrgId]);

  return (
    <Container sx={{ marginTop: { sm: -3, xs: -1 },width:"100%" }}>
      <Typography variant="h4" gutterBottom>
        Whatsapp Campaign
      </Typography>
      <Box maxWidth={'100%'} height={'auto'} border={1} borderColor={'silver'}>
        <Stack direction={'column'} p={2} borderBottom={1} borderColor={'silver'} gap={2}>
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Box>
              <Typography variant="h6">To</Typography>
              <Typography variant="subtitle2" color={'gray'}>
                Who are you sending this campaign to?
              </Typography>
            </Box>
            {currentTab !== 'To' && (
              <Button sx={{ alignSelf: 'center',fontSize: { xs: '0.75rem', sm: '1rem', md: '1rem' }, padding: { xs: '4px 8px', sm: '6px 12px', md: '8px 16px' } }} variant="outlined" onClick={() => setCurrentTab('To')}>
                See List
              </Button>
            )}

            {currentTab == 'To' && (
              <Button sx={{ alignSelf: 'center' }} variant="outlined" onClick={() => setCurrentTab(null)}>
                Cancel
              </Button>
            )}
          </Stack>
          {currentTab == 'To' && (
            <Box maxHeight={'150px'} sx={{ overflowY: customers && customers?.length > 3 ? 'scroll' : 'hidden' }}>
              {customers?.map((val) => {
                return <Typography p={0.5}>{`${val?.first_name} (${val?.phone})`}</Typography>;
              })}
            </Box>
          )}
        </Stack>

        {/*  <Stack direction={'column'} p={2} borderBottom={1} borderColor={'silver'}>
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Box>
              <Typography variant="h6">From</Typography>
              <Typography variant="subtitle2" color={'gray'}>
                Jupiter Coffee and Traders
              </Typography>
            </Box>
          </Stack>
        </Stack>*/}

        <Stack direction={'column'} p={2} gap={2} borderBottom={1} borderColor={'silver'}>
          <Box>
            <Typography variant="h6">Template</Typography>
            <Typography variant="subtitle2" color={'gray'}>
              What's the template name for this campaign?
            </Typography>
          </Box>

          <TextField
            sx={{ width: '100%' }}
            size="small"
            placeholder="Template name"
            autoFocus
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
          />
        </Stack>

        <Stack direction={'column'} p={2} gap={2}>
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Box>
              <Typography variant="h6">Content</Typography>
              <Typography variant="subtitle2" color={'gray'}>
                What's the content line for this campaign?
              </Typography>
            </Box>
            {/* <Button sx={{ alignSelf: 'center' }} variant="outlined" onClick={() => setShowContent(true)}>
              See Preview
            </Button> */}
          </Stack>
          <Box sx={{ width: '100%' }}>
            <Typography variant="body2" sx={{ width: '100%' }}>
              Your message here
            </Typography>
            <TextField
              sx={{ width: '100%' }}
              multiline
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Box>
        </Stack>
        <Box p={2}>
          <LoadingButton variant="contained" loading={isLoading} onClick={handleSend}>
            Send
          </LoadingButton>
        </Box>
      </Box>
      {/* <Dialog open={showContent} onClose={() => setShowContent(false)}>
        <div dangerouslySetInnerHTML={{ __html: htmlString }} />
      </Dialog> */}
    </Container>
  );
};

export default WhatsappCampaign;
