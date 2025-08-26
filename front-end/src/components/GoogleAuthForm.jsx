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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Icon } from '@iconify/react';

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
        onSuccess();
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
              width: { xs: 280, sm: 300 },
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

      <Box width="100%" maxWidth={500} sx={{ px: { xs: 2, sm: 0 } }}>
        {/* Quick Guide Section */}


        <Typography variant="h5" fontWeight="bold" color="text.secondary" gutterBottom>
          تأیید هویت دو مرحله‌ای
        </Typography>
        
        <Box
          sx={{
            mb: 3,
            p: { xs: 1, sm: 1 },
            borderRadius: 2,
            background: 'linear-gradient(145deg, #1a652a 0%, #2e8b57 90%)',
            color: '#fff',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ mb: 1, textAlign: 'center' }}
          >
            راهنمای سریع
          </Typography>
          <List dense>
            <ListItem>
              <ListItemIcon>
                <Icon icon="mdi:numeric-1-circle" color="#fff" width={24} />
              </ListItemIcon>
              <ListItemText
                primary="برنامه Google Authenticator را باز کنید."
                primaryTypographyProps={{ variant: 'body2', color: '#fff' }}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Icon icon="mdi:numeric-2-circle" color="#fff" width={24} />
              </ListItemIcon>
              <ListItemText
                primary="کد ۶ رقمی نمایش داده شده را وارد کنید."
                primaryTypographyProps={{ variant: 'body2', color: '#fff' }}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Icon icon="mdi:numeric-3-circle" color="#fff" width={24} />
              </ListItemIcon>
              <ListItemText
                primary="کد را در کادر زیر وارد کرده و تأیید کنید."
                primaryTypographyProps={{ variant: 'body2', color: '#fff' }}
              />
            </ListItem>
          </List>
        </Box>
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
            sx={{
              height: 50,
              fontSize: '1rem',
              mb: 3,
              background: 'linear-gradient(45deg, #1a652a 30%, #2e8b57 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #2e8b57 30%, #1a652a 90%)',
              },
            }}
          >
            {loading ? 'در حال بررسی...' : 'تأیید'}
          </Button>
        </form>
      </Box>
    </>
  );
};

export default GoogleAuthForm;