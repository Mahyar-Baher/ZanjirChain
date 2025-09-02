import React, { useEffect, useContext, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Button,
  CircularProgress,
  alpha,
} from '@mui/material';
import { Icon } from '@iconify/react';
import Dashboard from './Dashboard';
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { AuthContext } from '../context/AuthContext';
import BuySellHome from '../components/BuySellHome';
import TetherPriceHome from '../components/TetherPriceHome';
import ElectricBorder from '../hooks/ElectricBorder/ElectricBorder'
import TextType from '../hooks/TextType/TextType'

const features = [
  {
    title: 'راهنمای استفاده',
    description: 'آموزش کامل نحوه استفاده از پلتفرم برای خرید و فروش ارز دیجیتال.',
    icon: 'mdi:book-open-variant',
    link: '/Guide',
    color: '#1a652a'
  },
  {
    title: 'خدمات ما',
    description: 'مشاهده سرویس‌های ویژه مانند تتر سریع، واریز آنی و کیف پول اختصاصی.',
    icon: 'solar:wallet-2-bold-duotone',
    link: '/services',
    color: '#1a652a'
  },
  {
    title: 'بلاگ',
    description: 'مطالب آموزشی، تحلیل‌های روز و اخبار دنیای کریپتو را اینجا بخوانید.',
    icon: 'material-symbols:article',
    link: '/blog',
    color: '#1a652a'
  },
  {
    title: 'دعوت دوستان',
    description: 'با معرفی دوستان، تتر جایزه بگیرید و درآمدتان را افزایش دهید.',
    icon: 'ic:round-share',
    link: '/invite',
    color: '#1a652a'
  },
];
const texthead = [
  "یکپارچگی کیف‌ پول",
  "امنیت پیشرفته",
  "سرعت بالا",
  "پشتیبانی ۲۴/۷",
  "کارمزد کم!",
];

const Mainpage = () => {
  const { user, token, fetchUserFromToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        await fetchUserFromToken(token);
      }
      setIsLoading(false);
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
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        }}
      >
        <CircularProgress color="primary" size={60} thickness={4} />
      </Box>
    );
  }
  return (
    <Box
      sx={{
        bgcolor: (theme) => theme.palette.background.default,
        minHeight: '100vh',
        px: { xs: 2, sm: 4, md: 6 },
        py: 5,
      }}
    >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Box textAlign="center" mb={2}>
            <Typography
              component="h2"
              variant="h4"
              fontWeight="bold"
              gutterBottom
              sx={{
                background: "linear-gradient(45deg, #1a652a 30%, #2e8b57 90%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: {xs: 'none', md:"inline-flex", lg: 'none'},
                gap: 1,
              }}
            >
              تجربه هوشمند در معامله با{" "}
              <Box
                component="span"
                sx={{
                  background: "linear-gradient(45deg, #1a652a 30%, #2e8b57 90%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                <TextType
                  text={texthead}
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={true}
                  cursorCharacter="|"
                />
              </Box>
            </Typography>
          </Box>
        </motion.div>
      {/* بخش خرید/فروش و نرخ لحظه‌ای */}
      <Grid container spacing={2} justifyContent="center">
        <BuySellHome />
        <TetherPriceHome />
        {/* هدر با عنوان جذاب + شعار متغیر */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Box textAlign="center" mb={2} width='100vw'>
            <Typography
              component="h2"
              variant="h4"
              fontWeight="bold"
              gutterBottom
              sx={{
                background: "linear-gradient(45deg, #1a652a 30%, #2e8b57 90%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: {xs: 'none', md:"none", lg: 'inline-flex'},
                gap: 1,
              }}
            >
              تجربه هوشمند در معامله با{" "}
              <Box
                component="span"
                sx={{
                  background: "linear-gradient(45deg, #1a652a 30%, #2e8b57 90%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                <TextType
                  text={texthead}
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={true}
                  cursorCharacter="|"
                />
              </Box>
            </Typography>
          </Box>
        </motion.div>
        {/* امکانات پلتفرم */}
        <Grid size={{sx:12, lg:10}}>
          <Typography variant="h4" textAlign="center" mb={4} fontWeight="bold" color="success">
            امکانات پلتفرم
          </Typography>
          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid size={{xs:12, sm: 6 , md: 3}} key={index}>
                  <ElectricBorder
                    color="#1a652f"
                    speed={1}
                    chaos={0.3}
                    thickness={2}
                    style={{ borderRadius: 16 }}
                    >
                      <Card 
                        elevation={4} 
                        sx={{ 
                          borderRadius: 4, 
                          background: `linear-gradient(145deg, ${feature.color} 0%, ${alpha(feature.color, 0.8)} 100%)`,
                          minHeight: 250,
                          maxHeight: 250,
                          transition: 'all 0.3s ease-in-out',
                          '&:hover': {
                            boxShadow: `0 12px 20px 0 ${alpha(feature.color, 0.3)}`,
                            transform: 'translateY(-5px)'
                          }
                        }}
                      >
                        <CardActionArea href={feature.link} sx={{ height: '100%' }}>
                          <CardContent sx={{ textAlign: 'center', py: 4, px: 3 }}>
                            <Box 
                              sx={{ 
                                display: 'flex', 
                                justifyContent: 'center', 
                                mb: 3,
                                background: alpha('#fff', 0.2),
                                width: 70,
                                height: 70,
                                borderRadius: '50%',
                                alignItems: 'center',
                                mx: 'auto'
                              }}
                            >
                              <Icon icon={feature.icon} width="32" height="32" color="#ffffff" />
                            </Box>
                            <Typography variant="h6" fontWeight="bold" color="#ffffff" gutterBottom>
                              {feature.title}
                            </Typography>
                            <Typography variant="body2" color="#ffffff" sx={{ opacity: 0.9 }}>
                              {feature.description}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </ElectricBorder>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {/* فراخوان عضویت */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <Box textAlign="center" display='flex' justifyContent='center' flexDirection='column' alignItems="center" mt={8} mb={4}>
          <Typography variant="h5" fontWeight="bold" color="success" gutterBottom>
            همین حالا به جمع کاربران ما بپیوندید
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            با ثبت‌نام در پلتفرم ما، از خدمات ویژه و امنیت بالا بهره‌مند شوید
          </Typography>
           <Box width="fit-content">
           <ElectricBorder
              color="#1a652f"
              speed={1}
              chaos={0.3}
              thickness={2}
              style={{ borderRadius: 16 }}
            >
              <Button
                  variant="contained"
                  size="large"
                  href="/login"
                  sx={{ 
                    borderRadius: 3, 
                    px: 6, 
                    py: 1.5,
                    fontSize: '1.1rem',
                    background: 'linear-gradient(45deg, #1a652a 30%, #2e8b57 90%)',
                    boxShadow: '0 4px 12px 0 rgba(26, 101, 42, 0.3)',
                    '&:hover': {
                      boxShadow: '0 6px 16px 0 rgba(26, 101, 42, 0.4)',
                      background: 'linear-gradient(45deg, #2e8b57 30%, #1a652a 90%)',
                    }
                  }}
                >
                  شروع کنید
                </Button>
            </ElectricBorder>
           </Box>
        </Box>
      </motion.div>
    </Box>
  );
};

export default Mainpage;