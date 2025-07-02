import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Divider,
  Switch,
  Stack,
  Snackbar,
  Alert,
  Button,
  CircularProgress,
} from '@mui/material';

const settingItems = [
  { label: 'دریافت تایید برای ثبت سفارش', key: 'notify_order_create' },
  { label: 'دریافت تایید برای لغو سفارش', key: 'notify_order_cancel' },
  { label: 'دریافت تایید برای تبدیل به شیوه سرمایه گذاری آسان', key: 'notify_order_convert_easy_invest' },
  { label: 'دریافت تایید برای برداشت تومان', key: 'notify_order_withdraw_toman' },
  { label: 'نمایش میانگین و جمع سفارش‌ها در لیست سفارش‌ها', key: 'show_mini_orders_list' },
  { label: 'فعال‌سازی اعلان ایمیل', key: 'notify_email_enabled' },
  { label: 'فعال‌سازی ربات تلگرام', key: 'telegram_bot_enabled' },
  { label: 'فعال‌سازی احراز هویت دو مرحله‌ای', key: 'two_factor_enabled' },
  { label: 'فعال‌سازی Google Authenticator', key: 'google_authenticator_enabled' },
];

function safeParseJSON(json) {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

const MarketSettings = () => {
  const [settings, setSettings] = useState({});
  const [initialSettings, setInitialSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const user = safeParseJSON(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const userId = user?.id;

  useEffect(() => {
    const fetchSettings = async () => {
      if (!userId || !token) {
        setSnackbarMessage('کاربر یا توکن نامعتبر است. لطفا دوباره وارد شوید.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`https://amirrezaei2002x.shop/laravel/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(errorText || 'خطا در دریافت تنظیمات');
        }
        const data = await res.json();
        const loadedSettings = {};
        settingItems.forEach(({ key }) => {
          loadedSettings[key] = !!data[key];
        });
        setSettings(loadedSettings);
        setInitialSettings(loadedSettings);
      } catch (err) {
        console.error('خطا در دریافت تنظیمات:', err);
        setSnackbarMessage('خطا در دریافت تنظیمات از سرور');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [userId, token]);

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const hasChanges = () => {
    for (const { key } of settingItems) {
      if (settings[key] !== initialSettings[key]) return true;
    }
    return false;
  };

  const handleSave = async () => {
    if (!userId || !token) {
      setSnackbarMessage('کاربر یا توکن نامعتبر است. لطفا دوباره وارد شوید.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`https://amirrezaei2002x.shop/laravel/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(settings),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'خطا در ذخیره تنظیمات');
      }

      const newUserData = await res.json();
      if (!newUserData || !newUserData.id) throw new Error('داده نامعتبر از سرور');

      localStorage.setItem('user', JSON.stringify(newUserData));

      const updatedSettings = {};
      settingItems.forEach(({ key }) => {
        updatedSettings[key] = !!newUserData[key];
      });

      setSettings(updatedSettings);
      setInitialSettings(updatedSettings);

      setSnackbarMessage('تنظیمات با موفقیت ذخیره شد');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (err) {
      console.error('خطا در ذخیره تنظیمات:', err);
      setSnackbarMessage('خطا در ذخیره تنظیمات: ' + (err.message || ''));
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', p: 2, textAlign: 'center' }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>در حال بارگذاری تنظیمات...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', p: 2 }}>
      <Typography variant="h6" gutterBottom>
        تنظیمات بازار و امنیت
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
            <Typography noWrap sx={{ fontWeight: '900' }}>
              {label}
            </Typography>
            <Divider
              sx={{
                borderStyle: 'dashed',
                borderColor: 'rgba(0,0,0,0.5)',
                height: 2,
              }}
            />
            <Switch checked={!!settings[key]} onChange={() => handleToggle(key)} color="primary" />
          </Box>
        ))}
      </Stack>

      {hasChanges() && (
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3, fontWeight: 'bold' }}
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? 'در حال ذخیره...' : 'ثبت تنظیمات'}
        </Button>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={snackbarSeverity}
          onClose={() => setSnackbarOpen(false)}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MarketSettings;
