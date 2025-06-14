import React, { useState } from 'react';
import { Box, Typography, Divider, Switch, Stack } from '@mui/material';

const settingItems = [
  { label: 'دریافت تایید برای ثبت سفارش', key: 'confirmOrder' },
  { label: 'دریافت تایید برای لغو سفارش', key: 'cancelOrder' },
  { label: 'دریافت تایید برای تبدیل به شیوه سرمایه گذاری آسان', key: 'easyInvest' },
  { label: 'دریافت تایید برای برداشت تومان', key: 'withdrawToman' },
  { label: 'نمایش میانگین و جمع سفارش‌ها در لیست سفارش‌ها', key: 'showStats' },
  { label: 'دریافت اعلان‌های بازار', key: 'marketNotifications' }, // گزینه اضافه
];

const MarketSettings = () => {
  const [settings, setSettings] = useState({
    confirmOrder: true,
    cancelOrder: true,
    easyInvest: false,
    withdrawToman: false,
    showStats: true,
    marketNotifications: true,
  });

  const handleToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', p: 2 }}>
      <Typography variant="h6" gutterBottom>
        تنظیمات بازار
      </Typography>

      <Stack spacing={2}>
        {settingItems.map(({ label, key }) => (
          <Box
            key={key}
            sx={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr auto',
              alignItems: 'center',
              gap: 1,
              width: '100%',
            }}
          >
            <Typography noWrap sx={{fontWeight:'900',}}>{label}</Typography>
            <Divider
              sx={{
                borderStyle: 'dashed',
                borderColor: 'rgba(0,0,0,0.5)',
                height: 2,
              }}
            />
            <Switch
              checked={settings[key]}
              onChange={() => handleToggle(key)}
              color="primary"
            />
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default MarketSettings;
