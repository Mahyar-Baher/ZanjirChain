import React from 'react';
import { Box, Typography, Divider } from '@mui/material';

const TransactionSummary = ({ items }) => {
  return (
    <Box sx={{ mt: 2, p: 2, bgcolor: '#1a652a', borderRadius: 2, color: '#fff' }}>
      {items.map(([label, val, unit]) => (
        <Box
          key={label}
          sx={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr auto',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Typography>{label}</Typography>
          <Divider sx={{ borderStyle: 'dashed', borderColor: 'rgba(255,255,255,0.5)' }} />
          <Typography>{isNaN(val) ? '۰' : `${val.toLocaleString()} ${unit}`}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default TransactionSummary;