import React, { useEffect, useState } from 'react';
import { Box, Typography, Divider, Button, CircularProgress } from '@mui/material';
import DualProgress from '../components/DualProgress';
import useAuthStore from '../context/authStore'; // مسیر فایل useAuthStore.js

const AllPrice = () => {
  const { wallet, fetchWalletBalance } = useAuthStore(); // گرفتن wallet و fetchWalletBalance
  const [toman, setToman] = useState(0);
  const [tether, setTether] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const rate = 92000;
  const size = 150;

  useEffect(() => {
    const loadWallet = async () => {
      setLoading(true);
      setError(null);

      // اگر wallet خالیه، fetchWalletBalance رو فراخوانی کن
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

  const roundedTether = parseFloat(Number(tether).toFixed(3));
  const roundedToman = parseFloat(Number(toman).toFixed(2));

  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="h6" sx={{ fontWeight: '900' }}>
        ارزش کل دارایی شما
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box sx={{ mb: 2 }}>
          <Typography color="error">{error}</Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            mt: 0,
            justifyContent: { xs: 'center', md: 'space-between' },
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr auto',
              alignItems: 'center',
              gap: 1,
              flexGrow: 1,
            }}
          >
            <Typography fontSize={{xs: 15, md: 23}} noWrap>تومان</Typography>
            <Divider sx={{ borderStyle: 'dashed', borderColor: '#000', height: 2 }} />
            <Typography noWrap fontSize={{xs: 15, md: 23}} sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {roundedToman.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Typography>

            <Typography fontSize={{xs: 15, md: 23}} noWrap>تتر</Typography>
            <Divider sx={{ borderStyle: 'dashed', borderColor: '#000', height: 2 }} />
            <Typography fontSize={{xs: 15, md: 23}} noWrap sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {roundedTether.toLocaleString('en-US', {
                minimumFractionDigits: 1,
                maximumFractionDigits: 3,
              })}
            </Typography>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              width: 'fit-content',
              display: 'flex',
              p: 1,
              justifyContent: { xs: 'center', md: 'center', xl: 'flex-end' },
            }}
          >
            <DualProgress size={size} tether={roundedTether} toman={roundedToman} rate={rate} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default AllPrice;