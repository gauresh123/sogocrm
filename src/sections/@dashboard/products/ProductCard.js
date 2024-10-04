import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { toast } from 'react-toastify';
// utils
import { getQRCodeScanLink } from '../../../helpers/qrCodeHelper';
import useAuthContext from '../../../context/AuthContext';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product, qrcode }) {
  const { currentOrgId } = useAuthContext();
  const { name, codeid, type, text, data, createdat } = qrcode;
  const scanUrl = getQRCodeScanLink(currentOrgId, codeid);
  const qrcodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${scanUrl}`;

  const handleDownload = async () => {
    try {
      const response = await fetch(qrcodeUrl);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${name}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      toast.error('Error downloading image:');
    } finally {
      toast.success('Your Qr Code is downloaded successfully');
    }
  };

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <StyledProductImg alt={name} src={qrcodeUrl} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>
        <Button variant="contained" onClick={handleDownload}>
          Download
        </Button>
      </Stack>
    </Card>
  );
}
