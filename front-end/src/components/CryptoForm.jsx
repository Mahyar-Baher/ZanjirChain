import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, ButtonGroup, CircularProgress, Paper, Stack } from '@mui/material';
import TransactionSummary from './TransactionSummary';
import SnackBarNotification from './SnackBarNotification';
import useAuthStore from '../context/authStore';
import axios from 'axios';

const feePercent = 1;
const networks = ['Ethereum'];
const currency = 'USDT';

const CryptoForm = () => {
  const { wallet, token, fetchWalletBalance } = useAuthStore();
  const [cryptoAddress, setCryptoAddress] = useState('');
  const [cryptoAmount, setCryptoAmount] = useState('');
  const [network, setNetwork] = useState(networks[0]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [snack, setSnack] = useState(false);
  const [error, setError] = useState(null);

  const [balanceTether, setBalanceTether] = useState(0);

  // لود موجودی
  useEffect(() => {
    const loadWallet = async () => {
      setLoading(true);
      if (!wallet) {
        await fetchWalletBalance();
      }
      if (wallet) {
        const tetherBalance = parseFloat(wallet.with_creadit_total_balance_formatted || 0);
        setBalanceTether(tetherBalance);
      }
      setLoading(false);
    };
    loadWallet();
  }, [wallet, fetchWalletBalance]);

  const parsedTether = parseFloat(cryptoAmount) || 0;
  const feeTether = +(parsedTether * (feePercent / 100)).toFixed(6);
  const netTether = +(parsedTether - feeTether).toFixed(6);

  const [apiMessage, setApiMessage] = useState(null);

  const handleSubmit = async () => {
    setError(null);
    setApiMessage(null);
  
    if (!token) {
      setError('لطفاً ابتدا وارد شوید.');
      setSnack(true);
      return;
    }
    if (!cryptoAddress || cryptoAddress.length < 10) {
      setError('آدرس مقصد معتبر نیست.');
      setSnack(true);
      return;
    }
    if (parsedTether <= 0) {
      setError('مقدار برداشت باید بزرگتر از صفر باشد.');
      setSnack(true);
      return;
    }
    if (parsedTether > balanceTether) {
      setError(`موجودی کافی نیست. موجودی: ${balanceTether.toFixed(6)} USDT`);
      setSnack(true);
      return;
    }
  
    const data = {
      toaddress: cryptoAddress,
      network,
      currency,
      amount: parsedTether,
      automatic: true,
    };
  
    try {
      setSubmitting(true);
      const response = await axios.post(
        'https://amirrezaei2002x.shop/laravel/api/sendcoinapi',
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      // پیام API رو ذخیره کن
      setApiMessage(response.data.message || 'درخواست ثبت شد');
  
      if (response.data.status) {
        await fetchWalletBalance();
        setCryptoAddress('');
        setCryptoAmount('');
      } else {
        setError(response.data.message || 'خطا در ثبت درخواست');
      }
    } catch (err) {
      console.error('❌ Submit Error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'خطا در ثبت درخواست');
    } finally {
      setSubmitting(false);
      setSnack(true);
    }
  };
  

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto', direction: 'rtl' }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        برداشت تتر (USDT)
      </Typography>

      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
        انتخاب شبکه
      </Typography>
      <ButtonGroup fullWidth sx={{ mb: 2 }}>
        {networks.map((net) => (
          <Button
            key={net}
            variant={network === net ? 'contained' : 'outlined'}
            onClick={() => setNetwork(net)}
          >
            {net}
          </Button>
        ))}
      </ButtonGroup>

      <TextField
        fullWidth
        label="آدرس مقصد"
        margin="normal"
        value={cryptoAddress}
        onChange={(e) => setCryptoAddress(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="مقدار برداشت (USDT)"
        margin="normal"
        type="number"
        value={cryptoAmount}
        onChange={(e) => setCryptoAmount(e.target.value)}
        sx={{ mb: 2 }}
      />

      <TransactionSummary
        items={[
          ['کارمزد', feeTether, 'USDT'],
          ['خالص دریافتی', netTether, 'USDT'],
          ['مقدار وارد شده', parsedTether, 'USDT'],
          ['موجودی فعلی', balanceTether, 'USDT'],
        ]}
      />

      <Stack direction="row" spacing={1} mt={2}>
        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? 'در حال ارسال...' : 'ثبت برداشت'}
        </Button>
      </Stack>

      <SnackBarNotification
        open={snack}
        onClose={() => setSnack(false)}
        message={error || apiMessage}
      />
    </Paper>
  );
};

export default CryptoForm;
