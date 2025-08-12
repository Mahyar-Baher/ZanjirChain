import React, { useState, useEffect } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@mui/material';
import axios from 'axios';
import RecentAmounts from './RecentAmounts';
import TransactionSummary from './TransactionSummary';
import SnackBarNotification from './SnackBarNotification';
import { generateTrackingCode } from './utils';

const recentAmounts = ['5,000,000', '10,000,000', '15,000,000', '20,000,000', '25,000,000'];
const feePercent = 1;

const TomanForm = ({ balanceToman }) => {
  const [amount, setAmount] = useState('');
  const [sheba, setSheba] = useState('');
  const [shabaList, setShabaList] = useState([]);
  const [snack, setSnack] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user')) || {};
    const shebaListFromUser = Array.isArray(userData.sheba_number)
      ? userData.sheba_number
      : [];
    setShabaList(shebaListFromUser);
    if (shebaListFromUser.length > 0) {
      setSheba(shebaListFromUser[0]);
    }
  }, []);

  const parsedToman = parseInt(amount.replace(/,/g, ''), 10) || 0;
  const feeToman = Math.round((parsedToman * feePercent) / 100);
  const netToman = parsedToman - feeToman;
  const isInsufficient = parsedToman > balanceToman;

  const handleSubmit = async () => {
    if (!sheba || sheba.length > 100) {
      alert('شماره شبا معتبر نیست یا بیش از ۱۰۰ کاراکتر است.');
      return;
    }
    if (parsedToman < 200000 || parsedToman > 500000000) {
      alert('مبلغ برداشت باید بین ۲۰۰,۰۰۰ تا ۵۰۰,۰۰۰,۰۰۰ تومان باشد.');
      return;
    }
    if (isInsufficient) {
      alert('موجودی تومان کافی نیست.');
      return;
    }

    const token = localStorage.getItem('token');
    const data = {
      receipt_url: null,
      payment_method: 'sheba',
      transaction_type: 2,
      bank_tracking_code: sheba,
      custom_tracking_code: generateTrackingCode(),
      fee: feeToman,
      is_paid: true,
      financial_status: 0,
      currency: 'toman',
      fp_tether: 0,
      fp_toman: netToman,
      ba_tether: 0,
      ba_toman: parsedToman,
    };

    try {
      await axios.post('https://amirrezaei2002x.shop/laravel/api/orders', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setSnack(true);
      setAmount('');
      setSheba(shabaList.length > 0 ? shabaList[0] : '');
    } catch (err) {
      console.error('❌ Submit Error:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'خطا در ثبت درخواست');
    }
  };

  return (
    <Box component="form" noValidate autoComplete="off">
      <FormControl fullWidth margin="normal">
        <InputLabel id="select-sheba-label">شماره شبا مقصد</InputLabel>
        <Select
          labelId="select-sheba-label"
          value={sheba}
          label="شماره شبا مقصد"
          onChange={(e) => setSheba(e.target.value)}
        >
          {shabaList.length === 0 && (
            <MenuItem disabled value="">
              شماره شبا موجود نیست
            </MenuItem>
          )}
          {shabaList.map((item, idx) => (
            <MenuItem key={idx} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        fullWidth
        label="مبلغ برداشت (تومان)"
        placeholder="بین ۲۰۰,۰۰۰ تا ۵۰۰,۰۰۰,۰۰۰ تومان"
        margin="normal"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        error={isInsufficient}
        helperText={isInsufficient ? 'موجودی کافی نیست.' : ''}
      />
      <RecentAmounts amounts={recentAmounts} setAmount={setAmount} />
      <TransactionSummary
        items={[
          ['کارمزد', feeToman, 'تومان'],
          ['خالص دریافتی', netToman, 'تومان'],
          ['مبلغ وارد شده', parsedToman, 'تومان'],
        ]}
      />
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 2 }}
        onClick={handleSubmit}
        disabled={isInsufficient || shabaList.length === 0}
      >
        ثبت درخواست برداشت
      </Button>
      <SnackBarNotification
        open={snack}
        onClose={() => setSnack(false)}
        message="درخواست ثبت شد"
      />
    </Box>
  );
};

export default TomanForm;