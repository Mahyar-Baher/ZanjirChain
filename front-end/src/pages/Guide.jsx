import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Divider,
  Skeleton,
  Fade,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

const steps = [
  {
    number: 1,
    title: 'ثبت‌نام سریع',
    description: 'با شماره موبایل ثبت‌نام کن و وارد شو.',
    icon: 'mdi:account-plus',
  },
  {
    number: 2,
    title: 'احراز هویت',
    description: 'اطلاعات کارت ملی و سلفی رو وارد کن.',
    icon: 'mdi:shield-account',
  },
  {
    number: 3,
    title: 'شروع خرید و فروش',
    description: 'از همین الان ارز دیجیتال معامله کن!',
    icon: 'mdi:swap-horizontal-bold',
  },
];

const features = [
  {
    title: 'تراکنش سریع',
    description: 'در کمترین زمان خرید و فروش انجام بده.',
    icon: 'mdi:lightning-bolt-outline',
  },
  {
    title: 'امنیت حرفه‌ای',
    description: 'حفاظت از دارایی با رمزنگاری و راستی‌آزمایی.',
    icon: 'mdi:lock-check-outline',
  },
  {
    title: 'کارمزد رقابتی',
    description: 'با کمترین کارمزد ممکن معامله کن.',
    icon: 'mdi:percent-outline',
  },
];

const Guide = () => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => setLoaded(true), 800); // شبیه‌سازی لودینگ اولیه
    return () => clearTimeout(delay);
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: (theme) => theme.palette.mode === 'dark' ? '#121212' : 'linear-gradient(135deg, #f4f6ff, #ffffff)',
        py: { xs: 6, md: 10 },
        transition: 'background 0.5s ease',
      }}
    >
      <Container maxWidth="lg">
        <Fade in={loaded} timeout={700}>
          <Stack spacing={6} textAlign="center" alignItems="center">
            {!loaded ? (
              <Skeleton variant="text" width={300} height={40} />
            ) : (
              <Box>
                <Typography variant="h4" fontWeight={700} color='text.secondary'>
                  خوش اومدی به دنیای معامله‌گری دیجیتال 🚀
                </Typography>
                <Typography
                  variant="body1"
                  mt={2}
                  maxWidth={600}
                  mx="auto"
                  color="text.secondary"
                >
                  فقط در ۳ قدم ساده ثبت‌نام کن و وارد دنیای خرید و فروش ارز دیجیتال شو.
                </Typography>
              </Box>
            )}

            <Grid container spacing={3}>
              {loaded
                ? steps.map((step) => (
                    <Grid item size={{xs:12,sm:4}} key={step.number}>
                      <Paper
                        elevation={0}
                        sx={{
                          border: '1px solid',
                          borderColor: 'divider',
                          p: 4,
                          borderRadius: 4,
                          transition: '0.3s',
                          bgcolor: 'background.paper',
                          '&:hover': {
                            boxShadow: 4,
                            transform: 'translateY(-4px)',
                          },
                        }}
                      >
                        <Stack spacing={2} alignItems="center">
                          <Box
                            sx={{
                              width: 50,
                              height: 50,
                              bgcolor: '#7878FF',
                              color: '#fff',
                              fontSize: 20,
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 'bold',
                            }}
                          >
                            {step.number}
                          </Box>
                          <Icon icon={step.icon} width={36} height={36} color="#7878FF" />
                          <Typography variant="h6" fontWeight={600}>
                            {step.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {step.description}
                          </Typography>
                        </Stack>
                      </Paper>
                    </Grid>
                  ))
                : Array.from(new Array(3)).map((_, i) => (
                    <Grid item size={{xs:12,sm:4}} key={i}>
                      <Skeleton variant="rectangular" height={220} sx={{ borderRadius: 4 }} />
                    </Grid>
                  ))}
            </Grid>

            <Divider sx={{ width: '90%', bgcolor: 'divider' }} />

            <Grid container spacing={3}>
              {loaded
                ? features.map((item) => (
                    <Grid item size={{xs:12,sm:4}} key={item.title}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 3,
                          borderRadius: 3,
                          textAlign: 'center',
                          bgcolor: 'background.default',
                          border: '1px solid',
                          borderColor: 'divider',
                          transition: '0.3s',
                          '&:hover': {
                            boxShadow: 3,
                            transform: 'translateY(-3px)',
                          },
                        }}
                      >
                        <Icon icon={item.icon} width={40} height={40} color="#7878FF" />
                        <Typography variant="h6" mt={2} fontWeight={600}>
                          {item.title}
                        </Typography>
                        <Typography variant="body2" mt={1} color="text.secondary">
                          {item.description}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))
                : Array.from(new Array(3)).map((_, i) => (
                    <Grid item size={{xs:12,sm:4}} key={i}>
                      <Skeleton variant="rectangular" height={160} sx={{ borderRadius: 4 }} />
                    </Grid>
                  ))}
            </Grid>

            {loaded ? (
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/login')}
                sx={{
                  width: '90%',
                  backgroundColor: '#7878FF',
                  px: 0,
                  py: 1.5,
                  borderRadius: 3,
                  fontWeight: 600,
                  fontSize: 16,
                  textTransform: 'none',
                  mt: 4,
                  '&:hover': {
                    backgroundColor: '#5f5fd1',
                  },
                }}
              >
                شروع کن
              </Button>
            ) : (
              <Skeleton variant="rounded" width="90%" height={55} sx={{ mt: 4, borderRadius: 3 }} />
            )}
          </Stack>
        </Fade>
      </Container>
    </Box>
  );
};

export default Guide;
