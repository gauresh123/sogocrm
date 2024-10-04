import React, { useState } from 'react';
import { LinkedinShareButton } from 'react-share';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography } from '@mui/material';

export const SharingPopup = ({ showsharingPopup, onClose, shareUrl }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  console.log(title, 'title');
  return (
    <Dialog open={showsharingPopup}>
      <DialogContent>
        <Stack direction={'column'} gap={1}>
          <Typography variant="body1" fontWeight={'600'}>
            URL: {shareUrl}
          </Typography>
          <Typography variant="body2" fontWeight={'600'}>
            Enter title (optional)
          </Typography>
          <TextField
            size="small"
            placeholder="Title"
            autoFocus
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ width: { sm: '100%', xs: 'auto', lg: 400 } }}
          />
          <Typography variant="body2" fontWeight={'600'}>
            Enter description (optional)
          </Typography>
          <TextField
            size="small"
            placeholder="Description"
            multiline
            minRows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ width: { sm: '100%', xs: '100%', lg: 400 } }}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <LinkedinShareButton url={'https://gosol.ink/'}>
          <Button variant="contained">Send</Button>
        </LinkedinShareButton>
      </DialogActions>
    </Dialog>
  );
};
