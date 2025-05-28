import { useNavigate, useOutletContext  } from 'react-router-dom';
import { useState } from 'react';
import { Container, Grid, Typography, TextField, Button, Box,} from '@mui/material';
import WarningsBox from '../components/warningbox';
import ThemeToggleButton from '../theme/ThemeToggleButton';

function Signup() {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useOutletContext();
  const [formData, setFormData] = useState({
    name: '',
    fname: '',
    identity_code: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    navigate('/wallet');
  };

  return (
    <div className="container-fluid  vh-100">
      <div className="row h-100">
        <WarningsBox />
        <div className="col-lg-6 p-lg-5">
          <div className="row justify-content-center align-content-center h-100">
            <div className="col-lg-10">
              <h3 className="fw-bold">ورود اطلاعات فردی</h3>
            </div>
            <form onSubmit={handleSubmit} className="d-flex justify-content-center flex-column align-items-center">
              <div className="col-lg-10 mt-3" sm="10" lg="12" xs="1">
                <div className="mb-3">
                  <div className="input-group">
                    <TextField
                    fullWidth
                    label="نام"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="مثال: مهیار"
                    variant="outlined"
                    sx={{ bgcolor: 'rgba(0,0,0,0.05)' }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-10 mt-3">
                <div className="mb-3">
                  <div className="input-group">
                     <TextField
                    fullWidth
                    label="نام خانوادگی"
                    name="fname"
                    value={formData.fname}
                    onChange={handleChange}
                    placeholder="مثال: رضایی"
                    variant="outlined"
                    sx={{ bgcolor: 'rgba(0,0,0,0.05)' }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-10 mt-3">
                <div className="mb-3">
                  <div className="input-group">
                    <TextField
                    fullWidth
                    label="کد ملی"
                    name="identity_code"
                    value={formData.identity_code}
                    onChange={handleChange}
                    placeholder="مثال: 1234567890"
                    variant="outlined"
                    sx={{ bgcolor: 'rgba(0,0,0,0.05)' }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-10 mt-3">
                <div className="mb-3">
                  <Button type="submit" fullWidth variant="contained" size="large" sx={{   height: '60px',   borderRadius: 0,   fontSize: '1.1rem', }}>
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
  );
}

export default Signup;
