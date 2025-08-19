import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link as MuiLink,
  Divider,
} from '@mui/material';
import { Icon } from '@iconify/react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Box sx={{
      background: "#1a652a",
      position: "relative",
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url("/media/images/Dollar.png")',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center bottom",
        backgroundSize: "cover",
        opacity: 0.02,
        zIndex: 0,
      },
      pt: 6,
      pb: 4,
      borderTop: "0.1px solid #1a652a",
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          {/* Brand Info */}
          <Grid item xs={12} md={4}>
            <Box display='flex' alignItems='center' justifyContent='start' mb={2}>
              <img src='/media/images/ZanjirxlogoOnlyZ.png' width={40} height={40} alt=''/>
              <Typography variant='h6' fontWeight={600} >زنجیراکس</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              پلتفرمی برای خرید و فروش سریع، امن و ساده ارزهای دیجیتال با پشتیبانی حرفه‌ای.
            </Typography>
          </Grid>

          {/* Useful Links */}
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" fontWeight="bold" color="text.secondary" gutterBottom>
              لینک‌های مفید
            </Typography>
            <MuiLink href="/guide" underline="hover" color="text.secondary" display="block">راهنما</MuiLink>
            <MuiLink href="/services" underline="hover" color="text.secondary" display="block">سرویس‌ها</MuiLink>
            <MuiLink href="/blog" underline="hover" color="text.secondary" display="block">بلاگ</MuiLink>
            <MuiLink href="/contact" underline="hover" color="text.secondary" display="block">تماس با ما</MuiLink>
          </Grid>

          {/* Social Media */}
          <Grid item xs={6} md={3}>
            <Typography variant="subtitle1" fontWeight="bold" color="text.secondary" gutterBottom>
              دنبال کنید
            </Typography>
            <Box display="flex" gap={2}>
              <MuiLink href="https://instagram.com" target="_blank" rel="noopener">
                <Icon icon="mdi:instagram" width={24} />
              </MuiLink>
              <MuiLink href="https://twitter.com" target="_blank" rel="noopener">
                <Icon icon="mdi:twitter" width={24} />
              </MuiLink>
              <MuiLink href="https://t.me" target="_blank" rel="noopener">
                <Icon icon="ic:baseline-telegram" width={24} />
              </MuiLink>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Copyright */}
        <Typography variant="body2" color="text.secondary" align="center">
          © {year}. تمامی حقوق محفوظ است.<img src='/media/images/ZanjirxlogoOnlyZ.png' width={20} height={20} alt='logoZ'/>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
