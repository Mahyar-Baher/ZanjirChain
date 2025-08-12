import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const labelSx = {
  color: '#fff',
  backgroundColor: '#1a652a',
  p: 0.55,
  borderRadius: '4px',
  '&.Mui-focused': {
    color: '#fff',
    backgroundColor: '#1a652a'
  }
};

const USDT_PRICE = 94000;
const FEE_PERCENT = 2;



const toEnglishNumber = (str) => {
  return str.replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)));
};

const QuickBuyAndSell = () => {
  const { fetchUserFromToken } = useContext(AuthContext);
  const [isReversed, setIsReversed] = useState(false);
  const [toman, setToman] = useState('');
  const [tether, setTether] = useState('');
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [wallet, setWallet] = useState({
    balance_toman: 0,
    balance_tether: 0
  });

  useEffect(() => {
    const walletData = JSON.parse(localStorage.getItem('wallet')) || {};
    setWallet({
      balance_toman: Number(walletData.balance_toman) || 0,
      balance_tether: Number(walletData.balance_tether) || 0
    });
  }, []);

  const handleSwap = () => {
    setIsReversed(prev => !prev);
    setToman('');
    setTether('');
  };

  const handleTomanChange = (e) => {
    const value = e.target.value;
    const enValue = parseFloat(toEnglishNumber(value));
    setToman(value);
    if (!isNaN(enValue)) {
      const fee = (enValue * FEE_PERCENT) / 100;
      const amount = enValue - fee;
      const tetherAmount = amount / USDT_PRICE;
      setTether(tetherAmount.toFixed(4));
    } else {
      setTether('');
    }
  };

  const handleTetherChange = (e) => {
    const value = e.target.value;
    const enValue = parseFloat(toEnglishNumber(value));
    setTether(value);
    if (!isNaN(enValue)) {
      const fee = (enValue * FEE_PERCENT) / 100;
      const amount = enValue - fee;
      const tomanAmount = amount * USDT_PRICE;
      setToman(Math.round(tomanAmount).toString());
    } else {
      setToman('');
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    const isBuy = !isReversed;

    const ba_toman = parseFloat(toEnglishNumber(toman)) || 0;
    const ba_tether = parseFloat(toEnglishNumber(tether)) || 0;

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
    if (isBuy && ba_toman > wallet.balance_toman) {
      setSnackMessage('موجودی تومان کافی نیست');
      setSnackOpen(true);
      return;
    }
    if (!isBuy && ba_tether > wallet.balance_tether) {
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
        await fetchUserFromToken();
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
    }
  };

  return (
    <Box>
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
          <iconify-icon icon="mdi:exchange" style={{ fontSize: '30px' }} />
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
          disabled={!toman || !tether}
        >
          {isReversed ? 'فروش تتر' : 'خرید تتر'}
        </Button>
      </Box>

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