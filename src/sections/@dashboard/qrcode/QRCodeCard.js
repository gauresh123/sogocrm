import PropTypes from 'prop-types';
// @mui
import {
  Box,
  Card,
  Link,
  Typography,
  Stack,
  Popover,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import Iconify from '../../../components/iconify/Iconify';
import { useEffect, useRef, useState } from 'react';
import { QRCode } from 'react-qrcode-logo';
import { addCategorytoqrCode, getCategories } from '../../../helpers/qrCodeHelper';
import useAuthContext from '../../../context/AuthContext';
import { toast } from 'react-toastify';
import useForm from '../../../hooks/useForm';
import PreviewPopup from '../../../sections/forms/PreviewPopup';
import { format } from 'date-fns';

// ----------------------------------------------------------------------
QRCodeCard.propTypes = {
  qrcode: PropTypes.object,
};

export default function QRCodeCard({ qrcode, getQrcodeList }) {
  const [showMenu, setShowMenu] = useState(undefined);
  const [showFolder, setShowFolder] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const { currentOrgId } = useAuthContext();
  const { name, codeid, scanlink, isdynamic, bg_color, color, logo, type, formid, content, createdat } = qrcode;

  // let newDate = new Date(createdat);
  // let formatedDate = format(newDate, 'MMMM dd, yyyy');
  let redirectUrl = content;

  if (!/^https?:\/\//i.test(redirectUrl)) {
    redirectUrl = `https://${redirectUrl}`;
  }

  const { form, loading: formLoading } = useForm(currentOrgId, qrcode.formid);

  let formtype = form?.template?.formtype || 'General';

  const downloadQRCode = async (id) => {
    const canvas = document.getElementById(`qr-gen-${id}`);
    const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `qr-${Date.now()}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
  const menuHandlePressed = (e) => {
    setShowMenu(e.currentTarget);
  };
  const folderHandlePressed = (e) => {
    setShowFolder(e.currentTarget);
    setShowMenu(null);
  };

  const addCategory = async (qrid, categoryid, name) => {
    try {
      setLoading(true);
      const res = await addCategorytoqrCode(currentOrgId, qrid, categoryid);
      if (!res.error) {
        toast.success(`QR Code added to ${name} category`);
      }
    } catch {
      //
    } finally {
      setLoading(false);
      setShowFolder(false);
    }
  };

  const cateGoryHandlePressed = async () => {
    setShowFolder(true);
  };

  const handleBoxClick = () => {
    navigate(`/app/form/editForm/${qrcode.formid}`);
  };

  useEffect(() => {
    const getCategoryList = async () => {
      try {
        setLoadingCategories(true);
        const res = await getCategories(currentOrgId);
        if (!res.error) {
          setCategories(res.data);
        }
      } catch {
        //
      } finally {
        setLoadingCategories(false);
      }
    };
    getCategoryList();
  }, [currentOrgId, showFolder]);

  return (
    <Card sx={{ height: '100%', width: '100%' }} id="card">
      <Stack direction={{ lg: 'row', sm: 'row', xs: 'column' }}>
        <Stack p={2} display={{ xs: 'flex' }} justifyContent={{ xs: 'center' }} alignItems={{ xs: 'center' }}>
          <QRCode
            id={`qr-gen-${codeid}`}
            value={scanlink ? scanlink : 'No Text'}
            ecLevel={'H'}
            fgColor={color ? color : '#000000'}
            bgColor={bg_color ? bg_color : '#ffffff'}
            logoImage={logo ? logo : null}
            logoWidth={logo ? 35 : 0}
            logoHeight={logo ? 35 : 0}
            enableCORS={logo ? true : false}
            size={150}
            logoPadding={3}
            qrStyle="dots"
          />
        </Stack>
        <Stack
          direction={'column'}
          alignItems={{ lg: 'flex-start', xs: 'flex-start' }}
          justifyContent={{ lg: 'flex-start', xs: 'flex-start' }}
          width={{ lg: '50%', sm: '50%', xs: '100%' }}
          pl={{ xs: 2 }}
        >
          <Typography variant="h5" noWrap mt={3}>
            {name}
          </Typography>
          <Box
            display={'flex'}
            flexWrap={'wrap'}
            width={{ lg: '100%', sm: '100%', xs: '90%' }}
            alignSelf={{ xs: 'flex-start' }}
            mt={1}
          >
            <Typography variant="subtitle2" noWrap color={'gray'}>
              Destination:
            </Typography>
            {type !== 'form' && type !== 'applink' && (
              <Typography
                variant="subtitle2"
                component={NavLink}
                noWrap
                ml={0.5}
                width={{ lg: '70%', sm: '70%', xs: '100%' }}
                to={redirectUrl}
                target="_blank"
                sx={{ textDecoration: 'none', color: 'inherit' }}
              >
                {redirectUrl}
              </Typography>
            )}

            {type == 'form' && (
              <Typography
                variant="subtitle2"
                component={NavLink}
                noWrap
                ml={0.5}
                width={{ lg: '70%', sm: '70%', xs: '100%' }}
                to={`https://gosol.ink/app/form/${currentOrgId}/${formid}`}
                target="_blank"
                sx={{ textDecoration: 'none', color: 'inherit' }}
              >
                {`https://gosol.ink/app/form/${currentOrgId}/${formid}`}
              </Typography>
            )}

            {type == 'applink' && (
              <Typography variant="subtitle2" noWrap ml={0.5} width={{ lg: '70%', sm: '70%', xs: '100%' }}>
                {scanlink}
              </Typography>
            )}
          </Box>

          {type !== 'form' && (
            <Stack direction={'row'} gap={1} mt={2}>
              <Iconify icon={'lets-icons:date-today'} />
              <Typography variant="subtitle2">{format(new Date(createdat), 'MMMM dd, yyyy')}</Typography>
            </Stack>
          )}
        </Stack>
        <Stack
          direction={'row'}
          alignItems={'flex-start'}
          justifyContent={'flex-start'}
          mt={2}
          gap={2}
          pl={{ xs: 2 }}
          mb={2}
        >
          <Box
            p={1}
            sx={{
              border: 1,
              borderColor: 'silver',
              borderRadius: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Iconify
              icon={!showMenu ? 'solar:menu-dots-bold' : 'material-symbols:cancel'}
              onClick={menuHandlePressed}
              sx={{ cursor: 'pointer', alignSelf: 'center' }}
            />
          </Box>
          {type !== 'applink' && type !== 'form' && isdynamic && (
            <Box
              p={1}
              sx={{
                border: 1,
                borderColor: 'silver',
                borderRadius: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
              }}
              onClick={() => navigate(`/app/qrcodes/edit/${codeid}`)}
            >
              <Iconify icon={'ic:sharp-edit'} sx={{ cursor: 'pointer', alignSelf: 'center' }} />
            </Box>
          )}

          {type == 'applink' && (
            <Box
              p={1}
              sx={{
                border: 1,
                borderColor: 'silver',
                borderRadius: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
              }}
              onClick={() => navigate(`/app/appLink/edit/${codeid}`)}
            >
              <Iconify icon={'ic:sharp-edit'} sx={{ cursor: 'pointer', alignSelf: 'center' }} />
            </Box>
          )}

          <Box
            p={1}
            sx={{
              border: 1,
              borderColor: 'silver',
              borderRadius: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={() => downloadQRCode(codeid)}
          >
            <Iconify icon={'eva:download-fill'} sx={{ cursor: 'pointer', alignSelf: 'center' }} />
          </Box>
          {type == 'form' && (
            <Box
              p={1}
              sx={{
                border: 1,
                borderColor: 'silver',
                borderRadius: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
              }}
              onClick={() => setShowPopup(true)}
            >
              <Iconify icon={'mdi:eye'} sx={{ cursor: 'pointer', alignSelf: 'center' }} />
            </Box>
          )}
          {type == 'form' && formtype !== 'Event' && (
            <Box
              p={1}
              sx={{
                border: 1,
                borderColor: 'silver',
                borderRadius: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
              }}
              onClick={handleBoxClick}
            >
              <Iconify icon={'ic:sharp-edit'} sx={{ cursor: 'pointer', alignSelf: 'center' }} />
            </Box>
          )}
        </Stack>
        {/*
          <>
            <Button variant="outlined" onClick={handleDownload} startIcon={<Iconify icon="fa-solid:download" />}>
              Download
            </Button>
            {isdynamic && (
              <Button
                variant="outlined"
                startIcon={<Iconify icon="material-symbols:edit" />}
                onClick={() => navigate(`/crm/qrcodes/editqrCode/${codeid}`)}
              >
                Edit
              </Button>
            )}
            <Button variant="outlined" startIcon={<Iconify icon="bx:qr-scan" />}>
              Scan tracking
            </Button>
          </>
            )*/}

        <Popover
          open={Boolean(showMenu)}
          anchorEl={showMenu}
          onClose={() => setShowMenu(null)}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{
            sx: {
              p: 1,
              width: 170,
              '& .MuiMenuItem-root': {
                px: 1,
                py: 1,
                typography: 'body2',
                borderRadius: 0.75,
              },
            },
          }}
        >
          {/* type !== 'applink' && type !== 'form' && isdynamic && (
            <MenuItem onClick={() => navigate(`/app/qrcodes/edit/${codeid}`)}>
              <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
              Edit
            </MenuItem>
          )*/}
          {type == 'form' && (
            <MenuItem onClick={() => navigate(`/app/form/${formid}/submission`)}>
              <Iconify icon={'iconoir:submit-document'} sx={{ mr: 2 }} />
              Responses
            </MenuItem>
          )}

          {/*<MenuItem onClick={() => downloadQRCode(codeid)}>
            <Iconify icon={'eva:download-fill'} sx={{ mr: 2 }} />
            Download
          </MenuItem>*/}

          {isdynamic && (
            <MenuItem onClick={() => navigate(`/app/qrcodes/${codeid}/metrics`)}>
              <Iconify icon={'bx:qr-scan'} sx={{ mr: 2 }} />
              Scan tracking
            </MenuItem>
          )}
          {/*type == 'applink' && (
            <MenuItem onClick={() => navigate(`/app/appLink/edit/${codeid}`)}>
              <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
              Edit
            </MenuItem>
          )*/}
          {
            <MenuItem onClick={cateGoryHandlePressed}>
              <Iconify icon={'material-symbols-light:category'} sx={{ mr: 2 }} />
              Add Category
            </MenuItem>
          }
          {/*type == 'form' && (
            <MenuItem onClick={() => setShowPopup(true)}>
              <Iconify icon={'mdi:eye'} sx={{ mr: 2 }} />
              View
            </MenuItem>
          )*/}
        </Popover>
        <Dialog open={showFolder} onClose={() => setShowFolder(false)}>
          {categories?.length > 0 && <DialogTitle>My Categories</DialogTitle>}
          {categories?.length > 0 &&
            categories?.map((val) => (
              <Stack direction={'row'} gap={2} key={val.categoryid} mt={-2}>
                <DialogContent>
                  <DialogContentText sx={{ fontWeight: 600 }}>{val.name}</DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => addCategory(codeid, val.categoryid, val.name)}>Add</Button>
                </DialogActions>
              </Stack>
            ))}
          {categories?.length == 0 && <DialogTitle>No categories</DialogTitle>}

          {/* <Button variant="contained" size="small" sx={{ margin: 1 }}>
            Add New Folder
          </Button>*/}
        </Dialog>
        <PreviewPopup
          form={form}
          formId={formid}
          orgId={currentOrgId}
          showPopup={showPopup}
          setShowPopup={(val) => setShowPopup(val)}
        />
      </Stack>
    </Card>
  );
}
