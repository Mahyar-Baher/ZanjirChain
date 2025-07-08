import React, { useState, useEffect, useMemo } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  Button, 
  Container,
  useTheme,
  useMediaQuery,
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
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [activeService, setActiveService] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  
  const services = useMemo(() => [
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
      description: 'مدیریت دارایی‌های دیجیتال با بالاترین سطح امنیتی',
      color: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      features: [
        'ذخیره سازی سرد و گرم',
        'پشتیبان‌گیری چندگانه',
        'دسترسی چند امضایی',
        'مدیریت آسان دارایی‌ها'
      ]
    },
    { 
      id: 2, 
      title: 'امنیت پیشرفته', 
      icon: <Security sx={{ fontSize: 40 }} />, 
      description: 'سیستم‌های امنیتی چند لایه برای محافظت از دارایی‌های شما',
      color: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
      features: [
        'احراز هویت دو مرحله‌ای',
        'رمزنگاری پیشرفته',
        'نظارت 24 ساعته',
        'سیستم هشدار فوری'
      ]
    },
    { 
      id: 3, 
      title: 'دریافت وام', 
      icon: <Paid sx={{ fontSize: 40 }} />, 
      description: 'دریافت وام با وثیقه ارز دیجیتال بدون نیاز به ضامن',
      color: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      features: [
        'سریع‌ترین فرآیند وام‌دهی',
        'نرخ سود رقابتی',
        'انعطاف در بازپرداخت',
        'پشتیبانی از دارایی‌های متنوع'
      ]
    },
    { 
      id: 4, 
      title: 'تبدیل خودکار', 
      icon: <SwapHoriz sx={{ fontSize: 40 }} />, 
      description: 'تبدیل خودکار ارزها با بهترین نرخ بدون کارمزد اضافی',
      color: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      features: [
        'تبدیل لحظه‌ای ارزها',
        'بدون کارمزد اضافی',
        'پشتیبانی از جفت ارزهای متنوع',
        'قابلیت برنامه‌ریزی زمانی'
      ]
    },
    { 
      id: 5, 
      title: 'استیکینگ', 
      icon: <Lock sx={{ fontSize: 40 }} />, 
      description: 'کسب سود از دارایی‌های دیجیتال بدون نیاز به معامله',
      color: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
      features: [
        'سود روزانه تا 20% APR',
        'قابلیت لغو هر زمان',
        'پشتیبانی از ارزهای متنوع',
        'سود مرکب'
      ]
    },
    { 
      id: 6, 
      title: 'تحلیل بازار', 
      icon: <BarChart sx={{ fontSize: 40 }} />, 
      description: 'ابزارهای حرفه‌ای تحلیل بازار و پیش‌بینی روندها',
      color: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
      features: [
        'نمودارهای پیشرفته',
        'اندیکاتورهای تخصصی',
        'هشدارهای قیمتی',
        'تحلیل‌گر خودکار'
      ]
    },
    { 
      id: 7, 
      title: 'API معاملاتی', 
      icon: <Api sx={{ fontSize: 40 }} />, 
      description: 'اتصال سیستم‌های معاملاتی شخصی به صرافی',
      color: 'linear-gradient(135deg, #64748b 0%, #475569 100%)',
      features: [
        'API قدرتمند REST و Websocket',
        'پشتیبانی از زبان‌های برنامه‌نویسی',
        'امکان ایجاد ربات معامله‌گر',
        'مستندات کامل'
      ]
    }
  ], []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovering) {
        setActiveService(prev => prev === 7 ? 0 : prev + 1);
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isHovering]);

  const activeServiceData = services[activeService];

  return (
    <Box sx={{
      minHeight: '100vh',
      bgcolor: theme.palette.background.default,
      color: 'white',
      position: 'relative',
      overflow: 'hidden',
      pt: 8
    }}>
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
              background: theme.palette.mode === 'dark' 
                ? 'rgba(21, 41, 75, 0.7)' 
                : 'rgba(240, 240, 245, 0.9)',
              borderRadius: 4,
              p: 3,
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, ml: 1, color: 'text.primary' }}>
                  خدمات صرافی
                </Typography>
                <Box sx={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <CurrencyExchange sx={{ fontSize: 20, color: 'white' }} />
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
                      background: activeService === service.id ? service.color : 
                        theme.palette.mode === 'dark' 
                          ? 'rgba(55, 65, 100, 0.4)' 
                          : 'rgba(230, 230, 245, 0.7)',
                      color: activeService === service.id ? 'white' : 'text.primary',
                      boxShadow: activeService === service.id ? 3 : 0,
                      '&:hover': {
                        transform: 'translateY(-3px)',
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
                        bgcolor: 'rgba(0, 0, 0, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 2
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
              background: theme.palette.mode === 'dark'
                ? 'rgba(30, 64, 175, 0.3)'
                : 'rgba(230, 230, 245, 0.7)',
              borderRadius: 4,
              p: 3,
            }}>
              <Grid container spacing={2}>
                {[
                  { value: '۱M+', label: 'کاربر فعال' },
                  { value: '۹۹.۹٪', label: 'امنیت دارایی' },
                  { value: '۲۴/۷', label: 'پشتیبانی' },
                  { value: '۰.۱٪', label: 'کارمزد معاملات' }
                ].map((stat, i) => (
                  <Grid item size={{xs:6}} key={i}>
                    <Card sx={{ 
                      textAlign: 'center', 
                      p: 2, 
                      bgcolor: theme.palette.mode === 'dark'
                        ? 'rgba(21, 41, 75, 0.3)'
                        : 'rgba(245, 245, 255, 0.5)'
                    }}>
                      <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.main' }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                        {stat.label}
                      </Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Card>
          </Grid>
          
          {/* Service Details */}
          <Grid item size={{xs:12, md:8}}>
            <Card sx={{ 
              height: '100%',
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, #0f1e3c 0%, #0a1529 100%)'
                : 'linear-gradient(135deg, #f0f4ff 0%, #e6f0ff 100%)',
              borderRadius: 4,
              p: isMobile ? 3 : 4,
              position: 'relative',
            }}>
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
                    mx: 3
                  }}>
                    {activeServiceData.icon}
                  </Box>
                  <Box>
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        fontWeight: 800, 
                        mb: 1.5,
                        color: theme.palette.mode === 'dark' ? 'white' : 'text.primary'
                      }}
                    >
                      {activeServiceData.title}
                    </Typography>
                    <Typography variant="body1" color="text.primary">
                      {activeServiceData.description}
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ mt: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <CheckCircle sx={{ color: 'primary.main', mr: 1 }} />
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 600, 
                        color: 'primary.main' 
                      }}
                    >
                      ویژگی‌های کلیدی
                    </Typography>
                  </Box>
                  <Grid container spacing={2} sx={{ mb: 4 }}>
                    {activeServiceData.features.map((feature, index) => (
                      <Grid item size={{xs:12, md:6}} key={index}>
                        <Card sx={{ 
                          p: 2, 
                          bgcolor: theme.palette.mode === 'dark'
                            ? 'rgba(55, 75, 120, 0.3)'
                            : 'rgba(245, 245, 255, 0.7)',
                          display: 'flex', 
                          alignItems: 'flex-start',
                        }}>
                          <Box sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            bgcolor: 'primary.main',
                            mt: 1.5,
                            mr: 1.5
                          }} />
                          <Typography variant="body1" color="text.primary">
                            {feature}
                          </Typography>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                  
                  <Button
                    variant="contained"
                    size="large"
                    onClick={()=> {navigate("/login")}}
                    startIcon={<ArrowForward />}
                    sx={{
                      background: 'linear-gradient(90deg, #00c9ff 0%, #3b82f6 100%)',
                      borderRadius: 50,
                      px: 4,
                      py: 1.5,
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      boxShadow: '0 4px 10px rgba(0, 201, 255, 0.3)',
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
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, color: 'text.primary' }}>
            نظرات کاربران
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
            تجربه کاربران ما از خدمات صرافی
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {[1, 2, 3].map((item) => (
            <Grid item size={{xs:12, md:4}} key={item}>
              <Card sx={{ 
                bgcolor: theme.palette.mode === 'dark'
                  ? 'rgba(21, 41, 75, 0.5)'
                  : 'rgba(240, 240, 245, 0.8)',
                borderRadius: 4,
                p: 3,
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
                    mr: 2,
                    color: 'white'
                  }}>
                    {item}
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
                      کاربر حرفه‌ای
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      معامله‌گر ارز دیجیتال
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
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
          borderRadius: 4,
          p: isMobile ? 4 : 6,
          textAlign: 'center'
        }}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, color: 'text.primary' }}>
            آماده شروع معاملات هستید؟
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, maxWidth: 600, mx: 'auto' }}>
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
              onClick={()=> {navigate('/login')}}
              sx={{
                background: 'linear-gradient(90deg, #00c9ff 0%, #3b82f6 100%)',
                borderRadius: 50,
                px: 4,
                py: 1.5,
                fontWeight: 700,
                fontSize: '1.1rem',
                boxShadow: '0 4px 10px rgba(0, 201, 255, 0.3)',
                transition: 'all 0.3s ease'
              }}
            >
              ثبت‌نام و شروع معامله
            </Button>
          </Box>
        </Card>
      </Container>
    </Box>
  );
};

export default Services;