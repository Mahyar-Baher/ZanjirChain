import React from 'react';
import { Box, Typography, Divider } from '@mui/material';

const PaymentSummary = ({ parsedAmount, fee, finalAmount }) => {
  return (
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
  );
};

export default PaymentSummary;