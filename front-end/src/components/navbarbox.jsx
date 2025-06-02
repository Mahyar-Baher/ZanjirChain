import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Grid,
  Button,
  Paper,
  CssBaseline,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { lightTheme, darkTheme } from '../theme';
import React, { useState, useMemo, useEffect } from 'react';

const navItems = [
  { label: 'پیشخوان', icon: 'ic-dashboard', path: '/' },
  {
    label: 'کیف پول', icon: 'ic-wallet', path: '/wallet',
    children: [
      { label: 'دارایی کل', icon: 'fas fa-money', path: '/wallet' },
      { label: 'واریز وجه', icon: 'fa fa-download', path: '/income' },
      { label: 'برداشت وجه', icon: 'fa fa-upload', path: '/outcome' },
    ]
  },
  { label: 'معامله آسان تتر', icon: 'ic-trade', path: '/trade' },
  {
    label: 'تاریخچه', icon: 'ic-history', path: '/history',
    children: [
      { label: 'تاریخچه واریز و برداشت', icon: 'fa fa-history', path: '/history' },
      { label: 'تاریخچه معاملات تتر', icon: 'fa fa-history', path: '/history_tether' },
      { label: 'تاریخچه معاملات تومان', icon: 'fa fa-history', path: '/history_toman' }
    ]
  },
  {
    label: 'مدیریت حساب کاربری', icon: 'ic-user', path: '/user',
    children: [
      { label: 'مشخصات کاربری', icon: 'fa fa-user', path: '/user_information' },
      { label: 'حساب های بانکی', icon: 'fa fa-cards', path: '/credits' },
      { label: 'هشدار قیمت', icon: 'fa fa-alert', path: '/alert_price' },
      { label: 'مدیریت پیام ها', icon: 'fa fa-mail', path: '/manage_message' },
      { label: 'مدیریت آدرس ها', icon: 'fa fa-file-pen', path: '/manage_addresses' },
      { label: 'تنظیمات', icon: 'fa fa-setting', path: '/settings' },
      { label: 'امنیت', icon: 'fa fa-shild', path: '/security' }
    ]
  },
  { label: 'خروج از حساب', icon: 'ic-logout', path: '/logout' },
];

const Navbarbox = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const isMobile = useMediaQuery('(max-width:900px)');
  const [collapsed, setCollapsed] = useState(isMobile);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setCollapsed(isMobile);
  }, [isMobile]);

  const theme = useMemo(() => (darkMode ? darkTheme : lightTheme), [darkMode]);

  const isActive = (path) => location.pathname === path;
  const isChildVisible = (item) =>
    item.children && item.children.some((child) => location.pathname === child.path);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box component="nav" sx={{ display: 'flex', position: 'relative' }}>
        <Paper
          elevation={3}
          sx={{
            height: '100vh',
            width: collapsed ? 72 : 250,
            borderRadius: '90px 0 0 90px',
            background:
              'linear-gradient(80deg, rgba(149,0,235,0.9) 0%, rgba(149,0,235,0.9) 21%, rgba(0,0,255,0.9) 100%)',
            color: '#fff',
            transition: 'width 0.3s ease',
            zIndex: 1200,
          }}
        >
          <Box
            sx={{
              height: '100%',
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: '90px 0 0 90px',
              display: 'flex',
              flexDirection: 'column',
              py: 2,
              ps: 1,
              position: 'relative',
            }}
          >
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-start' }}>
              <IconButton
                onClick={() => setCollapsed(!collapsed)}
                sx={{ color: '#fff' }}
                size="large"
              >
                <MenuIcon />
              </IconButton>
            </Box>

            <Grid container direction="column" spacing={1}>
              {navItems.map((item, index) => (
                <Grid item key={item.label} sx={{ position: 'relative' }}>
                  <Button
                    fullWidth
                    onClick={() => item.path && navigate(item.path)}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    variant="text"
                    sx={{
                      justifyContent: 'flex-start',
                      textTransform: 'none',
                      fontSize: '1rem',
                      color: '#fff',
                      '& i': {
                        marginLeft: '12px',
                        fontSize: '18px',
                      },
                    }}
                    startIcon={
                      <i
                        className={`ic ${isActive(item.path) || isChildVisible(item) ? `${item.icon}-night` : item.icon} ms-3`}
                      ></i>
                    }
                  >
                    {!collapsed && item.label}
                  </Button>

                  {/* Floating child menu */}
                  {item.children && hoveredIndex === index && !collapsed && (
                    <Paper
                      elevation={4}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: collapsed ? 72 : 250,
                        minWidth: 200,
                        background: 'linear-gradient(180deg, #9A5BFF, #5040B2)',
                        borderRadius: '20px',
                        zIndex: 1300,
                        py: 1,
                      }}
                    >
                      {item.children.map((child) => (
                        <Button
                          key={child.label}
                          fullWidth
                          onClick={() => navigate(child.path)}
                          sx={{
                            justifyContent: 'flex-start',
                            color: '#fff',
                            backgroundColor: location.pathname === child.path ? '#1a0033' : 'transparent',
                            px: 2,
                            py: 1,
                            borderBottom: '1px dashed rgba(255,255,255,0.3)',
                            '& i': { ml: 1 },
                          }}
                          startIcon={<i className={child.icon}></i>}
                        >
                          {child.label}
                        </Button>
                      ))}
                    </Paper>
                  )}
                </Grid>
              ))}
            </Grid>
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default Navbarbox;
