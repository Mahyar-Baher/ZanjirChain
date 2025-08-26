import React from 'react';
import { Box, Typography } from '@mui/material';

const RecentPayments = ({ recentPays }) => {
  return (
    <>
      <Typography sx={{ mt: 1 }}>تراکنش‌های اخیر</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between',alignItems: 'center',flexDirection:{xs:'column',sm:'row'}, mt: 1 }}>
        {recentPays.map((recentPay) => (
          <Typography
            key={recentPay}
            sx={{ p: 1, m: 0.5, color: '#fff', borderRadius: 2, backgroundColor: '#1a652a', opacity: 0.7 }}
          >
            {recentPay} تومان
          </Typography>
        ))}
      </Box>
    </>
  );
};

export default RecentPayments;