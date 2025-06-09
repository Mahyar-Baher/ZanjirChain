import { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const labelSx = { color: '#fff', backgroundColor: '#7878FF', p: 0.55, borderRadius: '4px', '&.Mui-focused': { color: '#fff', backgroundColor: '#7878FF' } };
const USDT_PRICE = 84000;
const FEE_PERCENT = 2;
const USER_USDT_BALANCE = 500;
const USER_TOMAN_BALANCE = 50000000;

const QuickBuyAndSell = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [toman, setToman] = useState('');
  const [tether, setTether] = useState('');
  const [message, setMessage] = useState('');

  const handleSwap = () => { setIsReversed(prev => !prev); setToman(''); setTether(''); setMessage(''); };

  const handleTomanChange = e => { const v = e.target.value; setToman(v); const n = parseFloat(v); setTether(!isNaN(n) ? (n / (USDT_PRICE * (1 + FEE_PERCENT / 100))).toFixed(4) : ''); };

  const handleTetherChange = e => { const v = e.target.value; setTether(v); const n = parseFloat(v); setToman(!isNaN(n) ? Math.round(n * USDT_PRICE * (1 + FEE_PERCENT / 100)).toString() : ''); };

  const handleAction = () => { const ta = parseFloat(tether); const ma = parseFloat(toman); if (isReversed) setMessage(!isNaN(ta) && ta <= USER_USDT_BALANCE ? 'فروش با موفقیت انجام شد' : 'موجودی تتر کافی نیست'); else setMessage(!isNaN(ma) && ma <= USER_TOMAN_BALANCE ? 'خرید با موفقیت انجام شد' : 'موجودی تومان کافی نیست'); };

  const tomanField = <TextField name="tomanQ" type="number" label="تومان" value={toman} onChange={handleTomanChange} margin="normal" placeholder="مقدار بین ۱۴۵,۰۰۰ تا ۲۵,۰۰۰,۰۰۰" fullWidth sx={{ '& .MuiInputLabel-root': labelSx, '& .MuiInputLabel-shrink': { px: 0.75 } }} />;
  const tetherField = <TextField name="tetherQ" type="number" label="تتر" value={tether} onChange={handleTetherChange} margin="normal" placeholder="مقدار بین ۵ تا ۲۵,۰۰۰" fullWidth sx={{ '& .MuiInputLabel-root': labelSx, '& .MuiInputLabel-shrink': { px: 0.75 } }} />;

  return (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: {xs:'column',md:'row'}, justifyContent: 'center', alignItems: 'center', gap: 1 }}>
        {isReversed ? tetherField : tomanField}
        <Button onClick={handleSwap} variant="outlined" sx={{ fontSize: 10, p: 0, height: 'fit-content', mt: { xl: 1 } }}>
          <iconify-icon icon="mdi:exchange" style={{ fontSize: '30px' }} />
        </Button>
        {isReversed ? tomanField : tetherField}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 2, flexDirection: 'column', alignItems: 'center' }}>
        <Button fullWidth variant="contained" color={isReversed ? 'error' : 'success'} onClick={handleAction} disabled={!toman || !tether}>
          {isReversed ? 'فروش تتر' : 'خرید تتر'}
        </Button>
        {message && <Typography mt={1} color="text.secondary">{message}</Typography>}
      </Box>
    </Box>
  );
};

export default QuickBuyAndSell;
