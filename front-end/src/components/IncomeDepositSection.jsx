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
  borderRadius: '16px',
  boxShadow: '0px 2px 10px rgba(0,0,0,0.1)',
  height: '100%',
}));

const tomanMethods  = ['درگاه پرداخت', 'کارت به کارت', 'واریز شناسه‌دار', 'واریز آفلاین'];
const cryptoMethods = ['انتقال داخلی', 'شبکه TRC20', 'شبکه BEP20', 'شبکه ERC20'];
const bankList      = ['درگاه پرداخت بانک ملت', 'درگاه پرداخت بانک ملی', 'درگاه پرداخت بانک صادرات'];
const recentPays    = ['100,000', '250,000', '500,000'];
const karmozdPercent = 1;
const MethodContent = ({ activeMethod, isCrypto }) => {
  const [amount, setAmount] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const rawCardNumber = '6280231330282061';
  const handleCopyCard = () => {
    navigator.clipboard.writeText(rawCardNumber).then(() => setOpenSnackbar(true));
  };
  const handleCloseSnackbar = (_, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };
  const parsedAmount = parseInt(amount.replace(/,/g, ''), 10) || 0;
  const fee          = Math.round((parsedAmount * karmozdPercent) / 100);
  const finalAmount  = parsedAmount - fee;
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          mt: 1,
        }}
      >
        {recentPays.map((recentPay) => (
          <Typography
            key={recentPay}
            sx={{
              p: 1,
              m: 0.5,
              color: '#fff',
              borderRadius: 2,
              backgroundColor: '#7878FF',
              opacity: 0.7,
            }}
          >
            {recentPay} تومان
          </Typography>
        ))}
      </Box>
      <Box sx={{mt: 2,p: 2,border: '1px solid #ccc',borderRadius: 2,display: 'flex',flexDirection: 'column',gap: 1,color: '#fff',backgroundColor: '#7878FF',opacity: 0.85,}}>
        <Box sx={{display: 'grid',gridTemplateColumns: 'auto 1fr auto',alignItems: 'center',gap: 1,width: '100%',}}>
          <Typography noWrap>کارمزد درگاه پرداخت</Typography>
          <Divider  sx={{    borderStyle: 'dashed',   borderColor: 'rgba(255,255,255,0.5)',   height: 2 }}/>
          <Typography noWrap>{fee.toLocaleString()} تومان</Typography>
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr auto',
            alignItems: 'center',
            gap: 1,
            width: '100%',
          }}
        >
          <Typography noWrap>مبلغ واریزی به کیف پول</Typography>
          <Divider  sx={{    borderStyle: 'dashed',   borderColor: 'rgba(255,255,255,0.5)',   height: 2 }}/>
          <Typography noWrap>{finalAmount.toLocaleString()} تومان</Typography>
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr auto',
            alignItems: 'center',
            gap: 1,
            width: '100%',
          }}
        >
          <Typography noWrap>مبلغ وارد شده</Typography>
          <Divider  sx={{    borderStyle: 'dashed',   borderColor: 'rgba(255,255,255,0.5)',   height: 2 }}/>
          <Typography noWrap>{parsedAmount.toLocaleString()} تومان</Typography>
        </Box>
      </Box>

      <Button variant="contained" fullWidth sx={{ mt: 2 }}>
        پرداخت
      </Button>
    </Box>,
    <Box key="card" component="form" noValidate autoComplete="off">
      <Typography variant="body1" sx={{ lineHeight: 2 }}>
        لطفاً مبلغ مورد نظر را به شماره کارت زیر واریز نمایید:
      </Typography>

      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          my: 2,
          border: '1px solid #d0d0ff',
        }}
      >
        <Typography variant="subtitle1" fontWeight="bold">
          شماره کارت:
        </Typography>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ cursor: 'pointer', userSelect: 'none' }}
          onClick={handleCopyCard}
        >
          6280-2313-3028-2061
        </Typography>

        <Typography variant="subtitle1" mt={1}>
          به نام: <strong>مهیار باهر</strong>
        </Typography>
      </Box>

      <Typography variant="body2" sx={{ lineHeight: 2 }}>
        پس از انجام واریز، لطفاً تصویر رسید را از طریق پیام‌رسان <strong>واتساپ</strong> به شماره زیر
        ارسال نمایید:
      </Typography>

      <Typography variant="h6" color="primary" fontWeight="bold" sx={{ mt: 1 }}>
        09332414105
      </Typography>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="شماره کارت کپی شد ✅"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbar}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Box>,
    <Box key="id" component="form" noValidate autoComplete="off">
      <TextField
        name="gateway"
        fullWidth
        select
        label="درگاه بانکی مورد نظر را انتخاب کنید"
        margin="normal"
        defaultValue=""
      >
        {bankList.map((bank, index) => (
          <MenuItem key={`bank-${index}`} value={bank}>
            {bank}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        name="amount"
        fullWidth
        type="number"
        label="مبلغ (تومان)"
        margin="normal"
      />
      <TextField
        name="deposit_id"
        fullWidth
        label="شناسه واریز"
        margin="normal"
        inputProps={{ maxLength: 15 }}
      />
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        تأیید واریز
      </Button>
    </Box>,
    <Box key="offline" component="form" noValidate autoComplete="off">
      <TextField
        fullWidth
        select
        name="offlineMethod"
        label="روش پرداخت آفلاین"
        margin="normal"
      >
        <MenuItem value="shaba">واریز به شماره شبا</MenuItem>
        <MenuItem value="account">واریز به شماره حساب</MenuItem>
        <MenuItem value="atm">پرداخت از طریق عابربانک</MenuItem>
      </TextField>

      <TextField
        fullWidth
        name="amount"
        label="مبلغ (تومان)"
        type="number"
        margin="normal"
      />

      <TextField
        fullWidth
        name="trackingCode"
        label="شناسه واریز / شماره پیگیری"
        margin="normal"
      />

      <TextField
        fullWidth
        name="description"
        label="توضیحات تکمیلی (اختیاری)"
        multiline
        rows={3}
        margin="normal"
      />

      <Button variant="contained" component="label" fullWidth sx={{ mt: 2 }}>
        آپلود تصویر فیش واریزی
        <input type="file" hidden name="receipt" accept="image/*" />
      </Button>

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
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        p: 3,
      }}
    >
      <Stack direction="row" spacing={0} mt={3} sx={{ border: '1px solid #7878FF', p: 0.4 }}>
        <Button
          fullWidth
          variant={activeTab === 'toman' ? 'contained' : 'text'}
          sx={{
            fontSize: 12,
            ml: 0.5,
            color: activeTab === 'toman' ? '#fff' : '#7878FF',
            backgroundColor: activeTab === 'toman' ? '#7878FF' : 'transparent',
          }}
          onClick={() => {
            setActiveTab('toman');
            setActiveMethod(0);
          }}
        >
          واریز تومان
        </Button>
        <Button
          fullWidth
          variant={activeTab === 'crypto' ? 'contained' : 'text'}
          sx={{
            fontSize: 12,
            mr: 0.5,
            color: activeTab === 'crypto' ? '#fff' : '#7878FF',
            backgroundColor: activeTab === 'crypto' ? '#7878FF' : 'transparent',
          }}
          onClick={() => {
            setActiveTab('crypto');
            setActiveMethod(0);
          }}
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
            '& .MuiTabs-indicator': {
              backgroundColor: '#7878FF',
              top: 0,
              bottom: 'unset',
            },
            '& .MuiSelected': {
              color: '#7878FF !important',
            },
            '& .MuiTab-root': {
              fontSize: 12,
              p: 0,
            },
            mb: 1,
          }}
        >
          {methods.map((label, idx) => (
            <Tab key={idx} label={label} sx={{ fontSize: 12 }} />
          ))}
        </Tabs>


        <Typography fontWeight="bold" mb={1}>
          {activeTab === 'toman' ? '' : ''}
        </Typography>
        <Box
          sx={{
            width: '100%',
            p: 2,
            border: '0px solid #ccc',
            borderRadius: 2,
            minHeight: 300,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <MethodContent activeMethod={activeMethod} isCrypto={activeTab === 'crypto'} />
        </Box>
      </Box>
    </Box>
  );
};

export default IncomeDepositSection;
