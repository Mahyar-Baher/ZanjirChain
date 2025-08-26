/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, TextField, Button, CircularProgress, Typography } from '@mui/material';
import axios from 'axios';
import useAuthStore from '../context/authStore';
import RecentAmounts from './RecentAmounts';
import TransactionSummary from './TransactionSummary';
import SnackBarNotification from './SnackBarNotification';
import { generateTrackingCode } from './utils';

const recentAmounts = [5000000, 10000000, 15000000, 20000000, 25000000, 30000000]; // اعداد به‌صورت عدد
const profitFactor = 1.04;

const TomanForm = ({ balanceToman, exchangeRate = 1 }) => { // exchangeRate به عنوان prop یا از API
  const { user, fetchWalletBalance, token, setUser } = useAuthStore();
  const [amount, setAmount] = useState('');
  const [sheba, setSheba] = useState('');
  const [shabaList, setShabaList] = useState([]);
  const [snack, setSnack] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUserData = async () => {
      setLoading(true);
      setError(null);

      if (!user) {
        try {
          await fetchWalletBalance();
        } catch (err) {
          console.error('خطا در بارگذاری داده‌های کاربر:', err);
          setError('خطا در بارگذاری اطلاعات کاربر.');
          setLoading(false);
          return;
        }
      }

      if (user) {
        try {
          const shebaListFromUser = Array.isArray(user.sheba_number) ? user.sheba_number : [];
          setShabaList(shebaListFromUser);
          if (shebaListFromUser.length > 0) {
            setSheba(shebaListFromUser[0]);
          } else {
            setError('شماره شبا برای کاربر ثبت نشده است.');
          }
        } catch (error) {
          console.error('خطا در پردازش داده‌های کاربر:', error);
          setError('خطا در پردازش اطلاعات کاربر.');
          setShabaList([]);
        }
      } else {
        setError('اطلاعات کاربر یافت نشد.');
        setShabaList([]);
      }
      setLoading(false);
    };

    loadUserData();
  }, [user, fetchWalletBalance]);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && (value === '' || parseInt(value, 10) <= 500000000)) {
      setAmount(value);
    }
  };

  const parsedToman = parseInt(amount, 10) || 0;
  const profitCut = (profitFactor - 1) / (profitFactor + 1);
  const feeToman = Math.round(parsedToman * profitCut);
  const netToman = parsedToman - feeToman;
  const creditForUser = netToman / exchangeRate; // محاسبه اعتبار کاربر
  const isInsufficient = parsedToman > balanceToman;

  const handleSubmit = async () => {
    if (!token) {
      setError('لطفاً ابتدا وارد شوید.');
      setSnack(true);
      return;
    }

    if (!sheba || !/^IR\d{24}$/.test(sheba)) { // بررسی دقیق‌تر شبا
      setError('شماره شبا معتبر نیست. باید با IR شروع شده و 24 رقم باشد.');
      setSnack(true);
      return;
    }
    if (parsedToman < 200000 || parsedToman > 500000000) {
      setError('مبلغ برداشت باید بین ۲۰۰,۰۰۰ تا ۵۰۰,۰۰۰,۰۰۰ تومان باشد.');
      setSnack(true);
      return;
    }
    if (isInsufficient) {
      setError('موجودی تومان کافی نیست.');
      setSnack(true);
      return;
    }

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
      ba_tether: creditForUser, // اعتبار برای کیف پول
      ba_toman: parsedToman,
    };

    try {
      setLoading(true);
      const response = await axios.post('https://amirrezaei2002x.shop/laravel/api/orders', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.data.status) {
        await fetchWalletBalance();
        // اضافه کردن شماره شبا به لیست کاربر اگر جدید باشه
        if (!shabaList.includes(sheba)) {
          const updatedShebas = [...shabaList, sheba];
          setUser({ ...user, sheba_number: updatedShebas });
          setShabaList(updatedShebas);
        }
        setSnack(true);
        setAmount('');
        setSheba(shabaList.length > 0 ? shabaList[0] : '');
      } else {
        throw new Error(response.data.message || 'خطا در ثبت درخواست');
      }
    } catch (err) {
      console.error('❌ Submit Error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'خطا در ثبت درخواست');
      setSnack(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" noValidate autoComplete="off">
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <FormControl fullWidth margin="normal" style={{ padding: 0, margin: 0 }}>
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
            type="text"
            inputMode="numeric"
            placeholder="بین ۲۰۰,۰۰۰ تا ۵۰۰,۰۰۰,۰۰۰ تومان"
            margin="normal"
            value={amount}
            onChange={handleAmountChange}
            error={isInsufficient || (parsedToman > 500000000 && amount !== '')}
            helperText={
              isInsufficient
                ? 'موجودی کافی نیست.'
                : parsedToman > 500000000 && amount !== ''
                ? 'مبلغ نمی‌تواند بیشتر از ۵۰۰,۰۰۰,۰۰۰ تومان باشد.'
                : ''
            }
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
            disabled={isInsufficient || shabaList.length === 0 || loading || parsedToman > 500000000}
          >
            ثبت درخواست برداشت
          </Button>
          <SnackBarNotification
            open={snack}
            onClose={() => setSnack(false)}
            message={error || 'درخواست ثبت شد'}
          />
        </>
      )}
    </Box>
  );
};

export default TomanForm;