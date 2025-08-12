import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import EmptyLayout from './components/EmptyLayout';
import NotFound from './pages/NotFound';
import { CustomThemeProvider } from './theme/ThemeContext';
import ProfessionalLoadingFallback from './components/ProfessionalLoadingFallback';
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Income = lazy(() => import('./pages/Income'));
const Outcome = lazy(() => import('./pages/Outcome'));
const Sms_verification = lazy(() => import('./pages/sms_verification'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Wallet = lazy(() => import('./pages/wallet'));
const Trade = lazy(() => import('./pages/Trade'));
const AlertPrice = lazy(() => import('./pages/alertPrice'));
const Password = lazy(() => import('./pages/Password'));
const ManageMessage = lazy(() => import('./pages/ManageMessage'));
const ManageAddresses = lazy(() => import('./pages/ManageAddresses'));
const Credits = lazy(() => import('./pages/Credits'));
const Settings = lazy(() => import('./pages/Settings'));
const User = lazy(() => import('./pages/User'));
const History = lazy(() => import('./pages/History'));
const Security = lazy(() => import('./pages/Security'));
const LogOut = lazy(() => import('./pages/LogOut'));
const Guide = lazy(() => import('./pages/Guide'));
const Contact = lazy(() => import('./pages/Contact'));
const Blog = lazy(() => import('./pages/Blog'));
const Invite = lazy(() => import('./pages/invite'));
const Services = lazy(() => import('./pages/Services'));
const GoogleAuthenticator = lazy(() => import('./pages/GoogleAuthenticator'));

function App() {
  return (
    <CustomThemeProvider>
      <Router>
        <Suspense fallback={<ProfessionalLoadingFallback />}> 
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/Contact" element={<Contact />} />
              <Route path="/Guide" element={<Guide />} />
              <Route path="/Blog" element={<Blog />} />
              <Route path="/Invite" element={<Invite />} />
              <Route path="/Services" element={<Services />} />
            </Route>
            <Route element={<EmptyLayout />}>
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/Trade" element={<Trade />} />
              <Route path="/History" element={<History />} />
              <Route path="/Security" element={<Security />} />
              <Route path="/Settings" element={<Settings />} />
              <Route path="/ManageAddresses" element={<ManageAddresses />} />
              <Route path="/ManageMessage" element={<ManageMessage />} />
              <Route path="/alertPrice" element={<AlertPrice />} />
              <Route path="/Credits" element={<Credits />} />
              <Route path="/Income" element={<Income />} />
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/User" element={<User />} />
              <Route path="/outcome" element={<Outcome />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/GoogleAuthenticator" element={<GoogleAuthenticator />} />
              <Route path="/Password" element={<Password />} />
              <Route path="/sms_verification" element={<Sms_verification />} />
              <Route path="/LogOut" element={<LogOut />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </CustomThemeProvider>
  );
}

export default App;
