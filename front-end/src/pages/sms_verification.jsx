import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
import { Padding } from '@mui/icons-material';

const Sms_verification = () => {
  const location   = useLocation();
  const phone      = location.state?.phone || '';   
  // const navigate   = useNavigate();
  const [code, setCode]           = useState('');
  const [loading, setLoading]     = useState(false);
  const [sending, setSending]     = useState(false); 
  const [errorModal, setErrorModal] = useState({ open: false, message: '' });
  const executedRef = useRef(false);
  useEffect(() => {
    if (executedRef.current) return; 
    executedRef.current = true; 
    
    sendCode();
  }, []);

  const sendCode = async () => {
    if (!phone) return;
    setSending(true);
    try {
        const response= await axios.post(
        'https://amirrezaei2002x.shop/laravel/api/create-code',
        { mobile_number: phone },
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log(response.data.randomCode);
      // موفق: پیام خاصی لازم نداریم؛ می‌توانید نوتیفیکیشن اضافه کنید.
    } catch (err) {
      console.error(err);
      setErrorModal({
        open: true,
        message: 'ارسال کد با مشکل مواجه شد. لطفاً دوباره تلاش کنید.',
      });
      alert(err)
    } finally {
      setSending(false);
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (code.trim().length !== 4) {
    return setErrorModal({ open: true, message: 'کد باید دقیقاً ۴ رقم باشد.' });
  }

  setLoading(true);

  try {
    // اول کوکی CSRF بگیر
    await axios.get('https://amirrezaei2002x.shop/laravel/sanctum/csrf-cookie', {
      withCredentials: true,
    });

    // بعد درخواست verify
    const response = await axios.post(
      'https://amirrezaei2002x.shop/laravel/api/verify-code',
      {
        mobile_number: phone,
        code: code.trim(),
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    console.log(response.data);
    alert('ارسال موفق');
  } catch (err) {
    console.error(err);
    setErrorModal({
      open: true,
      message: 'ارتباط با سرور برقرار نشد. لطفاً دوباره تلاش کنید.',
    });
    alert(err.message || 'خطا در ارسال');
  } finally {
    setLoading(false);
  }
};

  const closeErrorModal = () =>
    setErrorModal((prev) => ({ ...prev, open: false }));

  return (
    <Container fullWidth sx={{ height: '100vh', display: 'flex', p: 0, m: 0 , bgcolor: (theme) => theme.palette.background.default }}>
      <Modal
        open={errorModal.open}
        onClose={closeErrorModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <Fade in={errorModal.open}>
          <Box sx={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300, bgcolor: 'background.paper',
            border: '2px solid #000', boxShadow: 24,
            p: 4, textAlign: 'center', borderRadius: 2,
          }}>
            <Typography variant="h6" gutterBottom>خطا</Typography>
            <Typography sx={{ mt: 2, mb: 3 }}>{errorModal.message}</Typography>
            <Button variant="contained" fullWidth onClick={closeErrorModal}>
              فهمیدم
            </Button>
          </Box>
        </Fade>
      </Modal>

      <Grid container sx={{ flex: 1, m: 0,p: 0, flexDirection: { xs: 'column-reverse', md: 'row' } }}>
        <Grid item size={{xs:12,md:6}} sx={{ p: 0 }}>
          <WarningsBox />
        </Grid>

        <Grid item size={{xs:12,md:6}} sx={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          p: { xs: 2, md: 5 },
        }}>
          <Box width="100%">
          
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              تأیید شماره همراه
            </Typography>

            <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
              لطفاً کد چهاررقمی ارسال‌شده به شماره&nbsp;
              <span style={{ fontWeight: 'bold' }}>
                {phone ? `${phone.slice(-2)}******${phone.slice(0,3)}` : '********'}
              </span>
              &nbsp;را وارد کنید.
            </Typography>

            <Button
              href="/login"
              startIcon={<i className="fas fa-chevron-left" />}
              sx={{
                p: 0, mb: 3, justifyContent: 'flex-start',
                color: 'primary.main',
                '&:hover': { backgroundColor: 'transparent' },
              }}
            >
              تغییر شماره تلفن
            </Button>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth label="کد تأیید" type="password" variant="outlined"
                placeholder="مثال: 1234" value={code}
                onChange={(e) => setCode(e.target.value)} sx={{ mb: 3 }}
              />

              <Button
                type="submit" variant="contained" fullWidth
                disabled={loading} sx={{ height: 60, fontSize: '1.1rem', borderRadius: 0 }}
              >
                {loading ? 'در حال بررسی...' : 'ثبت و ورود'}
              </Button>

              <Button
                variant="text" fullWidth onClick={sendCode}
                disabled={sending}
                sx={{
                  height: 60, fontSize: '0.95rem', borderRadius: 0, mt: 2,
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
