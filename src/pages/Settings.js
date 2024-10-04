import React, { useEffect, useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Tabs,
  Tab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import {
  addWhatsAppCampaignDetails,
  editWhatsAppCampaignDetails,
  getWhatsAppCampaignDetails,
} from '../helpers/settingHelper';
import useAuthContext from '../context/AuthContext';
import { toast } from 'react-toastify';
import LoadingContainer from '../components/loader/LoadingContainer';

const Settings = () => {
  const [selectedTab, setSelectedTab] = useState(1);
  const [accessToken, setAccessToken] = useState('');
  const [apiEndpoint, setApiEndpoint] = useState('');
  const [url, setUrl] = useState('');

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editAccessToken, setEditAccessToken] = useState('');
  const [editApiEndpoint, setEditApiEndpoint] = useState('');
  const [editUrl, setEditUrl] = useState('');

  const [accessTokenError, setAccessTokenError] = useState(false);
  const [apiEndpointError, setApiEndpointError] = useState(false);
  const [urlError, setUrlError] = useState(false);

  const [editaccessTokenError, setEditAccessTokenError] = useState(false);
  const [editapiEndpointError, setEditApiEndpointError] = useState(false);
  const [editurlError, setEditUrlError] = useState(false);
  const [disabledAdd, setDisabledAdd] = useState(false);
  const [loading, setLoading] = useState();
  const { currentOrgId } = useAuthContext();

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleSave = async () => {
    let urlPattern =
      /^(https?:\/\/)?((([a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+)|localhost)|((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))(:[0-9]{1,5})?(\/[^\s]*)?$/;
    if (!accessToken || !apiEndpoint || !url || !urlPattern.test(url)) {
      setAccessTokenError(!accessToken);
      setApiEndpointError(!apiEndpoint);
      setUrlError(!url);
      setUrlError(!urlPattern.test(url));
      return;
    }

    try {
      const response = await addWhatsAppCampaignDetails(currentOrgId, accessToken, apiEndpoint, url);

      if (response?.success) {
        toast.success('Data Saved!');
        setUrlError(false);
        setDisabledAdd(true);
      }
    } catch (error) {
      //
    }
  };

  const getWhatCampaignDetails = async () => {
    const res = await getWhatsAppCampaignDetails(currentOrgId);
    return { data: res?.data };
  };

  const handleEditOpen = async () => {
    try {
      const res = await getWhatCampaignDetails();
      setEditAccessToken(res?.data[0].token);
      setEditApiEndpoint(res?.data[0].endpoint);
      setEditUrl(res?.data[0].url);
    } finally {
      setEditDialogOpen(true);
    }
  };

  const handleEditClose = () => {
    setEditDialogOpen(false);
  };

  useEffect(() => {
    setLoading(true);
    getWhatCampaignDetails().then((res) => {
      if (res.data?.length > 0) {
        setAccessToken(res.data[0]?.token);
        setUrl(res.data[0]?.url);
        setApiEndpoint(res.data[0]?.endpoint);
        setDisabledAdd(true);
        setLoading(false);
      } else {
        setAccessToken('');
        setUrl('');
        setApiEndpoint('');
        setLoading(false);
      }
    });
  }, [currentOrgId, editDialogOpen]);
  const handleEditSave = async () => {
    if (!editAccessToken || !editApiEndpoint || !editUrl) {
      setEditAccessTokenError(!editAccessToken);
      setEditApiEndpointError(!editApiEndpoint);
      setEditUrlError(!editUrl);
      return;
    }
    try {
      const res = await editWhatsAppCampaignDetails(currentOrgId, editAccessToken, editApiEndpoint, editUrl);
      if (res?.success) {
        toast.success('Wati data updated!');
        await getWhatCampaignDetails();
      }
    } finally {
      setEditDialogOpen(false);
    }
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ marginTop: 0 }}>
        Settings
      </Typography>
      <Box sx={{ marginTop: 2 }}>
        <Typography
          variant="h6"
          sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', gap: 2, maxWidth: 700 }}
        >
          WATI
          <Button variant="outlined" color="primary" onClick={handleEditOpen} sx={{ marginLeft: 'auto' }}>
            Edit WATI
          </Button>
        </Typography>
        <LoadingContainer loading={loading}>
          <Box sx={{ display: 'flex', marginTop: 2, flexDirection: 'column', gap: 2, maxWidth: 700 }}>
            <TextField
              id="access-token-input"
              label="Access Token"
              variant="outlined"
              fullWidth
              disabled={disabledAdd}
              value={accessToken}
              onChange={(e) => setAccessToken(e.target.value)}
              sx={{ marginBottom: 2 }}
              error={accessTokenError}
              helperText={accessTokenError ? 'Access Token cannot be empty' : ''}
            />
            <TextField
              id="api-endpoint-input"
              label="API Endpoint"
              variant="outlined"
              fullWidth
              disabled={disabledAdd}
              value={apiEndpoint}
              onChange={(e) => setApiEndpoint(e.target.value)}
              sx={{ marginBottom: 2 }}
              error={apiEndpointError}
              helperText={apiEndpointError ? 'API Endpoint cannot be empty' : ''}
            />
            <TextField
              id="url-input"
              label="URL"
              variant="outlined"
              disabled={disabledAdd}
              fullWidth
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              sx={{ marginBottom: 2 }}
              error={urlError}
              helperText={urlError ? 'Please enter URL' : ''}
            />
            <Button
              variant="contained"
              disabled={disabledAdd}
              color="primary"
              onClick={handleSave}
              sx={{ alignSelf: 'flex-end' }}
            >
              ADD
            </Button>
          </Box>
        </LoadingContainer>
      </Box>
      {/*  <Tabs value={selectedTab} onChange={handleTabChange}>
        <Tab label="General" />
        <Tab label="Email" />
        <Tab label="SMS" />
        <Tab label="WATI" />
      </Tabs>
      {selectedTab === 0 && (
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6">General Settings</Typography>
        </Box>
      )}
      {selectedTab === 1 && (
        
      )}
      {selectedTab === 2 && (
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6">Email Settings</Typography>
        </Box>
      )}
      {selectedTab === 3 && (
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6">SMS Settings</Typography>
        </Box>
      )}*/}
      <Dialog open={editDialogOpen} onClose={handleEditClose}>
        <DialogTitle>Edit WATI </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontWeight: 'bold' }}>Enter the WATI you want to update.</DialogContentText>
          <TextField
            margin="dense"
            id="edit-access-token"
            label="Access Token"
            type="text"
            fullWidth
            variant="outlined"
            value={editAccessToken}
            onChange={(e) => setEditAccessToken(e.target.value)}
            error={editaccessTokenError}
            helperText={editaccessTokenError ? 'Access Token cannot be empty' : ''}
          />
          <TextField
            margin="dense"
            id="edit-api-endpoint"
            label="API Endpoint"
            type="text"
            fullWidth
            variant="outlined"
            value={editApiEndpoint}
            onChange={(e) => setEditApiEndpoint(e.target.value)}
            error={editapiEndpointError}
            helperText={editapiEndpointError ? 'API Endpoint cannot be empty' : ''}
          />
          <TextField
            margin="dense"
            id="edit-url"
            label="URL"
            type="text"
            fullWidth
            variant="outlined"
            value={editUrl}
            onChange={(e) => setEditUrl(e.target.value)}
            error={editurlError}
            helperText={editurlError ? 'URL cannot be empty' : ''}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="primary" variant="outlined">
            Back
          </Button>
          <Button onClick={handleEditSave} color="primary" variant="outlined">
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Settings;
