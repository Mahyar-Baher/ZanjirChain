import React, { useEffect, useContext, useState  } from 'react';
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
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { AuthContext } from '../context/AuthContext'; // import AuthContext
import BuySellHome from '../components/BuySellHome';
import TetherPriceHome from '../components/TetherPriceHome';

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
  const { user, token, fetchUserFromToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        await fetchUserFromToken(token); // فچ داده‌ها با توکن
      }
      setIsLoading(false); // لودینگ تموم شد
    };
    checkAuth();
  }, [token, fetchUserFromToken]);

  if (isLoading) {
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

  if (user) {
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
    >

      <Grid container spacing={4} justifyContent='space-between'>
          <BuySellHome/>
          <TetherPriceHome/>
        {features.map((feature, index) => (
          <Grid item size={{ xs: 12, md: 6, lg: 5 }} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card elevation={2} sx={{ borderRadius: 4, background: '#1a652a' }}>
                <CardActionArea href={feature.link}>
                  <CardContent sx={{ textAlign: 'center', py: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                      <Icon icon={feature.icon} width="48" height="48" color="#ffffff" />
                    </Box>
                    <Typography variant="h6" fontWeight="bold" color="#ffffff">
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="#ffffff" mt={1}>
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