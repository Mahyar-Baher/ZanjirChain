import { useState } from 'react';
import { Box, TextField, Button, Typography, Stack } from '@mui/material';

const labelSx = {
  color: '#fff',
  backgroundColor: '#7878FF',
  p: 0.55,
  borderRadius: '4px',
  '&.Mui-focused': { color: '#fff', backgroundColor: '#7878FF' }
};

const USDT_PRICE = 84000;
const FEE_PERCENT = 2;
const USER_USDT_BALANCE = 500;
const USER_TOMAN_BALANCE = 50000000;

const QuickBuyAndSell = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [toman, setToman] = useState('');
  const [tether, setTether] = useState('');
  const [message, setMessage] = useState('');

  const handleSwap = () => {
    setIsReversed(prev => !prev);
    setToman('');
    setTether('');
    setMessage('');
  };

  const handleTomanChange = e => {
    const v = e.target.value;
    setToman(v);
    const n = parseFloat(v);
    setTether(!isNaN(n) ? (n / (USDT_PRICE * (1 + FEE_PERCENT / 100))).toFixed(4) : '');
  };

  const handleTetherChange = e => {
    const v = e.target.value;
    setTether(v);
    const n = parseFloat(v);
    setToman(!isNaN(n) ? Math.round(n * USDT_PRICE * (1 + FEE_PERCENT / 100)).toString() : '');
  };

  const handleAction = () => {
    const ta = parseFloat(tether);
    const ma = parseFloat(toman);
    if (isReversed)
      setMessage(!isNaN(ta) && ta <= USER_USDT_BALANCE ? 'فروش با موفقیت انجام شد' : 'موجودی تتر کافی نیست');
    else
      setMessage(!isNaN(ma) && ma <= USER_TOMAN_BALANCE ? 'خرید با موفقیت انجام شد' : 'موجودی تومان کافی نیست');
  };
const tomanField = (
  <Box width="100%" textAlign="end" mt={isReversed ? 0 : 1} mb={isReversed ? 0 : 3}>
    <Typography variant="caption" color="text.secondary" sx={{ m: 2 }}>
      موجودی: {USER_TOMAN_BALANCE.toLocaleString()} تومان
    </Typography>
    <TextField
      name="tomanQ"
      type="number"
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
  </Box>
);

const tetherField = (
  <Box width="100%" textAlign="end" mt={isReversed ? 1 : 0} mb={isReversed ? 3 : 0}>
    <Typography variant="caption" color="text.secondary" sx={{ m: 2}}>
      موجودی: {USER_USDT_BALANCE.toLocaleString()} تتر
    </Typography>
    <TextField
      name="tetherQ"
      type="number"
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
        {!message && (
          <i
            className="ic ic-attention"
            style={{
              marginLeft: '8px',
              backgroundColor: 'rgba(0,0,0,0.6)',
              borderRadius: '50%',
            }}
          />
        )}
        <Typography
          variant={message ? 'body2' : 'caption'}
          textAlign="center"
          color="text.secondary"
        >
          {message || 'مقدار دقیق دریافتی با توجه به نرخ لحظه‌ای تتر محاسبه میشود'}
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
          onClick={handleAction}
          disabled={!toman || !tether}
        >
          {isReversed ? 'فروش تتر' : 'خرید تتر'}
        </Button>
      </Box>
    </Box>
  );
};

export default QuickBuyAndSell;
