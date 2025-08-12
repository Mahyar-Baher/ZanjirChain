import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const RecentAmounts = ({ amounts, setAmount }) => {
  return (
    <>
      <Typography sx={{ mt: 1 }}>مبالغ پیشنهادی</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
        {amounts.map((v) => (
          <Button key={v} size="small" variant="outlined" onClick={() => setAmount(v)}>
            {v}
          </Button>
        ))}
      </Box>
    </>
  );
};

export default RecentAmounts;