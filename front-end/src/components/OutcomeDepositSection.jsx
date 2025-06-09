import React, { useState } from 'react';
import {
  Box,
  Stack,
  Button,
  Typography,
  Tabs,
  Tab,
  TextField,
  MenuItem,
  Divider,
  Snackbar,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/system';

const Item = styled(Box)(() => ({
  backgroundColor: '#f8f8ff',
  borderRadius: 16,
  boxShadow: '0px 2px 10px rgba(0,0,0,0.1)',
  height: '100%',
}));
// const tomanMethods   = ['کارت بانکی'];
const cryptoMethods  = ['انتقال داخلی', 'شبکه TRC20', 'شبکه BEP20', 'شبکه ERC20'];
const recentAmounts  = ['5,000,000', '10,000,000', '15,000,000', '20,000,000', '25,000,000'];
const feePercent     = 1;
const balances       = ['1,000,000'];
const MethodContent = ({ activeMethod, isCrypto }) => {
  const [amount, setAmount]   = useState('');
  const [snack, setSnack]     = useState(false);
  const parsed = parseInt(amount.replace(/,/g, ''), 10) || 0;
  const fee    = Math.round((parsed * feePercent) / 100);
  const net    = parsed - fee;

  const openSnack  = () => setSnack(true);
  const closeSnack = (_, r) => r !== 'clickaway' && setSnack(false);

  const tomanForms = [
    <Box key="card" component="form" noValidate autoComplete="off">
      <TextField fullWidth label="شماره شبا مقصد" margin="normal" />

      <TextField
        fullWidth
        label="مبلغ برداشت (تومان)"
        placeholder="بین ۲۰۰,۰۰۰ تا ۵۰۰,۰۰۰,۰۰۰ تومان"
        margin="normal"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <Typography sx={{ mt: 1 }}>مبالغ پیشنهادی</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
        {recentAmounts.map((v) => (
          <Button key={v} size="small" variant="outlined" onClick={() => setAmount(v)}>
            {v}
          </Button>
        ))}
      </Box>

      <Box
        sx={{
          mt: 2,
          p: 2,
          bgcolor: '#7878FF',
          borderRadius: 2,
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        {[['کارمزد', fee], ['خالص دریافتی', net], ['مبلغ وارد شده', parsed]].map(
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
              <Divider
                sx={{
                  borderStyle: 'dashed',
                  borderColor: 'rgba(255,255,255,0.5)',
                  height: 2,
                }}
              />
              <Typography>{isNaN(val) ? '۰' : val.toLocaleString()} تومان</Typography>
            </Box>
          )
        )}
      </Box>

      <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={openSnack}>
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
    </Box>,
  ];
  const cryptoForms = cryptoMethods.map((network) => (
    <Box key={network} component="form" noValidate autoComplete="off">
      <Typography mb={2}>
        شبکه انتخابی: <strong>{network}</strong>
      </Typography>

      <TextField fullWidth label="آدرس مقصد" margin="normal" />
      <TextField fullWidth label="مقدار برداشت" margin="normal" />

      <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={openSnack}>
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
  ));

  return <Box>{isCrypto ? cryptoForms[activeMethod] : tomanForms[0]}</Box>;
};
const WithdrawalSection = () => {
  const [tab, setTab]       = useState('toman');
  const [method, setMethod] = useState(0);

  const showTabs   = tab === 'crypto';
  const methodsArr = cryptoMethods;

  return (
    <Item sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Stack direction="row" spacing={0} sx={{ border: '1px solid #7878FF', borderRadius: 1,p: 0.4  }}>
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
              color: tab === key ? '#fff' : '#7878FF',
              backgroundColor: tab === key ? '#7878FF' : 'transparent',
            }}
          >
            {label}
          </Button>
        ))}
      </Stack>

      {balances.map((b, i) => (
        <Typography key={i}>موجودی: {b} تومان</Typography>
      ))}
      {showTabs && (
        <Tabs
            value={method}
            onChange={(_, v) => setMethod(v)}
            variant="scrollable"
            allowScrollButtonsMobile
            sx={{
                direction:{xs: 'ltr', sm:'rtl'},
                borderTop: '1px solid #eee',
                '& .MuiTabs-indicator': {
                backgroundColor: '#7878FF',
                top: 0,
                bottom: 'unset',
                },
                '& .MuiSelected': {
                color: '#7878FF !important',
                },
                '& .MuiTab-root': {
                fontSize: '12px',
                p: 0,
                },
                mb: 1,
            }}
            >
            {methodsArr.map((m) => (
                <Tab key={m} label={m} sx={{ fontSize: 12 }} />
            ))}
        </Tabs>

      )}
      <Box sx={{ border: '0px solid #ccc', borderRadius: 2, p: 2, minHeight: 300 }}>
        <MethodContent activeMethod={method} isCrypto={tab === 'crypto'} />
      </Box>
    </Item>
  );
};

export default WithdrawalSection;
