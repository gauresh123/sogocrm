import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useRef, useState } from 'react';
import Iconify from '../../components/iconify';
import { toast } from 'react-toastify';
import { editShortURL } from '../../helpers/shortURLHelper';
import useAuthContext from '../../context/AuthContext';
import { LoadingButton } from '@mui/lab';

const EditShortUrlPopup = ({ showEditPopup, setShowEditPopup, item, getURLs }) => {
  const [url, setUrl] = useState(item?.originallink);
  const [shortUrl, setShortUrl] = useState(item?.shortlink);
  const [loading, setLoading] = useState(false);
  const { currentOrgId } = useAuthContext();

  const editHandlePress = async () => {
    if (!url) {
      toast.error('please enter a valid URL');
      return;
    }

    if (/^(ftp|http|https):\/\/[^ "]+$/.test(url) == false) {
      toast.error('please enter a valid URL');
      return;
    }
    if (!shortUrl) {
      toast.error('please enter Back-half');
      return;
    }
    try {
      setLoading(true);
      const res = await editShortURL(currentOrgId, item?.shortlink, url);
      if (!res.error) {
        toast.success('URL is edited');
      }
    } finally {
      await getURLs();
      setLoading(false);
    }
  };
  return (
    <Dialog open={showEditPopup} sx={{ width: '100%' }}>
      <DialogTitle>Edit Link</DialogTitle>
      <DialogContent>
        <FormHelperText sx={{ mb: 1.5, fontWeight: 'bold', color: 'black' }} component={'h6'}>
          Destination
        </FormHelperText>
        <Stack direction={'column'} gap={1.5}>
          <TextField
            size="small"
            sx={{ width: { lg: '500px', sm: '100%', xs: '100%' } }}
            autoFocus
            placeholder="Destination"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Stack direction={'row'} gap={1}>
            <FormHelperText
              sx={{ fontWeight: 'bold', color: 'black', width: { lg: '250px', sm: '50%', xs: '50%' } }}
              component={'h6'}
            >
              Domain
            </FormHelperText>
            <FormHelperText
              sx={{ fontWeight: 'bold', color: 'black', width: { lg: '250px', sm: '50%', xs: '50%' } }}
              component={'h6'}
            >
              Back-half
            </FormHelperText>
          </Stack>
          <Stack direction={'row'} gap={1}>
            <TextField
              size="small"
              sx={{ width: { lg: '250px', sm: '50%', xs: '50%' }, backgroundColor: '#f4f6fa' }}
              placeholder="gosol.ink"
              disabled
            />
            <TextField
              size="small"
              sx={{ width: { lg: '250px', sm: '50%', xs: '50%' }, backgroundColor: '#f4f6fa' }}
              value={shortUrl}
              placeholder="Back-half"
              type="url"
              onChange={(e) => setShortUrl(e.target.value)}
              disabled
            />
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setShowEditPopup(false)} size="small">
          Cancel
        </Button>
        <LoadingButton loading={loading} onClick={editHandlePress} size="small" variant="contained">
          Submit
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default EditShortUrlPopup;
