import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useAuthContext from 'src/context/AuthContext';
import { getCustomers } from 'src/helpers/customerHelper';
import { addCampaigns, SendWhatsappCampignBulk } from '../helpers/dashboardHelper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import { getContents, getCustomersEvent, getEvents, getTemplates } from '../helpers/campaignHelper';
import { format } from 'date-fns';
import { Days } from 'src/sections/recurringcampaign/Days';
import LoadingContainer from 'src/components/loader/LoadingContainer';
import { useWatiSettings } from 'src/hooks/useWatiSettings';

const RecurringWhatsappCampaign = () => {
  const { currentOrgId } = useAuthContext();
  const [customers, setCustomers] = useState([]);
  const [currentTab, setCurrentTab] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [template, setTemplate] = useState('');
  const [days, setDays] = useState('2');
  const [eventType, setEventType] = useState('All');
  const [events, setEvents] = useState([]);
  const [templateList, setTemplateList] = useState([]);
  const [contentList, setContentList] = useState([]);

  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(
    "Your loved one's birthday is coming up in two days. Pick your favorite cake from our menu and place an order today!"
  );
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);

  const [dayCondition, setDayCondition] = useState('On');
  const { watiData } = useWatiSettings(currentOrgId);

  const getCustomerList = async () => {
    try {
      setLoading(true);
      const result = await getCustomersEvent(currentOrgId, days, eventType, dayCondition);

      setCustomers(result?.data);
    } catch (error) {
      //
    } finally {
      setLoading(false);
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

    if (customers?.length == 0) {
      toast.error('Please add some customers!');
      return;
    }
    if (!watiData?.token) {
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
            { name: 'message', value: message },
          ],
          whatsappNumber: item?.phone,
        }));
      let rundate = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
      const res = await addCampaigns(
        transformedData && transformedData,
        template?.template_name,
        template?.template_name,
        template?.template_id,
        customers?.length,
        'Whatsapp',
        eventType,
        rundate,
        currentOrgId,
        customers?.map((val) => val?.customer_id),
        watiData?.token,
        watiData?.endpoint
      );
      if (res?.success.errors.error) {
        toast.error(res?.success.errors.error);
      }
    } catch {
      //
    } finally {
      setIsLoading(false);
      toast.success('Your message has been sent!');
    }
  };

  const handleOpen = () => {
    setOpen(true);
    getCustomerList();
  };

  const handleContent = (data) => {
    setContent(data?.content_name);
    setMessage(data?.description);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveCustomer = (i) => {
    let newdata = [...customers];
    setCustomers(newdata?.filter((customer, index) => i !== index));
  };

  useEffect(() => {
    getCustomerList();
  }, [currentOrgId, days, eventType, dayCondition]);

  useEffect(() => {
    (async () => {
      const res = await getEvents(currentOrgId);
      let newdata = [...res.data, { event_type: 'All' }];

      setEvents(newdata);
    })();
  }, [currentOrgId]);

  useEffect(() => {
    (async () => {
      const res = await getTemplates(currentOrgId);
      const data = await getContents(currentOrgId);
      let newData = [...res.data];
      let contentData = [...data?.data];
      setTemplateList(newData);
      setContentList(contentData);
    })();
  }, [currentOrgId]);

  return (
    <Container sx={{ marginTop: { sm: -3, xs: -1 }, width: '100%' }}>
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
            <Button
              sx={{
                alignSelf: 'center',
                fontSize: { xs: '0.75rem', sm: '1rem', md: '1rem' },
                padding: { xs: '4px 8px', sm: '6px 12px', md: '8px 16px' },
              }}
              variant="outlined"
              onClick={handleOpen}
            >
              See List
            </Button>
          </Stack>
        </Stack>

        {/* <Stack direction={'column'} p={2} borderBottom={1} borderColor={'silver'}>
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Box>
              <Typography variant="h6">From</Typography>
              <Typography variant="subtitle2" color={'gray'}>
                Configurable from settings screen
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

          <Typography fontWeight={500}>
            <TextField
              select
              value={template?.template_name}
              size="small"
              fullWidth
              sx={{ width: { sm: '30%', xs: '100%' } }}
              // onChange={(e) => setTemplate(e.target.value)}
              variant="standard"
              InputProps={{
                style: {
                  textAlign: 'center',
                },
              }}
              SelectProps={{
                MenuProps: {
                  PaperProps: {
                    style: {
                      maxHeight: 300,
                      textAlign: 'center',
                    },
                  },
                },
              }}
            >
              {templateList?.map((val) => (
                <MenuItem value={val?.template_name} onClick={() => setTemplate(val)}>
                  {val?.template_name}
                </MenuItem>
              ))}
            </TextField>
          </Typography>
        </Stack>

        <Stack direction={'column'} p={2} gap={2}>
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Box>
              <Typography variant="h6">Content</Typography>
              <Typography variant="subtitle2" color={'gray'}>
                What's the content name for this campaign?
              </Typography>
            </Box>
          </Stack>
          <Typography fontWeight={500}>
            <TextField
              select
              value={content}
              size="small"
              fullWidth
              sx={{ width: { sm: '30%', xs: '100%' } }}
              variant="standard"
              InputProps={{
                style: {
                  textAlign: 'center',
                },
              }}
              SelectProps={{
                MenuProps: {
                  PaperProps: {
                    style: {
                      maxHeight: 300,
                      textAlign: 'center',
                    },
                  },
                },
              }}
            >
              {contentList?.map((val) => (
                <MenuItem value={val?.content_name} onClick={() => handleContent(val)}>
                  {val?.content_name}
                </MenuItem>
              ))}
            </TextField>
          </Typography>
          <Box sx={{ width: '100%' }}>
            <Typography variant="body2" sx={{ width: '100%' }}>
              Your message
            </Typography>
            <TextField
              sx={{ width: '100%' }}
              multiline
              rows={6}
              value={message}
              onChange={(e) => setContent(e.target.value)}
              disabled
            />
          </Box>
        </Stack>
        <Box p={2}>
          <LoadingButton variant="contained" loading={isLoading} onClick={handleSend}>
            Send
          </LoadingButton>
        </Box>
      </Box>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle textAlign={'center'}>Select the Customers</DialogTitle>
        <DialogContent>
          <Stack direction={'column'} spacing={2} mb={2}>
            <Typography fontWeight={500}>
              Event Type:{' '}
              <TextField
                select
                value={eventType}
                size="small"
                fullWidth
                sx={{ width: { sm: '30%', xs: '100%' } }}
                onChange={(e) => setEventType(e.target.value)}
                variant="standard"
                InputProps={{
                  style: {
                    textAlign: 'center',
                  },
                }}
                SelectProps={{
                  MenuProps: {
                    PaperProps: {
                      style: {
                        textAlign: 'center',
                      },
                    },
                  },
                }}
              >
                {events?.map((val) => (
                  <MenuItem value={val?.event_type}>{val?.event_type}</MenuItem>
                ))}
              </TextField>
            </Typography>

            <Stack direction={{ sm: 'row', xs: 'column' }} spacing={2} width={'100%'}>
              <Stack direction={{ sm: 'row', xs: 'row' }} width={{ sm: '50%', xs: '100%' }}>
                <Typography noWrap minWidth={120} fontWeight={500}>
                  Day Condition:
                </Typography>
                <TextField
                  select
                  value={dayCondition}
                  size="small"
                  fullWidth
                  onChange={(e) => setDayCondition(e.target.value)}
                  variant="standard"
                  InputProps={{
                    style: {
                      textAlign: 'center',
                    },
                  }}
                  SelectProps={{
                    MenuProps: {
                      PaperProps: {
                        style: {
                          textAlign: 'center',
                        },
                      },
                    },
                  }}
                >
                  <MenuItem value={'Within'}>Within</MenuItem>
                  <MenuItem value={'On'}>On</MenuItem>
                </TextField>
              </Stack>

              <Stack direction={'row'} width={{ sm: '50%', xs: '100%' }}>
                <Typography fontWeight={500}>Days:</Typography>
                <TextField
                  select
                  value={days}
                  size="small"
                  fullWidth
                  onChange={(e) => setDays(e.target.value)}
                  variant="standard"
                  InputProps={{
                    style: {
                      textAlign: 'center',
                    },
                  }}
                  SelectProps={{
                    MenuProps: {
                      PaperProps: {
                        style: {
                          textAlign: 'center',
                        },
                      },
                    },
                  }}
                >
                  {Days?.map((val, i) => {
                    return (
                      <MenuItem key={i} value={val}>
                        {val}
                      </MenuItem>
                    );
                  })}
                </TextField>
              </Stack>
            </Stack>
          </Stack>
          <LoadingContainer loading={loading}>
            <TableContainer component={Paper}>
              <Box mt={1} p={1} boxShadow={4} borderBottom={1} borderColor={'silver'}>
                <Typography>
                  Customer Count:{'  '}
                  {customers?.length}
                </Typography>
              </Box>
              <Table aria-label="customer table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Mobile Number</TableCell>
                    <TableCell>Event</TableCell>
                    <TableCell>Event Date</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {customers?.map((customer, i) => (
                    <TableRow key={customer.phone}>
                      <TableCell>{customer.first_name}</TableCell>
                      <TableCell>{customer.phone}</TableCell>
                      <TableCell>{customer.event_type}</TableCell>
                      <TableCell>{format(new Date(customer.event_date), 'dd/MM/yyyy')}</TableCell>
                      <TableCell>
                        <IconButton sx={{ color: 'black' }} onClick={() => handleRemoveCustomer(i)}>
                          <DeleteForeverTwoToneIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </LoadingContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default RecurringWhatsappCampaign;
