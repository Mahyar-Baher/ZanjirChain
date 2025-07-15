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
import navItems from '../data/navItems'; 

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
            background: "#1A652A", 
            // 'linear-gradient(80deg, rgba(149,0,235,0.9) 0%, rgba(149,0,235,0.9) 21%, rgba(0,0,255,0.9) 100%)',
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
                      color: '#fff',
                      '& i': {
                        marginLeft: '12px',
                        fontSize: '18px',
                      },
                    }}
                    startIcon={
                      <iconify-icon icon={item.icon} style={{ fontSize: '30px', marginLeft: 7 }}></iconify-icon>
                    }
                  >
                    {!collapsed && item.label}
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
