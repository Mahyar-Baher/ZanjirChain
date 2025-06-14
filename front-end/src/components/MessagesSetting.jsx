import React, { useState } from 'react';
import { Box, Typography, Divider, Switch, Stack } from '@mui/material';

const settingItems = [
  { label: 'اطلاع‌رسانی با ایمیل', key: 'emailNotification' },
  { label: 'فعالسازی بات تلگرام', key: 'telegramBot' },
  { label: 'فعال‌سازی پاسخ خودکار', key: 'autoReply' },
];

const MessagesSetting = () => {
  const [settings, setSettings] = useState({
    emailNotification: true,
    telegramBot: false,
    systemMessages: true,
    autoReply: false,
    supportMessages: true,
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
        مدیریت پیام‌ها
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
            <Typography noWrap sx={{fontWeight:'900'}}>{label}</Typography>
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

export default MessagesSetting;
