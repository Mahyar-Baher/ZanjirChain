import React from 'react';
import { Box, Typography } from '@mui/material';

const BalanceDisplay = ({ balanceToman, balanceTether }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography>موجودی تومانی: {balanceToman.toLocaleString()} تومان</Typography>
      <Typography>موجودی تتری: {balanceTether.toLocaleString()} تتر</Typography>
    </Box>
  );
};

export default BalanceDisplay;