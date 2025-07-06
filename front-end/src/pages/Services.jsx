import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  Button, 
  Container,
  useTheme,
  useMediaQuery,
  keyframes,
  styled 
} from '@mui/material';
import { 
  CurrencyExchange,
  AccountBalanceWallet,
  Security,
  Paid,
  SwapHoriz,
  Lock,
  BarChart,
  Api,
  AccountBalance,
  CheckCircle,
  ArrowForward,
  Star
} from '@mui/icons-material';

const pulse = keyframes`
  0% { opacity: 0.1; }
  50% { opacity: 0.4; }
  100% { opacity: 0.1; }
`;

const AnimatedParticle = styled(Box)(({ theme, delay }) => ({
  position: 'absolute',
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.light,
  opacity: 0.1,
  animation: `${pulse} ${Math.random() * 10 + 10}s infinite`,
  animationDelay: `${delay}s`,
}));

const Services = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [activeService, setActiveService] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovering) {
        setActiveService(prev => prev === 7 ? 0 : prev + 1);
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isHovering]);

  const services = [
    { 
      id: 0, 
      title: 'صرافی ارز دیجیتال', 
      icon: <CurrencyExchange sx={{ fontSize: 40 }} />, 
      description: 'معاملات امن و سریع ارزهای دیجیتال با بهترین نرخ‌های بازار',
      color: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
      features: [
        'معاملات لحظه‌ای با کارمزد پایین',
        'پشتیبانی از صدها ارز دیجیتال',
        'نقدینگی بالا برای معاملات بزرگ',
        'پلتفرم معاملاتی پیشرفته'
      ]
    },
    { 
      id: 1, 
      title: 'کیف پول امن', 
      icon: <AccountBalanceWallet sx={{ fontSize: 40 }} />, 
      description: 'ذخیره‌سازی امن دارایی‌های دیجیتال با قابلیت‌های پیشرفته',
      color: 'linear-gradient(135deg, #10b981 0%, #0d9488 100%)',
      features: [
        'ذخیره‌سازی سرد و گرم',
        'بیمه دارایی‌های دیجیتال',
        'دسترسی چندامضایی',
        'پشتیبان‌گیری ابری امن'
      ]
    },
    { 
      id: 2, 
      title: 'خرید/فروش آنی', 
      icon: <Paid sx={{ fontSize: 40 }} />, 
      description: 'تبدیل سریع ارزهای دیجیتال به ریال و بالعکس',
      color: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
      features: [
        'تبدیل مستقیم به حساب بانکی',
        'پرداخت آنی بدون تأخیر',
        'پشتیبانی از تمامی بانک‌ها',
        'حداقل و حداکثر مبادله نامحدود'
      ]
    },
    { 
      id: 3, 
      title: 'امنیت پیشرفته', 
      icon: <Lock sx={{ fontSize: 40 }} />, 
      description: 'سیستم‌های امنیتی سطح بانکی برای محافظت از دارایی‌ها',
      color: 'linear-gradient(135deg, #ef4444 0%, #ec4899 100%)',
      features: [
        'احراز هویت چندمرحله‌ای',
        'نظارت 24 ساعته امنیتی',
        'رمزنگاری پیشرفته دارایی‌ها',
        'سیستم هشدار لحظه‌ای'
      ]
    },
    { 
      id: 4, 
      title: 'معاملات مارجین', 
      icon: <BarChart sx={{ fontSize: 40 }} />, 
      description: 'معاملات اهرمی با لوریج تا 10x برای سود بیشتر',
      color: 'linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)',
      features: [
        'لوریج قابل تنظیم',
        'سیستم مدیریت ریسک هوشمند',
        'پلتفرم معاملاتی پیشرفته',
        'پشتیبانی 24/7'
      ]
    },
    { 
      id: 5, 
      title: 'استیکینگ', 
      icon: <AccountBalance sx={{ fontSize: 40 }} />, 
      description: 'دریافت سود از دارایی‌های دیجیتال بدون نیاز به معامله',
      color: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
      features: [
        'سود روزانه تا 25% سالانه',
        'پشتیبانی از ارزهای متنوع',
        'برداشت لحظه‌ای سود',
        'بدون قفل‌سازی اجباری'
      ]
    },
    { 
      id: 6, 
      title: 'API توسعه‌دهندگان', 
      icon: <Api sx={{ fontSize: 40 }} />, 
      description: 'ابزارهای یکپارچه‌سازی برای توسعه‌دهندگان و تریدرها',
      color: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
      features: [
        'API معاملاتی REST و WebSocket',
        'کتابخانه‌های SDK چندزبانه',
        'داشبورد مدیریتی پیشرفته',
        'پشتیبانی فنی اختصاصی'
      ]
    },
    { 
      id: 7, 
      title: 'تبدیل خودکار', 
      icon: <SwapHoriz sx={{ fontSize: 40 }} />, 
      description: 'تبدیل خودکار بین ارزهای دیجیتال با بهترین نرخ',
      color: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
      features: [
        'تبدیل لحظه‌ای بدون کارمزد',
        'پشتیبانی از جفت‌ارزهای متنوع',
        'قابلیت برنامه‌ریزی زمانبندی',
        'هشدارهای قیمتی هوشمند'
      ]
    }
  ];

  const activeServiceData = services[activeService];

  return (
    <Box sx={{
      minHeight: '100vh',
    //   background: 'linear-gradient(135deg, #0a1929 0%, #0d1b2a 100%)',

      bgcolor: theme.palette.background.default,
      color: 'white',
      position: 'relative',
      overflow: 'hidden',
      pt: 8
    }}>
      {/* Animated Particles */}
      {[...Array(20)].map((_, i) => (
        <AnimatedParticle
          key={i}
          delay={i * 0.5}
          sx={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
          }}
        />
      ))}
      
      {/* Header Section */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: 8, textAlign: 'center' }}>
        <Typography 
          variant="h2" 
          sx={{
            fontWeight: 800,
            mb: 4,
            background: 'linear-gradient(90deg, #00c9ff 0%, #3b82f6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: { xs: '2.5rem', md: '3.5rem' }
          }}
        >
          خدمات حرفه‌ای صرافی ما
        </Typography>
        <Typography 
          variant="h5" 
          sx={{ 
            color: 'text.primary', 
            maxWidth: 800, 
            mx: 'auto',
            fontSize: { xs: '1.1rem', md: '1.25rem' }
          }}
        >
          پلتفرم امن و پیشرفته برای مبادلات ارز دیجیتال و خدمات مالی
        </Typography>
      </Container>
      
      {/* Main Content */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: 4 }}>
        <Grid container spacing={4}>
          {/* Services List */}
          <Grid item size={{xs:12, md:4}}>
            <Card sx={{ 
              background: 'rgba(21, 41, 75, 0.7)',
              backdropFilter: 'blur(10px)',
              borderRadius: 4,
              p: 3,
              border: '1px solid',
              borderColor: 'rgba(100, 149, 237, 0.2)',
              boxShadow: '0 8px 32px rgba(31, 38, 135, 0.2)'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.light', ml: 1 }}>
                  خدمات صرافی
                </Typography>
                <Box sx={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  bgcolor: 'primary.dark',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <CurrencyExchange sx={{ fontSize: 20 }} />
                </Box>
              </Box>
              
              <Box sx={{ display: 'grid', gap: 2 }}>
                {services.map((service) => (
                  <Card
                    key={service.id}
                    sx={{
                      p: 2,
                      borderRadius: 3,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      background: activeService === service.id ? service.color : 'rgba(55, 65, 100, 0.4)',
                      color: activeService === service.id ? 'white' : 'grey.300',
                      boxShadow: activeService === service.id ? 3 : 0,
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        boxShadow: '0 6px 15px rgba(0, 150, 255, 0.3)'
                      }
                    }}
                    onClick={() => {
                      setActiveService(service.id);
                      setIsHovering(true);
                    }}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        bgcolor: 'rgba(0, 0, 0, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2
                      }}>
                        {service.icon}
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {service.title}
                      </Typography>
                    </Box>
                  </Card>
                ))}
              </Box>
            </Card>
            
            {/* Stats Card */}
            <Card sx={{ 
              mt: 4,
              background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.5) 0%, rgba(76, 29, 149, 0.5) 100%)',
              backdropFilter: 'blur(10px)',
              borderRadius: 4,
              p: 3,
              border: '1px solid',
              borderColor: 'rgba(100, 149, 237, 0.3)',
              boxShadow: '0 8px 32px rgba(31, 38, 135, 0.2)'
            }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Card sx={{ textAlign: 'center', p: 2, bgcolor: 'rgba(21, 41, 75, 0.3)' }}>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.light' }}>
                      ۱M+
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'grey.300', mt: 1 }}>
                      کاربر فعال
                    </Typography>
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  <Card sx={{ textAlign: 'center', p: 2, bgcolor: 'rgba(21, 41, 75, 0.3)' }}>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.light' }}>
                      ۹۹.۹٪
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'grey.300', mt: 1 }}>
                      امنیت دارایی
                    </Typography>
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  <Card sx={{ textAlign: 'center', p: 2, bgcolor: 'rgba(21, 41, 75, 0.3)' }}>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.light' }}>
                      ۲۴/۷
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'grey.300', mt: 1 }}>
                      پشتیبانی
                    </Typography>
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  <Card sx={{ textAlign: 'center', p: 2, bgcolor: 'rgba(21, 41, 75, 0.3)' }}>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.light' }}>
                      ۰.۱٪
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'grey.300', mt: 1 }}>
                      کارمزد معاملات
                    </Typography>
                  </Card>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          
          {/* Service Details */}
          <Grid item size={{xs: 12,md:8}}>
            <Card sx={{ 
              height: '100%',
              background: 'linear-gradient(135deg, #0f1e3c 0%, #0a1529 100%)',
              borderRadius: 4,
              p: isMobile ? 3 : 4,
              border: '1px solid',
              borderColor: 'rgba(100, 149, 237, 0.2)',
              boxShadow: '0 12px 40px rgba(0, 100, 255, 0.2)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Animated Background Elements */}
              <Box sx={{
                position: 'absolute',
                top: 40,
                right: 40,
                width: 80,
                height: 80,
                borderRadius: '50%',
                bgcolor: 'primary.light',
                opacity: 0.1,
                filter: 'blur(20px)',
                animation: `${pulse} 4s infinite`
              }} />
              <Box sx={{
                position: 'absolute',
                bottom: 80,
                left: 80,
                width: 64,
                height: 64,
                borderRadius: '50%',
                bgcolor: 'secondary.light',
                opacity: 0.1,
                filter: 'blur(20px)',
                animation: `${pulse} 5s infinite`,
                animationDelay: '0.5s'
              }} />
              
              {/* Service Content */}
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 4 }}>
                  <Box sx={{
                    width: 80,
                    height: 80,
                    borderRadius: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: activeServiceData.color,
                    mr: 3
                  }}>
                    {activeServiceData.icon}
                  </Box>
                  <Box>
                    <Typography variant="h4" color="text.primary" sx={{ fontWeight: 800, mb: 1.5 }}>
                      {activeServiceData.title}
                    </Typography>
                    <Typography variant="body1" color="text.primary">
                      {activeServiceData.description}
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ mt: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <CheckCircle sx={{ color: 'primary.light', mr: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.light' }}>
                      ویژگی‌های کلیدی
                    </Typography>
                  </Box>
                  <Grid container spacing={2} sx={{ mb: 4 }}>
                    {activeServiceData.features.map((feature, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Card sx={{ 
                          p: 2, 
                          bgcolor: 'rgba(55, 75, 120, 0.3)', 
                          display: 'flex', 
                          alignItems: 'flex-start',
                          border: '1px solid rgba(100, 149, 237, 0.1)'
                        }}>
                          <Box sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            bgcolor: 'primary.light',
                            mt: 1.5,
                            mr: 1.5
                          }} />
                          <Typography variant="body1">
                            {feature}
                          </Typography>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                  
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForward />}
                    sx={{
                      background: 'linear-gradient(90deg, #00c9ff 0%, #3b82f6 100%)',
                      borderRadius: 50,
                      px: 4,
                      py: 1.5,
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      boxShadow: '0 4px 20px rgba(0, 201, 255, 0.3)',
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        boxShadow: '0 6px 25px rgba(0, 201, 255, 0.4)',
                        background: 'linear-gradient(90deg, #00b4f0 0%, #2a75f5 100%)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    شروع استفاده از سرویس
                  </Button>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
      
      {/* Testimonials Section */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
            نظرات کاربران
          </Typography>
          <Typography variant="body1" sx={{ color: 'grey.300', maxWidth: 600, mx: 'auto' }}>
            تجربه کاربران ما از خدمات صرافی
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {[1, 2, 3].map((item) => (
            <Grid item size={{xs: 12, md:4}} key={item}>
              <Card sx={{ 
                bgcolor: 'rgba(21, 41, 75, 0.5)',
                backdropFilter: 'blur(10px)',
                borderRadius: 4,
                p: 3,
                border: '1px solid',
                borderColor: 'rgba(100, 149, 237, 0.2)',
                height: '100%'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Box sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: 'linear-gradient(90deg, #00c9ff 0%, #3b82f6 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    mr: 2
                  }}>
                    {item}
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      کاربر حرفه‌ای
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'grey.400' }}>
                      معامله‌گر ارز دیجیتال
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body1" sx={{ color: 'grey.300', mb: 3 }}>
                  "سرعت و امنیت بالای این صرافی واقعاً قابل توجهه. کارمزد پایین و پشتیبانی 24 ساعته باعث شده تمام معاملاتم رو از اینجا انجام بدم."
                </Typography>
                <Box sx={{ display: 'flex', color: 'warning.main' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} fontSize="small" />
                  ))}
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      
      {/* CTA Section */}
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, py: 6 }}>
        <Card sx={{ 
          background: 'linear-gradient(135deg, rgba(8, 80, 178, 0.5) 0%, rgba(30, 30, 175, 0.5) 100%)',
          backdropFilter: 'blur(10px)',
          borderRadius: 4,
          p: isMobile ? 4 : 6,
          border: '1px solid',
          borderColor: 'rgba(100, 149, 237, 0.3)',
          boxShadow: '0 12px 40px rgba(0, 100, 255, 0.2)',
          textAlign: 'center'
        }}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
            آماده شروع معاملات هستید؟
          </Typography>
          <Typography variant="body1" sx={{ color: 'grey.300', mb: 4, maxWidth: 600, mx: 'auto' }}>
            همین حالا ثبت‌نام کنید و از خدمات حرفه‌ای صرافی ما بهره‌مند شوید
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row', 
            gap: 2, 
            justifyContent: 'center' 
          }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                background: 'linear-gradient(90deg, #00c9ff 0%, #3b82f6 100%)',
                borderRadius: 50,
                px: 4,
                py: 1.5,
                fontWeight: 700,
                fontSize: '1.1rem',
                boxShadow: '0 4px 20px rgba(0, 201, 255, 0.3)',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 6px 25px rgba(0, 201, 255, 0.4)',
                  background: 'linear-gradient(90deg, #00b4f0 0%, #2a75f5 100%)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              ثبت‌نام و شروع معامله
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'primary.light',
                color: 'white',
                borderRadius: 50,
                px: 4,
                py: 1.5,
                fontWeight: 700,
                fontSize: '1.1rem',
                '&:hover': {
                  bgcolor: 'rgba(0, 201, 255, 0.1)',
                  borderColor: 'primary.main',
                  transform: 'translateY(-3px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              مشاهده راهنما
            </Button>
          </Box>
        </Card>
      </Container>
      
      {/* Floating Decorations */}
      <Box sx={{
        position: 'fixed',
        top: '25%',
        right: 40,
        width: 24,
        height: 24,
        borderRadius: '50%',
        bgcolor: 'primary.light',
        opacity: 0.2,
        zIndex: 0,
        animation: `${pulse} 3s infinite`
      }} />
      <Box sx={{
        position: 'fixed',
        bottom: '33%',
        left: 40,
        width: 20,
        height: 20,
        borderRadius: '50%',
        bgcolor: 'secondary.light',
        opacity: 0.2,
        zIndex: 0,
        animation: `${pulse} 4s infinite`,
        animationDelay: '0.5s'
      }} />
      <Box sx={{
        position: 'fixed',
        top: '33%',
        left: '25%',
        width: 32,
        height: 32,
        borderRadius: '50%',
        bgcolor: 'primary.dark',
        opacity: 0.15,
        zIndex: 0,
        animation: `${pulse} 5s infinite`,
        animationDelay: '1s'
      }} />
    </Box>
  );
};

export default Services;