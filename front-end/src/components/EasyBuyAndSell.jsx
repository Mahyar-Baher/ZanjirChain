import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
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
  '&.Mui-focused': { color: '#fff', backgroundColor: '#1a652a' }
};

const USDT_PRICE = 31667;
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
  
    console.log('Request payload:', data); // Log payload for debugging
  
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
        (!isBuy ? 'خطا در فروش تتر' : 'خطا در خرید تتر');
      setSnackMessage(errorMessage);
      setSnackOpen(true);
    }
  };

  const tomanField = (
    <Box width="100%" textAlign="end" mt={isReversed ? 0 : 1} mb={isReversed ? 0 : 3}>
      <Typography variant="caption" color="text.secondary" sx={{ m: 2 }}>
        موجودی: {wallet.balance_toman.toLocaleString('en-US')} تومان
      </Typography>
      <TextField
        name="tomanQ"
        type="text"
        inputMode="numeric"
        label="تومان"
        value={toman}
        onChange={handleTomanChange}
        placeholder="مقدار بین 145,000 تا 25,000,000"
        fullWidth
        sx={{
          '& .MuiInputLabel-root': labelSx,
          '& .MuiInputLabel-shrink': { px: 0.75 }
        }}
      />
    </Box>
  );

  const tetherField = (
    <Box width="100%" textAlign="end" mt={isReversed ? 1 : 0} mb={isReversed ? 3 : 0}>
      <Typography variant="caption" color="text.secondary" sx={{ m: 2 }}>
        موجودی: {wallet.balance_tether.toLocaleString('en-US')} تتر
      </Typography>
      <TextField
        name="tetherQ"
        type="text"
        inputMode="numeric"
        label="تتر"
        value={tether}
        onChange={handleTetherChange}
        placeholder="مقدار بین 5 تا 25,000"
        fullWidth
        sx={{
          '& .MuiInputLabel-root': labelSx,
          '& .MuiInputLabel-shrink': { px: 0.75 }
        }}
      />
    </Box>
  );

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'column' },
          justifyContent: 'center',
          alignItems: 'center',
          p: 3,
          gap: 1
        }}
      >
        {isReversed ? tetherField : tomanField}

        <Button
          onClick={handleSwap}
          variant="outlined"
          sx={{
            fontSize: 10,
            p: 0,
            height: 'fit-content',
            mt: { xl: 1 },
            transform: 'rotate(90deg)'
          }}
        >
          <iconify-icon icon="mdi:exchange" style={{ fontSize: '30px' }} />
        </Button>

        {isReversed ? tomanField : tetherField}
      </Box>

      <Stack
        direction="row"
        spacing={0}
        alignItems="center"
        justifyContent="center"
        sx={{ width: '100%', mt: 1 }}
      >
        <Typography
          variant="caption"
          textAlign="center"
          color="text.secondary"
        >
          مقدار دقیق دریافتی با توجه به نرخ لحظه‌ای تتر محاسبه میشود
        </Typography>
      </Stack>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          my: 1.5,
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
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