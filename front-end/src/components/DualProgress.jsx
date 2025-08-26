import React from 'react';
import { Box, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';

const DualProgress = ({ tether = 0, toman = 0, rate = 100000, size = 150 }) => {
  // محاسبه تتر و تومان معادل تتر
  let tetherValue = tether;
  let tomanInTether = toman / rate;

  // اگر هر دو صفر بودن → یه نسبت فرضی بزار تا نمودار نمایش داده بشه
  if (tetherValue === 0 && toman === 0) {
    tetherValue = 20;
    tomanInTether = 80;
  }

  // داده‌های نمودار
  const data = [
    { id: 0, value: tetherValue, color: '#26A17B' },
    { id: 1, value: tomanInTether, color: '#1a652a' },
  ];

  return (
    <Box position="relative" width={size} height={size}>
      <PieChart
        series={[
          {
            data,
            innerRadius: size / 2.5,   // نازک‌تر کردن قوس
            outerRadius: size / 2,     // اندازه بیرونی
            arcLabel: () => '',     
          },
        ]}
        width={size}
        height={size}
        slotProps={{
          legend: { hidden: true }, // مخفی کردن legend
        }}
      />

      {/* متن وسط نمودار */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        sx={{
          transform: 'translate(-50%, -50%)', // دقیقا مرکز
          textAlign: 'center',
        }}
      >
        <Typography
          sx={{ fontWeight: 600, lineHeight: 1.4, textWrap: 'wrap',fontSize: 12 }}
          color="#1a652a"
        >
          {`${toman.toLocaleString()} تومان`}
        </Typography>
        <Typography
          sx={{ fontWeight: 600, lineHeight: 1.4, textWrap: 'wrap', fontSize: 12 }}
          color="#26A17B"
        >
          {`$${tether} تتر`}
        </Typography>
      </Box>
    </Box>
  );
};

export default DualProgress;
