// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name,title) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1,}} title={title}/>;

const navConfig = [
  ,
  /*
    title: 'dashboard',
    path: '/crm/dashboard',
    icon: icon('ic_analytics'),
// */
  // { title: 'Dashboard', path: '/app/dashboard', icon: icon('ic_dashboard') },
  // {title: 'Contacts', path: '/app/customers', icon: icon('ic_user'),
  //   children:[ { title: 'Recurring Campaigns', path: '/app/recurringcampaigns', icon: icon('ic_campaigns') }]
  // },
  // {  title: 'Campaigns', path: '/app/campaigns', icon: icon('ic_campaigns') },
  //   ,
  //  { title: 'Loyalty', path: '/app/loyalty', icon: icon('ic_loyalty') },
  // { title: 'Analytics', path: '/app/analytics', icon: icon('ic_analytics') },
  // { title: 'Content', path: '/app/content', icon: icon('ic_analytics') },
  // { title: 'LeadGen Forms', path: '/app/form', icon: icon('ic_form') },
  // { title: 'URL Shortener', path: '/app/shortUrl', icon: icon('ic_urls') },
  // { title: 'App Links', path: '/app/appLink', icon: icon('ic_applink') },
  // { title: 'QR Codes', path: '/app/qrcodes', icon: icon('ic_qrcodes') },
  // { title: 'Settings', path: '/app/settings', icon: icon('ic_settings') },
  //{ title: 'orders', path: '/app/orders', icon: icon('ic_form') },
  // { title: 'Time Bound QR Codes', path: '/app/timeQRCodes', icon: icon('ic_timebound_qrcodes') },
  { title: 'Dashboard', path: '/app/dashboard', icon: icon('ic_dashboard',"Dashboard") },
  {
    title: 'Contacts', path: '/app/customers', icon: icon('ic_user','Contacts'),
    children: [{ title: 'Landing Pages', path: '/app/form', icon: icon('ic_form','Landing Pages') }]
  },
  // { title: 'Bulk Campaings', path: '/app/campaigns', icon: icon('ic_campaigns') },
  {
    title: 'Campaigns', path: '/app/recurringcampaigns', icon: icon('ic_campaigns','Campaigns'),
    children: [{ title: 'Content', path: '/app/content', icon: icon('ic_analytics','Content') }]
  },
  {
    title: 'QR Codes', path: '/app/qrcodes', icon: icon('ic_qrcodes','QR Codes'),
    children: [
      { title: 'URL Shortener', path: '/app/shortUrl', icon: icon('ic_urls','URL Shortener') },
      { title: 'App Links', path: '/app/appLink', icon: icon('ic_applink','App Links') },
    ]
  },


];

export const navConfigFreePlan = [
  ,
  /*
    title: 'dashboard',
    path: '/crm/dashboard',
    icon: icon('ic_analytics'),
*/ { title: 'Dashboard', path: '/app/dashboard', icon: icon('ic_dashboard',"Dashboard") },
  { title: 'LeadGen Forms', path: '/app/form', icon: icon('ic_form','Landing Pages') },
  { title: 'URL Shortener', path: '/app/shortUrl', icon: icon('ic_urls','URL Shortener') },
  { title: 'App Links', path: '/app/appLink', icon: icon('ic_applink','App Links') },
  { title: 'QR Codes', path: '/app/qrcodes', icon: icon('ic_qrcodes','QR Codes') },

  //{ title: 'orders', path: '/app/orders', icon: icon('ic_form') },

  // { title: 'Time Bound QR Codes', path: '/app/timeQRCodes', icon: icon('ic_timebound_qrcodes') },
];

export default navConfig;
