/* eslint-disable no-unused-vars */
import * as React from 'react';
import { useContext, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Avatar,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { AnimatePresence, motion } from 'framer-motion';
import avatarImg from '../assets/icons/avatar.png';
import { AuthContext } from '../context/AuthContext';

const pages = ['راهنمای استفاده', 'بلاگ', 'دعوت دوستان', 'ارتباط با ما'];
const pageRoutes = {
  'راهنمای استفاده': '/guide',
  'بلاگ': '/blog',
  'دعوت دوستان': '/invite',
  'ارتباط با ما': '/contact',
};

const menuItems = [
  { label: 'داشبورد', to: '/dashboard' },
  { label: 'ولت', to: '/wallet' },
  { label: 'خرید آسان', to: '/trade' },
  { label: 'خروج', to: '/logout' },
];

function Header() {
  const { user } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 630px)');
  const avatarRef = useRef(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

    const handleToggleUserMenu = () => {
      setUserMenuOpen((prev) => !prev);
    };

    const handleClose = () => {
      setUserMenuOpen(false);
    };


  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const drawerContent = (
    <Box
      sx={{
        width: 250,
        bgcolor: '#1a652a',
        height: '100%',
        color: 'white',
        pt: 2,
      }}
      component={motion.div}
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      exit={{ x: -250 }}
      transition={{ duration: 0.3 }}
    >
      <List>
        {pages.map((page) => (
          <ListItem
            key={page}
            component={Link}
            to={pageRoutes[page]}
            onClick={handleDrawerToggle}
            sx={{
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <ListItemText primary={page} />
          </ListItem>
        ))}
        {user && menuItems.map(({ label, to }) => (
          <ListItem
            key={label}
            component={Link}
            to={to}
            onClick={handleDrawerToggle}
            sx={{
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <ListItemText primary={label} />
          </ListItem>
        ))}
        {!user && (
          <ListItem
            component={Link}
            to="/login"
            onClick={handleDrawerToggle}
            sx={{
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <ListItemText primary="ورود" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#1a652a',
        color: 'white',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ width: '100%' }}>
            <Box display="flex" alignItems="center">
              <img src="/media/images/ZanjirxlogoOnlyZ.png" width={20} height={20} alt="logoZ" />
              <Typography
                noWrap
                component={Link}
                to="/"
                sx={{
                  ml: 1,
                  fontWeight: 700,
                  color: 'inherit',
                  textDecoration: 'none',
                  '&:hover': {
                    color: '#d1e7dd',
                  },
                  fontSize: { xs: '1rem', md: '1.25rem' },
                }}
              >
                زنجیراکس
              </Typography>
            </Box>

            {isMobile ? (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{ display: { md: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <>
                {/* دکمه‌های اصلی */}
                <Box sx={{ flexGrow: 1, mx: 4, display: 'flex' }}>
                  {pages.map((page) => (
                    <Button
                      key={page}
                      component={Link}
                      to={pageRoutes[page]}
                      sx={{
                        my: 2,
                        color: 'white',
                        display: 'block',
                        fontSize: '0.9rem',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        },
                      }}
                    >
                      {page}
                    </Button>
                  ))}
                </Box>

                {/* آواتار و نام کاربر یا دکمه ورود */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, position: 'relative', zIndex: 1300 }}>
                  {user ? (
                    <>
                    <Avatar
  alt={user?.first_name || 'کاربر'}
  src={user?.avatarUrl || avatarImg}
  sx={{
    width: 30,
    height: 30,
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.5)',
    },
  }}
  onClick={handleToggleUserMenu}
/>
<Typography
  variant="subtitle1"
  color="inherit"
  noWrap
  onClick={handleToggleUserMenu}
  sx={{
    cursor: 'pointer',
    userSelect: 'none',
    '&:hover': { color: '#d1e7dd' },
    fontSize: '0.9rem',
  }}
>
  {user?.first_name ? `${user.first_name} ${user.last_name || ''}` : 'کاربر'}
</Typography>

<AnimatePresence>
  {userMenuOpen && (
    <motion.div
      key="menu"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      style={{
        position: 'absolute',
        top: 'calc(100% + 8px)',
        right: 0,
        backgroundColor: '#1a652a',
        borderRadius: 8,
        minWidth: 150,
        color: 'white',
        boxShadow: '0 6px 12px rgba(0,0,0,0.3)',
      }}
    >
      {menuItems.map(({ label, to }) => (
        <Link
          key={label}
          to={to}
          style={{ textDecoration: 'none', color: 'inherit' }}
          onClick={handleClose}
        >
          <Box
            component="div"
            sx={{
              px: 2,
              py: 1.5,
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
              fontWeight: 500,
              fontSize: 14,
              direction: 'rtl',
            }}
          >
            {label}
          </Box>
        </Link>
      ))}
    </motion.div>
  )}
</AnimatePresence>
                    </>
                  ) : (
                    <Button
                      component={Link}
                      to="/login"
                      variant="outlined"
                      color="inherit"
                      sx={{
                        borderColor: 'white',
                        color: 'white',
                        fontSize: '0.9rem',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          borderColor: '#d1e7dd',
                          color: '#d1e7dd',
                        },
                      }}
                    >
                      ورود
                    </Button>
                  )}
                </Box>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: 250,
            bgcolor: '#1a652a',
            color: 'white',
            direction: 'rtl',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </AppBar>
  );
}

export default Header;