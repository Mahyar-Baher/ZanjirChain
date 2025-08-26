import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Button, Typography, Grid, Paper, Stack, CircularProgress } from '@mui/material';
import DualProgress from '../components/DualProgress';
import SidebarChildrenMenu from '../components/SidebarChildrenMenu';
import Switchprise from '../components/Switchprise';
import CryptoTable from '../components/CryptoTable';
import Navbarbox from '../components/navbarbox';
import navItems from '../data/navItems';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuthStore from '../context/authStore'; // مسیر فایل useAuthStore.js

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(3),
  borderRadius: 16,
  color: theme.palette.text.primary,
  boxShadow: theme.shadows[2],
}));

const Wallet = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { wallet, fetchWalletBalance } = useAuthStore();
  const [toman, setToman] = useState(0);
  const [tether, setTether] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const rate = 85000;

  // پیدا کردن آیتم کیف پول از navItems
  const walletMenu = navItems.find(item => item.label === 'کیف پول');

  useEffect(() => {
    const loadWallet = async () => {
      setLoading(true);
      setError(null);

      if (!wallet) {
        try {
          await fetchWalletBalance();
        } catch (err) {
          console.error('خطا در فراخوانی fetchWalletBalance:', err);
          setLoading(false);
          return;
        }
      }

      if (wallet) {
        try {
          const tomanBalance = parseFloat(wallet.totalToman || 0);
          const tetherBalance = parseFloat(wallet.with_creadit_total_balance_formatted || 0);
          if (isNaN(tomanBalance) || isNaN(tetherBalance)) {
            throw new Error('مقادیر wallet نامعتبر هستند');
          }
          setToman(tomanBalance);
          setTether(tetherBalance);
        } catch (error) {
          console.error('خطا در پردازش داده‌های ولت:', error);
          setToman(0);
          setTether(0);
        }
      } else {
        setToman(0);
        setTether(0);
      }
      setLoading(false);
    };

    loadWallet();
  }, [wallet, fetchWalletBalance]);

  const roundedTether = parseFloat(Number(tether).toFixed(3));
  const roundedToman = parseFloat(Number(toman).toFixed(3));

  // تابع کمکی برای تعیین فعال بودن مسیر
  const isActivePath = (path) => location.pathname === path;

  return (
    <Paper sx={{ minHeight: '100vh', bgcolor: (theme) => theme.palette.background.default }}>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box sx={{ p: 2 }}>
          <Typography color="error">{error}</Typography>
        </Box>
      ) : (
        <Grid container spacing={0} sx={{ height: { xs: 'fit-content', md: 'fit-content' }, justifyContent: { xs: 'flex-end', md: 'flex-end' }, alignItems: { xs: 'flex-center', md: 'flex-start' } }}>
          <Grid item size="auto">
            <Navbarbox />
          </Grid>
          <Grid item size="grow" sx={{ p: 2, pt: 4 }}>
            <Grid container spacing={{ xs: 1, md: 1 }} sx={{ justifyContent: { xs: 'flex-end', md: 'flex-start' }, alignItems: { xs: 'flex-center', md: 'flex-start' } }}>
              <Grid item size={{ xs: 12, sm: 12, md: 12, lg: 2 }} sx={{ pr: { lg: 2 } }}>
                <SidebarChildrenMenu childrenItems={walletMenu?.children || []} />
              </Grid>

              {/* بخش تومان */}
              <Grid item size={{ xs: 12, sm: 6, md: 6, lg: 4 }} sx={{ height: { xs: 'fit-content', md: 'fit-content', lg: '100%' } }}>
                <Item sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 0 }} className='bg-img-hexed'>
                  <Box sx={{ p: 2, pb: 0 }}>
                    <Typography variant="h6" fontWeight={600} textAlign="right">
                      تومان
                    </Typography>
                    <Typography mt={1} textAlign="left">
                      {roundedToman.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} تومان
                    </Typography>
                    <Typography variant="body2" mt={1} color="text.secondary" textAlign="left">
                      موجودی در دسترس: {roundedToman.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </Typography>
                  </Box>

                  <Box display='flex' justifyContent='center' flexDirection={{xs:'column', md: 'row'}} borderRadius='0px 0px 20px 20px' mt={3}>
                    <Button
                      onClick={() => navigate('/outcome')}
                      fullWidth
                      variant="contained"
                      className="bg-btn-sky"
                      sx={{
                        fontSize: 12,
                        borderRadius:{ xs: '0px 0px 0px 0px', md:'0px 0px 10px 0px'},
                        p: { xs: 1, md: 1 },
                        minHeight: { xs: 36, md: 44 },
                        bgcolor: isActivePath('/outcome') ? '#015d02' : undefined,
                      }}
                    >
                      برداشت
                    </Button>
                    <Button
                      onClick={() => navigate('/income')}
                      fullWidth
                      variant="contained"
                      className="bg-btn-sky"
                      sx={{
                        fontSize: 12,
                        borderRadius: '0px 0px 0px 0px',
                        p: { xs: 1, md: 2 },
                        minHeight: { xs: 36, md: 44 },
                        bgcolor: isActivePath('/income') ? '#015d02' : undefined,
                      }}
                    >
                      واریز
                    </Button>
                    <Button
                      onClick={() => navigate('/history')}
                      fullWidth
                      variant="contained"
                      className="bg-btn-sky"
                      sx={{
                        fontSize: 12,
                        borderRadius: '0px 0px 0px 0px',
                        p: { xs: 1, md: 2 },
                        minHeight: { xs: 36, md: 44 },
                        bgcolor: isActivePath('/history') ? '#015d02' : undefined,
                      }}
                    >
                      تاریخچه
                    </Button>
                    <Button
                      onClick={() => navigate('/trade')}
                      fullWidth
                      variant="contained"
                      className="bg-btn-sky"
                      sx={{
                        fontSize: 12,
                        borderRadius:{ xs: '0px 0px 0px 0px', md:'0px 0px 0px 10px'},
                        p: { xs: 1, md: 1 },
                        minHeight: { xs: 36, md: 54 },
                        maxHeight: { xs: 50, md: 54 },
                        bgcolor: isActivePath('/trade') ? '#015d02' : undefined,
                      }}
                    >
                      تبدیل به تتر
                    </Button>
                  </Box>
                </Item>
              </Grid>

              {/* بخش تتر */}
              <Grid item size={{ xs: 12, sm: 6, md: 6, lg: 4 }} sx={{ height: { xs: 'fit-content', md: 'fit-content', lg: '100%' } }}>
                <Item sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 0, borderRadius:'0px 0px 20px 20px' }} className='bg-img-hexed'>
                  <Box sx={{ p: 2, pb: 0 }}>
                    <Typography variant="h6" fontWeight={600} textAlign="right">
                      تتر
                    </Typography>
                    <Typography mt={1} textAlign="left">
                      {roundedTether.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 3 })} تتر
                    </Typography>
                    <Typography variant="body2" mt={1} color="text.secondary" textAlign="left">
                      موجودی در دسترس: {roundedTether.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 3 })}
                    </Typography>
                  </Box>

                  <Box display='flex' justifyContent='center' flexDirection={{xs:'column', md: 'row'}} borderRadius='0px 0px 20px 20px' mt={3}>
                    <Button
                      onClick={() => navigate('/outcome')}
                      fullWidth
                      variant="contained"
                      className="bg-btn-purple"
                      sx={{
                        fontSize: 12,
                        borderRadius:{ xs: '0px 0px 0px 0px', md:'0px 0px 10px 0px'},
                        p: { xs: 1, md: 2 },
                        minHeight: { xs: 36, md: 44 },
                        bgcolor: isActivePath('/outcome') ? '#4b007d' : undefined,
                      }}
                    >
                      برداشت
                    </Button>
                    <Button
                      onClick={() => navigate('/income')}
                      fullWidth
                      variant="contained"
                      className="bg-btn-purple"
                      sx={{
                        fontSize: 12,
                        borderRadius: '0px 0px 0px 0px',
                        p: { xs: 1, md: 2 },
                        minHeight: { xs: 36, md: 44 },
                        bgcolor: isActivePath('/income') ? '#4b007d' : undefined,
                      }}
                    >
                      واریز
                    </Button>
                    <Button
                      onClick={() => navigate('/history')}
                      fullWidth
                      variant="contained"
                      className="bg-btn-purple"
                      sx={{
                        fontSize: 12,
                        borderRadius: '0px 0px 0px 0px',
                        p: { xs: 1, md: 2 },
                        minHeight: { xs: 36, md: 44 },
                        bgcolor: isActivePath('/history') ? '#4b007d' : undefined,
                      }}
                    >
                      تاریخچه
                    </Button>
                    <Button
                      onClick={() => navigate('/trade')}
                      fullWidth
                      variant="contained"
                      className="bg-btn-purple"
                      sx={{
                        fontSize: 12,
                        borderRadius:{ xs: '0px 0px 0px 0px', md:'0px 0px 0px 10px'},
                        p: { xs: 1, md: 1 },
                        minHeight: { xs: 36, md: 54 },
                        maxHeight: { xs: 50, md: 54 },
                        bgcolor: isActivePath('/trade') ? '#4b007d' : undefined,
                      }}
                    >
                      تبدیل به تومان
                    </Button>
                  </Box>
                </Item>
              </Grid>

              {/* ارزش دارایی‌ها */}
              <Grid item size={{ xs: 12, sm: 12, md: 12, lg: 2 }} sx={{ height: '100%', alignContent: 'end' }}>
                <Item sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 1 }}>
                  <Typography fontWeight={600} fontSize={'12px'} textAlign="center" mb={1}>
                    ارزش دارایی‌های شما
                  </Typography>
                  <DualProgress tether={roundedTether} toman={roundedToman} rate={rate} />
                </Item>
              </Grid>

              {/* بخش دریافت پاداش */}
              <Grid item size={{ xs: 12, sm: 12, md: 12, lg: 12 }} sx={{ pl: 0, mt: 3 }}>
                <Item sx={{ height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', p: 1 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography fontWeight={600} textAlign="center" mb={1}>
                      دریافت پاداش خودکار هفتگی
                    </Typography>
                    <Typography variant="caption" sx={{ fontSize: '13px' }} color="text.secondary">
                      دریافت پاداش ۲۰٪ هفته شمار تومانی
                    </Typography>
                  </Box>
                  <Switchprise />
                </Item>
              </Grid>

              {/* جدول کریپتو */}
              <Grid item size={{ xs: 12, sm: 12, md: 12, lg: 12 }} sx={{ pl: 0, mt: 3 }}>
                <Item sx={{ height: '100%', backgroundColor: 'transparent', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', p: 1 }}>
                  <CryptoTable />
                </Item>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Paper>
  );
};

export default Wallet;