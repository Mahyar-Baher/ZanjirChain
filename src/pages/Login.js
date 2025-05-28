import { useNavigate ,useOutletContext} from 'react-router-dom';
import { Box, Button, TextField, Typography, Container, Grid } from '@mui/material';
import { useState } from 'react';
import WarningsBox from '../components/warningbox';
import ThemeToggleButton from '../theme/ThemeToggleButton';

function Login() {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useOutletContext();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phone.trim().length !== 11 || !phone.startsWith("09")) {
      alert("شماره موبایل نامعتبر است.");
      return;
    }

    if (password.trim().length < 4) {
      alert("رمز باید حداقل ۴ حرف باشد.");
      return;
    }
    navigate('/sms_verification');
  };
  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        <WarningsBox />
        <div className="col-lg-6 p-lg-5">
          <div className="row justify-content-center align-content-center h-100">
            <div className="col-lg-10">
              <h3 className="fw-bold">ورود به ناحیه کاربری</h3>
            </div>
            <form className='d-flex justify-content-center flex-column align-items-center' onSubmit={handleSubmit}>
              <div className="col-lg-10 mt-3">
                <div className="mb-3">
                  <TextField fullWidth label="شماره موبایل" variant="outlined" placeholder="مثال: 09123456789" value={phone} onChange={(e) => setPhone(e.target.value)} sx={{ mb: 3, height: 30}}/>
                </div>
              </div>
              <div className="col-lg-10 mt-3">
                <div className="mb-3">
                  <TextField fullWidth label="رمز ورود" type="password" variant="outlined" placeholder="مثال: 123456" value={password} onChange={(e) => setPassword(e.target.value)} sx={{ mb: 3, height: 30}}/>
                </div>
              </div>
              <div className="col-lg-10 mt-3">
                <div className="mb-3">
                 <Button type="submit" variant="contained" fullWidth sx={{ height: 60, fontSize: '1.1rem', borderRadius: 0 }}>
                  ورود / ثبت نام
                </Button>
                </div>
              </div>
            </form>
            <div className="col-lg-10 mt-3">
              <div>
                <Button onClick={() => navigate('/ForgotPassword')} variant="text" fullWidth sx={{ mt: 2, height: 60, fontSize: '0.95rem', borderRadius: 0 }}>
                رمز خود را فراموش کرده‌ام
              </Button>
              </div>
            </div>
          </div>
          
            <ThemeToggleButton darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </div>
      </div>
    </div>
  );
}

export default Login;
