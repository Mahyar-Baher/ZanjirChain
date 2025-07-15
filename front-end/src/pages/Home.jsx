import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Button,
  CircularProgress,
} from '@mui/material';
import { Icon } from '@iconify/react';
import Dashboard from './Dashboard';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'راهنمای استفاده',
    description: 'آموزش کامل نحوه استفاده از پلتفرم برای خرید و فروش ارز دیجیتال.',
    icon: 'mdi:book-open-variant',
    link: '/Guide',
  },
  {
    title: 'خدمات ما',
    description: 'مشاهده سرویس‌های ویژه مانند تتر سریع، واریز آنی و کیف پول اختصاصی.',
    icon: 'solar:wallet-2-bold-duotone',
    link: '/services',
  },
  {
    title: 'بلاگ',
    description: 'مطالب آموزشی، تحلیل‌های روز و اخبار دنیای کریپتو را اینجا بخوانید.',
    icon: 'material-symbols:article',
    link: '/blog',
  },
  {
    title: 'دعوت دوستان',
    description: 'با معرفی دوستان، تتر جایزه بگیرید و درآمدتان را افزایش دهید.',
    icon: 'ic:round-share',
    link: '/invite',
  },
];

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  if (isLoggedIn === null) {
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (isLoggedIn) {
    return <Dashboard hideNavBox={true} />;
  }

  return (
    <Box
      sx={{
        minHeight: '78vh',
        px: { xs: 2, md: 6 },
        py: 6,
        direction: 'rtl',
      }}
      className="bg-home"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Typography variant="h4" fontWeight="bold" color="text.secondary" gutterBottom>
          به <span style={{ color: '#1a652a' }}>تترکروز</span> خوش آمدید 👋
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={4}>
        با کم‌ترین کارمزد، تتر را سریع، امن و بی‌دغدغه معامله کنید همراه با پشتیبانی لحظه‌ای
        </Typography>
      </motion.div>

      <Grid container spacing={2}>
        {features.map((feature, index) => (
          <Grid item size={{xs:12, md:6, lg:3}} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card elevation={2} sx={{ borderRadius: 4 }}>
                <CardActionArea href={feature.link}>
                  <CardContent sx={{ textAlign: 'center', py: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                      <Icon icon={feature.icon} width="48" height="48" color="#1a652a" />
                    </Box>
                    <Typography variant="h6" fontWeight="bold">
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mt={1}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <Box textAlign="center" mt={6}>
          <Button
            variant="contained"
            size="large"
            href="/login"
            sx={{ borderRadius: 3, px: 4, py: 1.5 }}
          >
            شروع کنید
          </Button>
        </Box>
      </motion.div>
    </Box>
  );
};

export default Home;
