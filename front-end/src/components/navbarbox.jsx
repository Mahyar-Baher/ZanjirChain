import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Grid,
  Button,
  Paper,
  CssBaseline,
  IconButton,
  Drawer,
  useMediaQuery,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { lightTheme, darkTheme } from '../theme';
import React, { useState, useMemo, useEffect, useContext } from 'react';
import navItems from '../data/navItems';
import { AuthContext } from '../context/AuthContext';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbarbox = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const [hovered, setHovered] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isLg = useMediaQuery('(min-width:1200px)');
  const isMd = useMediaQuery('(min-width:900px) and (max-width:1199px)');
  const isMobile = useMediaQuery('(max-width:899px)');
  const [darkMode] = useState(false);

  // Control navbar collapse state
  const [collapsed, setCollapsed] = useState(!isLg && isMd);

  useEffect(() => {
    setCollapsed(!isLg && isMd); // Collapse only in md, open in lg and mobile
  }, [isLg, isMd]);

  // Redirect if user is not logged in
  useEffect(() => {
    if (!user && location.pathname !== '/') {
      navigate('/');
    }
  }, [user, location.pathname, navigate]);

  const theme = useMemo(() => (darkMode ? darkTheme : lightTheme), [darkMode]);

  const isActive = (path) => location.pathname === path;
  const isChildVisible = (item) =>
    item.children && item.children.some((child) => location.pathname === child.path);

  // Drawer toggle handler
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  // Handle hover state with proper index tracking
  const handleMouseEnter = (index) => {
    setHovered(index);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  // Navbar content
  const navContent = (
    <Box
      sx={{
        width: collapsed ? 72 : 250,
        height: '100%',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: collapsed ? '90px 0 0 90px' : '0px 0px 0px 0px',
        display: 'flex', 
        flexDirection: 'column',
        py: 2,
        px: 1,
        transition: 'width 0.3s ease, border-radius 0.3s ease',
      }}
      initial={{ width: collapsed ? 72 : 250 }}
      animate={{ width: collapsed ? 72 : 250 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {!isMobile && (
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-start' }}>
          <IconButton
            onClick={() => setCollapsed(!collapsed)}
            sx={{ color: '#fff' }}
            size="large"
          >
            <MenuIcon />
          </IconButton>
        </Box>
      )}

      <Grid container direction="column" spacing={1} sx={{ flexGrow: 1 }}>
        {navItems.map((item, index) => (
          <Grid item key={item.label}>
            <Button
              fullWidth
              onClick={() => item.path && navigate(item.path)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              variant="text"
              className={`custom-nav-button rounded-start-0 rounded-end-pill mt-2 ${
                isActive(item.path) || isChildVisible(item) ? 'active' : ''
              }`}
              sx={{
                justifyContent: 'flex-start',
                textTransform: 'none',
                fontSize: '1rem',
                color: '#fff',
                bgcolor:
                  isActive(item.path) || isChildVisible(item)
                    ? 'rgba(255,255,255,0.2)'
                    : hovered === index
                    ? 'rgba(255,255,255,0.15)'
                    : 'transparent',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.15)',
                  transform: 'translateX(5px)',
                },
                transition: 'all 0.2s ease',
              }}
              startIcon={
                <Icon
                  icon={item.icon}
                  style={{ fontSize: '30px', marginLeft: 7 }}
                />
              }
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {!collapsed && item.label}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AnimatePresence>
        {isMobile ? (
          <>
            <Box
              sx={{
                position: 'fixed',
                top: 5,
                right: 5,
                zIndex: 990,
              }}
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <IconButton
                onClick={toggleDrawer(true)}
                sx={{ color: '#fff', bgcolor: '#1A652A', '&:hover': { bgcolor: '#14501F' } }}
                size="large"
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
              sx={{
                '& .MuiDrawer-paper': {
                  width: 250,
                  background: '#1A652A',
                  color: '#fff',
                  borderRadius: '30px  0px 0px 30px',
                },
              }}
            >
              {navContent}
            </Drawer>
          </>
        ) : (
          <Box
            component="nav"
            sx={{
              flexShrink: 0,
              width: collapsed ? 72 : 250,
              transition: 'width 0.3s ease',
            }}
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            exit={{ x: -250 }}
          >
            <Paper
              elevation={3}
              sx={{
                p: 0,
                height: '100vh',
                width: collapsed ? 72 : 250,
                borderRadius: '90px 0 0 90px',
                background: '#1A652A',
                color: '#fff',
                position: 'fixed',
                transition: 'width 0.3s ease, border-radius 0.3s ease',
                zIndex: 1200,
                overflow: 'hidden',
              }}
            >
              {navContent}
            </Paper>
          </Box>
        )}
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default Navbarbox;