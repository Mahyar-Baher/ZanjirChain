import React, { useState, useEffect } from 'react';
import {
  Box,
  Stack,
  Button,
  Typography,
  Tabs,
  Tab,
  TextField,
  Divider,
  Snackbar,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/system';
import axios from 'axios';

const Item = styled(Box)(() => ({
  backgroundColor: '#f8f8ff',
  borderRadius: 16,
  boxShadow: '0px 2px 10px rgba(0,0,0,0.1)',
  height: '100%',
}));
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

const cryptoMethods = ['انتقال داخلی', 'شبکه TRC20', 'شبکه BEP20', 'شبکه ERC20'];
const methodKeys = ['internal_network', 'trc20', 'bep20', 'erc20'];
const recentAmounts = ['5,000,000', '10,000,000', '15,000,000', '20,000,000', '25,000,000'];
const feePercent = 1;

const MethodContent = ({ activeMethod, isCrypto, balanceToman, balanceTether }) => {
  const [amount, setAmount] = useState('');
  const [cryptoAddress, setCryptoAddress] = useState('');
  const [cryptoAmount, setCryptoAmount] = useState('');
  const [snack, setSnack] = useState(false);
  const [sheba, setSheba] = useState('');
  const [shabaList, setShabaList] = useState([]);

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

  const parsedTether = parseFloat(cryptoAmount) || 0;
  const feeTether = +(parsedTether * (feePercent / 100)).toFixed(2);
  const netTether = +(parsedTether - feeTether).toFixed(2);

  const isInsufficient = !isCrypto && parsedToman > balanceToman;

  const openSnack = () => setSnack(true);
  const closeSnack = (_, reason) => reason !== 'clickaway' && setSnack(false);

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');

    if (isCrypto) {
      if (!cryptoAddress || cryptoAddress.length > 11) {
        alert('آدرس مقصد معتبر نیست یا بیش از ۱۱ کاراکتر است.');
        return;
      }
      if (parsedTether <= 0) {
        alert('مقدار برداشت باید بزرگتر از صفر باشد.');
        return;
      }
      if (parsedTether > balanceTether) {
        alert('موجودی تتر کافی نیست.');
        return;
      }
    } else {
      if (!sheba || sheba.length > 100) {
        alert('شماره شبا معتبر نیست یا بیش از ۱۰۰ کاراکتر است.');
        return;
      }
      if (parsedToman < 200000 || parsedToman > 500000000) {
        alert('مبلغ برداشت باید بین ۲۰۰,۰۰۰ تا ۵۰۰,۰۰۰,۰۰۰ تومان باشد.');
        return;
      }
      if (parsedToman > balanceToman) {
        alert('موجودی تومان کافی نیست.');
        return;
      }
    }

    const data = isCrypto
      ? {
          receipt_url: null,
          payment_method: methodKeys[activeMethod],
          transaction_type: 3,
          bank_tracking_code: cryptoAddress,
          custom_tracking_code: generateTrackingCode(),
          fee: feeTether,
          is_paid: true,
          financial_status: 0,
          currency: 'tether',
          fp_tether: netTether,
          fp_toman: 0,
          ba_tether: parsedTether,
          ba_toman: 0,
        }
      : {
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
      openSnack();
      setAmount('');
      setCryptoAddress('');
      setCryptoAmount('');
      setSheba(shabaList.length > 0 ? shabaList[0] : '');
    } catch (err) {
      console.error('❌ Submit Error:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'خطا در ثبت درخواست');
    }
  };

  const tomanForm = (
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
      <Typography sx={{ mt: 1 }}>مبالغ پیشنهادی</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
        {recentAmounts.map((v) => (
          <Button key={v} size="small" variant="outlined" onClick={() => setAmount(v)}>
            {v}
          </Button>
        ))}
      </Box>
      <Box sx={{ mt: 2, p: 2, bgcolor: '#1a652a', borderRadius: 2, color: '#fff' }}>
        {[['کارمزد', feeToman], ['خالص دریافتی', netToman], ['مبلغ وارد شده', parsedToman]].map(
          ([label, val]) => (
            <Box
              key={label}
              sx={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Typography>{label}</Typography>
              <Divider sx={{ borderStyle: 'dashed', borderColor: 'rgba(255,255,255,0.5)' }} />
              <Typography>{isNaN(val) ? '۰' : val.toLocaleString()} تومان</Typography>
            </Box>
          )
        )}
      </Box>
      <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleSubmit} disabled={isInsufficient || shabaList.length === 0}>
        ثبت درخواست برداشت
      </Button>
      <Snackbar
        open={snack}
        autoHideDuration={3000}
        onClose={closeSnack}
        message="درخواست ثبت شد"
        action={
          <IconButton size="small" onClick={closeSnack}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Box>
  );

  const cryptoForm = (
    <Box component="form" noValidate autoComplete="off">
      <Typography mb={2}>
        شبکه انتخابی: <strong>{cryptoMethods[activeMethod]}</strong>
      </Typography>
      <TextField
        fullWidth
        label="آدرس مقصد"
        margin="normal"
        value={cryptoAddress}
        onChange={(e) => setCryptoAddress(e.target.value)}
      />
      <TextField
        fullWidth
        label="مقدار برداشت (USDT)"
        margin="normal"
        value={cryptoAmount}
        onChange={(e) => setCryptoAmount(e.target.value)}
      />
      <Box sx={{ mt: 2, p: 2, bgcolor: '#1a652a', borderRadius: 2, color: '#fff' }}>
        {[['کارمزد', feeTether], ['خالص دریافتی', netTether], ['مقدار وارد شده', parsedTether]].map(
          ([label, val]) => (
            <Box
              key={label}
              sx={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Typography>{label}</Typography>
              <Divider sx={{ borderStyle: 'dashed', borderColor: 'rgba(255,255,255,0.5)' }} />
              <Typography>{isNaN(val) ? '۰' : `${val} USDT`}</Typography>
            </Box>
          )
        )}
      </Box>
      <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>
        ثبت برداشت
      </Button>
      <Snackbar
        open={snack}
        autoHideDuration={3000}
        onClose={closeSnack}
        message="درخواست ثبت شد"
        action={
          <IconButton size="small" onClick={closeSnack}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Box>
  );

  return <Box>{isCrypto ? cryptoForm : tomanForm}</Box>;
};

const WithdrawalSection = () => {
  const [tab, setTab] = useState('toman');
  const [method, setMethod] = useState(0);

  const walletData = JSON.parse(localStorage.getItem('wallet')) || {};
  const balanceToman = Number(walletData?.balance_toman || 0);
  const balanceTether = Number(walletData?.balance_tether || 0);

  const showTabs = tab === 'crypto';

  return (
    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Stack direction="row" spacing={0} sx={{ border: '1px solid #1a652a', borderRadius: 1, p: 0.4 }}>
        {[
          { key: 'toman', label: 'برداشت تومان' },
          { key: 'crypto', label: 'برداشت رمزارز' },
        ].map(({ key, label }) => (
          <Button
            key={key}
            fullWidth
            variant={tab === key ? 'contained' : 'text'}
            onClick={() => {
              setTab(key);
              setMethod(0);
            }}
            sx={{
              fontSize: 12,
              color: tab === key ? '#fff' : '#1a652a',
              backgroundColor: tab === key ? '#1a652a' : 'transparent',
            }}
          >
            {label}
          </Button>
        ))}
      </Stack>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography>موجودی تومانی: {balanceToman.toLocaleString()} تومان</Typography>
        <Typography>موجودی تتری: {balanceTether.toLocaleString()} تتر</Typography>
      </Box>
      {showTabs && (
        <Tabs
          value={method}
          onChange={(_, v) => setMethod(v)}
          variant="scrollable"
          allowScrollButtonsMobile
          sx={{
            direction: { xs: 'ltr', sm: 'rtl' },
            borderTop: '1px solid #eee',
            '& .MuiTabs-indicator': {
              backgroundColor: '#1a652a',
              top: 0,
              bottom: 'unset',
            },
            '& .Mui-selected': {
              color: '#1a652a !important',
            },
            '& .MuiTab-root': {
              fontSize: '12px',
              p: 0,
            },
            mb: 1,
          }}
        >
          {cryptoMethods.map((m) => (
            <Tab key={m} label={m} sx={{ fontSize: 12 }} />
          ))}
        </Tabs>
      )}
      <Box sx={{ border: '0px solid #ccc', borderRadius: 2, p: 2, minHeight: 300 }}>
        <MethodContent
          activeMethod={method}
          isCrypto={tab === 'crypto'}
          balanceToman={balanceToman}
          balanceTether={balanceTether}
        />
      </Box>
    </Box>
  );
};

export default WithdrawalSection;
