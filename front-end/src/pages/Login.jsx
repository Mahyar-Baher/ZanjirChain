import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
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

function Login() {
  const navigate = useNavigate();
  const isVerySmallScreen = useMediaQuery('(max-width:359px)');

  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorModal, setErrorModal] = useState({ open: false, message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedPhone = phone.trim();

    if (!/^09\d{9}$/.test(trimmedPhone)) {
      setErrorModal({
        open: true,
        message: 'شماره موبایل نامعتبر است.',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        'https://amirrezaei2002x.shop/laravel/api/check-phone',
        { mobile_number: trimmedPhone },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.data && typeof response.data.exists !== 'undefined') {
        const target = response.data.exists ? '/Password' : '/sms_verification';
        navigate(target, { state: { phone: trimmedPhone, exists: response.data.exists } });
      } else {
        setErrorModal({
          open: true,
          message: 'پاسخ نامعتبر از سرور دریافت شد.',
        });
      }
    } catch (error) {
      setErrorModal({
        open: true,
        message: 'ارتباط با سرور برقرار نشد. لطفاً دوباره تلاش کنید.',
      });
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
              bgcolor: (theme) => theme.palette.background.default,
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
              textAlign: 'center',
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" color="text.primary" component="h2" gutterBottom>
              توجه!
            </Typography>
            <Typography color="text.primary" sx={{ mt: 1 }}>
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
            <Typography variant="h6" color="text.primary" component="h2" gutterBottom>
              خطا در ورود اطلاعات
            </Typography>
            <Typography color="text.primary" sx={{ mt: 2, mb: 3 }}>{errorModal.message}</Typography>
            <Button variant="contained" onClick={closeErrorModal} sx={{ width: '100%' }}>
              فهمیدم
            </Button>
          </Box>
        </Fade>
      </Modal>
      <Grid
        container
        sx={{
          flex: 1,
          m: 0,
          display: 'flex',
          flexDirection: { xs: 'column-reverse', md: 'row' },
        }}
      >
        <Grid item size={{ xs: 12, md: 5 }} sx={{ p: 0, m: 0 }}>
          <WarningsBox />
        </Grid>

        <Grid
          item
          size={{ xs: 12, md: 7 }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
            p: { xs: 2, md: 5 },
          }}
        >
          <Box width="100%" maxWidth={500}>
            <Typography variant="h5" fontWeight="bold" color="textSecondary" gutterBottom>
              ورود / ثبت‌نام
            </Typography>

            <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
              شماره موبایل خود را وارد کنید تا وارد حساب شوید یا ثبت‌نام انجام دهید.
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                label="شماره موبایل"
                type="tel"
                variant="outlined"
                placeholder="مثال: 09123456789"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                fullWidth
                sx={{
                  mb: 3,
                }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{
                  height: 60,
                  fontSize: '1.1rem',
                  borderRadius: 0,
                }}
              >
                {loading ? 'در حال بررسی...' : 'ورود / ثبت‌نام'}
              </Button>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Login;
