import { BrowserRouter, HashRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import { AuthContextProvider } from './context/AuthContext';
import { lazy, Suspense } from 'react';
import { CircularProgress } from '@mui/material';
import './App.css';
//routes
const Router = lazy(() => import('./routes'));

// ----------------------------------------------------------------------

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter basename="/">
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
        />
        <ThemeProvider>
          <ScrollToTop />
          <StyledChart />
          <AuthContextProvider>
            <Suspense fallback={<CircularProgress variant="determinate" sx={{ color: 'blue', textAlign: 'center' }} />}>
              <Router />
            </Suspense>
          </AuthContextProvider>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
