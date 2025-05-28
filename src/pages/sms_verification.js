import WarningsBox from '../components/warningbox';
import { useNavigate ,useOutletContext} from 'react-router-dom';
import { Box, Button, TextField, Typography, Container, Grid } from '@mui/material';
import { useState } from 'react';
import ThemeToggleButton from '../theme/ThemeToggleButton';
const Sms_verification = () => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useOutletContext();
  const [password, setPassword] = useState('');
  const currectpasscode = (e) => {
    e.preventDefault();
    if (password.trim().length < 4) {
      alert("رمز باید حداقل ۴ حرف باشد.");
      return;
    }
    navigate('/Signup');
  };
  return (
    <div className="container-fluid vh-100">
        <div className="row h-100">
            <WarningsBox />
             <div className="col-lg-6 p-lg-5">
                <div className="row justify-content-center align-content-center h-100">
                    <div className="col-lg-10">
                        <h3 className="fw-bold">تائید شماره همراه</h3>
                    </div>
                    <div className="col-lg-10 mt-3">
                        <span className='text-secondary fs-5 fw-semibold'>لطفا کد چهار رقمی ارسال شده به شماره <span className='' id=''>***********</span> را وارد کنید</span>
                    </div>
                    <div className="col-lg-10 mt-3">
                        <a href='/login' className='link-primary link-underline-opacity-0 d-flex justify-content-start align-items-center'>تغییر شماره تلفن <i className='fas fa-chevron-left mt-1'></i></a>
                    </div>
                    <form className='d-flex justify-content-center flex-column align-items-center' onSubmit={currectpasscode}>
                      <div className="col-lg-10 mt-3">
                          <div class="mb-3">
                              <TextField fullWidth label="کد تائید" type="password" variant="outlined" placeholder="مثال: 123456" value={password} onChange={(e) => setPassword(e.target.value)} sx={{ mb: 3, height: 30}}/>
                          </div>
                      </div>
                      <div className="col-lg-10 mt-3">
                          <div class="mb-3">
                              <Button variant="text" fullWidth sx={{ mt: 2, height: 60, fontSize: '0.95rem', borderRadius: 0 }}>
                                ارسال مجدد کد
                              </Button>
                          </div>
                      </div>
                      <div className="col-lg-10 mt-3">
                          <div class="mb-3">
                              <Button type="submit" variant="contained" fullWidth sx={{ height: 60, fontSize: '1.1rem', borderRadius: 0 }}>
                                ثبت و ورود
                              </Button>
                          </div>
                      </div>
                    </form>
                </div>
                <ThemeToggleButton darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            </div>
        </div>
    </div>
  )
}

export default Sms_verification