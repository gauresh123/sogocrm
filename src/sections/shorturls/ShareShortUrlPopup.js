import React, { useState } from 'react';
import {
  Box,
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
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';

const ShareShortUrlPopup = ({ sohwSharePopup, setSohwSharePopup, item }) => {
  return (
    <Dialog open={sohwSharePopup} sx={{ maxWidth: 'auto' }} onClose={() => setSohwSharePopup(false)}>
      <DialogTitle>Share Link</DialogTitle>
      <DialogContent>
        <Stack>
          <LinkedinShareButton url={`https://gosol.ink/${item?.shortlink}`}>
            <Stack
              direction={'row'}
              gap={1.5}
              alignContent={'center'}
              sx={{
                width: { lg: '400px', sm: '300px', xs: '250px' },
                p: 1.5,
                border: 1,
                borderColor: 'silver',
                borderRadius: 1,
              }}
            >
              <LinkedinIcon size={30} round style={{ alignSelf: 'center' }} />

              <Typography alignSelf={'center'} variant="body1" fontWeight={'bold'}>
                Linkedin
              </Typography>
            </Stack>
          </LinkedinShareButton>

          <FacebookShareButton url={`https://gosol.ink/${item?.shortlink}`} style={{ marginTop: 15 }}>
            <Stack
              direction={'row'}
              gap={1.5}
              alignContent={'center'}
              sx={{
                width: { lg: '400px', sm: '300px', xs: '250px' },
                p: 1.5,
                border: 1,
                borderColor: 'silver',
                borderRadius: 1,
              }}
            >
              <FacebookIcon size={30} round style={{ alignSelf: 'center' }} />

              <Typography alignSelf={'center'} variant="body1" fontWeight={'bold'}>
                Facebook
              </Typography>
            </Stack>
          </FacebookShareButton>

          <TwitterShareButton url={`https://gosol.ink/${item?.shortlink}`} style={{ marginTop: 15 }}>
            <Stack
              direction={'row'}
              gap={1.5}
              alignContent={'center'}
              sx={{
                width: { lg: '400px', sm: '300px', xs: '250px' },
                p: 1.5,
                border: 1,
                borderColor: 'silver',
                borderRadius: 1,
              }}
            >
              <TwitterIcon size={30} round style={{ alignSelf: 'center' }} />

              <Typography alignSelf={'center'} variant="body1" fontWeight={'bold'}>
                Twitter
              </Typography>
            </Stack>
          </TwitterShareButton>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setSohwSharePopup(false)}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShareShortUrlPopup;
