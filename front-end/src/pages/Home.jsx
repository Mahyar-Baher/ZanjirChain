import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Button,
} from '@mui/material';
import { Icon } from '@iconify/react';

const features = [
  {
    title: 'راهنمای استفاده',
    description: 'آموزش کامل نحوه استفاده از پلتفرم برای خرید و فروش ارز دیجیتال.',
    icon: 'mdi:book-open-variant',
    link: '/guide',
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
  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 6, direction: 'rtl', bgcolor: 'background.default',minHeight: '100vh' }}>
      <Typography variant="h4" fontWeight="bold" color="text.secondary" gutterBottom>
        به <span style={{ color: '#7878FF' }}>تترکروز</span> خوش آمدید 👋
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        ساده‌ترین راه برای معامله و مدیریت ارزهای دیجیتال، با سرعت، امنیت و پشتیبانی لحظه‌ای.
      </Typography>

      <Grid container spacing={2}>
        {features.map((feature, index) => (
          <Grid item size={{xs: 12,md:6 ,lg: 3}} key={index}>
            <Card elevation={2} sx={{ borderRadius: 4 }}>
              <CardActionArea href={feature.link}>
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      mb: 2,
                    }}
                  >
                    <Icon icon={feature.icon} width="48" height="48" color="#7878FF" />
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
          </Grid>
        ))}
      </Grid>

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
    </Box>
  );
};

export default Home;
