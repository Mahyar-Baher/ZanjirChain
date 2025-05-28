  import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Button,
  Paper,
  CssBaseline,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { lightTheme, darkTheme } from '../theme';
import React, { useState, useMemo, useEffect } from 'react';

const navItems = [
  { label: 'پیشخوان', icon: 'ic-dashboard', path: null },
  { label: 'کیف پول', icon: 'ic-wallet', path: '/wallet' },
  { label: 'معامله آسان تتر', icon: 'ic-trade', path: null },
  { label: 'تاریخچه', icon: 'ic-history', path: null },
  { label: 'مدیریت حساب کاربری', icon: 'ic-user', path: null },
  { label: 'خروج از حساب', icon: 'ic-logout', path: null },
];

const Navbarbox = () => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);
  const isMobile = useMediaQuery('(max-width:900px)');
  const [collapsed, setCollapsed] = useState(isMobile);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setCollapsed(isMobile);
  }, [isMobile]);

  const theme = useMemo(() => (darkMode ? darkTheme : lightTheme), [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{
          flexShrink: 0,
          width: collapsed ? 72 : { xs: 72, sm: 250 },
        }}
      >
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
            overflowX: 'hidden',
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
              px: 1,
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
              {navItems.map(({ label, icon, path }, index) => (
                <Grid item key={label}>
                  <Button
                    fullWidth
                    onClick={() => path && navigate(path)}
                    onMouseEnter={() => setHovered(index)}
                    onMouseLeave={() => setHovered(null)}
                    variant="text"
                    color="inherit"
                    sx={{
                      p: 2,
                      justifyContent: 'flex-start',
                      textTransform: 'none',
                      fontSize: '1rem',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      transition: 'all 0.3s ease',
                      color: '#fff',
                      '& i': {
                        transition: 'all 0.3s ease',
                        marginLeft: '12px',
                        fontSize: '18px',
                      },
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.1)',
                      },
                    }}
                    startIcon={
                      <i
                        className={`ic ${
                          hovered === index ? `${icon}-night` : icon
                        } ms-3`}
                        aria-hidden="true"
                      ></i>
                    }
                  >
                    {!collapsed && label}
                  </Button>
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
