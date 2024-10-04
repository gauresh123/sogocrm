import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// @mui
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

const iconColors = {
  // Dashboard
  Dashboard: '#1976D2',  // Original
  // Dashboard1: '#1E88E5', // Alternative 1
  // Dashboard2: '#1565C0', // Alternative 2
  // Dashboard3: '#0D47A1', // Alternative 3

  // Contacts
  // Contacts: '#388E3C',   // Original
  // Contacts: '#43A047',  // Alternative 1
  // Contacts: '#2E7D32',  // Alternative 2
  Contacts: '#1B5E20',  // Alternative 3

  // Landing Pages
  // 'Landing Pages': '#F57C00',  // Original
  // 'Landing Pages': '#FB8C00', // Alternative 1
  // 'Landing Pages': '#F57F17', // Alternative 2
  'Landing Pages': '#E65100', // Alternative 3

  // Campaigns
  // Campaigns: '#7B1FA2',  // Original
  // Campaigns: '#8E24AA', // Alternative 1
  // Campaigns: '#6A1B9A', // Alternative 2
  Campaigns: '#9C27B0', // Alternative 3

  // QR Codes
  // 'QR Codes': '#C62828',  // Original
  // 'QR Codes': '#D32F2F', // Alternative 1
  // 'QR Codes': '#B71C1C', // Alternative 2
  'QR Codes': '#E53935', // Alternative 3

  // URL Shortener
  // 'URL Shortener': '#004D40', // Original
  // 'URL Shortener': '#00796B', // Alternative 1
  // 'URL Shortener': '#00332E', // Alternative 2
  'URL Shortener': '#004D40', // Alternative 3

  // App Links
  // 'App Links': '#F9A825', // Original
  // 'App Links': '#FBC02D', // Alternative 1
  // 'App Links': '#F57F17', // Alternative 2
  'App Links': '#FFB300', // Alternative 3

  // Content
  // 'Content': '#F57C00',  // Original
  // 'Content': '#FF704', // Alternative 1
  // 'Content': '#FF6F00', // Alternative 2
  'Content': '#F57C00', // Alternative 3
};




const getIconColor = (title) => {
  return iconColors[title] || '#000';
};
const SvgColor = forwardRef(({ src, sx,title, ...other }, ref) => (
  <Box
    component="span"
    className="svg-color"
    ref={ref}
    sx={{
      width: 24,
      height: 24,
      color: getIconColor(title),
      display: 'inline-block',
      bgcolor: 'currentColor',
      mask: `url(${src}) no-repeat center / contain`,
      WebkitMask: `url(${src}) no-repeat center / contain`,
      ...sx,
    }}
    {...other}
  />
));

SvgColor.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string,
  sx: PropTypes.object,
};

export default SvgColor;
