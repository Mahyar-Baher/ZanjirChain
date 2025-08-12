import React, { useState, useEffect } from 'react';
import { Box, TextField, MenuItem, Button, Typography } from '@mui/material';
import axios from 'axios';
import PaymentSummary from './PaymentSummary';
import RecentPayments from './RecentPayments';

const bankList = ['درگاه پرداخت بانک ملت', 'درگاه پرداخت بانک ملی', 'درگاه پرداخت بانک صادرات'];
const recentPays = ['100,000', '250,000', '500,000'];
const karmozdPercent = 1;

const TomanPaymentForm = ({ activeMethod }) => {
  const [amount, setAmount] = useState('');
  const [shebaList, setShebaList] = useState([]);
  const [offlineData, setOfflineData] = useState({
    selectedSheba: '',
    amount: '',
    trackingCode: '',
    description: '',
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    let shebas = user?.sheba_number;
    if (typeof shebas === 'string') shebas = [shebas];
    if (!Array.isArray(shebas)) shebas = [];
    setShebaList(shebas);
  }, []);

  const parsedAmount = parseInt(amount.replace(/,/g, ''), 10) || 0;
  const fee = Math.round((parsedAmount * karmozdPercent) / 100);
  const finalAmount = parsedAmount - fee;

  const handleOfflineSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    const data = {
      payment_method: 'sheba',
      transaction_type: 0,
      is_paid: false,
      currency: 'toman',
      need_check: 1,
      user_id: user?.id,
      bank_tracking_code: offlineData.trackingCode,
      ba_toman: offlineData.amount,
      sheba_number: offlineData.selectedSheba,
      description: offlineData.description,
    };

    try {
      await axios.post('https://your-api.com/api/deposit', data);

      let shebas = user?.sheba_number || [];
      if (typeof shebas === 'string') shebas = [shebas];
      if (!shebas.includes(offlineData.selectedSheba)) {
        const updatedShebas = [...shebas, offlineData.selectedSheba];
        const updatedUser = { ...user, sheba_number: updatedShebas };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }

      alert('واریز ثبت شد');
    } catch (err) {
      alert('خطا در ثبت واریز' + err);
    }
  };

  const tomanForms = [
    <Box key="gateway" component="form" noValidate autoComplete="on">
      <TextField fullWidth select label="درگاه مورد نظر رو انتخاب کنید" margin="normal">
        {bankList.map((bank) => (
          <MenuItem key={bank} value={bank}>
            {bank}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        fullWidth
        label="مبلغ (تومان)"
        margin="normal"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <RecentPayments recentPays={recentPays} />
      <PaymentSummary parsedAmount={parsedAmount} fee={fee} finalAmount={finalAmount} />
      <Button variant="contained" fullWidth sx={{ mt: 2 }}>پرداخت</Button>
    </Box>,
    <Box key="offline" component="form" noValidate autoComplete="off" onSubmit={handleOfflineSubmit}>
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
            margin="normal"
            value={offlineData.selectedSheba}
            onChange={(e) => setOfflineData({ ...offlineData, selectedSheba: e.target.value })}
            placeholder="مثلاً 123456789012345678901234"
          />
        </>
      )}
      <TextField
        fullWidth
        label="مبلغ (تومان)"
        type="number"
        margin="normal"
        value={offlineData.amount}
        onChange={(e) => setOfflineData({ ...offlineData, amount: e.target.value })}
      />
      <TextField
        fullWidth
        label="شناسه واریز / شماره پیگیری"
        margin="normal"
        value={offlineData.trackingCode}
        onChange={(e) => setOfflineData({ ...offlineData, trackingCode: e.target.value })}
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
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        ثبت پرداخت آفلاین
      </Button>
    </Box>,
  ];

  return <Box>{tomanForms[activeMethod]}</Box>;
};

export default TomanPaymentForm;