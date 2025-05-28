import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Grid,
  Button,
  Paper,
  CssBaseline,
  IconButton,
  useMediaQuery,
  Collapse,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { lightTheme, darkTheme } from '../theme';
import React, { useState, useMemo, useEffect } from 'react';
import { styled } from '@mui/material/styles';

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
  const [hovered, setHovered] = useState(null);
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
      <Box component="nav" sx={{ flexShrink: 0, width: collapsed ? 72 : { xs: 72, sm: 250 } }}>
        <Paper
          elevation={3}
          sx={{
            p: 0,
            height: '100vh',
            width: collapsed ? 72 : 250,
            borderRadius: '90px 0 0 90px',
            background:
              'linear-gradient(80deg, rgba(149,0,235,0.9) 0%, rgba(149,0,235,0.9) 21%, rgba(0,0,255,0.9) 100%)',
            color: '#fff',
            position: 'fixed',
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

            <Grid container direction="column" spacing={1} sx={{ flexGrow: 1 }}>
              {navItems.map((item, index) => (
                <Grid item key={item.label}>
                  <Button
                    fullWidth
                    onClick={() => item.path && navigate(item.path)}
                    onMouseEnter={() => setHovered(index)}
                    onMouseLeave={() => setHovered(null)}
                    variant="text"
                    className={`custom-nav-button rounded-start-0 rounded-end-pill mt-2 ${isActive(item.path) || isChildVisible(item) ? 'active' : ''}`}
                    sx={{
                      justifyContent: 'flex-start',
                      textTransform: 'none',
                      fontSize: '1rem',
                      color: isActive(item.path) || isChildVisible(item) ? '#fff' : '#fff',
                      '& i': {
                        marginLeft: '12px',
                        fontSize: '18px',
                      },
                    }}
                    startIcon={<i className={`ic ${ isActive(item.path) || hovered === index ? `${item.icon}-night` : item.icon } ms-3`} aria-hidden="true"></i>}>
                    {!collapsed && item.label}
                  </Button>
                  {item.children && (
                    <Collapse in={isChildVisible(item)} sx={{position: 'relative'}}>
                      <Box
                        sx={{
                          ml: 2,
                          background: 'linear-gradient(180deg, #9A5BFF, #5040B2)',
                          borderRadius: '30px 30px 30px 30px',
                          overflow: 'hidden',
                          mt: 0,
                          minWidth: '200px !important',
                          position: 'absolute',
                          zIndex: '3',
                          top: '-90px',
                          right: '16vw'
                        }}
                      >
                        {!collapsed &&item.children.map((child) => (
                          <Button
                            key={child.label}
                            fullWidth
                            onClick={() => navigate(child.path)}
                            sx={{
                              justifyContent: 'space-between',
                              color: location.pathname === child.path ? '#fff' : '#fff',
                              backgroundColor: location.pathname === child.path ? '#1a0033' : 'transparent',
                              px: 2,
                              py: 1.2,
                              borderBottom: '1px dashed rgba(255,255,255,0.3)',
                              '& i': { marginLeft: '8px' },
                              textAlign: 'right'
                            }}
                            startIcon={<i className={`${child.icon}`} />}
                          >
                            {child.label}
                          </Button>
                        ))}
                      </Box>
                    </Collapse>
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
