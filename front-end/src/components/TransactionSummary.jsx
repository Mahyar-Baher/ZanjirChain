/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, Typography, Divider, useMediaQuery, useTheme } from '@mui/material';

const TransactionSummary = ({ items }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        mt: 2,
        p: { xs: 1, sm: 2 },
        bgcolor: '#1a652a',
        borderRadius: 2,
        color: '#fff',
      }}
    >
      {items.map(([label, val, unit], index) => (
        <Box
          key={label}
          sx={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'auto 1fr auto',
            alignItems: 'center',
            gap: isMobile ? 0.5 : 1,
            py: 0.5,
            px: 1,
            ...(isMobile && { textAlign: 'center' }),
            ...(isMobile && { flexDirection: 'column', alignItems: 'flex-end' }),
          }}
        >
          <Typography
            variant={isMobile ? 'body2' : 'body1'}
            sx={{ fontWeight: 'bold', fontSize: { xs: '0.85rem', sm: '1rem' } }}
          >
            {label}
          </Typography>
          {!isMobile && (
            <Divider sx={{ borderStyle: 'dashed', borderColor: 'rgba(255,255,255,0.5)', mx: 1 }} />
          )}
          <Typography
            variant={isMobile ? 'body2' : 'body1'}
            sx={{ fontSize: { xs: '0.85rem', sm: '1rem' } }}
          >
            {isNaN(val)
              ? `۰ ${unit}`
              : `${Number(val).toLocaleString('en-US', {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 6,
                })} ${unit}`}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default TransactionSummary;