import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';

const Item = styled(Box)(() => ({
  backgroundColor: '#f8f8ff',
  borderRadius: '16px',
  boxShadow: '0px 2px 10px rgba(0,0,0,0.1)',
  height: '100%',
}));

const tomanMethods = ['درگاه پرداخت', 'واریز آفلاین'];
const cryptoMethods = ['انتقال داخلی', 'شبکه TRC20', 'شبکه BEP20', 'شبکه ERC20'];
const bankList = ['درگاه پرداخت بانک ملت', 'درگاه پرداخت بانک ملی', 'درگاه پرداخت بانک صادرات'];
const recentPays = ['100,000', '250,000', '500,000'];
const karmozdPercent = 1;

const MethodContent = ({ activeMethod, isCrypto }) => {
  const [amount, setAmount] = useState('');
  const [shebaList, setShebaList] = useState([]);
  const [offlineData, setOfflineData] = useState({
    selectedSheba: '',
    amount: '',
    trackingCode: '',
    description: '',
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    let shebas = user?.sheba_number;
    if (typeof shebas === 'string') shebas = [shebas];
    if (!Array.isArray(shebas)) shebas = [];
    setShebaList(shebas);
  }, []);

  const parsedAmount = parseInt(amount.replace(/,/g, ''), 10) || 0;
  const fee = Math.round((parsedAmount * karmozdPercent) / 100);
  const finalAmount = parsedAmount - fee;

  const handleOfflineSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    const data = {
      payment_method: 'sheba',
      transaction_type: 0,
      is_paid: false,
      currency: 'toman',
      need_check: 1,
      user_id: user?.id,
      bank_tracking_code: offlineData.trackingCode,
      ba_toman: offlineData.amount,
      sheba_number: offlineData.selectedSheba,
      description: offlineData.description,
    };

    try {
      await axios.post('https://your-api.com/api/deposit', data);

      let shebas = user?.sheba_number || [];
      if (typeof shebas === 'string') shebas = [shebas];
      if (!shebas.includes(offlineData.selectedSheba)) {
        const updatedShebas = [...shebas, offlineData.selectedSheba];
        const updatedUser = { ...user, sheba_number: updatedShebas };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }

      alert('واریز ثبت شد');
    } catch (err) {
      alert('خطا در ثبت واریز');
    }
  };

  const tomanForms = [
    <Box key="gateway" component="form" noValidate autoComplete="on">
      <TextField fullWidth select label="درگاه مورد نظر رو انتخاب کنید" margin="normal">
        {bankList.map((bank) => (
          <MenuItem key={bank} value={bank}>
            {bank}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        fullWidth
        label="مبلغ (تومان)"
        margin="normal"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <Typography sx={{ mt: 1 }}>تراکنش‌های اخیر</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', mt: 1 }}>
        {recentPays.map((recentPay) => (
          <Typography
            key={recentPay}
            sx={{ p: 1, m: 0.5, color: '#fff', borderRadius: 2, backgroundColor: '#1a652a', opacity: 0.7 }}
          >
            {recentPay} تومان
          </Typography>
        ))}
      </Box>
      <Box sx={{ mt: 2, p: 2, border: '1px solid #ccc', borderRadius: 2, display: 'flex', flexDirection: 'column', gap: 1, color: '#fff', backgroundColor: '#1a652a', opacity: 0.85 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'center', gap: 1, width: '100%' }}>
          <Typography noWrap>کارمزد درگاه پرداخت</Typography>
          <Divider sx={{ borderStyle: 'dashed', borderColor: 'rgba(255,255,255,0.5)', height: 2 }} />
          <Typography noWrap>{fee.toLocaleString()} تومان</Typography>
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'center', gap: 1, width: '100%' }}>
          <Typography noWrap>مبلغ واریزی به کیف پول</Typography>
          <Divider sx={{ borderStyle: 'dashed', borderColor: 'rgba(255,255,255,0.5)', height: 2 }} />
          <Typography noWrap>{finalAmount.toLocaleString()} تومان</Typography>
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'center', gap: 1, width: '100%' }}>
          <Typography noWrap>مبلغ وارد شده</Typography>
          <Divider sx={{ borderStyle: 'dashed', borderColor: 'rgba(255,255,255,0.5)', height: 2 }} />
          <Typography noWrap>{parsedAmount.toLocaleString()} تومان</Typography>
        </Box>
      </Box>
      <Button variant="contained" fullWidth sx={{ mt: 2 }}>پرداخت</Button>
    </Box>,

    <Box key="offline" component="form" noValidate autoComplete="off" onSubmit={handleOfflineSubmit}>
      {shebaList.length > 0 ? (
        <TextField
          fullWidth
          select
          label="انتخاب شماره شبا"
          margin="normal"
          value={offlineData.selectedSheba}
          onChange={(e) => setOfflineData({ ...offlineData, selectedSheba: e.target.value })}
        >
          {shebaList.map((sheba, i) => (
            <MenuItem key={i} value={sheba}>
              {sheba}
            </MenuItem>
          ))}
        </TextField>
      ) : (
        <>
          <Typography sx={{ mt: 2, fontSize: 12, color: 'gray' }}>
            هیچ شماره شبایی ثبت نشده. لطفاً یک شماره شبا وارد کنید:
          </Typography>
          <TextField
            fullWidth
            label="شماره شبا"
            margin="normal"
            value={offlineData.selectedSheba}
            onChange={(e) => setOfflineData({ ...offlineData, selectedSheba: e.target.value })}
            placeholder="مثلاً 123456789012345678901234"
          />
        </>
      )}

      <TextField
        fullWidth
        label="مبلغ (تومان)"
        type="number"
        margin="normal"
        value={offlineData.amount}
        onChange={(e) => setOfflineData({ ...offlineData, amount: e.target.value })}
      />
      <TextField
        fullWidth
        label="شناسه واریز / شماره پیگیری"
        margin="normal"
        value={offlineData.trackingCode}
        onChange={(e) => setOfflineData({ ...offlineData, trackingCode: e.target.value })}
      />
      <TextField
        fullWidth
        label="توضیحات تکمیلی (اختیاری)"
        multiline
        rows={3}
        margin="normal"
        value={offlineData.description}
        onChange={(e) => setOfflineData({ ...offlineData, description: e.target.value })}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        ثبت پرداخت آفلاین
      </Button>
    </Box>
  ];

  const cryptoForms = [
    <Box key="internal" component="form" noValidate autoComplete="off">
      <Typography mb={2}>
        آدرس انتقال داخلی: <strong>user123wallet</strong>
      </Typography>
      <TextField fullWidth label="مقدار رمز ارز" margin="normal" />
      <Button variant="contained" fullWidth sx={{ mt: 2 }}>
        اعلام واریز داخلی
      </Button>
    </Box>,
    <Box key="trc20" component="form" noValidate autoComplete="off">
      <Typography mb={2}>
        آدرس TRC20: <strong>TYx4...abc</strong>
      </Typography>
      <TextField fullWidth label="TXID تراکنش" margin="normal" />
      <TextField fullWidth label="مقدار واریز شده" margin="normal" />
      <Button variant="contained" fullWidth sx={{ mt: 2 }}>
        ثبت واریز TRC20
      </Button>
    </Box>,
    <Box key="bep20" component="form" noValidate autoComplete="off">
      <Typography mb={2}>
        آدرس BEP20: <strong>0xAbc...789</strong>
      </Typography>
      <TextField fullWidth label="TXID تراکنش" margin="normal" />
      <TextField fullWidth label="مقدار واریز شده" margin="normal" />
      <Button variant="contained" fullWidth sx={{ mt: 2 }}>
        ثبت واریز BEP20
      </Button>
    </Box>,
    <Box key="erc20" component="form" noValidate autoComplete="off">
      <Typography mb={2}>
        آدرس ERC20: <strong>0xDef...123</strong>
      </Typography>
      <TextField fullWidth label="TXID تراکنش" margin="normal" />
      <TextField fullWidth label="مقدار واریز شده" margin="normal" />
      <Button variant="contained" fullWidth sx={{ mt: 2 }}>
        ثبت واریز ERC20
      </Button>
    </Box>,
  ];

  return <Box>{isCrypto ? cryptoForms[activeMethod] : tomanForms[activeMethod]}</Box>;
};

