import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  TextField, 
  Button, 
  Card,
  CardContent,
  CircularProgress,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  LocationOn, 
  Phone, 
  Email, 
  Send,
  CheckCircle 
} from '@mui/icons-material';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

const Contact = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const ContactInfoItem = ({ icon, title, content }) => (
    <Box sx={{ display: 'flex', mb: 3, alignItems: 'flex-start' }}>
      <Box sx={{ ml: 2, mt: 0.5 }}>
        {icon}
      </Box>
      <Box>
        <Typography variant="subtitle1" fontWeight="bold" mb={0.5}>
          {title}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ 
            direction: 'ltr',
            textAlign: 'right', // برای اطمینان از چپ‌چین شدن اعداد
            unicodeBidi: 'plaintext' // مهم برای نمایش صحیح اعداد
          }}
        >
          {content}
        </Typography>
      </Box>
    </Box>
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
      setIsLoading(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  if (isLoading) {
    return (
      <Box sx={{ 
        height: '50vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '78vh',
      px: { xs: 2, md: 6 },
      py: 6,
      direction: 'rtl',
       bgcolor: (theme) => theme.palette.background.default 
    }}>
      <Container maxWidth="xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Typography 
            variant="h4" 
            fontWeight="bold" 
            color="text.secondary" 
            gutterBottom
            sx={{ textAlign: 'center' }}
          >
            تماس با <span style={{ color: '#7878FF' }}>تترکروز</span> 📞
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            mb={4}
            sx={{ 
              textAlign: 'center',
              maxWidth: 700,
              mx: 'auto'
            }}
          >
            هر سوال یا پیشنهادی دارید؟ با خیال راحت با ما در میان بگذارید.
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          <Grid item size={{xs:12, md:5}}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card elevation={2} sx={{ borderRadius: 4, height: '100%' }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h6" fontWeight="bold" mb={3} color="#7878FF">
                    اطلاعات تماس
                  </Typography>
                  
                  <ContactInfoItem 
                    icon={<LocationOn sx={{ color: '#7878FF' }} />}
                    title="آدرس دفتر"
                    content="خیابان انقلاب، بین دانشگاه و ابوریحان، ساختمان فروردین"
                  />
                  <ContactInfoItem 
                    icon={<Phone sx={{ color: '#7878FF' }} />}
                    title="تلفن پشتیبانی"
                    content="+۹۸ ۲۱ ۲۲۲۲ ۱۲۳۴"
                    />
                  
                  <ContactInfoItem 
                    icon={<Email sx={{ color: '#7878FF' }} />}
                    title="ایمیل"
                    content="support@tetrocruz.ir"
                  />

                  <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" fontWeight="bold" mb={2} color="#7878FF">
                      ساعات کاری
                    </Typography>
                    <Typography variant="body1" fontWeight='900' color="text.secondary">
                      شنبه تا چهارشنبه: ۹ صبح تا ۵ عصر
                    </Typography>
                    <Typography variant="body1" fontWeight='900' color="text.secondary">
                      پنجشنبه: ۹ صبح تا ۱ بعدازظهر
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
          
          <Grid item size={{xs:12, md: 7}}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card elevation={2} sx={{ borderRadius: 4 }}>
                <CardContent sx={{ p: 4 }}>
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{ textAlign: 'center', padding: '40px 0' }}
                    >
                      <CheckCircle sx={{ fontSize: 60, color: '#7878FF', mb: 2 }} />
                      <Typography variant="h6" fontWeight="bold">
                        پیام شما ارسال شد!
                      </Typography>
                      <Typography variant="body2" color="text.secondary" mt={1}>
                        همکاران ما در کمتر از ۲۴ ساعت پاسخ خواهند داد
                      </Typography>
                    </motion.div>
                  ) : (
                    <>
                      <Typography variant="h6" fontWeight="bold" mb={3} color="#7878FF">
                        فرم تماس
                      </Typography>
                      <form onSubmit={handleSubmit}>
                        <Grid container spacing={1}>
                          <Grid item size={{xs:12, md:6}}>
                            <TextField
                              fullWidth
                              label="نام کامل"
                              variant="outlined"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              sx={{ borderRadius: 3 }}
                            />
                          </Grid>
                          
                          <Grid item size={{xs:12, md:6}}>
                            <TextField
                              fullWidth
                              label="آدرس ایمیل"
                              variant="outlined"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              sx={{ borderRadius: 3 }}
                            />
                          </Grid>
                          
                          <Grid item size={{xs:12}}>
                            <TextField
                              fullWidth
                              label="موضوع"
                              variant="outlined"
                              name="subject"
                              value={formData.subject}
                              onChange={handleChange}
                              required
                              sx={{ borderRadius: 3 }}
                            />
                          </Grid>
                          
                          <Grid item size={{xs:12}}>
                            <TextField
                              fullWidth
                              label="متن پیام"
                              variant="outlined"
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              required
                              multiline
                              rows={5}
                              sx={{ borderRadius: 3 }}
                            />
                          </Grid>
                          
                          <Grid item size={{xs:12}}>
                            <motion.div
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.94 }}
                            >
                              <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                fullWidth
                                startIcon={<Send sx={{mx: 1}} />}
                                sx={{
                                  borderRadius: 3,
                                  py: 1.5,
                                  fontWeight: 700,
                                  fontSize: '1rem',
                                  backgroundColor: '#7878FF',
                                  '&:hover': {
                                    backgroundColor: '#6969E0'
                                  }
                                }}
                              >
                                ارسال پیام
                              </Button>
                            </motion.div>
                          </Grid>
                        </Grid>
                      </form>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
        
        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{ marginTop: '40px' }}
        >
          <Typography variant="h5" fontWeight="bold" mb={2} textAlign="center" color="text.secondary">
            ما اینجا هستیم
          </Typography>
          
          <Card elevation={2} sx={{ borderRadius: 4, overflow: 'hidden' }}>
            <Box sx={{
              height: isMobile ? 300 : 400,
              position: 'relative'
            }}>
              <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d810.0059970541735!2d51.3990752!3d35.7010273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e010566a742fb%3A0x29a49a217d4e3e6d!2sParto%20Computer%20Academy!5e0!3m2!1sen!2s!4v1751725112045!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </Box>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
};

// Reusable contact info component
const ContactInfoItem = ({ icon, title, content }) => (
  <Box sx={{ display: 'flex', mb: 3, alignItems: 'flex-start' }}>
    <Box sx={{ ml: 2, mt: 0.5 }}>
      {icon}
    </Box>
    <Box>
      <Typography variant="subtitle1" fontWeight="bold" mb={0.5}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {content}
      </Typography>
    </Box>
  </Box>
);

export default Contact;