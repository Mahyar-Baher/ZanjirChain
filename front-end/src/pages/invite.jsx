/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  TextField,
  Card,
  Avatar,
  Divider,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Invite = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
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

  if (!user) {
    // Non-logged-in user view
    return (
      <Box sx={{
        bgcolor: theme.palette.background.default,
        minHeight: '100vh',
        py: { xs: 4, md: 6 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Box sx={{
              textAlign: 'center',
              bgcolor: 'background.paper',
              borderRadius: 4,
              p: { xs: 3, md: 5 },
              boxShadow: theme.shadows[10],
            }}>
              <Typography
                variant={isMobile ? "h4" : "h2"}
                fontWeight="bold"
                color="text.primary"
                sx={{ mb: 3 }}
              >
                <Box component="span" color="#1a652a">دعوت دوستان</Box> و کسب تتر رایگان!
              </Typography>
              <Typography
                variant={isMobile ? "body1" : "h6"}
                color="text.secondary"
                sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}
              >
                با ورود به حساب کاربری خود، می‌توانید دوستانتان را دعوت کنید و به ازای هر دعوت موفق ۱۰ تتر پاداش دریافت کنید. دوست شما نیز ۵ تتر هدیه می‌گیرد!
              </Typography>
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mb: 4,
              }}>
                <Icon icon="mdi:gift" width={isMobile ? 60 : 80} height={isMobile ? 60 : 80} color="#1a652a" />
              </Box>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  variant="contained"
                  size="large"
                  component={Link}
                  to="/login"
                  sx={{
                    bgcolor: '#1a652a',
                    px: { xs: 4, md: 6 },
                    py: { xs: 1.5, md: 2 },
                    borderRadius: 3,
                    fontSize: { xs: '0.9rem', md: '1.2rem' },
                    fontWeight: 'bold',
                    '&:hover': {
                      bgcolor: '#14501F',
                    },
                  }}
                >
                  ورود / ثبت‌نام
                </Button>
              </motion.div>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 3, fontSize: { xs: '0.8rem', md: '1rem' } }}
              >
                همین حالا به زنجیراکس بپیوندید و از مزایای دعوت دوستان بهره‌مند شوید!
              </Typography>
            </Box>
          </motion.div>
        </Container>
      </Box>
    );
  }

  // Logged-in user view
  return (
    <Box sx={{ 
      bgcolor: theme.palette.background.default,
      minHeight: '100vh',
      py: { xs: 4, md: 6 },
    }}>
      <Container maxWidth="xl">
        {/* Hero Section */}
        <Grid container spacing={{ xs: 3, md: 6 }} alignItems="center" sx={{ mb: { xs: 4, md: 8 } }}>
          <Grid item size={{ xs: 12, md: 6 }}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Typography 
                variant={isMobile ? "h4" : "h2"} 
                fontWeight="bold" 
                color="text.primary"
                sx={{ mb: 3, textAlign: { xs: 'center', md: 'left' } }}
              >
                <Box component="span" color="#1a652a">دوستان خود را دعوت کنید</Box> و تتر پاداش بگیرید!
              </Typography>
              <Typography 
                variant={isMobile ? "body1" : "h6"} 
                color="text.secondary" 
                sx={{ mb: 4, textAlign: { xs: 'center', md: 'left' } }}
              >
                با دعوت هر دوست و اولین معامله او، ۱۰ تتر پاداش دریافت کنید و دوست شما نیز ۵ تتر هدیه بگیرد
              </Typography>
              
              <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                mt: 4,
                justifyContent: { xs: 'center', md: 'flex-start' },
              }}>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      bgcolor: '#1a652a',
                      px: 4,
                      py: 1.5,
                      borderRadius: 3,
                      fontSize: { xs: '0.9rem', md: '1.1rem' },
                      width: { xs: '100%', sm: 'auto' },
                      '&:hover': {
                        bgcolor: '#14501F',
                      },
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
                      fontSize: { xs: '0.9rem', md: '1.1rem' },
                      width: { xs: '100%', sm: 'auto' },
                      '&:hover': {
                        bgcolor: 'rgba(37, 211, 102, 0.1)',
                        borderColor: '#25D366',
                      },
                    }}
                  >
                    <Icon icon="mdi:whatsapp" width={24} sx={{ mr: 1 }} />
                    ارسال از طریق واتس‌اپ
                  </Button>
                </motion.div>
              </Box>
            </motion.div>
          </Grid>
          
          <Grid item size={{ xs: 12, md: 6 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
            >
              <Box sx={{
                position: 'relative',
                bgcolor: 'background.paper',
                borderRadius: 4,
                p: { xs: 3, md: 4 },
                boxShadow: theme.shadows[10],
              }}>
                <Box sx={{
                  position: 'absolute',
                  top: { xs: -30, md: -40 },
                  right: { xs: 20, md: 40 },
                  bgcolor: '#1a652a',
                  color: 'white',
                  px: 3,
                  py: 1,
                  borderRadius: 3,
                  fontSize: { xs: '1rem', md: '1.2rem' },
                  fontWeight: 'bold',
                  boxShadow: theme.shadows[5],
                }}>
                  پاداش شما: ۱۵ تتر
                </Box>
                
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  bgcolor: '#1a652a',
                  p: { xs: 2, md: 3 },
                  borderRadius: 3,
                  mb: 4,
                }}>
                  <Typography 
                    variant={isMobile ? "body1" : "h6"} 
                    color="white" 
                    fontWeight="bold"
                  >
                    کد دعوت شما:
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography 
                      variant={isMobile ? "body1" : "h5"} 
                      color="white" 
                      fontWeight="bold" 
                      fontFamily="monospace"
                    >
                      {referralCode}
                    </Typography>
                    <Tooltip title={copied ? "کپی شد!" : "کپی کنید"} arrow>
                      <IconButton 
                        onClick={copyToClipboard}
                        sx={{ 
                          bgcolor: '#14501F',
                          color: 'white',
                          '&:hover': { bgcolor: '#0d3a1a' },
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
                  mt: 4,
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: { xs: 2, sm: 0 },
                }}>
                  <Box>
                    <Typography 
                      variant={isMobile ? "h5" : "h3"} 
                      fontWeight="bold" 
                      color="#1a652a"
                    >
                      ۳
                    </Typography>
                    <Typography 
                      variant="body1" 
                      color="text.secondary"
                    >
                      دوستان دعوت شده
                    </Typography>
                  </Box>
                  <Box>
                    <Typography 
                      variant={isMobile ? "h5" : "h3"} 
                      fontWeight="bold" 
                      color="#1a652a"
                    >
                      ۱۵
                    </Typography>
                    <Typography 
                      variant="body1" 
                      color="text.secondary"
                    >
                      تتر جایزه
                    </Typography>
                  </Box>
                  <Box>
                    <Typography 
                      variant={isMobile ? "h5" : "h3"} 
                      fontWeight="bold" 
                      color="#1a652a"
                    >
                      ۲
                    </Typography>
                    <Typography 
                      variant="body1" 
                      color="text.secondary"
                    >
                      دوستان فعال
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
        
        {/* Benefits Section */}
        <Typography 
          variant={isMobile ? "h5" : "h4"} 
          fontWeight="bold" 
          textAlign="center" 
          mb={{ xs: 4, md: 6 }} 
          color="text.primary"
        >
          مزایای دعوت دوستان
        </Typography>
        
        <Grid container spacing={{ xs: 2, md: 4 }} sx={{ mb: { xs: 6, md: 10 } }}>
          {benefits.map((benefit, index) => (
            <Grid item size={{ xs: 12, md: 4 }} key={index}>
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
                  p: { xs: 2, md: 4 },
                  textAlign: 'center',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: theme.shadows[10],
                  },
                }}>
                  <Box sx={{
                    display: 'inline-flex',
                    bgcolor: '#1a652a',
                    width: { xs: 60, md: 80 },
                    height: { xs: 60, md: 80 },
                    borderRadius: '50%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                  }}>
                    <Icon icon={benefit.icon} width={isMobile ? 30 : 40} height={isMobile ? 30 : 40} color="white" />
                  </Box>
                  <Typography 
                    variant={isMobile ? "h6" : "h5"} 
                    fontWeight="bold" 
                    mb={2}
                  >
                    {benefit.title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    color="text.secondary"
                    sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}
                  >
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
          p: { xs: 2, md: 5 },
          mb: { xs: 6, md: 10 },
          boxShadow: theme.shadows[2],
          border: '1px solid',
          borderColor: 'divider',
        }}>
          <Typography 
            variant={isMobile ? "h5" : "h4"} 
            fontWeight="bold" 
            textAlign="center" 
            mb={{ xs: 3, md: 6 }} 
            color="text.primary"
          >
            چگونه دوستان خود را دعوت کنیم؟
          </Typography>

          <Grid container spacing={{ xs: 2, md: 3 }} justifyContent="center">
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
                    p: { xs: 2, md: 4 },
                    border: '1px solid',
                    borderColor: '#1a652a',
                    boxShadow: '0 4px 20px rgba(120, 120, 255, 0.05)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 8px 25px #1a652a',
                      borderColor: '#1a652a',
                    },
                  }}>
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      mb: 3,
                    }}>
                      <Box sx={{
                        width: { xs: 40, md: 48 },
                        height: { xs: 40, md: 48 },
                        borderRadius: '50%',
                        bgcolor: '#1a652a',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2,
                        flexShrink: 0,
                      }}>
                        <Typography 
                          variant={isMobile ? "h6" : "h5"} 
                          fontWeight="bold" 
                          color="white"
                        >
                          {step}
                        </Typography>
                      </Box>
                      
                      <Box sx={{
                        width: { xs: 48, md: 56 },
                        height: { xs: 48, md: 56 },
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
                          width={isMobile ? 24 : 32} 
                          height={isMobile ? 24 : 32} 
                          color="#1a652a" 
                        />
                      </Box>
                    </Box>

                    <Typography 
                      variant={isMobile ? "body1" : "h6"} 
                      fontWeight="bold" 
                      mb={1} 
                      color="#1a652a"
                    >
                      {index === 0 && 'کپی کد دعوت'}
                      {index === 1 && 'اشتراک‌گذاری دعوت'}
                      {index === 2 && 'دریافت پاداش'}
                    </Typography>
                    
                    <Typography 
                      variant="body1" 
                      color="text.secondary" 
                      sx={{ mb: 2, lineHeight: 1.7, fontSize: { xs: '0.9rem', md: '1rem' } }}
                    >
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
                      overflow: 'hidden',
                    }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: ['0%', '100%', '100%'] }}
                        transition={{ 
                          duration: 1, 
                          delay: index * 0.3,
                          times: [0, 0.5, 1],
                        }}
                        style={{
                          position: 'absolute',
                          height: '100%',
                          background: 'linear-gradient(90deg, rgba(120,120,255,0.1) 0%, rgba(120,120,255,0.5) 100%)',
                          borderRadius: 2,
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
          p: { xs: 2, md: 4 },
          boxShadow: theme.shadows[4],
        }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4,
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 2, sm: 0 },
          }}>
            <Typography 
              variant={isMobile ? "h5" : "h4"} 
              fontWeight="bold" 
              color="text.primary"
            >
              دوستان دعوت شده
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary"
            >
              ۳ نفر
            </Typography>
          </Box>
          
          <Divider sx={{ mb: 4 }} />
          
          {friends.length > 0 ? (
            <Grid container spacing={{ xs: 2, md: 3 }}>
              {friends.map((friend, index) => (
                <Grid item size={{ xs: 12, md: 6, lg: 4 }} key={friend.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      p: { xs: 2, md: 3 },
                      borderRadius: 3,
                      bgcolor: 'rgba(120, 120, 255, 0.05)',
                      borderLeft: '4px solid #1a652a',
                    }}>
                      <Avatar sx={{ width: { xs: 48, md: 60 }, height: { xs: 48, md: 60 }, mr: 3 }} />
                      <Box>
                        <Typography 
                          variant={isMobile ? "body1" : "h6"} 
                          fontWeight="bold"
                        >
                          {friend.name}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          color="text.secondary" 
                          mb={1}
                          sx={{ fontSize: { xs: '0.8rem', md: '0.9rem' } }}
                        >
                          عضو شده در: {friend.joined}
                        </Typography>
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          bgcolor: '#1a652a',
                          px: 2,
                          py: 1,
                          borderRadius: 2,
                          width: 'fit-content',
                        }}>
                          <Icon icon="mdi:gift" width={20} height={20} color="white" />
                          <Typography 
                            variant="body2" 
                            fontWeight="bold" 
                            sx={{ ml: 1, color: 'white' }}
                          >
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
              borderRadius: 3,
            }}>
              <Icon icon="mdi:account-group" width={isMobile ? 60 : 80} height={isMobile ? 60 : 80} color="#1a652a" />
              <Typography 
                variant={isMobile ? "body1" : "h6"} 
                mt={2} 
                mb={1}
              >
                هنوز دوستی دعوت نکرده‌اید
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ fontSize: { xs: '0.8rem', md: '1rem' } }}
              >
                با دعوت دوستان خود، پاداش دریافت کنید
              </Typography>
            </Box>
          )}
        </Box>
        
        {/* CTA Section */}
        <Box sx={{ 
          textAlign: 'center', 
          mt: { xs: 6, md: 10 },
          mb: { xs: 4, md: 6 },
        }}>
          <Typography 
            variant={isMobile ? "h5" : "h3"} 
            fontWeight="bold" 
            mb={4} 
            color="text.primary"
          >
            همین حالا دعوت دوستان را شروع کنید!
          </Typography>
          <Typography 
            variant={isMobile ? "body1" : "h6"} 
            color="text.secondary" 
            mb={6} 
            sx={{ maxWidth: { xs: '100%', md: 700 }, mx: 'auto' }}
          >
            با هر دعوت موفق، ۱۰ تتر پاداش نقدی دریافت کنید و دوست شما نیز ۵ تتر هدیه بگیرد
          </Typography>
          
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: '#1a652a',
                px: { xs: 4, md: 6 },
                py: { xs: 1.5, md: 2 },
                borderRadius: 3,
                fontSize: { xs: '0.9rem', md: '1.2rem' },
                fontWeight: 'bold',
                width: { xs: '100%', sm: 'auto' },
                '&:hover': {
                  bgcolor: '#14501F',
                },
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