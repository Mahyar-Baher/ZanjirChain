import React, { useState } from 'react';
import {
  Grid,
  Box,
  Stack,
  Button,
  Typography,
  Tabs,
  Tab,
  TextField,
  MenuItem,
} from '@mui/material';
import { styled } from '@mui/system';

const Item = styled(Box)(() => ({
  backgroundColor: '#f8f8ff',
  borderRadius: '16px',
  boxShadow: '0px 2px 10px rgba(0,0,0,0.1)',
  height: '100%',
}));

const tomanMethods = ['درگاه پرداخت', 'کارت به کارت', 'واریز شناسه‌دار', 'واریز آفلاین'];
const cryptoMethods = ['انتقال داخلی', 'شبکه TRC20', 'شبکه BEP20', 'شبکه ERC20'];
const bankList = ['درگاه پرداخت بانک ملت', 'درگاه پرداخت بانک ملی', 'درگاه پرداخت بانک صادرات'];
const recentPays=[
  '10000'
]
const MethodContent = ({ activeMethod, isCrypto }) => {
  const tomanForms = [
    <Box component="form" noValidate autoComplete="off" key="gateway">
      <TextField fullWidth select label="درگاه مورد نظر رو انتخاب کنید" margin="normal">
        {bankList.map((bank) => (
          <MenuItem key={bank} value={bank}>
            {bank}
          </MenuItem>
        ))}
      </TextField>
      <TextField fullWidth label="مبلغ (تومان)" margin="normal" />
      <Typography>تراکنش های اخیر</Typography>
        {recentPays.map((recentPay)=>(
          <Typography>
            {recentPay} تومان
          </Typography>
        ))},
      <Button variant="contained" fullWidth sx={{ mt: 2 }}>
        پرداخت
      </Button>
    </Box>,
     <Box component="form" noValidate autoComplete="off" key="card">
      <TextField fullWidth select label="درگاه مورد نظر رو انتخاب کنید" margin="normal">
        {bankList.map((bank) => (
          <MenuItem key={bank} value={bank}>
            {bank}
          </MenuItem>
        ))}
      </TextField>
      <TextField fullWidth label="مبلغ (تومان)" margin="normal" />
      <Button variant="contained" fullWidth sx={{ mt: 2 }}>
        پرداخت
      </Button>
    </Box>,
    <Box component="form" noValidate autoComplete="off" key="id">
      <TextField fullWidth select label="درگاه مورد نظر رو انتخاب کنید" margin="normal">
        {bankList.map((bank) => (
          <MenuItem key={bank} value={bank}>
            {bank}
          </MenuItem>
        ))}
      </TextField>
      <TextField fullWidth label="مبلغ (تومان)" margin="normal" />
      <Button variant="contained" fullWidth sx={{ mt: 2 }}>
        پرداخت
      </Button>
    </Box>,
     <Box component="form" noValidate autoComplete="off" key="offline">
      <TextField fullWidth select label="درگاه مورد نظر رو انتخاب کنید" margin="normal">
        {bankList.map((bank) => (
          <MenuItem key={bank} value={bank}>
            {bank}
          </MenuItem>
        ))}
      </TextField>
      <TextField fullWidth label="مبلغ (تومان)" margin="normal" />
      <Button variant="contained" fullWidth sx={{ mt: 2 }}>
        پرداخت
      </Button>
    </Box>, 
  ];

  const cryptoForms = [
    <Box component="form" noValidate autoComplete="off" key="internal">
      <Typography mb={2}>
        آدرس انتقال داخلی: <strong>user123wallet</strong>
      </Typography>
      <TextField fullWidth label="مقدار رمز ارز" margin="normal" />
      <Button variant="contained" fullWidth sx={{ mt: 2 }}>
        اعلام واریز داخلی
      </Button>
    </Box>,

    <Box component="form" noValidate autoComplete="off" key="trc20">
      <Typography mb={2}>
        آدرس TRC20: <strong>TYx4...abc</strong>
      </Typography>
      <TextField fullWidth label="TXID تراکنش" margin="normal" />
      <TextField fullWidth label="مقدار واریز شده" margin="normal" />
      <Button variant="contained" fullWidth sx={{ mt: 2 }}>
        ثبت واریز TRC20
      </Button>
    </Box>,

    <Box component="form" noValidate autoComplete="off" key="bep20">
      <Typography mb={2}>
        آدرس BEP20: <strong>0xAbc...789</strong>
      </Typography>
      <TextField fullWidth label="TXID تراکنش" margin="normal" />
      <TextField fullWidth label="مقدار واریز شده" margin="normal" />
      <Button variant="contained" fullWidth sx={{ mt: 2 }}>
        ثبت واریز BEP20
      </Button>
    </Box>,

    <Box component="form" noValidate autoComplete="off" key="erc20">
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
      <Item
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          p: 3,
        }}
      >
        {/* Toggle Buttons */}
        <Stack direction="row" spacing={0} mt={3} sx={{ border: '1px #7878FF solid', p: 0.4 }}>
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
          
        {/* Form Section */}
        <Box sx={{ p: 2, pb: 0 }}>
        {/* Bottom Tabs */}
            <Tabs
              value={activeMethod}
              onChange={(e, newValue) => setActiveMethod(newValue)}
              variant="fullWidth"
              sx={{
                mt: 1,
                borderTop: '1px solid #eee',
                '& .MuiTabs-indicator': {
                  backgroundColor: '#7878FF',
                  top: 0,
                  bottom: 'unset',
                },
                '& .Mui-selected': {
                  color: '#7878FF !important',
                  p:0,
                },
                '& .MuiTab-root': {
                  fontSize: '12px',
                  p:0
                },
              }}
            >
              {methods.map((label, idx) => (
                <Tab key={idx} label={label} />
              ))}
            </Tabs>

          <Typography fontWeight="bold" mb={1}>
            {activeTab === 'toman' ? 'فرم واریز تومان' : 'فرم واریز رمز ارز'}
          </Typography>

          <Box
            sx={{
              width: '100%',
              p: 2,
              border: '1px solid #ccc',
              borderRadius: 2,
              position: 'relative',
              minHeight: 300,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'min-height 0.3s ease',
            }}
          >
            <MethodContent activeMethod={activeMethod} isCrypto={activeTab === 'crypto'} />

          </Box>
        </Box>
      </Item>
  );
};

export default IncomeDepositSection;
