import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Modal,
  TextField,
  Stack,
  Card,
  Snackbar,
  Alert,
  IconButton,
  Skeleton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const style = {
  modalBox: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 320,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  },
};

const formatShabaNumber = (number) => {
  if (!/^IR\d{22}$/.test(number)) return 'شبا نامعتبر است';
  return `${number.slice(0, 4)} **** **** **** **** ****`;
};

const ShabaNumbers = () => {
  const [open, setOpen] = useState(false);
  const [shabaDigits, setShabaDigits] = useState('');
  const [Shebas, setShebas] = useState([]);
  const [loading, setLoading] = useState(true);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const userId = user?.id;
  useEffect(() => {
    const fetchShebas = async () => {
      if (!userId || !token) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`https://amirrezaei2002x.shop/laravel/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (Array.isArray(data.sheba_number)) {
          setShebas(data.sheba_number);
        }
      } catch (err) {
        console.error('خطا در دریافت شماره‌های شبا', err);
        setSnackbarMessage('خطا در دریافت شماره‌های شبا');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    };
    fetchShebas();
  }, [userId, token]);

  const updateShebas = async (updatedShebas, message) => {
    try {
      const res = await fetch(`https://amirrezaei2002x.shop/laravel/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ sheba_number: updatedShebas }),
      });
      if (!res.ok) throw new Error('خطا در بروزرسانی شماره‌های شبا');
      setShebas(updatedShebas);
      setShabaDigits('');
      setOpen(false);
      setSnackbarMessage(message);
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch {
      setSnackbarMessage('خطا در ارتباط با سرور.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleAddShaba = async () => {
    const fullShaba = `IR${shabaDigits}`;
    if (!/^IR\d{22}$/.test(fullShaba)) {
      setSnackbarMessage('شماره شبا باید ۲۲ رقم عددی پس از IR باشد.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }
    if (Shebas.includes(fullShaba)) {
      setSnackbarMessage('این شماره شبا قبلاً ثبت شده است.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }
    const updatedShebas = [...Shebas, fullShaba];
    await updateShebas(updatedShebas, 'شماره شبا با موفقیت ثبت شد.');
  };

  const handleDeleteShaba = async (shabaToDelete) => {
    const updatedShebas = Shebas.filter((sh) => sh !== shabaToDelete);
    await updateShebas(updatedShebas, 'شماره شبا با موفقیت حذف شد.');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        شماره‌های شبا
      </Typography>

      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
        sx={{ mb: 2, fontSize: '17px', fontWeight: 'bold' }}
      >
        + افزودن شماره شبا
      </Button>

      <Stack spacing={2}>
        {loading
          ? Array.from({ length: 2 }).map((_, i) => (
              <Skeleton key={i} variant="rectangular" height={60} sx={{ borderRadius: 2 }} />
            ))
          : Shebas.map((sh, index) => (
              <Card
                key={index}
                variant="outlined"
                sx={{
                  backgroundColor: 'rgba(0,0,0,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 2,
                  direction: 'ltr',
                }}
              >
                <Typography fontWeight="bold" sx={{ userSelect: 'text' }}>
                  {formatShabaNumber(sh)}
                </Typography>
                <IconButton color="error" onClick={() => handleDeleteShaba(sh)}>
                  <DeleteIcon />
                </IconButton>
              </Card>
            ))}
      </Stack>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style.modalBox}>
          <Typography variant="h6" sx={{ color: 'text.primary' }} gutterBottom>
            افزودن شماره شبا
          </Typography>
          <TextField
            label="شماره شبا ۲۲ رقمی بدون IR"
            variant="outlined"
            fullWidth
            value={shabaDigits}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '');
              setShabaDigits(value.slice(0, 22));
            }}
            inputProps={{ maxLength: 22 }}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" fullWidth onClick={handleAddShaba}>
            ثبت شماره شبا
          </Button>
        </Box>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={snackbarSeverity}
          onClose={() => setSnackbarOpen(false)}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ShabaNumbers;
