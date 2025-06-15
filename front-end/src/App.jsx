import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import EmptyLayout from './components/EmptyLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Income from './pages/Income';
import Outcome from './pages/Outcome';
import Sms_verification from './pages/sms_verification';
import Dashboard from './pages/Dashboard';
import Wallet from './pages/wallet';
import Trade from './pages/Trade';
import AlertPrice from './pages/alertPrice';
import Password from './pages/Password';
import ManageMessage from './pages/ManageMessage';
import ManageAddresses from './pages/ManageAddresses';
import Credits from './pages/Credits';
import Settings from './pages/Settings';
import User from './pages/User';
import History from './pages/History';
import Security from './pages/Security';
import { CustomThemeProvider } from './theme/ThemeContext';

function App() {
  return (
    <CustomThemeProvider>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
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
            <Route path="/Password" element={<Password />} />
            <Route path="/sms_verification" element={<Sms_verification />} />
          </Route>
        </Routes>
      </Router>
    </CustomThemeProvider>
  );
}

export default App;
