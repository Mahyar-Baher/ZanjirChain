import { useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Box, Button, Typography, Grid } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const TwoFactorWarning = () => {
  const navigate = useNavigate();
  const { user, token, fetchUserFromToken } = useContext(AuthContext);
  const isMounted = useRef(false); // کنترل اجرای useEffect

  // به‌روزرسانی اطلاعات کاربر پس از بازگشت از Google Authenticator
  useEffect(() => {
    if (token && !isMounted.current) {
      isMounted.current = true; // جلوگیری از اجرای مکرر
      fetchUserFromToken(token).finally(() => {
        isMounted.current = false; // بازنشانی برای اجرای بعدی
      });
    }
  }, [token, fetchUserFromToken]);

  // اگر google2afactive true باشد، چیزی نمایش داده نشود
  if (user?.google2afactive === true) {
    return null;
  }

  return (
    <Grid sx={{ width: { xs: '100%' } }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          gap: 2,
          bgcolor: 'error.light',
          color: 'error.contrastText',
          p: 2,
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
          <WarningAmberIcon sx={{ fontSize: 32 }} />
          <Box>
            <Typography variant="h6" fontWeight="bold">
              اخطار
            </Typography>
            <Typography variant="body2">
              در حال حاضر کد ورود دو مرحله‌ای شما فعال نیست. لطفاً قبل از استفاده از امکانات سایت آن را فعال کنید، در غیر این صورت ورود مجدد و استفاده از سایت مجاز نخواهد بود.
            </Typography>
          </Box>
        </Box>
        <Button variant="contained" onClick={() => navigate('/GoogleAuthenticator')}>
          فعال‌سازی رمز دو مرحله‌ای
        </Button>
      </Box>
    </Grid>
  );
};

export default TwoFactorWarning;