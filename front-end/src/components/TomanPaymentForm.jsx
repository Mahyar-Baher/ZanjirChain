/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Box, TextField, MenuItem, Button, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';
import useAuthStore from '../context/authStore';
import PaymentSummary from './PaymentSummary';
import RecentPayments from './RecentPayments';

const bankList = ['درگاه پرداخت بانک ملت', 'درگاه پرداخت بانک ملی', 'درگاه پرداخت بانک صادرات'];
const recentPays = ['100,000', '250,000', '500,000'];
const profitFactor = 1.04;

const TomanPaymentForm = ({ activeMethod }) => {
  const { user, fetchWalletBalance, token } = useAuthStore();
  const [amount, setAmount] = useState('');
  const [shebaList, setShebaList] = useState([]);
  const [offlineData, setOfflineData] = useState({
    selectedSheba: '',
    amount: '',
    trackingCode: '',
    description: '',
  });
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
          let shebas = user.sheba_number;
          if (typeof shebas === 'string') shebas = [shebas];
          if (!Array.isArray(shebas)) shebas = [];
          setShebaList(shebas);
          if (shebas.length > 0) {
            setOfflineData((prev) => ({ ...prev, selectedSheba: shebas[0] }));
          }
        } catch (error) {
          console.error('خطا در پردازش داده‌های کاربر:', error);
          setError('خطا در پردازش اطلاعات کاربر.');
          setShebaList([]);
        }
      } else {
        setError('اطلاعات کاربر یافت نشد.');
        setShebaList([]);
      }
      setLoading(false);
    };

    loadUserData();
  }, [user, fetchWalletBalance]);

  const parsedAmount = parseInt(amount.replace(/,/g, ''), 10) || 0;
  const profitCut = (profitFactor - 1) / (profitFactor + 1);
  const fee = Math.round(parsedAmount * profitCut);
  const finalAmount = parsedAmount - fee;

  const handleAmountChange = (e) => {
    const value = e.target.value;
    // فقط اعداد صحیح مجاز هستند
    if (/^\d*$/.test(value) && value.length <= 12) {
      setAmount(value);
    }
  };

  const handleOfflineAmountChange = (e) => {
    const value = e.target.value;
    // فقط اعداد صحیح مجاز هستند
    if (/^\d*$/.test(value) && value.length <= 12) {
      setOfflineData((prev) => ({ ...prev, amount: value }));
    }
  };

  const handleTrackingCodeChange = (e) => {
    const value = e.target.value;
    // فقط اعداد صحیح مجاز هستند
    if (/^\d*$/.test(value) && value.length <= 20) {
      setOfflineData((prev) => ({ ...prev, trackingCode: value }));
    }
  };

  const handleShebaChange = (e) => {
    const value = e.target.value;
    // فقط شبا معتبر (IR + 24 رقم) یا انتخاب از لیست
    if (shebaList.includes(value) || /^IR\d{0,24}$/.test(value.toUpperCase())) {
      setOfflineData((prev) => ({ ...prev, selectedSheba: value.toUpperCase() }));
    }
  };

  const handleOfflineSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setError('لطفاً ابتدا وارد شوید.');
      return;
    }

    if (!offlineData.selectedSheba || !/^IR\d{24}$/.test(offlineData.selectedSheba)) {
      setError('شماره شبا معتبر نیست. باید با IR شروع شده و 24 رقم باشد.');
      return;
    }
    const parsedOfflineAmount = parseInt(offlineData.amount, 10) || 0;
    if (parsedOfflineAmount <= 0) {
      setError('مبلغ واریز نامعتبر است.');
      return;
    }
    if (!offlineData.trackingCode) {
      setError('شناسه واریز / شماره پیگیری الزامی است.');
      return;
    }

    const data = {
      payment_method: 'sheba',
      transaction_type: 0,
      is_paid: false,
      currency: 'toman',
      need_check: 1,
      user_id: user?.id,
      bank_tracking_code: offlineData.trackingCode,
      ba_toman: parsedOfflineAmount,
      sheba_number: offlineData.selectedSheba,
      description: offlineData.description,
    };

    try {
      setLoading(true);
      const response = await axios.post('https://your-api.com/api/deposit', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.data.status) {
        await fetchWalletBalance();
        let shebas = user?.sheba_number || [];
        if (typeof shebas === 'string') shebas = [shebas];
        if (!shebas.includes(offlineData.selectedSheba)) {
          const updatedShebas = [...shebas, offlineData.selectedSheba];
          const updatedUser = { ...user, sheba_number: updatedShebas };
          useAuthStore.setState({ user: updatedUser });
        }
        setOfflineData({
          selectedSheba: shebaList.length > 0 ? shebaList[0] : '',
          amount: '',
          trackingCode: '',
          description: '',
        });
        setAmount('');
        setError(null);
        alert('واریز ثبت شد');
      } else {
        throw new Error(response.data.message || 'خطا در ثبت واریز');
      }
    } catch (err) {
      console.error('❌ Submit Error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'خطا در ثبت واریز');
    } finally {
      setLoading(false);
    }
  };

  const tomanForms = [
    <Box key="gateway" component="form" noValidate autoComplete="on">
      <TextField fullWidth select label="درگاه مورد نظر را انتخاب کنید" margin="normal">
        {bankList.map((bank) => (
          <MenuItem key={bank} value={bank}>
            {bank}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        fullWidth
        label="مبلغ (تومان)"
        type="text"
        inputMode="numeric"
        margin="normal"
        value={amount}
        onChange={handleAmountChange}
        placeholder="مثلاً 2500000"
      />
      <RecentPayments recentPays={recentPays} />
      <PaymentSummary parsedAmount={parsedAmount} fee={fee} finalAmount={finalAmount} />
      <Button variant="contained" fullWidth sx={{ mt: 2 }} disabled={loading}>
        پرداخت
      </Button>
    </Box>,
    <Box key="offline" component="form" noValidate autoComplete="off" onSubmit={handleOfflineSubmit}>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box sx={{ mb: 2 }}>
          <Typography color="error">{error}</Typography>
        </Box>
      ) : (
        <>
          {shebaList.length > 0 ? (
            <TextField
              fullWidth
              select
              label="انتخاب شماره شبا"
              margin="normal"
              value={offlineData.selectedSheba}
              onChange={(e) => setOfflineData({ ...offlineData, selectedSheba: e.target.value })}
            >
              {shebaList.map((sheba, i) => (
                <MenuItem key={i} value={sheba}>
                  {sheba}
                </MenuItem>
              ))}
            </TextField>
          ) : (
            <>
              <Typography sx={{ mt: 2, fontSize: 12, color: 'gray' }}>
                هیچ شماره شبایی ثبت نشده. لطفاً یک شماره شبا وارد کنید:
              </Typography>
              <TextField
                fullWidth
                label="شماره شبا"
                type="text"
                inputMode="text"
                margin="normal"
                value={offlineData.selectedSheba}
                onChange={handleShebaChange}
                placeholder="مثلاً IR123456789012345678901234"
              />
            </>
          )}
          <TextField
            fullWidth
            label="مبلغ (تومان)"
            type="text"
            inputMode="numeric"
            margin="normal"
            value={offlineData.amount}
            onChange={handleOfflineAmountChange}
            placeholder="مثلاً 2500000"
          />
          <TextField
            fullWidth
            label="شناسه واریز / شماره پیگیری"
            type="text"
            inputMode="numeric"
            margin="normal"
            value={offlineData.trackingCode}
            onChange={handleTrackingCodeChange}
            placeholder="مثلاً 1234567890"
          />
          <TextField
            fullWidth
            label="توضیحات تکمیلی (اختیاری)"
            multiline
            rows={3}
            margin="normal"
            value={offlineData.description}
            onChange={(e) => setOfflineData({ ...offlineData, description: e.target.value })}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={loading}>
            ثبت پرداخت آفلاین
          </Button>
        </>
      )}
    </Box>,
  ];

  return <Box>{tomanForms[activeMethod]}</Box>;
};

export default TomanPaymentForm;  