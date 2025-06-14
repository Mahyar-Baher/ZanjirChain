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
  const [shabas, setShabas] = useState([]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleAddShaba = () => {
    const fullShaba = `IR${shabaDigits}`;
    if (/^IR\d{22}$/.test(fullShaba)) {
      setShabas((prev) => [...prev, fullShaba]);
      setShabaDigits('');
      setOpen(false);

      setSnackbarMessage('شماره شبا با موفقیت ثبت شد.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } else {
      setSnackbarMessage('شماره شبا باید ۲۲ رقم عددی پس از IR باشد.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
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
        {shabas.map((sh, index) => (
          <Card
            key={index}
            variant="elevation"
            sx={{
              backgroundColor: 'rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2,
              direction: 'ltr',
            }}
          >
            <Typography textAlign="center">{formatShabaNumber(sh)}</Typography>
          </Card>
        ))}
      </Stack>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style.modalBox}>
          <Typography variant="h6" gutterBottom sx={{ color: 'text.primary' }}>
            افزودن شماره شبا
          </Typography>
          <TextField
            label="مثلاً: 062960000000201241004004"
            variant="outlined"
            fullWidth
            value={shabaDigits}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '');
              setShabaDigits(value.slice(0, 22));
            }}
            InputProps={{
              startAdornment: (
                <Typography sx={{ mr: 1, fontWeight: 'bold' }}>IR</Typography>
              ),
            }}
            inputProps={{ maxLength: 22 }}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" fullWidth onClick={handleAddShaba}>
            ثبت شماره شبا
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

export default ShabaNumbers;
