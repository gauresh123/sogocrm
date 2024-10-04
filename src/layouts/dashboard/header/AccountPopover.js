import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, IconButton, Popover, useTheme } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Menu } from '@mui/icons-material';
import useAuthContext from '../../../context/AuthContext';

export default function AccountPopover() {
  const theme = useTheme();
  const [open, setOpen] = useState(null);
  const { user, organisations, setCurrentOrgId, currentOrgId, logout } = useAuthContext();
  const navigate = useNavigate();
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Menu fontSize="large" color="primary" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 200,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user.userName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {/*
          <Stack sx={{ p: 1 }}>
            <MenuItem>
              <Typography variant="h6">Organisations</Typography>
            </MenuItem>
            {organisations.map((option) => (
              <MenuItem
                key={option.organisationid}
                onClick={() => {
                  setCurrentOrgId(option.organisationid);
                }}
                sx={
                  option.organisationid === currentOrgId
                    ? {
                        color: theme.palette.primary.main,
                      }
                    : {}
                }
              >
                {option.organisationname}
              </MenuItem>
            ))}
            <Link style={{ textDecoration: 'none' }} sx={{}} to={'/crm/organisation/create'}>
              <MenuItem
                sx={{
                  textAlign: 'center',
                  '&:hover': { backgroundColor: theme.palette.primary.main },
                  background: theme.palette.primary.main,
                }}
              >
                <Typography color="white" variant="subtitle2">
                  Add New
                </Typography>
              </MenuItem>
            </Link>
          </Stack>
        */}

        {/*<Divider sx={{ borderStyle: 'dashed' }} />*/}
        <MenuItem onClick={()=>navigate("/app/settings/resetPassword")} sx={{ m: 1 }}>
          Reset Password
        </MenuItem>

        <MenuItem onClick={logout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
