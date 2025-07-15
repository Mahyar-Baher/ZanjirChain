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
import { AuthContext } from '../context/AuthContext'; // مسیر فایل AuthContext رو درست بنویس


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

const USDT_PRICE = 84000;
const FEE_PERCENT = 2;

const generateTrackingCode = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const milliseconds = now.getMilliseconds().toString().padStart(3, '0');
  const timePart = hours + minutes + seconds + milliseconds.slice(0, 2);
  let randomPart = '';
  for (let i = 0; i < 3; i++) {
    randomPart += Math.floor(Math.random() * 10);
  }
  return timePart + randomPart;
};

const toEnglishNumber = (str) => {
  return str.replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)));
};

const QuickBuyAndSell = () => {
  const [isReversed, setIsReversed] = useState(false);
  const { fetchUserFromToken } = useContext(AuthContext);
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
    const trackingCode = generateTrackingCode();
    const isBuy = !isReversed;

    const ba_toman = parseFloat(toEnglishNumber(toman)) || 0;
    const ba_tether = parseFloat(toEnglishNumber(tether)) || 0;

    const fee = isBuy
      ? (ba_toman * FEE_PERCENT) / 100
      : (ba_tether * FEE_PERCENT) / 100;

    const fp_tether = isBuy ? (ba_toman - fee) / USDT_PRICE : 0;
    const fp_toman = !isBuy ? (ba_tether - fee) * USDT_PRICE : 0;

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
      receipt_url: null,
      payment_method: 'internal_network',
      transaction_type: isBuy ? 4 : 5,
      bank_tracking_code: `conversion_${trackingCode}`,
      custom_tracking_code: trackingCode,
      fee: fee,
      is_paid: true,
      financial_status: 0,
      currency: isBuy ? 'toman' : 'tether',
      fp_tether: isBuy ? parseFloat(fp_tether.toFixed(4)) : 0,
      fp_toman: isBuy ? 0 : Math.round(fp_toman),
      ba_tether: ba_tether,
      ba_toman: ba_toman
    };

    try {
      await axios.post('https://amirrezaei2002x.shop/laravel/api/orders', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      await fetchUserFromToken();
      setSnackMessage(isBuy ? 'خرید تتر با موفقیت انجام شد' : 'فروش تتر با موفقیت انجام شد');
      setSnackOpen(true);
      setToman('');
      setTether('');
    } catch (error) {
      console.error('Error submitting order:', error);
      setSnackMessage('خطا در انجام عملیات');
      setSnackOpen(true);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: {xs:'column',md:'row'}, justifyContent: 'center', alignItems: 'center', gap: 1 }}>
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