import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Button,
  Typography,
  Grid,
  Paper,
  Stack,
} from '@mui/material';
import DualProgress from '../components/DualProgress';
import SidebarChildrenMenu from '../components/SidebarChildrenMenu';
import Switchprise from '../components/Switchprise';
import CryptoTable from '../components/CryptoTable';
import Navbarbox from '../components/navbarbox';
import navItems from '../data/navItems';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(3),
  borderRadius: 16,
  color: theme.palette.text.primary,
  boxShadow: theme.shadows[2],
}));

const Wallet = () => {
  const [toman, setToman] = useState(0);
  const [tether, setTether] = useState(0);
  const rate = 85000;
  const walletMenu = navItems.find(item => item.label === 'کیف پول');

  useEffect(() => {
    const walletStr = localStorage.getItem('wallet');
    if (walletStr) {
      try {
        const wallet = JSON.parse(walletStr);
        setToman(wallet.balance_toman ?? 0);
        setTether(wallet.balance_tether ?? 0);
      } catch {
        setToman(0);
        setTether(0);
      }
    }
  }, []);
  const roundedTether = parseFloat(Number(tether).toFixed(3));
  const roundedToman = parseFloat(Number(toman).toFixed(3));
  
  return (
    <Paper sx={{ minHeight: '100vh', bgcolor: (theme) => theme.palette.background.default }}>
      <Grid container spacing={0} sx={{ height: { xs: 'fit-content', md: 'fit-content' }, justifyContent: { xs: 'flex-end', md: 'flex-end' }, alignItems: { xs: 'flex-center', md: 'flex-start' } }}>
        <Grid item size="auto">
          <Navbarbox />
        </Grid>
        <Grid item size="grow" sx={{ p: 2, pt: 4 }}>
          <Grid container spacing={{ xs: 1, md: 1 }} sx={{ justifyContent: { xs: 'flex-end', md: 'flex-start' }, alignItems: { xs: 'flex-center', md: 'flex-start' } }} >
            <Grid item size={{ xs: 12, sm: 12, md: 3, lg: 2 }} sx={{ pr: { lg: 2 } }}>
              <SidebarChildrenMenu childrenItems={walletMenu?.children || []} />
            </Grid>
            <Grid item size={{ xs: 12, sm: 6, md: 9, lg: 4 }} sx={{ height: { xs: 'fit-content', md: 'fit-content', lg: '100%' } }}>
              <Item sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 0 }} className='bg-img-hexed'>
                <Box sx={{ p: 2, pb: 0 }}>
                  <Typography variant="h6" fontWeight={600} textAlign="right">
                    تومان
                  </Typography>
                  <Typography mt={1} textAlign="left">
                    {roundedToman.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })} تومان
                  </Typography>
                  <Typography variant="body2" mt={1} color="text.secondary" textAlign="left">
                    موجودی در دسترس: 0
                  </Typography>
                </Box>
                <Stack direction="row" spacing={0} mt={3}>
                  <Button fullWidth variant="contained" className="bg-btn-sky" sx={{ fontSize: 12, borderRadius: '0px 0px 10px 0px', p: { xs: 1, md: 2 } }}>
                    برداشت
                  </Button>
                  <Button fullWidth variant="contained" className="bg-btn-sky" sx={{ fontSize: 12, borderRadius: '0px 0px 0px 0px', p: { xs: 1, md: 2 } }}>
                    واریز
                  </Button>
                  <Button fullWidth variant="contained" className="bg-btn-sky" sx={{ fontSize: 12, borderRadius: '0px 0px 0px 0px', p: { xs: 1, md: 2 } }}>
                    تاریخچه
                  </Button>
                  <Button fullWidth variant="contained" className="bg-btn-sky" sx={{ fontSize: 12, borderRadius: '0px 0px 0px 10px', p: { xs: 1, md: 0 } }}>
                    تبدیل به تتر
                  </Button>
                </Stack>
              </Item>
            </Grid>
            <Grid item size={{ xs: 12, sm: 6, md: 12, lg: 4 }} sx={{ height: { xs: 'fit-content', md: 'fit-content', lg: '100%' } }}>
              <Item sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 0 }} className='bg-img-hexed'>
                <Box sx={{ p: 2, pb: 0 }} >
                  <Typography variant="h6" fontWeight={600} textAlign="right">
                    تتر
                  </Typography>
                  <Typography mt={1} textAlign="left">
                    {roundedTether.toLocaleString('en-US', {
                      minimumFractionDigits: 1,
                      maximumFractionDigits: 3,
                    })} تتر
                  </Typography>
                  <Typography variant="body2" mt={1} color="text.secondary" textAlign="left">
                    موجودی در دسترس: 0
                  </Typography>
                </Box>
                <Stack direction="row" spacing={0} mt={3}>
                  <Button fullWidth variant="contained" className="bg-btn-purple" sx={{ fontSize: 12, borderRadius: '0px 0px 10px 0px', p: { xs: 1, md: 2 } }}>
                    برداشت
                  </Button>
                  <Button fullWidth variant="contained" className="bg-btn-purple" sx={{ fontSize: 12, borderRadius: '0px 0px 0px 0px', p: { xs: 1, md: 2 } }}>
                    واریز
                  </Button>
                  <Button fullWidth variant="contained" className="bg-btn-purple" sx={{ fontSize: 12, borderRadius: '0px 0px 0px 0px', p: { xs: 1, md: 2 } }}>
                    تاریخچه
                  </Button>
                  <Button fullWidth variant="contained" className="bg-btn-purple" sx={{ fontSize: 12, borderRadius: '0px 0px 0px 10px', p: { xs: 1, md: 0 } }}>
                    تبدیل به تومان
                  </Button>
                </Stack>
              </Item>
            </Grid>
            <Grid item size={{ xs: 12, sm: 12, md: 12, lg: 2 }} sx={{ height: '100%', alignContent: 'end' }}>
              <Item sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 1 }}>
                <Typography fontWeight={600} fontSize={'12px'} textAlign="center" mb={1}>
                  ارزش دارایی‌های شما
                </Typography>
                <DualProgress tether={roundedTether} toman={roundedToman} rate={rate} />
              </Item>
            </Grid>
            <Grid item size={{ xs: 12, sm: 12, md: 12, lg: 12 }} sx={{ pl: 0, mt: 3 }}>
              <Item sx={{ height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', p: 1 }}>
                <Box sx={{ display: 'felx' }}>
                  <Typography fontWeight={600} textAlign="center" mb={1}>
                    دریافت پاداش خودکار هفتگی
                  </Typography>
                  <Typography variant="caption" sx={{ fontSize: '13px' }} color="text.secondary">
                    دریافت پاداش ۲۰٪ هفته شمار تومانی
                  </Typography>
                </Box>
                <Box>
                  <Switchprise />
                </Box>
              </Item>
            </Grid>
            <Grid item size={{ xs: 12, sm: 12, md: 12, lg: 12 }} sx={{ pl: 0, mt: 3 }}>
              <Item sx={{ height: '100%', backgroundColor: 'transparent', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', p: 1 }}>
                <CryptoTable />
              </Item>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Wallet;
