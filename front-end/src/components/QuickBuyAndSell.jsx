import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  IconButton,
  CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import useAuthStore from '../context/authStore'; // مسیر فایل useAuthStore.js
import { Icon } from '@iconify/react';

const labelSx = {
  color: '#fff',
  backgroundColor: '#1a652a',
  p: 0.55,
  width: 70,
  textAlign: 'center',
  marginTop: -0.45,
  borderRadius: '4px',
  '&.Mui-focused': {
    color: '#fff',
    backgroundColor: '#1a652a'
  }
};

const USDT_PRICE = 98000;
const FEE_PERCENT = 2;

const toEnglishNumber = (str) => {
  return str.replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)));
};

const QuickBuyAndSell = () => {
  const { wallet, fetchWalletBalance, token } = useAuthStore();
  const [isReversed, setIsReversed] = useState(false);
  const [toman, setToman] = useState('');
  const [tether, setTether] = useState('');
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [walletBalance, setWalletBalance] = useState({
    balance_toman: 0,
    balance_tether: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadWallet = async () => {
      setLoading(true);
      setError(null);

      if (!wallet) {
        try {
          await fetchWalletBalance();
        } catch (err) {
          console.error('خطا در فراخوانی fetchWalletBalance:', err);
          setError('خطا در بارگذاری اطلاعات ولت.');
          setLoading(false);
          return;
        }
      }

      if (wallet) {
        try {
          const tomanBalance = parseFloat(wallet.totalToman || 0);
          const tetherBalance = parseFloat(wallet.with_creadit_total_balance_formatted || 0);
          if (isNaN(tomanBalance) || isNaN(tetherBalance)) {
            throw new Error('مقادیر wallet نامعتبر هستند');
          }
          setWalletBalance({
            balance_toman: tomanBalance,
            balance_tether: tetherBalance
          });
        } catch (error) {
          console.error('خطا در پردازش داده‌های ولت:', error);
          setError('خطا در پردازش اطلاعات ولت.');
          setWalletBalance({
            balance_toman: 0,
            balance_tether: 0
          });
        }
      } else {
        setError('اطلاعات ولت یافت نشد.');
        setWalletBalance({
          balance_toman: 0,
          balance_tether: 0
        });
      }
      setLoading(false);
    };

    loadWallet();
  }, [wallet, fetchWalletBalance]);

  const handleSwap = () => {
    setIsReversed(prev => !prev);
    setToman('');
    setTether('');
  };
  const formatNumber = (num) => {
    if (!num) return '';
    return Number(num).toLocaleString('en-US'); // 12,345,678
  };
  
  const parseNumber = (str) => {
    if (!str) return 0;
    return parseFloat(toEnglishNumber(str.replace(/,/g, ''))); // حذف , برای محاسبه
  };
  
  const handleTomanChange = (e) => {
    let raw = e.target.value.replace(/,/g, ''); // حذف جداکننده
    raw = toEnglishNumber(raw);
  
    // فقط عدد صحیح و حداکثر 12 رقم
    if (!/^\d*$/.test(raw) || raw.length > 12) return;
  
    const enValue = parseNumber(raw);
    setToman(formatNumber(raw));
  
    if (!isNaN(enValue)) {
      const fee = (enValue * FEE_PERCENT) / 100;
      const amount = enValue - fee;
      const tetherAmount = amount / USDT_PRICE;
      setTether(formatNumber(tetherAmount.toFixed(4)));
    } else {
      setTether('');
    }
  };
  
  const handleTetherChange = (e) => {
    let raw = e.target.value.replace(/,/g, ''); 
    raw = toEnglishNumber(raw);
  
    // فقط عدد اعشاری با نهایت 6 رقم بعد از ممیز
    if (!/^\d*$/.test(raw) || raw.length > 7) return;
  
    const enValue = parseNumber(raw);
    setTether(formatNumber(raw)); // اینجا فرمت‌گذاری نمی‌کنیم تا اعشار خراب نشه
  
    if (!isNaN(enValue)) {
      const fee = (enValue * FEE_PERCENT) / 100;
      const amount = enValue - fee;
      const tomanAmount = amount * USDT_PRICE;
      setToman(formatNumber(Math.round(tomanAmount)));
    } else {
      setToman('');
    }
  };
  

  const handleSubmit = async () => {
    if (!token) {
      setSnackMessage('لطفاً ابتدا وارد شوید.');
      setSnackOpen(true);
      return;
    }

    const isBuy = !isReversed;
    const ba_toman = parseNumber(toman) || 0;
    const ba_tether = parseNumber(tether) || 0;


    // Validate inputs
    if (isBuy && ba_toman <= 0) {
      setSnackMessage('مقدار تومان نامعتبر است');
      setSnackOpen(true);
      return;
    }
    if (!isBuy && ba_tether <= 0) {
      setSnackMessage('مقدار تتر نامعتبر است');
      setSnackOpen(true);
      return;
    }

    // Check wallet balance
    if (isBuy && ba_toman > walletBalance.balance_toman) {
      setSnackMessage('موجودی تومان کافی نیست');
      setSnackOpen(true);
      return;
    }
    if (!isBuy && ba_tether > walletBalance.balance_tether) {
      setSnackMessage('موجودی تتر کافی نیست');
      setSnackOpen(true);
      return;
    }

    const data = {
      amount: isBuy ? ba_toman : ba_tether,
      currency: 'USDT',
      network: 'Ethereum',
      whatTOwhat: isBuy ? 0 : 1,
      ExchangeRate: USDT_PRICE,
      automatic: true
    };

    try {
      setLoading(true);
      const response = await axios.post(
        'https://amirrezaei2002x.shop/laravel/api/TomanToCoin',
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          timeout: 30000
        }
      );

      if (response.data.status) {
        await fetchWalletBalance(); // به‌روزرسانی موجودی ولت
        setSnackMessage(response.data.message || (isBuy ? 'خرید تتر با موفقیت انجام شد' : 'فروش تتر با موفقیت انجام شد'));
        setSnackOpen(true);
        setToman('');
        setTether('');
      } else {
        throw new Error(response.data.message || 'خطا در انجام عملیات');
      }
    } catch (error) {
      console.error('Error submitting order:', {
        message: error.message,
        code: error.code,
        response: error.response?.data,
        status: error.response?.status,
        isBuy: isBuy
      });
      const errorMessage = error.response?.data?.message || 
        (error.code === 'ECONNABORTED' ? 'اتصال به سرور برقرار نشد' : 
        (isBuy ? 'خطا در خرید تتر' : 'خطا در فروش تتر'));
      setSnackMessage(errorMessage);
      setSnackOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
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
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'center', alignItems: 'center', gap: 1 }}>
            <Box sx={{ flex: 1 }}>
              {isReversed ? (
                <TextField
                  name="tetherQ"
                  type="text"
                  inputMode="numeric"
                  label="تتر"
                  value={tether}
                  onChange={handleTetherChange}
                  placeholder="مقدار بین ۵ تا ۲۵,۰۰۰"
                  fullWidth
                  sx={{
                    '& .MuiInputLabel-root': labelSx,
                    '& .MuiInputLabel-shrink': { px: 0.75 }
                  }}
                />
              ) : (
                <TextField
                  name="tomanQ"
                  type="text"
                  inputMode="numeric"
                  label="تومان"
                  value={toman}
                  onChange={handleTomanChange}
                  placeholder="مقدار بین ۱۴۵,۰۰۰ تا ۲۵,۰۰۰,۰۰۰"
                  fullWidth
                  sx={{
                    '& .MuiInputLabel-root': labelSx,
                    '& .MuiInputLabel-shrink': { px: 0.75 }
                  }}
                />
              )}
            </Box>

            <Button
              onClick={handleSwap}
              variant="outlined"
              sx={{ fontSize: 10, p: 0, height: 'fit-content', mt: { xl: 1 } }}
            >
              <Icon icon="mdi:exchange" style={{ fontSize: '30px' }} />
            </Button>

            <Box sx={{ flex: 1 }}>
              {isReversed ? (
                <TextField
                  name="tomanQ"
                  type="text"
                  inputMode="numeric"
                  label="تومان"
                  value={toman}
                  onChange={handleTomanChange}
                  placeholder="مقدار بین ۱۴۵,۰۰۰ تا ۲۵,۰۰۰,۰۰۰"
                  fullWidth
                  sx={{
                    '& .MuiInputLabel-root': labelSx,
                    '& .MuiInputLabel-shrink': { px: 0.75 }
                  }}
                />
              ) : (
                <TextField
                  name="tetherQ"
                  type="text"
                  inputMode="numeric"
                  label="تتر"
                  value={tether}
                  onChange={handleTetherChange}
                  placeholder="مقدار بین ۵ تا ۲۵,۰۰۰"
                  fullWidth
                  sx={{
                    '& .MuiInputLabel-root': labelSx,
                    '& .MuiInputLabel-shrink': { px: 0.75 }
                  }}
                />
              )}
            </Box>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', my: 2, flexDirection: 'column', alignItems: 'center' }}>
            <Button
              fullWidth
              variant="contained"
              color={isReversed ? 'error' : 'success'}
              onClick={handleSubmit}
              disabled={!toman || !tether || loading}
            >
              {isReversed ? 'فروش تتر' : 'خرید تتر'}
            </Button>
          </Box>
        </>
      )}

      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => setSnackOpen(false)}
        message={snackMessage}
        action={
          <IconButton size="small" onClick={() => setSnackOpen(false)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Box>
  );
};

export default QuickBuyAndSell;