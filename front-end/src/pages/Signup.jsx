import { useNavigate, useLocation } from 'react-router-dom';import { useState, useContext } from 'react';
import axios from 'axios';
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
import { AuthContext } from '../context/AuthContext';

function Signup() {
  const location = useLocation();
  const mobileNumber = location.state?.phone;
  const navigate = useNavigate();
  const isVerySmallScreen = useMediaQuery('(max-width:359px)');
  const { fetchUserFromToken } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: '',
    fname: '',
    identity_code: '',
    password: '',
    password_approve: '',
  });

  const [errorModal, setErrorModal] = useState({
    open: false,
    message: ''
  });

  const getUserIP = async () => {
    try {
      const res = await axios.get('https://api.ipify.org?format=json');
      return res.data.ip || '0.0.0.0';
    } catch {
      return '0.0.0.0';
    }
  };

  const parseUserAgent = async () => {
    const ua = navigator.userAgent;
    const ip = await getUserIP();
    let os = 'Unknown OS';
    let browser = 'Unknown Browser';
    let device = 'Desktop';

    if (/Windows NT 10.0;.*64/.test(ua)) os = 'Windows 11';
    else if (/Windows NT 10.0/.test(ua)) os = 'Windows 10';
    else if (/Windows NT 6.1/.test(ua)) os = 'Windows 7';
    else if (/Mac OS X/.test(ua)) os = 'macOS';
    else if (/Linux/.test(ua)) os = 'Linux';

    if (/Chrome\/(\S+)/.test(ua)) {
      const version = ua.match(/Chrome\/(\S+)/)[1];
      browser = 'Chrome ' + version;
    } else if (/Firefox\/(\S+)/.test(ua)) {
      const version = ua.match(/Firefox\/(\S+)/)[1];
      browser = 'Firefox ' + version;
    } else if (/Safari\/(\S+)/.test(ua) && !/Chrome/.test(ua)) {
      const version = ua.match(/Version\/(\S+)/)?.[1] || '';
      browser = 'Safari ' + version;
    }

    return {
      device,
      os,
      browser,
      ip,
      current: true,
      last_active_at: new Date().toISOString(),
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.name.trim().length < 2) {
      return setErrorModal({ open: true, message: 'نام باید حداقل ۲ حرف باشد.' });
    }

    if (formData.fname.trim().length < 2) {
      return setErrorModal({ open: true, message: 'نام خانوادگی باید حداقل ۲ حرف باشد.' });
    }

    if (!/^\d{10}$/.test(formData.identity_code)) {
      return setErrorModal({ open: true, message: 'کد ملی باید ۱۰ رقم باشد.' });
    }

    if (formData.password.length < 6) {
      return setErrorModal({ open: true, message: 'رمز عبور باید حداقل ۶ کاراکتر باشد.' });
    }

    if (formData.password !== formData.password_approve) {
      return setErrorModal({ open: true, message: 'رمز عبور و تکرار آن مطابقت ندارند.' });
    }

    const session = await parseUserAgent();

    const payload = {
      first_name: formData.name,
      last_name: formData.fname,
      national_code: formData.identity_code,
      password: formData.password,
      password_confirmation: formData.password_approve,
      mobile_number: mobileNumber,
      active_sessions: [session],
    };

    try {
      const response = await axios.post('https://amirrezaei2002x.shop/laravel/api/add-user', payload, {
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.data.success === true && response.data.token) {
        const initialToken = response.data.token;
        localStorage.setItem('token', initialToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${initialToken}`;

        try {
          const verifyRes = await axios.post(
            'https://amirrezaei2002x.shop/laravel/api/verifyPasscodeToken',
            { mobile_number: mobileNumber.trim() },
            {
              headers: { Authorization: `Bearer ${initialToken}` }
            }
          );

          if (verifyRes.data.success && verifyRes.data.token) {
            const finalToken = verifyRes.data.token;
            localStorage.setItem('token', finalToken);
            axios.defaults.headers.common['Authorization'] = `Bearer ${finalToken}`;
            await fetchUserFromToken(finalToken);
            navigate('/GoogleAuthenticator');
          } else {
            const msg = verifyRes.data.message || 'خطا در دریافت توکن نهایی';
            setErrorModal({ open: true, message: msg });
          }
        } catch (error) {
          setErrorModal({ open: true, message: 'خطا در ارتباط با سرور' });
          console.error(error);
        }
      } else {
        const message =
          response?.data?.message ||
          Object.values(response?.data?.message || {})[0]?.[0] ||
          'خطایی در ثبت‌نام رخ داده است.';
        setErrorModal({ open: true, message });
      }

    } catch (error) {
      const message =
        error.response?.data?.message ||
        Object.values(error.response?.data?.errors || {})[0]?.[0] ||
        'خطایی در ثبت‌نام رخ داده است.';
      setErrorModal({ open: true, message });
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const closeErrorModal = () => {
    setErrorModal(prev => ({ ...prev, open: false }));
  };

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        bgcolor: (theme) => theme.palette.background.default,
      }}
    >
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
        container
        sx={{
          width: '100%',
          height: '100%',
          flexDirection: { xs: 'column-reverse', md: 'row' },
        }}
      >
        <Grid
          item
          size={{xs:12,md:5}}
          sx={{ height: { xs: 'auto', md: '100%' } }}
        >
          <WarningsBox />
        </Grid>
        <Grid
          item
          size={{xs:12,md:7}}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box sx={{px:2, my:{xs:2}}}>
            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{color: 'text.primary'}}>
              ورود اطلاعات فردی
            </Typography>

            <form onSubmit={handleSubmit} mt={3}>
              <TextField
                fullWidth
                label="نام"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="مثال: مهیار"
                variant="outlined"
                margin="normal"
                sx={{ bgcolor: 'rgba(0,0,0,0.05)' }}
              />
              <TextField
                fullWidth
                label="نام خانوادگی"
                name="fname"
                value={formData.fname}
                onChange={handleChange}
                placeholder="مثال: رضایی"
                variant="outlined"
                margin="normal"
                sx={{ bgcolor: 'rgba(0,0,0,0.05)' }}
              />
              <TextField
                fullWidth
                label="کد ملی"
                name="identity_code"
                value={formData.identity_code}
                onChange={handleChange}
                placeholder="مثال: 1234567890"
                variant="outlined"
                margin="normal"
                sx={{ bgcolor: 'rgba(0,0,0,0.05)' }}
              />
              <TextField
                fullWidth
                label="رمز عبور"
                name="password"
                value={formData.password}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                type="password"
                sx={{ bgcolor: 'rgba(0,0,0,0.05)' }}
              />
              <TextField
                fullWidth
                label="تکرار رمز عبور"
                name="password_approve"
                value={formData.password_approve}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                type="password"
                sx={{ bgcolor: 'rgba(0,0,0,0.05)' }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ height: 60, borderRadius: 0, fontSize: '1.1rem', mt: 2 }}
              >
                ثبت و ورود
              </Button>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Signup;
