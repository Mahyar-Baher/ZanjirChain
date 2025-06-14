import React, { useState } from 'react';
import {
  Box,
  Typography,
  Switch,
  Button,
  Paper,
  Modal,
  TextField,
} from '@mui/material';
import { Icon } from '@iconify/react';

const ManageSecurity = () => {
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [googleAuthEnabled, setGoogleAuthEnabled] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [currentEmail, setCurrentEmail] = useState('user@example.com');
  const [newEmail, setNewEmail] = useState('');

  const handleConfirmEdit = () => {
    if (newEmail.trim()) {
      setCurrentEmail(newEmail);
      setNewEmail('');
      setEditOpen(false);
    }
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 3, backgroundColor: 'transparent', boxShadow: 'none' }}>
      <Typography variant="h4" fontWeight={900} mb={2}>
        مدیریت امنیت
      </Typography>

      <Box display="flex" flexDirection="column" gap={4}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography fontWeight="bold">پیامک کد یکبار مصرف</Typography>
            <Typography variant="caption" color="text.secondary">
              هنگام ثبت‌نام، خودکار فعال می‌شود
            </Typography>
          </Box>
          <Switch
            checked={smsEnabled}
            onChange={() => setSmsEnabled(!smsEnabled)}
          />
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography fontWeight="bold">کد امنیتی گوگل</Typography>
            <Typography variant="caption" color="text.secondary">
              رمز دوعاملی گوگل برای ارتقا امنیت حساب کاربری
            </Typography>
          </Box>
          <Switch
            checked={googleAuthEnabled}
            onChange={() => setGoogleAuthEnabled(!googleAuthEnabled)}
          />
        </Box>

        {/* ایمیل */}
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography fontWeight="bold">ایمیل</Typography>
          <Box display="flex" gap={1}>
            <Button
              variant="outlined"
              color="primary"
              sx={{ borderRadius: 2 }}
              onClick={() => setEditOpen(true)}
            >
              ویرایش
            </Button>
            <Button
              variant="contained"
              color="success"
              sx={{ borderRadius: 2 }}
            >
              تایید ایمیل
            </Button>
          </Box>
        </Box>
      </Box>
      <Modal open={editOpen} onClose={() => setEditOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 3,
            boxShadow: 24,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            ویرایش ایمیل
          </Typography>

          <Box>
            <Typography variant="body2" color="text.secondary" mb={0.5}>
              ایمیل فعلی:
            </Typography>
            <Typography fontWeight="medium">{currentEmail}</Typography>
          </Box>

          <TextField
            label="ایمیل جدید"
            type="email"
            fullWidth
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />

          <Button
            variant="contained"
            onClick={handleConfirmEdit}
            startIcon={<Icon icon="mdi:check-bold"  style={{ marginLeft: 8 }}/>}
            sx={{
              fontWeight: 'bold',
              borderRadius: 2,
              fontSize: '16px',
              color: 'text.primary',
            }}
          >
            تایید ویرایش
          </Button>
        </Box>
      </Modal>
    </Paper>
  );
};

export default ManageSecurity;
