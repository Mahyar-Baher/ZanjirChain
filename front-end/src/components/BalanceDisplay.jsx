/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';

const BalanceDisplay = ({ balanceToman, balanceTether }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: isMobile ? 'center' : 'space-between',
        alignItems: isMobile ? 'flex-start' : 'center',
        gap: isMobile ? 1 : 2,
        p: { xs: 1, sm: 2 },
      }}
    >
      <Typography
        variant={isMobile ? 'body2' : 'body1'}
        sx={{ fontSize: { xs: '0.85rem', sm: '1rem' } }}
      >
        موجودی تومانی: {isNaN(balanceToman) ? '۰' : balanceToman.toLocaleString('en-US')} تومان
      </Typography>
      <Typography
        variant={isMobile ? 'body2' : 'body1'}
        sx={{ fontSize: { xs: '0.85rem', sm: '1rem' } }}
      >
        موجودی تتری:{' '}
        {isNaN(balanceTether)
          ? '۰'
          : balanceTether.toLocaleString('en-US', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 6,
            })}{' '}
        تتر
      </Typography>
    </Box>
  );
};

export default BalanceDisplay;