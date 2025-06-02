import WarningsBox from '../components/warningbox';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Container, 
  Grid,
  Modal,
  Backdrop,
  Fade 
} from '@mui/material';
import { useState } from 'react';
import ThemeToggleButton from '../theme/ThemeToggleButton';

const Sms_verification = () => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useOutletContext();
  const [password, setPassword] = useState('');
  
  // State برای مدیریت مودال خطا
  const [errorModal, setErrorModal] = useState({
    open: false,
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (password.trim().length < 4) {
      setErrorModal({
        open: true,
        message: "رمز باید حداقل ۴ حرف باشد."
      });
      return;
    }
    
    navigate('/Signup');
  };

  // تابع بستن مودال خطا
  const closeErrorModal = () => {
    setErrorModal(prev => ({ ...prev, open: false }));
  };

  return (
    <Container fullWidth sx={{ 
      height: '100vh', 
      display: 'flex', 
      p: '0 !important', 
      m: '0 !important' 
    }}>
      {/* مودال خطا */}
      <Modal
        open={errorModal.open}
        onClose={closeErrorModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <Fade in={errorModal.open}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 300,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
              textAlign: 'center',
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" component="h2" gutterBottom>
              خطا در ورود اطلاعات
            </Typography>
            <Typography sx={{ mt: 2, mb: 3 }}>
              {errorModal.message}
            </Typography>
            <Button 
              variant="contained" 
              onClick={closeErrorModal}
              sx={{ width: '100%' }}
            >
              فهمیدم
            </Button>
          </Box>
        </Fade>
      </Modal>

      <Grid container sx={{
        flex: 1,
        m: 0,
        display: 'flex',
        flexDirection: { xs: 'column-reverse', md: 'row' },
      }}>
        <Grid item xs={12} md sx={{ p: 0, m: 0 }}>
          <WarningsBox />
        </Grid>
        <Grid item xs={12} md={6} sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 2, md: 5 },
        }}>
          <Box width="100%" maxWidth={600}>
            <Box my={1} sx={{ textAlign: 'right' }}>
              <ThemeToggleButton darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            </Box>
            
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              تائید شماره همراه
            </Typography>
            
            <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
              لطفا کد چهار رقمی ارسال شده به شماره <span style={{ fontWeight: 'bold' }}>***********</span> را وارد کنید
            </Typography>
            
            <Button 
              href="/login" 
              startIcon={<i className="fas fa-chevron-left" />}
              sx={{ 
                p: 0, 
                mb: 3,
                justifyContent: 'flex-start',
                color: 'primary.main',
                '&:hover': { backgroundColor: 'transparent' }
              }}
            >
              تغییر شماره تلفن
            </Button>
            
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="کد تائید"
                type="password"
                variant="outlined"
                placeholder="مثال: 123456"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 3 }}
              />
              
              <Button 
                variant="text"
                fullWidth
                sx={{ 
                  height: 60, 
                  fontSize: '0.95rem', 
                  borderRadius: 0,
                  mb: 2
                }}
              >
                ارسال مجدد کد
              </Button>
              
              <Button 
                type="submit" 
                variant="contained" 
                fullWidth 
                sx={{ 
                  height: 60, 
                  fontSize: '1.1rem', 
                  borderRadius: 0 
                }}
              >
                ثبت و ورود
              </Button>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Sms_verification;