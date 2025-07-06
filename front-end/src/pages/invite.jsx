import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  Avatar,
  Divider,
  IconButton,
  Tooltip,
  useTheme
} from '@mui/material';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

const Invite = () => {
  const theme = useTheme();
  const [copied, setCopied] = useState(false);
  const [referralCode, setReferralCode] = useState('TETCRUZ-7890');
  const [friends, setFriends] = useState([
    { id: 1, name: 'علی محمدی', joined: '۱۴۰۲/۰۵/۱۰', reward: 5 },
    { id: 2, name: 'فاطمه احمدی', joined: '۱۴۰۲/۰۵/۰۵', reward: 5 },
    { id: 3, name: 'محمد حسینی', joined: '۱۴۰۲/۰۴/۲۸', reward: 5 },
  ]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const benefits = [
    { icon: 'mdi:gift', title: '۱۰ تتر جایزه', description: 'برای هر دوستی که ثبت‌نام کند' },
    { icon: 'mdi:currency-usd', title: '۵ تتر هدیه', description: 'برای دوست شما هنگام اولین معامله' },
    { icon: 'mdi:rocket', title: 'دسترسی ویژه', description: 'به امکانات پریمیوم پلتفرم' },
  ];

  return (
    <Box sx={{ 
      bgcolor: theme.palette.background.default,
      minHeight: '100vh',
      py: 6
    }}>
      <Container maxWidth="xl">
        {/* Hero Section */}
        <Grid container spacing={6} alignItems="center" sx={{ mb: 8 }}>
          <Grid item size={{xs: 12, sm: 12, md: 6, lg: 6}}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Typography 
                variant="h2" 
                fontWeight="bold" 
                color="text.primary"
                sx={{ mb: 3 }}
              >
                <Box component="span" color="#7878FF">دوستان خود را دعوت کنید</Box> و تتر پاداش بگیرید!
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                با دعوت هر دوست و اولین معامله او، ۱۰ تتر پاداش دریافت کنید و دوست شما نیز ۵ تتر هدیه بگیرد
              </Typography>
              
              <Box sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: 2,
                mt: 4 
              }}>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      bgcolor: '#7878FF',
                      px: 4,
                      py: 1.5,
                      borderRadius: 3,
                      fontSize: '1.1rem',
                      '&:hover': {
                        bgcolor: '#6969E0'
                      }
                    }}
                    onClick={copyToClipboard}
                  >
                    کپی لینک دعوت
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: '#25D366',
                      color: '#25D366',
                      px: 4,
                      py: 1.5,
                      borderRadius: 3,
                      fontSize: '1.1rem',
                      '&:hover': {
                        bgcolor: 'rgba(37, 211, 102, 0.1)',
                        borderColor: '#25D366'
                      }
                    }}
                  >
                  <Icon icon="mdi:whatsapp" sx={{mx:2}} />
                    ارسال از طریق واتس‌اپ
                  </Button>
                </motion.div>
              </Box>
            </motion.div>
          </Grid>
          
          <Grid item size={{xs: 12, sm: 12, md: 6, lg: 6}}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
            >
              <Box sx={{
                position: 'relative',
                bgcolor: 'background.paper',
                borderRadius: 4,
                p: 4,
                boxShadow: theme.shadows[10]
              }}>
                <Box sx={{
                  position: 'absolute',
                  top: -40,
                  right: 40,
                  bgcolor: '#7878FF',
                  color: 'white',
                  px: 3,
                  py: 1,
                  borderRadius: 3,
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  boxShadow: theme.shadows[5]
                }}>
                  پاداش شما: ۱۵ تتر
                </Box>
                
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  bgcolor: 'rgba(120, 120, 255, 0.1)',
                  p: 3,
                  borderRadius: 3,
                  mb: 4
                }}>
                  <Typography variant="h6" fontWeight="bold">
                    کد دعوت شما:
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="h5" fontWeight="bold" fontFamily="monospace">
                      {referralCode}
                    </Typography>
                    <Tooltip title={copied ? "کپی شد!" : "کپی کنید"} arrow>
                      <IconButton 
                        onClick={copyToClipboard}
                        sx={{ 
                          bgcolor: '#7878FF',
                          color: 'white',
                          '&:hover': { bgcolor: '#6969E0' }
                        }}
                      >
                        <Icon icon={copied ? "mdi:check" : "mdi:content-copy"} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
                
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-around',
                  textAlign: 'center',
                  mt: 4
                }}>
                  <Box>
                    <Typography variant="h3" fontWeight="bold" color="#7878FF">
                      ۳
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      دوستان دعوت شده
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h3" fontWeight="bold" color="#7878FF">
                      ۱۵
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      تتر جایزه
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h3" fontWeight="bold" color="#7878FF">
                      ۲
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      دوستان فعال
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
        
        {/* Benefits Section */}
        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={6} color="text.primary">
          مزایای دعوت دوستان
        </Typography>
        
        <Grid container spacing={4} sx={{ mb: 10 }}>
          {benefits.map((benefit, index) => (
            <Grid item size={{xs: 12, sm: 12, md: 4, lg: 4}} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card sx={{ 
                  height: '100%',
                  bgcolor: 'background.paper',
                  borderRadius: 4,
                  boxShadow: theme.shadows[4],
                  p: 4,
                  textAlign: 'center',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: theme.shadows[10]
                  }
                }}>
                  <Box sx={{
                    display: 'inline-flex',
                    bgcolor: 'rgba(120, 120, 255, 0.1)',
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3
                  }}>
                    <Icon icon={benefit.icon} width="40" height="40" color="#7878FF" />
                  </Box>
                  <Typography variant="h5" fontWeight="bold" mb={2}>
                    {benefit.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {benefit.description}
                  </Typography>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
        
        {/* How it works */}
        <Box sx={{
            bgcolor: 'background.paper',
            borderRadius: 4,
            p: { xs: 3, md: 5 },
            mb: 10,
            boxShadow: theme => theme.shadows[2],
            border: '1px solid',
            borderColor: 'divider',
            }}>
            <Typography variant="h4" fontWeight="bold" textAlign="center" mb={{ xs: 4, md: 6 }} color="text.primary">
                چگونه دوستان خود را دعوت کنیم؟
            </Typography>

            <Grid container spacing={3} justifyContent="center">
                {[1, 2, 3].map((step, index) => (
                <Grid item xs={12} md={4} key={index}>
                    <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.03 }}
                    >
                    <Box sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        bgcolor: 'rgba(120, 120, 255, 0.03)',
                        borderRadius: 3,
                        p: 4,
                        border: '1px solid',
                        borderColor: 'rgba(120, 120, 255, 0.1)',
                        boxShadow: '0 4px 20px rgba(120, 120, 255, 0.05)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                        boxShadow: '0 8px 25px rgba(120, 120, 255, 0.1)',
                        borderColor: 'rgba(120, 120, 255, 0.2)',
                        }
                    }}>
                        <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent:'space-between',
                        mb: 3,
                        }}>
                        <Box sx={{
                            width: 48,
                            height: 48,
                            borderRadius: '50%',
                            bgcolor: 'rgba(120, 120, 255, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mr: 2,
                            flexShrink: 0
                        }}>
                            <Typography variant="h5" fontWeight="bold" color="#7878FF">
                            {step}
                            </Typography>
                        </Box>
                        
                        <Box sx={{
                            width: 56,
                            height: 56,
                            borderRadius: '50%',
                            bgcolor: 'rgba(120, 120, 255, 0.05)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Icon 
                            icon={
                                index === 0 ? "mdi:content-copy" : 
                                index === 1 ? "mdi:share-variant" : 
                                "mdi:gift"
                            } 
                            width="32" 
                            height="32" 
                            color="#7878FF" 
                            />
                        </Box>
                        </Box>

                        <Typography variant="h6" fontWeight="bold" mb={1} color="#7878FF">
                        {index === 0 && 'کپی کد دعوت'}
                        {index === 1 && 'اشتراک‌گذاری دعوت'}
                        {index === 2 && 'دریافت پاداش'}
                        </Typography>
                        
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 2, lineHeight: 1.7 }}>
                        {index === 0 && 'کد دعوت خود را از بخش مشخص شده کپی کنید'}
                        {index === 1 && 'کد دعوت را با دوستان خود به اشتراک بگذارید'}
                        {index === 2 && 'پس از فعالیت دوستتان، پاداش خود را دریافت کنید'}
                        </Typography>
                        
                        <Box sx={{ 
                        height: 4, 
                        width: '100%', 
                        bgcolor: 'rgba(120, 120, 255, 0.05)', 
                        borderRadius: 2,
                        mt: 'auto',
                        position: 'relative',
                        overflow: 'hidden'
                        }}>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: ['0%', '100%', '100%'] }}
                            transition={{ 
                            duration: 1, 
                            delay: index * 0.3,
                            times: [0, 0.5, 1]
                            }}
                            style={{
                            position: 'absolute',
                            height: '100%',
                            background: 'linear-gradient(90deg, rgba(120,120,255,0.1) 0%, rgba(120,120,255,0.5) 100%)',
                            borderRadius: 2
                            }}
                        />
                        </Box>
                    </Box>
                    </motion.div>
                </Grid>
                ))}
            </Grid>
            </Box>
        
        {/* Invited Friends */}
        <Box sx={{ 
          bgcolor: 'background.paper',
          borderRadius: 4,
          p: 4,
          boxShadow: theme.shadows[4]
        }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4
          }}>
            <Typography variant="h4" fontWeight="bold" color="text.primary">
              دوستان دعوت شده
            </Typography>
            <Typography variant="body1" color="text.secondary">
              ۳ نفر
            </Typography>
          </Box>
          
          <Divider sx={{ mb: 4 }} />
          
          {friends.length > 0 ? (
            <Grid container spacing={3}>
              {friends.map((friend, index) => (
                <Grid item size={{xs: 12, sm: 12, md: 6, lg: 4}} key={friend.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      p: 3,
                      borderRadius: 3,
                      bgcolor: 'rgba(120, 120, 255, 0.05)',
                      borderLeft: '4px solid #7878FF'
                    }}>
                      <Avatar sx={{ width: 60, height: 60, mr: 3 }} />
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          {friend.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mb={1}>
                          عضو شده در: {friend.joined}
                        </Typography>
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          bgcolor: 'rgba(120, 120, 255, 0.1)',
                          px: 2,
                          py: 1,
                          borderRadius: 2,
                          width: 'fit-content'
                        }}>
                          <Icon icon="mdi:gift" width="20" height="20" color="#7878FF" />
                          <Typography variant="body2" fontWeight="bold" sx={{ ml: 1 }}>
                            {friend.reward} تتر جایزه
                          </Typography>
                        </Box>
                      </Box>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ 
              textAlign: 'center', 
              py: 6,
              bgcolor: 'rgba(120, 120, 255, 0.05)',
              borderRadius: 3
            }}>
              <Icon icon="mdi:account-group" width="80" height="80" color="#7878FF" />
              <Typography variant="h6" mt={2} mb={1}>
                هنوز دوستی دعوت نکرده‌اید
              </Typography>
              <Typography variant="body2" color="text.secondary">
                با دعوت دوستان خود، پاداش دریافت کنید
              </Typography>
            </Box>
          )}
        </Box>
        
        {/* CTA Section */}
        <Box sx={{ 
          textAlign: 'center', 
          mt: 10,
          mb: 6
        }}>
          <Typography variant="h3" fontWeight="bold" mb={4} color="text.primary">
            همین حالا دعوت دوستان را شروع کنید!
          </Typography>
          <Typography variant="h6" color="text.secondary" mb={6} sx={{ maxWidth: 700, mx: 'auto' }}>
            با هر دعوت موفق، ۱۰ تتر پاداش نقدی دریافت کنید و دوست شما نیز ۵ تتر هدیه بگیرد
          </Typography>
          
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: '#7878FF',
                px: 6,
                py: 2,
                borderRadius: 3,
                fontSize: '1.2rem',
                fontWeight: 'bold',
                '&:hover': {
                  bgcolor: '#6969E0'
                }
              }}
              onClick={copyToClipboard}
            >
               کپی لینک دعوت  
            </Button>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default Invite;