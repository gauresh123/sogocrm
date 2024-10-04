import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogContent,
  DialogTitle,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import Campaigns from './Campaigns';
import { useNavigate } from 'react-router-dom';
import { getCampaigns, getCustomersCampaigns } from '../helpers/campaignHelper';
import useAuthContext from '../context/AuthContext';
import Iconify from 'src/components/iconify';
import { format, parseISO } from 'date-fns';

const RecurringCampaigns = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [campaign, setCampaign] = useState([]);
  const [open, setOpen] = useState(false);
  const [campaignCustomers, setCampaignCustomers] = useState([]);
  const [campaignName, setCampaignName] = useState('');
  const navigate = useNavigate();
  const { currentOrgId } = useAuthContext();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getCampaignData = async () => {
    try {
      const res = await getCampaigns(currentOrgId);
      setCampaign(res.data);
    } catch {
      //
    } finally {
      //
    }
  };

  useEffect(() => {
    getCampaignData();
  }, [currentOrgId]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    handleClose();

    switch (option) {
      case 'whatsapp':
        alert('Open WhatsApp');
        break;
      case 'email':
        alert('Compose Email');
        break;
      default:
        break;
    }
  };

  const handleView = async (value) => {
    const res = await getCustomersCampaigns(currentOrgId, value?.campaign_id);

    if (!res.error) {
      setOpen(true);

      setCampaignCustomers(res.data);
      setCampaignName(value?.campaign_name);
    }
  };
  return (
    <>
      <TableContainer>
        <Box mt={2} p={2} borderRadius={5} boxShadow={4}>
          <Box borderBottom={1} pb={1} display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5">Campaign Information</Typography>
            <ButtonGroup variant="contained" color="primary" aria-label="create campaign options">
              <Button onClick={handleClick} endIcon={<Iconify icon="gridicons:dropdown" />}>
                Create Campaign{' '}
              </Button>
            </ButtonGroup>

            <Menu
              id="create-campaign-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => navigate('/app/recurringcampaigns/whatsapp')}>WhatsApp</MenuItem>
              {/* <MenuItem onClick={() => handleOptionSelect('Email')}>Email</MenuItem>*/}
            </Menu>
          </Box>
          <Table aria-label="campaign table">
            <TableHead>
              <TableRow>
                <TableCell>Campaign Name</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Number of Customers</TableCell>
                <TableCell>Run Date</TableCell>
                <TableCell>Customers</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {campaign?.map((val) => {
                return (
                  <TableRow>
                    <TableCell>{val?.campaign_name}</TableCell>
                    <TableCell>{format(new Date(val?.created_at), 'dd/MM/yyyy')}</TableCell>
                    <TableCell>{val?.type}</TableCell>
                    <TableCell align="center">{val?.no_of_customers}</TableCell>
                    <TableCell>{format(new Date(val?.run_date), 'dd/MM/yyyy')}</TableCell>
                    <TableCell>
                      <Button variant="contained" size="small" onClick={() => handleView(val)}>
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </TableContainer>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth={'sm'}>
        <DialogTitle textAlign={'center'}>List of Customers</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper} sx={{ maxWidth: 'sm' }}>
            <Table aria-label="customer table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Mobile Number</TableCell>
                  <TableCell>Event</TableCell>
                  <TableCell>Event Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {campaignCustomers?.map((val, i) => {
                  return (
                    <TableRow>
                      <TableCell>{val?.first_name}</TableCell>
                      <TableCell>{val?.phone}</TableCell>
                      <TableCell>{val?.event_type}</TableCell>
                      <TableCell>{val?.event_date}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RecurringCampaigns;
