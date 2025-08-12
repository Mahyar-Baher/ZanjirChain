import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import QRCode from 'qrcode';
import {
  Grid,
  Button,
  TextField,
  Typography,
  Modal,
  Backdrop,
  Fade,
  CircularProgress,
  Alert,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Circle } from '@mui/icons-material';
import { AuthContext } from '../context/AuthContext';

const GoogleAuthenticatorFirst = ({ phone, token: propToken }) => {
  const navigate = useNavigate();
  const { fetchUserFromToken } = useContext(AuthContext);

  const [, setQrValue] = useState('');
  const [qrImageUrl, setQrImageUrl] = useState('');
  const [secretCode, setSecretCode] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [qrLoading, setQrLoading] = useState(false);
  const [errorModal, setErrorModal] = useState({ open: false, message: '' });

  const getUserIdFromStorage = () => {
    try {
      const rawUser = localStorage.getItem('user');
      if (rawUser) {
        const parsed = JSON.parse(rawUser);
        return parsed?.id ?? parsed?.user_id ?? parsed?.userId ?? null;
      }
      const keys = ['user_id', 'userId', 'id'];
      for (const k of keys) {
        const v = localStorage.getItem(k);
        if (v) return /^\d+$/.test(v) ? Number(v) : v;
      }
    } catch (err) {
      console.error('getUserIdFromStorage: parse error', err);
    }
    return null;
  };

  const storedToken = localStorage.getItem('token');
  const authToken = propToken || storedToken || null;
  const userIdFromStorage = getUserIdFromStorage();

  const extractSecretFromOtpAuthUrl = (url) => {
    try {
      const urlObj = new URL(url);
      const secret = urlObj.searchParams.get('secret');
      return secret || '';
    } catch {
      return '';
    }
  };
  
  useEffect(() => {
    if (authToken === null || phone === undefined) return;


    const fetchQrCode = async () => {
      const userId = userIdFromStorage;
      if (!authToken || !phone || !userId) {
        setErrorModal({
          open: true,
          message: 'توکن، شماره موبایل یا شناسه کاربر نامعتبر است.',
        });
        return;
      }

      setQrLoading(true);
      try {
        const res = await axios.post(
          'https://amirrezaei2002x.shop/laravel/api/geturlofqrcode',
          { mobile_number: phone, user_id: userId },
          { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authToken}` } }
        );

        const url = res.data?.url;
        if (url) {
          setQrValue(url);
          const secret = extractSecretFromOtpAuthUrl(url);
          setSecretCode(secret);
          try {
            const qrImage = await QRCode.toDataURL(url, { width: 200, margin: 1, errorCorrectionLevel: 'H' });
            setQrImageUrl(qrImage);
          } catch (err) {
            console.error('QR generation error:', err);
          }
        } else {
          setErrorModal({ open: true, message: 'لینک QR کد معتبر نیست.' });
        }
      } catch (err) {
        console.error('QR code fetch error:', err);
        setErrorModal({ open: true, message: 'خطا در دریافت QR کد از سرور.' });
      } finally {
        setQrLoading(false);
      }
    };

    fetchQrCode();
  }, [authToken, navigate, phone, userIdFromStorage]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!code.trim()) {
      setErrorModal({
        open: true,
        message: 'کد تأیید نمی‌تواند خالی باشد.',
      });
      return;
    }

    const currentUserId = userIdFromStorage;
    if (!currentUserId) {
      setErrorModal({
        open: true,
        message: 'شناسه کاربر یافت نشد.',
      });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        mobile_number: phone,
        uesrEnterCode: code.trim(),
        userEnterCode: code.trim(),
        user_id: currentUserId,
      };

      const response = await axios.post(
        'https://amirrezaei2002x.shop/laravel/api/verify2FACodeGoogle',
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.data?.success) {
        const newToken = response.data?.token || authToken || null;
        const returnedUserId = response.data?.user_id || currentUserId;

        if (newToken) {
          localStorage.setItem('token', newToken);
          axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        } else if (storedToken) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        }

        const activePayload = { user_id: returnedUserId, status: true };
        const tokenForActive = newToken || storedToken || null;

        const statusResponse = await axios.post(
          'https://amirrezaei2002x.shop/laravel/api/activegoogle2af',
          activePayload,
          {
            headers: {
              'Content-Type': 'application/json',
              ...(tokenForActive ? { Authorization: `Bearer ${tokenForActive}` } : {}),
            },
          }
        );

        const statusData = statusResponse.data;
        const httpStatus = statusResponse.status;

        let successFlag = false;
        if (statusData && (statusData.status === true || statusData.status === 1)) {
          successFlag = true;
        } else if (httpStatus === 204) {
          successFlag = true;
        } else if (httpStatus >= 200 && httpStatus < 300 && (statusData === '' || statusData === null || (typeof statusData === 'object' && Object.keys(statusData || {}).length === 0))) {
          successFlag = true;
        }

        if (successFlag) {
          await fetchUserFromToken(newToken || tokenForActive);
          navigate('/dashboard', { state: { phone } });
        } else {
          const serverMsg = statusData?.message || statusData?.error || `پاسخ نامشخص از سرور (HTTP ${httpStatus})`;
          setErrorModal({
            open: true,
            message: serverMsg || 'خطا در به‌روزرسانی وضعیت تأیید.',
          });
        }
      } else {
        setErrorModal({
          open: true,
          message: response.data?.message || 'کد تأیید نادرست است.',
        });
      }
    } catch (error) {
      const serverMsg = error?.response?.data?.message || error?.response?.data?.error || error?.message || 'ارتباط با سرور برقرار نشد. لطفاً دوباره تلاش کنید.';
      setErrorModal({
        open: true,
        message: serverMsg,
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (secretCode) {
      navigator.clipboard.writeText(secretCode);
    }
  };

  const closeErrorModal = () => {
    setErrorModal((prev) => ({ ...prev, open: false }));
  };

  return (
    <>
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
          <Paper
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: { xs: '90%', sm: 320 },
              p: 4,
              textAlign: 'center',
              borderRadius: 2,
              boxShadow: 24,
            }}
          >
            <Typography color="text.primary" variant="h6" gutterBottom>
              خطا
            </Typography>
            <Typography color="text.primary" sx={{ mt: 2, mb: 3 }}>
              {errorModal.message}
            </Typography>
            <Button variant="contained" onClick={closeErrorModal} fullWidth>
              فهمیدم
            </Button>
          </Paper>
        </Fade>
      </Modal>
      <Grid container>
        
        <Grid size={{xs:6}}>
          <Grid container justifyContent="center" sx={{ maxWidth: 500, mx: 'auto', px: { xs: 2, sm: 3 }, py: 1 }}>
            <Grid size={{xs:12}}>
              <Typography variant="h5" fontWeight="bold" color="text.secondary" textAlign="center" gutterBottom>
                فعال‌سازی تأیید هویت دو مرحله‌ای
              </Typography>
            </Grid>

            {qrLoading ? (
              <Grid size={{xs:12}} display="flex" justifyContent="center" my={2}>
                <CircularProgress />
              </Grid>
            ) : qrImageUrl ? (
              <>
                <Grid size={{xs:12}} display="flex" justifyContent="center" sx={{ mb: 2 }}>
                  <Paper
                    sx={{
                      p: 2,
                      bgcolor: 'background.paper',
                      borderRadius: 2,
                      boxShadow: 1,
                    }}
                  >
                    <img src={qrImageUrl} alt="QR Code" style={{ width: 200, height: 200 }} />
                  </Paper>
                </Grid>

                <Grid size={{xs:12}} sx={{ mb: 3 }}>
                  <Button variant="outlined" fullWidth onClick={copyToClipboard}>
                    کپی کد مخفی
                  </Button>
                </Grid>

                <Grid size={{xs:12}} sx={{ mb: 0, textAlign: 'center' }}>
                  <Typography variant="body1">
                    کد مخفی: <b>{secretCode || 'در دسترس نیست'}</b>
                  </Typography>
                </Grid>

                <Grid size={{xs:12}}>
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                      <Grid size={{xs:12}}>
                        <TextField
                          fullWidth
                          label="کد تأیید 6 رقمی"
                          type="text"
                          variant="outlined"
                          placeholder="مثال: 123456"
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                          inputProps={{ maxLength: 6 }}
                        />
                      </Grid>
                      <Grid size={{xs:12}}>
                        <Button type="submit" variant="contained" fullWidth disabled={loading} sx={{ height: 50, fontSize: '1rem' }}>
                          {loading ? 'در حال بررسی...' : 'تأیید'}
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
              </>
            ) : null}
          </Grid>
        </Grid>
        <Grid size={{xs:6}}>
          <Grid size={{xs:12}} sx={{ mb: 0.9 }}>
              <Alert
                severity="warning"
                sx={{
                  borderRadius: '12px',
                  bgcolor: '#dc3545',
                  color: '#fff',
                  border: '1px solid #ffcc80',
                  fontSize: '1rem',
                  p: 2,
                  '& .MuiAlert-icon': {
                    p: 1,
                    color: '#fff',
                  },
                }}
              >
                <Typography variant="body1" fontWeight={700} fontSize="1.1rem" textAlign="start">
                  هشدار مهم
                </Typography>
                <Typography variant="body2" mt={1} fontSize="1rem" textAlign="start">
                  این کد مخفی را در مکانی امن ذخیره کنید. بدون این کد و اپلیکیشن Google Authenticator، بازیابی حساب ممکن نخواهد بود.
                </Typography>
              </Alert>
          </Grid>
          <Grid size={{xs:12}} sx={{ mb: 0 }}>
            <Paper
              sx={{
                p: { xs: 2, sm: 3 },
                bgcolor: 'background.paper',
                borderRadius: 3,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                border: '1px solid #4CAF50',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 24px rgba(76, 175, 80, 0.2)',
                },
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                mb={1}
                sx={{ color: '#4CAF50', textAlign: 'start', fontSize: { xs: '1.25rem', sm: '1.5rem' } }}
              >
                راهنمای ساده فعال‌سازی Google Authenticator
              </Typography>

              <List sx={{ px: 1, }}>
                <ListItem sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 32, color: '#4CAF50' }}>
                    <Circle sx={{ fontSize: 10 }} />
                  </ListItemIcon>
                  <ListItemText sx={{textAlign: 'start'}}
                    primary={
                      <Typography variant="body2">
                        اپلیکیشن <b>Google Authenticator</b> را از{' '}
                        <a
                          href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            color: '#4CAF50',
                            textDecoration: 'none',
                            fontWeight: 500,
                            transition: 'color 0.2s ease',
                          }}
                          onMouseEnter={(e) => (e.target.style.color = '#388E3C')}
                          onMouseLeave={(e) => (e.target.style.color = '#4CAF50')}
                        >
                          گوگل پلی
                        </a>{' '}
                        یا{' '}
                        <a
                          href="https://apps.apple.com/app/google-authenticator/id388497605"
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            color: '#4CAF50',
                            textDecoration: 'none',
                            fontWeight: 500,
                            transition: 'color 0.2s ease',
                          }}
                          onMouseEnter={(e) => (e.target.style.color = '#388E3C')}
                          onMouseLeave={(e) => (e.target.style.color = '#4CAF50')}
                        >
                          اپ استور
                        </a>{' '}
                        دانلود و نصب کنید.
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 32, color: '#4CAF50' }}>
                    <Circle sx={{ fontSize: 10 }} />
                  </ListItemIcon>
                  <ListItemText  sx={{textAlign: 'start'}}
                    primary={
                      <Typography variant="body2">
                        اپلیکیشن را باز کنید و گزینه <b>افزودن حساب</b> (Add Account) را انتخاب کنید.
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 32, color: '#4CAF50' }}>
                    <Circle sx={{ fontSize: 10 }} />
                  </ListItemIcon>
                  <ListItemText  sx={{textAlign: 'start'}}
                    primary={
                      <Typography variant="body2">
                        گزینه <b>اسکن کد QR</b> را انتخاب کرده و کد QR بالای صفحه را اسکن کنید.
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 32, color: '#4CAF50' }}>
                    <Circle sx={{ fontSize: 10 }} />
                  </ListItemIcon>
                  <ListItemText  sx={{textAlign: 'start'}}
                    primary={
                      <Typography variant="body2">
                        اگر نمی‌توانید کد QR را اسکن کنید، دکمه <b>کپی کد مخفی</b> را بزنید و کد را به صورت دستی وارد اپلیکیشن کنید.
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 32, color: '#4CAF50' }}>
                    <Circle sx={{ fontSize: 10 }} />
                  </ListItemIcon>
                  <ListItemText  sx={{textAlign: 'start'}}
                    primary={
                      <Typography variant="body2">
                        پس از اضافه کردن حساب، کد 6 رقمی که اپلیکیشن به شما می‌دهد را در کادر کنار وارد کنید و تأیید را بزنید.
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      
    </>
  );
};

export default GoogleAuthenticatorFirst;