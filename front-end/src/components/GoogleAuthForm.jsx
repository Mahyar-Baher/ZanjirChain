import { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  TextField,
  Typography,
  Modal,
  Backdrop,
  Fade,
} from '@mui/material';

const GoogleAuthForm = ({ phone, onSuccess }) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorModal, setErrorModal] = useState({
    open: false,
    message: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!code.trim()) {
      setErrorModal({
        open: true,
        message: 'کد تأیید نمی‌تواند خالی باشد.',
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        'https://amirrezaei2002x.shop/laravel/api/verify2FACodeGoogle',
        { 
          mobile_number: phone,
          uesrEnterCode: code.trim(),
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.data?.success) {
        onSuccess(); // Trigger the parent to show PasswordForm
      } else {
        setErrorModal({
          open: true,
          message: response.data?.message || 'کد تأیید نادرست است.',
        });
      }
    } catch (error) {
      if (error.response) {
        setErrorModal({
          open: true,
          message: error.response.data?.message || 'کد تأیید نادرست است.',
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

      <Box width="100%" maxWidth={500}>
        <Typography variant="h5" fontWeight="bold" color="text.secondary" gutterBottom>
          تأیید هویت دو مرحله‌ای
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          کد تأیید را از برنامه Google Authenticator وارد کنید.
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="کد تأیید"
            type="text"
            variant="outlined"
            placeholder="مثال: 123456"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            sx={{ mb: 3 }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{ height: 50, fontSize: '1rem', mb: 3 }}
          >
            {loading ? 'در حال بررسی...' : 'تأیید'}
          </Button>
        </form>
      </Box>
    </>
  );
};

export default GoogleAuthForm;