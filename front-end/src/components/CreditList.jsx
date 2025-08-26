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
import axios from 'axios';
import useAuthStore from '../context/authStore'; // مسیر فایل useAuthStore.js

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

const banks = {
  '603799': 'بانک ملی ایران',
  '589210': 'بانک سپه',
  '627648': 'بانک توسعه صادرات ایران',
  '627961': 'بانک صنعت و معدن',
  '610433': 'بانک ملت',
  '589463': 'بانک رفاه کارگران',
  '628023': 'بانک مسکن',
  '627412': 'بانک اقتصاد نوین',
  '603770': 'بانک کشاورزی',
  '636214': 'بانک تات',
  '627760': 'پست بانک ایران',
  '502806': 'بانک شهر',
  '502938': 'بانک دی',
  '636949': 'بانک حکمت ایرانیان',
  '505764': 'بانک ایران زمین',
  '627884': 'بانک پارسیان',
  '505785': 'بانک ایران زمین',
};

const formatCardNumber = (number) => {
  if (number.length !== 16) return 'شماره نامعتبر است';
  return `${number.slice(0, 16)}`;
};

const detectBank = (number) => {
  if (number.length < 6) return 'نامشخص';
  const prefix = number.slice(0, 6);
  return banks[prefix] || 'نامشخص';
};

const CreditList = () => {
  const { user, token } = useAuthStore();
  const [open, setOpen] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const userId = user?.id;

  useEffect(() => {
    const fetchCards = async () => {
      if (!userId || !token) {
        setSnackbarMessage('لطفاً ابتدا وارد شوید.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(`https://amirrezaei2002x.shop/laravel/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (Array.isArray(response.data.card_number)) {
          setCards(response.data.card_number);
        } else {
          setCards([]);
        }
      } catch (err) {
        console.error('خطا در دریافت کارت‌ها:', err?.response?.data || err.message);
        setSnackbarMessage('خطا در دریافت کارت‌ها.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        if (err.response?.status === 401) {
          useAuthStore.getState().logout();
          window.location.href = '/login';
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, [userId, token]);

  const updateCards = async (updatedCards, message) => {
    try {
      await axios.put(
        `https://amirrezaei2002x.shop/laravel/api/users/${userId}`,
        { card_number: updatedCards },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCards(updatedCards);
      setCardNumber('');
      setOpen(false);
      setSnackbarMessage(message);
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (err) {
      console.error('خطا در به‌روزرسانی کارت‌ها:', err?.response?.data || err.message);
      setSnackbarMessage('خطا در ارتباط با سرور.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      if (err.response?.status === 401) {
        useAuthStore.getState().logout();
        window.location.href = '/login';
      }
    }
  };

  const handleAddCard = async () => {
    if (cardNumber.length === 16 && /^\d+$/.test(cardNumber)) {
      if (cards.includes(cardNumber)) {
        setSnackbarMessage('این کارت قبلاً ثبت شده است.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        return;
      }
      const updatedCards = [...cards, cardNumber];
      await updateCards(updatedCards, 'کارت با موفقیت ثبت شد.');
    } else {
      setSnackbarMessage('شماره کارت باید ۱۶ رقم و فقط عدد باشد.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleDeleteCard = async (cardToDelete) => {
    const updatedCards = cards.filter((card) => card !== cardToDelete);
    await updateCards(updatedCards, 'کارت با موفقیت حذف شد.');
  };

  return (
    <Box sx={{ p: 3, direction: 'rtl' }}>
      <Typography variant="h6" gutterBottom>
        کارت‌های بانکی
      </Typography>

      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
        sx={{ mb: 2, fontSize: '17px', fontWeight: 'bold' }}
        disabled={!userId || !token}
      >
        + افزودن کارت جدید
      </Button>

      {loading ? (
        <Stack spacing={2}>
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} variant="rectangular" height={60} sx={{ borderRadius: 2 }} />
          ))}
        </Stack>
      ) : !userId || !token ? (
        <Box sx={{ textAlign: 'center', my: 4 }}>
          <Typography color="text.secondary">لطفاً ابتدا وارد شوید.</Typography>
        </Box>
      ) : cards.length === 0 ? (
        <Box sx={{ textAlign: 'center', my: 4 }}>
          <Typography color="text.secondary">هیچ کارتی ثبت نشده است.</Typography>
        </Box>
      ) : (
        <Stack spacing={2}>
          {cards.map((card, index) => (
            <Card
              key={index}
              variant="outlined"
              sx={{
                backgroundColor: 'rgba(0,0,0,0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 2,
              }}
            >
              <Box>
                <Typography fontWeight="bold" dir="ltr">{formatCardNumber(card)}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {detectBank(card)}
                </Typography>
              </Box>
              <IconButton color="error" onClick={() => handleDeleteCard(card)}>
                <DeleteIcon />
              </IconButton>
            </Card>
          ))}
        </Stack>
      )}

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style.modalBox}>
          <Typography variant="h6" sx={{ color: 'text.primary' }} gutterBottom>
            افزودن کارت
          </Typography>
          <TextField
            label="شماره کارت ۱۶ رقمی"
            variant="outlined"
            fullWidth
            value={cardNumber}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '');
              setCardNumber(value.slice(0, 16));
            }}
            inputProps={{ maxLength: 16 }}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" fullWidth onClick={handleAddCard}>
            ثبت کارت
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

export default CreditList;