import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import TransactionSummary from './TransactionSummary';
import SnackBarNotification from './SnackBarNotification';
import { generateTrackingCode } from './utils';

const feePercent = 1;

const CryptoForm = ({ activeMethod, balanceTether, methodKeys }) => {
  const [cryptoAddress, setCryptoAddress] = useState('');
  const [cryptoAmount, setCryptoAmount] = useState('');
  const [snack, setSnack] = useState(false);

  const parsedTether = parseFloat(cryptoAmount) || 0;
  const feeTether = +(parsedTether * (feePercent / 100)).toFixed(2);
  const netTether = +(parsedTether - feeTether).toFixed(2);

  const handleSubmit = async () => {
    if (!cryptoAddress || cryptoAddress.length > 11) {
      alert('آدرس مقصد معتبر نیست یا بیش از ۱۱ کاراکتر است.');
      return;
    }
    if (parsedTether <= 0) {
      alert('مقدار برداشت باید بزرگتر از صفر باشد.');
      return;
    }
    if (parsedTether > balanceTether) {
      alert('موجودی تتر کافی نیست.');
      return;
    }

    const token = localStorage.getItem('token');
    const data = {
      receipt_url: null,
      payment_method: methodKeys[activeMethod],
      transaction_type: 3,
      bank_tracking_code: cryptoAddress,
      custom_tracking_code: generateTrackingCode(),
      fee: feeTether,
      is_paid: true,
      financial_status: 0,
      currency: 'tether',
      fp_tether: netTether,
      fp_toman: 0,
      ba_tether: parsedTether,
      ba_toman: 0,
    };

    try {
      await axios.post('https://amirrezaei2002x.shop/laravel/api/orders', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setSnack(true);
      setCryptoAddress('');
      setCryptoAmount('');
    } catch (err) {
      console.error('❌ Submit Error:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'خطا در ثبت درخواست');
    }
  };

  return (
    <Box component="form" noValidate autoComplete="off">
      <Typography mb={2}>
        شبکه انتخابی: <strong>{['انتقال داخلی', 'شبکه TRC20', 'شبکه BEP20', 'شبکه ERC20'][activeMethod]}</strong>
      </Typography>
      <TextField
        fullWidth
        label="آدرس مقصد"
        margin="normal"
        value={cryptoAddress}
        onChange={(e) => setCryptoAddress(e.target.value)}
      />
      <TextField
        fullWidth
        label="مقدار برداشت (USDT)"
        margin="normal"
        value={cryptoAmount}
        onChange={(e) => setCryptoAmount(e.target.value)}
      />
      <TransactionSummary
        items={[
          ['کارمزد', feeTether, 'USDT'],
          ['خالص دریافتی', netTether, 'USDT'],
          ['مقدار وارد شده', parsedTether, 'USDT'],
        ]}
      />
      <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>
        ثبت برداشت
      </Button>
      <SnackBarNotification
        open={snack}
        onClose={() => setSnack(false)}
        message="درخواست ثبت شد"
      />
    </Box>
  );
};

export default CryptoForm;