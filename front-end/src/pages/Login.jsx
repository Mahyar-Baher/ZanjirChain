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
import ThemeToggleButton from '../theme/ThemeToggleButton';

function Login() {
  const navigate = useNavigate();
  const isVerySmallScreen = useMediaQuery('(max-width:359px)');

  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorModal, setErrorModal] = useState({
    open: false,
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedPhone = phone.trim();

    if (!/^09\d{9}$/.test(trimmedPhone)) {
      setErrorModal({
        open: true,
        message: 'شماره موبایل نامعتبر است.'
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        'https://amirrezaei2002x.shop/laravel/api/check-phone',
        { mobile_number: trimmedPhone },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );


      if (response.data && typeof response.data.exists !== 'undefined') {
        if (response.data.exists === false) {
          navigate('/sms_verification', {
            state: { phone: trimmedPhone, exists: response.data.exists },
          });
        } else {
          navigate('/Password', {
            state: { phone: trimmedPhone, exists: response.data.exists },
          });
        }
      } else {
        setErrorModal({
          open: true,
          message: 'پاسخ نامعتبر از سرور دریافت شد.'
        });
      }
    } catch (error) {
      console.error('خطا در ارسال درخواست:', error);
      setErrorModal({
        open: true,
        message: 'ارتباط با سرور برقرار نشد. لطفاً دوباره تلاش کنید.'
      });
    } finally {
      setLoading(false);
    }
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
              bgcolor: (theme) => theme.palette.background.default,
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
              textAlign: 'center',
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" sx={{color: 'text.primary',}} component="h2" gutterBottom>
              توجه!
            </Typography>
            <Typography sx={{ mt: 1, color: 'text.primary', }}>
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
              color: 'text.primary',
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
        <Grid item size={{xs:12,md:6}}>
          <WarningsBox />
        </Grid>
        <Grid item size={{xs:12, md:6}}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: 2,
            mb: { xs: 2, md: 0 },
          }}
        >
          <Box width="100%" maxWidth={'100%'}>
            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: 'text.primary',}}>
              ورود / ثبت‌نام
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="شماره موبایل"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="مثال: 09123456789"
                variant="outlined"
                margin="normal"
                sx={{ bgcolor: 'rgba(0,0,0,0.05)', color: 'text.primary', }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ height: 60, borderRadius: 0, fontSize: '1.1rem', mt: 2 }}
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
