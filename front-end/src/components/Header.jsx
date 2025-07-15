import * as React from 'react';
import { useContext, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { AnimatePresence, motion } from 'framer-motion';
import avatarImg from '../assets/icons/avatar.png';
import { AuthContext } from '../context/AuthContext';

const pages = ['خانه', 'راهنمای استفاده', 'بلاگ', 'دعوت دوستان', 'ارتباط با ما'];
const pageRoutes = {
  'خانه': '/',
  'راهنمای استفاده': '/guide',
  'بلاگ': '/blog',
  'دعوت دوستان': '/invite',
  'ارتباط با ما': '/contact'
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
  const open = Boolean(anchorEl);
  const avatarRef = useRef(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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

          {/* لوگو و عنوان سمت چپ */}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              '&:hover': {
                color: '#d1e7dd',
              }
            }}
          >
            تترکروز
          </Typography>

          {/* دکمه‌های اصلی */}
          <Box sx={{ flexGrow: 1, mx: 4, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                component={Link}
                to={pageRoutes[page]}
                sx={{ 
                  my: 2, 
                  color: 'white', 
                  display: 'block',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  }
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* آواتار و نام کاربر یا دکمه ورود */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 2, position: 'relative', zIndex: 1300 }}>
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
                    }
                  }}
                  onMouseEnter={handleOpen}
                  ref={avatarRef}
                  aria-controls={open ? 'user-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  {user?.first_name?.[0] || 'ک'}
                </Avatar>
                <Typography
                  variant="subtitle1"
                  color="inherit"
                  noWrap
                  onMouseEnter={handleOpen}
                  sx={{ 
                    cursor: 'pointer', 
                    userSelect: 'none',
                    '&:hover': {
                      color: '#d1e7dd',
                    }
                  }}
                >
                  {user?.first_name ? `${user.first_name} ${user.last_name || ''}` : 'کاربر'}
                </Typography>

                <AnimatePresence>
                  {open && (
                    <motion.div
                      key="menu"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      onMouseLeave={handleClose}
                      style={{
                        position: 'absolute',
                        top: 'calc(100% + 8px)',
                        right: 0,
                        backgroundColor: '#1a652a',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: 8,
                        boxShadow: '0 6px 12px rgba(0,0,0,0.3)',
                        minWidth: 150,
                        zIndex: 9999,
                        color: 'white',
                        userSelect: 'none',
                        overflow: 'hidden',
                      }}
                      aria-labelledby="user-menu"
                      role="menu"
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
                            role="menuitem"
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
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderColor: '#d1e7dd',
                    color: '#d1e7dd',
                  }
                }}
              >
                ورود
              </Button>
            )}
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;