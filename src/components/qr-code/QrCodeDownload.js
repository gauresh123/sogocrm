import { Button, Stack } from '@mui/material';
import { QRCodeCanvas } from 'qrcode.react';

function QrCodeDownload({ value, showDownload = true, ...props }) {
  const downloadQRCode = () => {
    const canvas = document.getElementById('qr-gen');
    const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `qr-${Date.now()}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
  return (
    <Stack width={200}>
      <QRCodeCanvas id="qr-gen" size={200} level={'H'} includeMargin {...props} />
      {showDownload && (
        <Button variant="contained" onClick={downloadQRCode}>
          Download QR Code
        </Button>
      )}
    </Stack>
  );
}

export default QrCodeDownload;
