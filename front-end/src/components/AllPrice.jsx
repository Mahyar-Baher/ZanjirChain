/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Box, Typography, Divider, useMediaQuery, useTheme, CircularProgress } from '@mui/material';
import DualProgress from '../components/DualProgress';
import useAuthStore from '../context/authStore';

const AllPrice = () => {
  const { wallet, fetchWalletBalance } = useAuthStore();
  const [toman, setToman] = useState(0);
  const [tether, setTether] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const rate = 100000;
  const size = 150;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const loadWallet = async () => {
      setLoading(true);
      setError(null);

      if (!wallet) {
        try {
          await fetchWalletBalance();
        } catch (err) {
          console.error('خطا در فراخوانی fetchWalletBalance:', err);
          setError('خطا در بارگذاری اطلاعات ولت.');
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
          setError('خطا در پردازش اطلاعات ولت.');
          setToman(0);
          setTether(0);
        }
      } else {
        setError('اطلاعات ولت یافت نشد.');
        setToman(0);
        setTether(0);
      }
      setLoading(false);
    };

    loadWallet();
  }, [wallet, fetchWalletBalance]);

  return (
    <Box sx={{ p: { xs: 0, sm: 2 }, direction: 'rtl', mx: 'auto' }}>
      <Typography
        variant={isMobile ? 'h6' : 'h5'}
        sx={{ fontWeight: '900', mb: 2, textAlign: 'right' }}
      >
        ارزش کل دارایی شما
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box sx={{ mb: 2, p: 2, bgcolor: 'error.light', borderRadius: 1 }}>
          <Typography color="error.main" sx={{ fontSize: { xs: '0.85rem', sm: '1rem' } }}>
            {error}
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 1, sm: 1 },
            mt: 0,
            justifyContent: 'space-between',
            alignItems: { xs: 'center', md: 'center' },
          }}
        >
          <Box
            sx={{
              minWidth: {xs:"100%",md:250},
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 1,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography sx={{ fontSize: { xs: '0.85rem', sm: '1rem' }, fontWeight: 'bold' }} noWrap>
                موجودی تومانی
              </Typography>
              <Divider sx={{ flexGrow: 1, borderStyle: 'dashed', borderColor: '#000', height: 2 }} />
              <Typography
                sx={{
                  fontSize: { xs: '0.85rem', sm: '1rem' },
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
                noWrap
              >
                {isNaN(toman) ? '۰' : toman.toLocaleString('en-US')} تومان
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography sx={{ fontSize: { xs: '0.85rem', sm: '1rem' }, fontWeight: 'bold' }} noWrap>
                موجودی تتری
              </Typography>
              <Divider sx={{ flexGrow: 1, borderStyle: 'dashed', borderColor: '#000', height: 2 }} />
              <Typography
                sx={{
                  fontSize: { xs: '0.85rem', sm: '1rem' },
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
                noWrap
              >
                {isNaN(tether)
                  ? '۰'
                  : tether.toLocaleString('en-US', {
                      minimumFractionDigits: 1,
                      maximumFractionDigits: 6,
                    })}{' '}
                تتر
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography sx={{ fontSize: { xs: '0.85rem', sm: '1rem' }, fontWeight: 'bold' }} noWrap>
                ارزش تتر به تومان
              </Typography>
              <Divider sx={{ flexGrow: 1, borderStyle: 'dashed', borderColor: '#000', height: 2 }} />
              <Typography
                sx={{
                  fontSize: { xs: '0.85rem', sm: '1rem' },
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
                noWrap
              >
                {isNaN(tether * rate)
                  ? '۰'
                  : (tether * rate).toLocaleString('en-US')} تومان
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              p: { xs: 0, sm: 1 },
            }}
          >
            <DualProgress size={isMobile ? 120 : size} tether={tether} toman={toman} rate={rate} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default AllPrice;