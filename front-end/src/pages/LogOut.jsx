import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Box, CircularProgress, Typography } from '@mui/material';

const LogOut = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.log('⚠️ توکن موجود نیست، نیازی به لاگ‌اوت از سرور نیست.');
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

        console.log('✅ Logout Response:', response.data);

        if (response.data.success) {
          console.log('توکن از لوکال استوریج حذف شد.');
        } else {
          console.warn('❌ Logout موفق نبود:', response.data.message || response.data);
        }
      } catch (error) {
        console.error('❌ Logout Error:', error.response?.data || error.message);
      } finally {
        logout();
        navigate('/');
      }
    };

    logoutUser();
  }, [logout, navigate]);

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
        خروج از حساب لطفا منتظر بمانید...❤️
      </Typography>
    </Box>
  );
};

export default LogOut;