const IncomeDepositSection = () => {
  const [activeTab, setActiveTab] = useState('toman');
  const [activeMethod, setActiveMethod] = useState(0);
  const methods = activeTab === 'toman' ? tomanMethods : cryptoMethods;

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 3 }}>
      <Stack direction="row" spacing={0} mt={3} sx={{ border: '1px solid #1a652a', p: 0.4 }}>
        <Button
          fullWidth
          variant={activeTab === 'toman' ? 'contained' : 'text'}
          sx={{ fontSize: 12, ml: 0.5, color: activeTab === 'toman' ? '#fff' : '#1a652a', backgroundColor: activeTab === 'toman' ? '#1a652a' : 'transparent' }}
          onClick={() => { setActiveTab('toman'); setActiveMethod(0); }}
        >
          واریز تومان
        </Button>
        <Button
          fullWidth
          variant={activeTab === 'crypto' ? 'contained' : 'text'}
          sx={{ fontSize: 12, mr: 0.5, color: activeTab === 'crypto' ? '#fff' : '#1a652a', backgroundColor: activeTab === 'crypto' ? '#1a652a' : 'transparent' }}
          onClick={() => { setActiveTab('crypto'); setActiveMethod(0); }}
        >
          واریز رمز ارز
        </Button>
      </Stack>
      <Box sx={{ p: 2, pb: 0 }}>
        <Tabs
          value={activeMethod}
          onChange={(_, newValue) => setActiveMethod(newValue)}
          variant="fullWidth"
          sx={{
            direction: 'rtl',
            mt: 1,
            borderTop: '1px solid #eee',
            '& .MuiTabs-indicator': { backgroundColor: '#1a652a', top: 0, bottom: 'unset' },
            '& .MuiSelected': { color: '#1a652a !important' },
            '& .MuiTab-root': { fontSize: 12, p: 0 },
            mb: 1,
          }}
        >
          {methods.map((label, idx) => (
            <Tab key={idx} label={label} sx={{ fontSize: 12 }} />
          ))}
        </Tabs>
        <Box sx={{ width: '100%', p: 2, border: '0px solid #ccc', borderRadius: 2, minHeight: 300, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <MethodContent activeMethod={activeMethod} isCrypto={activeTab === 'crypto'} />
        </Box>
      </Box>
    </Box>
  );
};

export default IncomeDepositSection;
