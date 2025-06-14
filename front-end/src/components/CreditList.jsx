import React, { useState } from 'react';
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
} from '@mui/material';

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

const formatCardNumber = (number) => {
  if (number.length !== 16) return 'شماره نامعتبر است';
  return `${number.slice(0, 4)} **** **** ${number.slice(12, 16)}`;
};

const CreditList = () => {
  const [open, setOpen] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cards, setCards] = useState([]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // "success" | "error"

  const handleAddCard = () => {
    if (cardNumber.length === 16 && /^\d+$/.test(cardNumber)) {
      setCards((prev) => [...prev, cardNumber]);
      setCardNumber('');
      setOpen(false);

      // پیام موفقیت
      setSnackbarMessage('کارت با موفقیت ثبت شد.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } else {
      // پیام خطا
      setSnackbarMessage('شماره کارت باید ۱۶ رقم و فقط عدد باشد.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        کارت‌های بانکی
      </Typography>

      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
        sx={{ mb: 2, fontSize: '17px', fontWeight: 'bold' }}
      >
        + افزودن کارت جدید
      </Button>

      <Stack spacing={2}>
        {cards.map((card, index) => (
          <Card
            key={index}
            variant="elevation"
            sx={{
              backgroundColor: 'rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2,
            }}
          >
            <Typography textAlign="center">
              {formatCardNumber(card)}
            </Typography>
          </Card>
        ))}
      </Stack>

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

      {/* Snackbar */}
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
