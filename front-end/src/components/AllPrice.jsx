import React, { useEffect, useState } from 'react';
import { Box, Typography, Divider, Button } from '@mui/material';
import DualProgress from '../components/DualProgress';

const AllPrice = () => {
  const [toman, setToman] = useState(0);
  const [tether, setTether] = useState(0);
  const rate = 85000;
  const size = 170;

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
    <Box sx={{ p: 1 }}>
      <Typography variant='h6' sx={{ fontWeight: '900' }}>
        ارزش کل دارایی شما
      </Typography>

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
            minWidth: { xs: '100%', sm: 300, md: 220 },
            maxWidth: 400,
          }}
        >
          <Typography noWrap>تومان</Typography>
          <Divider sx={{ borderStyle: 'dashed', borderColor: '#000', height: 2 }} />
          <Typography noWrap sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {roundedToman.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Typography>

          <Typography noWrap>تتر</Typography>
          <Divider sx={{ borderStyle: 'dashed', borderColor: '#000', height: 2 }} />
          <Typography noWrap sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {roundedTether.toLocaleString('en-US', {
              minimumFractionDigits: 1,
              maximumFractionDigits: 3,
            })}
          </Typography>
        </Box>

        {/* دکمه خرید */}
        <Box
          sx={{
            flexGrow: 1,
            minWidth: { xs: '100%', sm: 250, md: '40%' },
            mr: { xs: 0, xl: 4 },
            textAlign: { xs: 'center', sm: 'center' },
          }}
        >
          <Typography textAlign='center' noWrap>
            کیف پول شما خالی است
          </Typography>
          <Button
            fullWidth
            variant='contained'
            sx={{ fontSize: 19, p: 0, height: 'fit-content', mt: 1 }}
          >
            خرید
          </Button>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            width: 'fit-content',
            display: 'flex',
            justifyContent: { xs: 'center', md: 'center', xl: 'flex-end' },
          }}
        >
          <DualProgress size={size} tether={roundedTether} toman={roundedToman} rate={rate} />
        </Box>
      </Box>
    </Box>
  );
};

export default AllPrice;
