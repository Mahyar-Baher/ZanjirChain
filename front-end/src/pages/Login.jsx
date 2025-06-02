import { useNavigate, useOutletContext } from 'react-router-dom';
import { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Box,
  useMediaQuery,
  Modal,
  Backdrop,
  Fade,
} from '@mui/material';
import WarningsBox from '../components/warningbox';
import ThemeToggleButton from '../theme/ThemeToggleButton';

function Login() {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useOutletContext();
  const isVerySmallScreen = useMediaQuery('(max-width:359px)');

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errorModal, setErrorModal] = useState({
    open: false,
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!/^09\d{9}$/.test(phone.trim())) {
      setErrorModal({
        open: true,
        message: 'شماره موبایل نامعتبر است.'
      });
      return;
    }

    if (password.trim().length < 4) {
      setErrorModal({
        open: true,
        message: 'رمز باید حداقل ۴ حرف باشد.'
      });
      return;
    }

    navigate('/sms_verification');
  };
  const closeErrorModal = () => {
    setErrorModal(prev => ({ ...prev, open: false }));
  };

  return (
    <Container fullWidth sx={{ height: '100vh', display: 'flex', p: '0 !important', m: '0 !important' }}>
      <Modal
        open={isVerySmallScreen}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <Fade in={isVerySmallScreen}>
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
              توجه!
            </Typography>
            <Typography sx={{ mt: 1 }}>
              عرض صفحه بسیار کم است. لطفاً دستگاه خود را بچرخانید.
            </Typography>
          </Box>
        </Fade>
      </Modal>
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

      <Grid
        fullWidth
        sx={{
          flex: 1,
          px: { xs: 1, md: 0 },
          m: 0,
          display: 'flex',
          flexDirection: { xs: 'column-reverse', md: 'row' },
        }}
      >
        <Grid item xs={12} md={6} sx={{ p: 0, m: 0 }}>
          <WarningsBox />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 0,
            m: 0,
            ml: { xs: 0, md: 2, lg: 0 },
            mb: { xs: 2, md: 0 },
          }}
        >
          <Box width="100%" maxWidth={'100%'}>
            <Box my={1}>
              <ThemeToggleButton darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            </Box>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              ورود / ثبت‌نام
            </Typography>
            <form component="form" onSubmit={handleSubmit} mt={3}>
              <TextField
                fullWidth
                label="شماره موبایل"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="مثال: 09123456789"
                variant="outlined"
                margin="normal"
                sx={{ bgcolor: 'rgba(0,0,0,0.05)' }}
              />
              <TextField
                fullWidth
                label="رمز ورود"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="مثال: 123456"
                variant="outlined"
                margin="normal"
                sx={{ bgcolor: 'rgba(0,0,0,0.05)' }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ height: 60, borderRadius: 0, fontSize: '1.1rem', mt: 2 }}
              >
                ورود / ثبت‌نام
              </Button>
            </form>
            <Button
              onClick={() => navigate('/ForgotPassword')}
              variant="text"
              fullWidth
              sx={{ mt: 2, height: 60, fontSize: '0.95rem', borderRadius: 0 }}
            >
              رمز خود را فراموش کرده‌ام
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Login;