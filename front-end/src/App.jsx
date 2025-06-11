import './App.css'
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
import Password from './pages/Password';
import User from './pages/User';
import History from './pages/History';
import { useState, useMemo } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './theme';
import ThemeToggleButton from './theme/ThemeToggleButton';
function App() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = useMemo(() => (darkMode ? darkTheme : lightTheme), [darkMode]);
  const toggleDarkMode = () => setDarkMode(prev => !prev);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route element={<MainLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<EmptyLayout darkMode={darkMode} toggleDarkMode={() => setDarkMode((prev) => !prev)} />}>
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/Trade" element={<Trade />} />
            <Route path="/History" element={<History />} />
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
    </ThemeProvider>
  );
}

export default App;
