/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, ButtonGroup, CircularProgress, Stack, useMediaQuery, useTheme , Grid} from '@mui/material';
import TransactionSummary from './TransactionSummary';
import SnackBarNotification from './SnackBarNotification';
import useAuthStore from '../context/authStore';
import axios from 'axios';

const profitFactor = 1.04; // تغییر نام از feePercent به profitFactor برای هماهنگی
const networks = [
  "Ethereum",
  "Tron",
  "BNB Smart Chain",
  "Polygon",
  "Arbitrum",
  "Optimism",
  "Avalanche"
]; // می‌تونی شبکه‌های دیگه رو اضافه کنی
const currency = 'USDT';

const CryptoForm = () => {
  const { wallet, token, fetchWalletBalance, user, setUser } = useAuthStore();
  const [cryptoAddress, setCryptoAddress] = useState('');
  const [cryptoAmount, setCryptoAmount] = useState('');
  const [network, setNetwork] = useState(networks[0]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [snack, setSnack] = useState(false);
  const [error, setError] = useState(null);
  const [balanceTether, setBalanceTether] = useState(0);
  const [savedAddresses, setSavedAddresses] = useState([]); // برای ذخیره آدرس‌های قبلی

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
      if (user) {
        const addresses = Array.isArray(user.crypto_addresses) ? user.crypto_addresses : [];
        setSavedAddresses(addresses);
        if (addresses.length > 0) {
          setCryptoAddress(addresses[0]);
        }
      }
      setLoading(false);
    };
    loadWallet();
  }, [wallet, fetchWalletBalance, user]);

  const handleCryptoAmountChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d{0,6}$/.test(value) && value.length <= 12) {
      setCryptoAmount(value);
    }
  };

  const parsedTether = parseFloat(cryptoAmount) || 0;
  const profitCut = (profitFactor - 1) / (profitFactor + 1); // فرمول PHP
  const feeTether = parsedTether * profitCut;
  const netTether = parsedTether - feeTether;

  const [apiMessage, setApiMessage] = useState(null);

  const handleSubmit = async () => {
    setError(null);
    setApiMessage(null);

    if (!token) {
      setError('لطفاً ابتدا وارد شوید.');
      setSnack(true);
      return;
    }
    // اعتبارسنجی دقیق‌تر آدرس Ethereum
    if (!cryptoAddress || !/^0x[a-fA-F0-9]{40}$/.test(cryptoAddress)) {
      setError('آدرس مقصد معتبر نیست. باید یک آدرس معتبر Ethereum باشد.');
      setSnack(true);
      return;
    }
    if (parsedTether <= 0) {
      setError('مقدار برداشت باید بزرگتر از صفر باشد.');
      setSnack(true);
      return;
    }
    if (parsedTether > balanceTether) {
      setError(`موجودی کافی نیست. موجودی: ${balanceTether.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 6,
      })} USDT`);
      setSnack(true);
      return;
    }

    const data = {
      toaddress: cryptoAddress,
      network,
      currency,
      amount: parsedTether,
      fee: feeTether, // اضافه کردن کارمزد
      net_amount: netTether, // مبلغ خالص
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

      setApiMessage(response.data.message || 'درخواست ثبت شد');

      if (response.data.status) {
        await fetchWalletBalance();
        // ذخیره آدرس کریپتو اگر جدید باشه
        if (!savedAddresses.includes(cryptoAddress)) {
          const updatedAddresses = [...savedAddresses, cryptoAddress];
          setUser({ ...user, crypto_addresses: updatedAddresses });
          setSavedAddresses(updatedAddresses);
        }
        setCryptoAddress(savedAddresses.length > 0 ? savedAddresses[0] : '');
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
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: { xs: '200px', sm: '300px' } }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 0, sm: 1 }, mx: 'auto', direction: 'rtl', maxWidth: { xs: '100%', sm: '600px' } }}>
      <Typography
        variant={isMobile ? 'subtitle2' : 'subtitle1'}
        sx={{ mb: 1, fontWeight: 600, textAlign: 'right' }}
      >
        انتخاب شبکه
      </Typography>
      <ButtonGroup
        fullWidth
        sx={{
          mb: 2,
          flexDirection: isMobile ? 'column' : 'row',
          '& .MuiButton-root': { fontSize: isMobile ? '0.8rem' : '0.8rem' },
        }}
      >
        <Grid container spacing={0.5}>
          {networks.map((net) => (
            <Grid item xs={12} sm={6} md={6} key={net}>
              <Button
                fullWidth
                size="small"
                variant={network === net ? "contained" : "outlined"}
                onClick={() => setNetwork(net)}
                sx={{ py: isMobile ? 1 : 1.5 }}
              >
                {net}
              </Button>
            </Grid>
          ))}
        </Grid>
      </ButtonGroup>

      <TextField
        fullWidth
        select={savedAddresses.length > 0} // اگر آدرس‌های ذخیره‌شده وجود داره، Select نشون بده
        label="آدرس مقصد"
        margin="normal"
        value={cryptoAddress}
        onChange={(e) => setCryptoAddress(e.target.value)}
        sx={{ mb: 2 }}
        placeholder="مثلاً 0x1234567890abcdef..."
      >
        {savedAddresses.map((addr, idx) => (
          <MenuItem key={idx} value={addr}>
            {addr}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        fullWidth
        label="مقدار برداشت (USDT)"
        margin="normal"
        type="text"
        inputMode="decimal"
        value={cryptoAmount}
        onChange={handleCryptoAmountChange}
        sx={{ mb: 0 }}
        placeholder="مثلاً 200.123456"
        error={parsedTether > balanceTether && cryptoAmount !== ''}
        helperText={
          parsedTether > balanceTether && cryptoAmount !== ''
            ? `موجودی کافی نیست. موجودی: ${balanceTether.toLocaleString('en-US', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 6,
              })} USDT`
            : ''
        }
      />

      <TransactionSummary
        items={[
          ['کارمزد', feeTether.toFixed(6), 'USDT'],
          ['خالص دریافتی', netTether.toFixed(6), 'USDT'],
          ['مقدار وارد شده', parsedTether.toFixed(6), 'USDT'],
          ['موجودی فعلی', balanceTether.toFixed(6), 'USDT'],
        ]}
      />

      <Stack direction="row" spacing={1} mt={1}>
        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          disabled={submitting || parsedTether > balanceTether}
          sx={{ fontSize: isMobile ? '0.9rem' : '1rem', py: isMobile ? 1 : 1.5 }}
        >
          {submitting ? 'در حال ارسال...' : 'ثبت برداشت'}
        </Button>
      </Stack>

      <SnackBarNotification
        open={snack}
        onClose={() => setSnack(false)}
        message={error || apiMessage}
      />
    </Box>
  );
};

export default CryptoForm;