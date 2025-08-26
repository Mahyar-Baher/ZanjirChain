import React from 'react';
import { Box, Button, Typography, useMediaQuery } from '@mui/material';

const RecentAmounts = ({ amounts, setAmount }) => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  return (
    <>
      <Typography variant="body2" color="textSecondary" sx={{ mt: 2, mb: 1 }}>
        مبالغ پیشنهادی
      </Typography>
      <Box 
        sx={{
          width: "100%", 
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          justifyContent: isSmallScreen ? 'space-between' : 'space-between',
          alignItems: 'center',
          mb: 2
        }}
      >
        {amounts.map((v) => (
          <Button 
            key={v} 
            size="small" 
            variant="outlined" 
            onClick={() => setAmount(v)}
            sx={{
              minWidth: {xs: 100, md:150},
              maxWidth: {xs: 100, md:150},
              px: 2,
              py: 1,
              borderRadius: 1,
              fontSize: '0.875rem',
              flex: isSmallScreen ? '1 1 auto' : 'none',  
            }}
          >
            {v.toLocaleString()} تومان
          </Button>
        ))}
      </Box>
    </>
  );
};

export default RecentAmounts;