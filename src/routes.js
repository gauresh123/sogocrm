import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import { lazy } from 'react';

// ----------------------------------------------------------------------

const EditCustomer = lazy(() => import('./pages/EditCustomer'));
const CreateAppLink = lazy(() => import('./pages/CreateAppLink'));
const AppLink = lazy(() => import('./pages/AppLink'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const Page404 = lazy(() => import('./pages/Page404'));
const NewCustomerPage = lazy(() => import('./pages/NewCustomerPage'));
const Customers = lazy(() => import('./pages/Customers'));
const Forms = lazy(() => import('./pages/Forms'));
const QRAddCustomer = lazy(() => import('./pages/QRAddCustomer'));
const EditQrcode = lazy(() => import('./pages/EditQrcode'));
const CreateOrganisation = lazy(() => import('./pages/CreateOrganisation'));
const Prices = lazy(() => import('./pages/Prices'));
const QRScanMetrics = lazy(() => import('./pages/QRScanMetrics'));
const CreateQRCode = lazy(() => import('./pages/CreateQRCode'));
const CustomFormLandingPage = lazy(() => import('./pages/CustomFormLandingPage'));
const Submissions = lazy(() => import('./pages/Submissions'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const NewFormPage = lazy(() => import('./pages/NewFormPage'));
const EditFormPage = lazy(() => import('./pages/EditFormPage'));
const QrCodes = lazy(() => import('./pages/QrCodes'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const EditApplink = lazy(() => import('./pages/EditApplink'));
const Campaigns = lazy(() => import('./pages/Campaigns'));
const ShortUrls = lazy(() => import('./pages/ShortUrls'));
const PageToRedirect = lazy(() => import('./pages/PageToRedirect'));
const SingleSubmission = lazy(() => import('./pages/SingleSubmission'));
const PageToRedirectQRcode = lazy(() => import('./pages/PageToRedirectQRcode'));
const TimeBoundQRCodes = lazy(() => import('./pages/TimeBoundQRCodes'));
const CreateTimeBoundQRCode = lazy(() => import('./pages/CreateTimeBoundQRCode'));
const PaymentSuccess = lazy(() => import('./pages/PaymentSuccess'));
const SignUpValidationPage = lazy(() => import('./pages/SignUpValidationPage'));
const SignUpValidationSuccessPage = lazy(() => import('./pages/SignUpValidationSuccessPage'));
const DashBoard = lazy(() => import('./pages/DashBoard'));
const Analytics = lazy(() => import('./pages/Analytics'));
const Settings = lazy(() => import('./pages/Settings'));
const Loyalty = lazy(() => import('./pages/Loyalty'));
const Orders = lazy(() => import('./pages/Orders'));
const EmailCampaign = lazy(() => import('./pages/EmailCampaign'));
const WhatsappCampaign = lazy(() => import('./pages/WhatsappCampaign'));
const RecurringCampaigns = lazy(() => import('./pages/RecurringCampaigns'));
const RecurringWhatsappCampaign = lazy(() => import('./pages/RecurringWhatsappCampaign'));
const Content = lazy(()=>import('./pages/Content'));

export default function Router() {
  const routes = useRoutes([
    {
      path: '/app',
      element: <DashboardLayout />,
      children: [
        { path: 'qrcodes/:codeId/metrics', element: <QRScanMetrics /> },
        { path: 'qrcodes/create', element: <CreateQRCode /> },
        { path: 'customers', element: <Customers /> },
        { path: 'newcustomer', element: <NewCustomerPage /> },
        { path: 'customers/editCustomer/:customerId', element: <EditCustomer /> },
        { path: 'form', element: <Forms /> },
        { path: 'form/createForm', element: <NewFormPage /> },
        { path: 'form/editForm/:formId', element: <EditFormPage /> },
        { path: 'form/:formId/submission', element: <Submissions /> },
        { path: 'form/:submissionId/singleSubmission', element: <SingleSubmission /> },
        { path: 'qrcodes', element: <QrCodes /> },
        { path: 'qrcodes/edit/:codeId', element: <EditQrcode /> },
        { path: 'organisation/create', element: <CreateOrganisation /> },
        { path: 'pricing', element: <Prices /> },
        { path: 'appLink', element: <AppLink /> },
        { path: 'appLink/createAppLink', element: <CreateAppLink /> },
        { path: 'appLink/edit/:codeId', element: <EditApplink /> },
        { path: 'campaigns', element: <Campaigns /> },
        { path: 'recurringcampaigns', element: <RecurringCampaigns /> },
        { path: 'recurringcampaigns/whatsapp', element: <RecurringWhatsappCampaign /> },
        { path: 'shortUrl', element: <ShortUrls /> },
        { path: 'timeQRCodes', element: <TimeBoundQRCodes /> },
        { path: 'timeQRCodes/create', element: <CreateTimeBoundQRCode /> },
        { path: 'orders', element: <Orders /> },
        { path: 'dashboard', element: <DashBoard /> },
        { path: 'analytics', element: <Analytics /> },
        { path: 'loyalty', element: <Loyalty /> },
        { path: 'settings', element: <Settings /> },
        { path: 'settings/resetPassword', element: <ResetPassword fromApp={true}/> },
        { path: 'campaigns/emailcampaign', element: <EmailCampaign /> },
        { path: 'campaigns/whatsappcampaign', element: <WhatsappCampaign /> },
        { path: 'content', element: <Content /> },
      ],
    },
    { path: '/', element: <LoginPage /> },
    { path: '/signup', element: <SignupPage /> },
    { path: '/signupvalidation', element: <SignUpValidationPage /> },
    { path: '/signup/signupvalidation/validationSuccess', element: <SignUpValidationSuccessPage /> },
    { path: '/forgotPassword', element: <ForgotPassword /> },
    { path: '/resetPassword', element: <ResetPassword fromApp={false}/> },

    { path: 'app/qrcode/addCustomer/:id', element: <QRAddCustomer /> },
    { path: 'app/form/:orgId/:formId', element: <CustomFormLandingPage /> },
    { path: '/:shortLink', element: <PageToRedirect /> },
    { path: '/qrcode/:shortLink', element: <PageToRedirectQRcode /> },
    { path: '/paymentSuccess/:paymentId', element: <PaymentSuccess /> },

    {
      element: <SimpleLayout />,
      children: [
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/index.html" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/index.html" replace />,
    },
  ]);

  return routes;
}
