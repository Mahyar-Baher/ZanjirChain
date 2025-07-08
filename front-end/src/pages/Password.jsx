import { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import WarningsBox from '../components/warningbox';
import { AuthContext } from '../context/AuthContext';
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
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Icon } from '@iconify/react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LockIcon from '@mui/icons-material/Lock';
import CircleIcon from '@mui/icons-material/Circle';

const Password = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const phone = location.state?.phone;
  const { fetchUserFromToken } = useContext(AuthContext);

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorModal, setErrorModal] = useState({
    open: false,
    message: '',
  });
  const [passwordRequirements, setPasswordRequirements] = useState({
    minLength: false,
    hasUpperLower: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  useEffect(() => {
    validatePassword(password);
  }, [password]);

  const validatePassword = (pass) => {
    const hasMinLength = pass.length >= 8;
    const hasUpperLower = /[a-z]/.test(pass) && /[A-Z]/.test(pass);
    const hasNumber = /\d/.test(pass);
    const hasSpecialChar = /[!@#$%^&*]/.test(pass);

    setPasswordRequirements({
      minLength: hasMinLength,
      hasUpperLower,
      hasNumber,
      hasSpecialChar,
    });
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const parseUserAgent = () => {
    const ua = navigator.userAgent;
    let device = 'Desktop';
    if (/mobile/i.test(ua)) device = 'Mobile';
    else if (/tablet/i.test(ua)) device = 'Tablet';

    let os = 'Unknown OS';
    if (/Windows NT 10.0/.test(ua)) os = 'Windows 10';
    else if (/Windows NT 6.3/.test(ua)) os = 'Windows 8.1';
    else if (/Windows NT 6.2/.test(ua)) os = 'Windows 8';
    else if (/Windows NT 6.1/.test(ua)) os = 'Windows 7';
    else if (/Windows NT 10.0; Win64; x64;/.test(ua)) os = 'Windows 11';
    else if (/Linux/.test(ua)) {
      if (/Ubuntu/.test(ua)) os = 'Ubuntu Linux';
      else if (/Fedora/.test(ua)) os = 'Fedora Linux';
      else if (/Debian/.test(ua)) os = 'Debian Linux';
      else if (/Mint/.test(ua)) os = 'Linux Mint';
      else os = 'Linux';
    }
    else if (/Mac OS X 10[._]\d+/.test(ua)) {
      const macVersionMatch = ua.match(/Mac OS X 10[._]\d+([._]\d+)?/);
      if (macVersionMatch) {
        const versionString = macVersionMatch[0].replace(/_/g, '.');
        os = `macOS ${versionString.replace('Mac OS X', '')}`.trim();
      } else {
        os = 'macOS';
      }
    }

    let browser = 'Unknown Browser';
    if (/Chrome\/([\d.]+)/.test(ua) && !/Edge\/([\d.]+)/.test(ua)) {
      const version = ua.match(/Chrome\/([\d.]+)/)[1];
      browser = `Chrome ${version}`;
    } else if (/Firefox\/([\d.]+)/.test(ua)) {
      const version = ua.match(/Firefox\/([\d.]+)/)[1];
      browser = `Firefox ${version}`;
    } else if (/Safari\/([\d.]+)/.test(ua) && /Version\/([\d.]+)/.test(ua)) {
      const version = ua.match(/Version\/([\d.]+)/)[1];
      browser = `Safari ${version}`;
    } else if (/Edge\/([\d.]+)/.test(ua)) {
      const version = ua.match(/Edge\/([\d.]+)/)[1];
      browser = `Edge ${version}`;
    } else if (/OPR\/([\d.]+)/.test(ua)) {
      const version = ua.match(/OPR\/([\d.]+)/)[1];
      browser = `Opera ${version}`;
    }

    return { device, os, browser };
  };

  const getUserIP = async () => {
    try {
      const res = await axios.get('https://api.ipify.org?format=json');
      return res.data.ip || '0.0.0.0';
    } catch {
      return '0.0.0.0';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password.trim()) {
      setErrorModal({
        open: true,
        message: 'رمز عبور نمی‌تواند خالی باشد.',
      });
      return;
    }

    setLoading(true);

    try {
      const { device, os, browser } = parseUserAgent();
      const ip = await getUserIP();

      const session = {
        device,
        os,
        browser,
        ip,
        current: true,
        last_active_at: new Date().toISOString(),
      };

      const response = await axios.post(
        'https://amirrezaei2002x.shop/laravel/api/check-password',
        {
          mobile_number: phone,
          password: password.trim(),
          active_sessions: [session],
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.data?.success && response.data?.token) {
        const token = response.data.token;
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await fetchUserFromToken(token);
        navigate('/dashboard', { state: { phone } });
      } else {
        setErrorModal({
          open: true,
          message: response.data?.message || 'رمز عبور نادرست است.',
        });
      }
    } catch (error) {
      if (error.response) {
        setErrorModal({
          open: true,
          message: error.response.data?.message || 'رمز عبور نادرست است.',
        });
      } else {
        setErrorModal({
          open: true,
          message: 'ارتباط با سرور برقرار نشد. لطفاً دوباره تلاش کنید.',
        });
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const closeErrorModal = () => {
    setErrorModal((prev) => ({ ...prev, open: false }));
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
        open={errorModal.open}
        onClose={closeErrorModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
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
            <Typography color="text.primary" variant="h6" component="h2" gutterBottom>
              خطا
            </Typography>
            <Typography color="text.primary" sx={{ mt: 2, mb: 3 }}>{errorModal.message}</Typography>
            <Button variant="contained" onClick={closeErrorModal} sx={{ width: '100%' }}>
              فهمیدم
            </Button>
          </Box>
        </Fade>
      </Modal>

      <Grid container sx={{ flex: 1, m: 0, flexDirection: { xs: 'column-reverse', md: 'row' } }}>
        <Grid item size={{xs:12, md:5}}>
          <WarningsBox />
        </Grid>

        <Grid
          item
          size={{xs: 12, md: 7}}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
            p: { xs: 2, md: 5 },
          }}
        >
          <Box width="100%" maxWidth={500}>
            <Typography variant="h5" fontWeight="bold" color="text.secondary" gutterBottom>
              وارد کردن رمز عبور
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              رمز عبور خود را وارد کنید یا درصورت فراموشی از رمز یکبار مصرف استفاده کنید
            </Typography>

            <Button
              onClick={() => navigate('/Sms_verification', { state: { phone } })}
              startIcon={<Icon icon="mdi:chevron-left" />}
              sx={{
                p: 0,
                mb: 3,
                justifyContent: 'flex-start',
                color: 'primary.main',
                '&:hover': { backgroundColor: 'transparent' },
              }}
            >
              ورود با رمز یکبار مصرف
            </Button>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="رمز عبور"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                placeholder="مثال: Tether01@#"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton onClick={handleTogglePassword} edge="start">
                        <Icon icon={showPassword ? 'mdi:eye-off' : 'mdi:eye'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{ height: 50, fontSize: '1rem', mb: 3 }}
              >
                {loading ? 'در حال بررسی...' : 'ورود'}
              </Button>
            </form>

            <Box sx={{  p: 2, borderRadius: 2 }}>
              <Typography color="text.primary" variant="body2" fontWeight="bold" gutterBottom>
                شرایط رمز عبور:
              </Typography>
              <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                <Box component="li" display="flex" alignItems="center">
                  {passwordRequirements.minLength ? (
                    <CheckCircleIcon fontSize="small" color="success" sx={{ mr: 1 }} />
                  ) : (
                    <CircleIcon fontSize="small" color="disabled" sx={{ mr: 1 }} />
                  )}
                  <Typography color="text.primary" variant="body2">حداقل ۸ کاراکتر</Typography>
                </Box>
                <Box component="li" display="flex" alignItems="center">
                  {passwordRequirements.hasUpperLower ? (
                    <CheckCircleIcon fontSize="small" color="success" sx={{ mr: 1 }} />
                  ) : (
                    <CircleIcon fontSize="small" color="disabled" sx={{ mr: 1 }} />
                  )}
                  <Typography color="text.primary" variant="body2">حروف کوچک و بزرگ</Typography>
                </Box>
                <Box component="li" display="flex" alignItems="center">
                  {passwordRequirements.hasNumber ? (
                    <CheckCircleIcon fontSize="small" color="success" sx={{ mr: 1 }} />
                  ) : (
                    <CircleIcon fontSize="small" color="disabled" sx={{ mr: 1 }} />
                  )}
                  <Typography color="text.primary" variant="body2">حداقل یک عدد</Typography>
                </Box>
                <Box component="li" display="flex" alignItems="center">
                  {passwordRequirements.hasSpecialChar ? (
                    <CheckCircleIcon fontSize="small" color="success" sx={{ mr: 1 }} />
                  ) : (
                    <CircleIcon fontSize="small" color="disabled" sx={{ mr: 1 }} />
                  )}
                  <Typography color="text.primary" variant="body2">کاراکتر خاص (!@#...)</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Password;