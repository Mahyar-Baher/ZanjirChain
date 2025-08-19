import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Box, CircularProgress, Typography } from '@mui/material';

const LogOut = () => {
  const navigate = useNavigate();
  const { logout, token } = useContext(AuthContext);

  useEffect(() => {
    const logoutUser = async () => {
      try {
        if (!token) {
          console.warn('⚠️ توکن موجود نیست، لاگ‌اوت محلی انجام می‌شود');
          logout();
          navigate('/');
          return;
        }

        const response = await axios.post(
          'https://amirrezaei2002x.shop/laravel/api/logout-user',
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.data?.success) {
          console.log('✅ لاگ‌اوت از سرور موفقیت‌آمیز بود');
        } else {
          console.warn('⚠️ لاگ‌اوت از سرور موفقیت‌آمیز نبود:', response.data?.message || 'پاسخ نامعتبر');
        }
      } catch (error) {
        console.error('🚨 خطای لاگ‌اوت:', error.response?.data?.message || error.message);
      } finally {
        logout();
        navigate('/');
      }
    };

    logoutUser();
  }, [logout, navigate, token]);

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        backgroundColor: 'background.paper',
        color: 'primary.main',
        userSelect: 'none',
      }}
    >
      <CircularProgress color="primary" size={48} />
      <Typography variant="h6" component="p" sx={{ fontWeight: 'medium' }}>
        خروج از حساب، لطفاً منتظر بمانید... ❤️
      </Typography>
    </Box>
  );
};

export default LogOut;