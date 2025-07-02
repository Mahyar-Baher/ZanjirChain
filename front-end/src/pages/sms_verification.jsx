import { useEffect, useState, useRef, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import WarningsBox from '../components/warningbox';
import { Icon } from '@iconify/react';
import {
  InputAdornment,
  IconButton,
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
import { AuthContext } from '../context/AuthContext';

const Sms_verification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const phone = location.state?.phone || '';
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [errorModal, setErrorModal] = useState({ open: false, message: '' });
  const executedRef = useRef(false);
  const [showCode, setShowCode] = useState(false);
  const { fetchUserFromToken } = useContext(AuthContext);

  useEffect(() => {
    if (executedRef.current) return;
    executedRef.current = true;
    sendCode();
  }, []);

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
    else if (/Windows NT 6.3/.test(ua)) os = 'Windows 8.1';
    else if (/Windows NT 6.2/.test(ua)) os = 'Windows 8';
    else if (/Windows NT 6.1/.test(ua)) os = 'Windows 7';
    else if (/Mac OS X 10[._]\d+/.test(ua)) {
      const match = ua.match(/Mac OS X 10[._]\d+([._]\d+)?/);
      if (match) os = 'macOS ' + match[0].replace(/_/g, '.').replace('Mac OS X ', '');
      else os = 'macOS';
    } else if (/Linux/.test(ua)) {
      if (/Ubuntu/.test(ua)) os = 'Ubuntu Linux';
      else if (/Fedora/.test(ua)) os = 'Fedora Linux';
      else if (/Debian/.test(ua)) os = 'Debian Linux';
      else if (/Mint/.test(ua)) os = 'Linux Mint';
      else os = 'Linux';
    }

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

  const sendCode = async () => {
    if (!phone) return;
    setSending(true);
    try {
      const response = await axios.post(
        'https://amirrezaei2002x.shop/laravel/api/create-code',
        { mobile_number: phone },
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log(response.data.randomCode);
    } catch (err) {
      console.error(err);
      setErrorModal({
        open: true,
        message: 'ارسال کد با مشکل مواجه شد. لطفاً دوباره تلاش کنید.',
      });
      alert(err);
    } finally {
      setSending(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^\d{4}$/.test(code.trim())) {
      return setErrorModal({ open: true, message: 'کد باید دقیقاً ۴ رقم عددی باشد.' });
    }

    setLoading(true);

    try {
      await axios.get('https://amirrezaei2002x.shop/laravel/sanctum/csrf-cookie', {
        withCredentials: true,
      });

      const response = await axios.post(
        'https://amirrezaei2002x.shop/laravel/api/verify-code',
        {
          mobile_number: phone.trim(),
          code: code.trim(),
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      const { success, user_exist, token } = response.data || {};

      if (success === true) {
        if (typeof user_exist === 'boolean') {
          if (token) {
            localStorage.setItem('access_token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          }

          if (user_exist) {
            const session = await parseUserAgent();
            axios
              .post('https://amirrezaei2002x.shop/laravel/api/verifyPasscodeToken', {
                mobile_number: phone.trim(),
                code: code.trim(),
          active_sessions: [session],
              })
              .then(async (res) => {
                if (res.data.success && res.data.token) {
                  const token = res.data.token;
                  localStorage.setItem('token', token);
                  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                  await fetchUserFromToken(token);
                  navigate('/dashboard', {
                    state: {
                      phone: phone.trim(),
                      code: code.trim(),
                      user_exist,
                    },
                  });
                } else {
                  console.warn('❌ اعتبارسنجی ناموفق:', res.data.message);
                  alert('کد تایید اشتباه است یا منقضی شده.');
                }
              })
              .catch((err) => {
                console.error('🚨 خطا در اعتبارسنجی کد:', err?.response?.data || err.message);
                alert('خطا در برقراری ارتباط با سرور.');
              });
          } else {
            navigate('/signup', {
              state: {
                phone: phone.trim(),
                code: code.trim(),
                user_exist,
              },
            });
          }
        } else {
          setErrorModal({
            open: true,
            message: 'اطلاعات کاربر قابل تشخیص نیست.',
          });
        }
      } else {
        setErrorModal({
          open: true,
          message: 'کد وارد شده معتبر نیست یا منقضی شده است.',
        });
      }
    } catch (error) {
      console.error('خطا در ارسال درخواست:', error);
      setErrorModal({
        open: true,
        message: 'ارتباط با سرور برقرار نشد. لطفاً دوباره تلاش کنید.',
      });
    } finally {
      setLoading(false);
    }
  };

  const closeErrorModal = () =>
    setErrorModal((prev) => ({ ...prev, open: false }));

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
            <Typography variant="h6" gutterBottom>
              خطا
            </Typography>
            <Typography sx={{ mt: 2, mb: 3 }}>{errorModal.message}</Typography>
            <Button variant="contained" fullWidth onClick={closeErrorModal}>
              فهمیدم
            </Button>
          </Box>
        </Fade>
      </Modal>

      <Grid container sx={{ flex: 1, m: 0, p: 0, flexDirection: { xs: 'column-reverse', md: 'row' } }}>
        <Grid item size={{ xs: 12, md: 6 }} sx={{ p: 0 }}>
          <WarningsBox />
        </Grid>

        <Grid
          item
          size={{ xs: 12, md: 6 }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: { xs: 2, md: 5 },
          }}
        >
          <Box width="100%">
            <Typography variant="h5" fontWeight="bold" color="text.primary" gutterBottom>
              تأیید شماره همراه
            </Typography>

            <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
              لطفاً کد چهاررقمی ارسال‌شده به شماره&nbsp;
              <span style={{ fontWeight: 'bold' }}>
                {phone ? `${phone.slice(-2)}******${phone.slice(0, 3)}` : '********'}
              </span>
              &nbsp;را وارد کنید.
            </Typography>

            <Button
              href="/login"
              startIcon={<i className="fas fa-chevron-left" />}
              sx={{
                p: 0,
                mb: 3,
                justifyContent: 'flex-start',
                color: 'primary.main',
                '&:hover': { backgroundColor: 'transparent' },
              }}
            >
              تغییر شماره تلفن
            </Button>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="کد تأیید"
                type={showCode ? 'text' : 'password'}
                variant="outlined"
                placeholder="مثال: 1234"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                sx={{
                  mb: 3,
                  '& label': {
                    right: 30,
                    left: 'auto',
                    transformOrigin: 'top right',
                    textAlign: 'right',
                  },
                  '& .MuiInputBase-input': {
                    textAlign: 'right',
                  },
                }}
                inputProps={{ dir: 'rtl' }}
                InputLabelProps={{ sx: { direction: 'rtl' } }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowCode((prev) => !prev)} edge="end">
                        <Icon icon={showCode ? 'mdi:eye-off' : 'mdi:eye'} />
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
                sx={{ height: 60, fontSize: '1.1rem', borderRadius: 0 }}
              >
                {loading ? 'در حال بررسی...' : 'ثبت و ورود'}
              </Button>

              <Button
                variant="text"
                fullWidth
                onClick={sendCode}
                disabled={sending}
                sx={{
                  height: 60,
                  fontSize: '0.95rem',
                  borderRadius: 0,
                  mt: 2,
                  opacity: sending ? 0.6 : 1,
                }}
              >
                {sending ? 'ارسال مجدد...' : 'ارسال مجدد کد'}
              </Button>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Sms_verification;
