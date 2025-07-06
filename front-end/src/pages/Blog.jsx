import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Avatar,
  Divider,
  useTheme
} from '@mui/material';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

const Blog = () => {
  const theme = useTheme();
  
  const blogPosts = [
    {
      id: 1,
      title: 'آموزش کامل خرید و فروش تتر',
      excerpt: 'راهنمای جامع معاملات تتر با کمترین کارمزد و بالاترین امنیت',
      image: '../../public/media/images/bg_home.png',
      date: '۱۴۰۲/۰۵/۱۵',
      author: 'تیم تترکروز',
      category: 'آموزشی',
      readTime: '۵ دقیقه'
    },
    {
      id: 2,
      title: 'تحلیل بازار ارزهای دیجیتال',
      excerpt: 'بررسی روندهای بازار در هفته گذشته و پیش‌بینی آینده',
      image: '../../public/media/images/bg_home.png',
      date: '۱۴۰۲/۰۵/۱۰',
      author: 'کارشناس بازار',
      category: 'تحلیل',
      readTime: '۸ دقیقه'
    },
    {
      id: 3,
      title: 'امنیت در معاملات ارز دیجیتال',
      excerpt: '۱۰ روش برای افزایش امنیت کیف پول و معاملات شما',
      image: '../../public/media/images/bg_home.png',
      date: '۱۴۰۲/۰۵/۰۵',
      author: 'متخصص امنیت',
      category: 'امنیت',
      readTime: '۱۲ دقیقه'
    },
    {
      id: 4,
      title: 'راهنمای انتخاب کیف پول مناسب',
      excerpt: 'مقایسه کیف پول‌های مختلف و ویژگی‌های آنها',
      image: '../../public/media/images/bg_home.png',
      date: '۱۴۰۲/۰۴/۲۸',
      author: 'کارشناس فنی',
      category: 'آموزشی',
      readTime: '۷ دقیقه'
    },
    {
      id: 5,
      title: 'آخرین اخبار دنیای کریپتو',
      excerpt: 'به‌روزرسانی‌های مهم هفته در دنیای ارزهای دیجیتال',
      image: '../../public/media/images/bg_home.png',
      date: '۱۴۰۲/۰۴/۲۰',
      author: 'خبرنگار ارشد',
      category: 'خبری',
      readTime: '۶ دقیقه'
    },
    {
      id: 6,
      title: 'تتر چیست و چگونه کار می‌کند؟',
      excerpt: 'بررسی کامل تتر و مکانیسم‌های پشتیبانی آن',
      image: '../../public/media/images/bg_home.png',
      date: '۱۴۰۲/۰۴/۱۵',
      author: 'تحلیلگر ارشد',
      category: 'آموزشی',
      readTime: '۱۰ دقیقه'
    }
  ];

  const categories = [
    { name: 'همه مقالات', count: 15 },
    { name: 'آموزشی', count: 6 },
    { name: 'تحلیل', count: 4 },
    { name: 'امنیت', count: 3 },
    { name: 'خبری', count: 2 }
  ];

  return (
    <Box sx={{ 
      bgcolor: theme.palette.background.default,
      py: 6
    }}>
      <Container maxWidth="xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography 
            variant="h3" 
            fontWeight="bold" 
            textAlign="center" 
            mb={2}
            color="text.primary"
          >
            وبلاگ تترکروز
          </Typography>
          <Typography 
            variant="h6" 
            textAlign="center" 
            mb={6}
            color="text.secondary"
          >
            آخرین مقالات و آموزش‌های دنیای ارزهای دیجیتال
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          <Grid item size={{xs: 12, sm: 12, md: 4, lg: 3}}>
            <Card sx={{ 
              position: 'sticky',
              top: 20,
              borderRadius: 4,
              boxShadow: theme.shadows[4],
              p: 3
            }}>
              <Typography variant="h6" fontWeight="bold" mb={3}>
                دسته‌بندی‌ها
              </Typography>
              
              {categories.map((category, index) => (
                <Box 
                  key={index} 
                  sx={{ 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    py: 1.5,
                    borderBottom: index !== categories.length - 1 ? '1px solid' : 'none',
                    borderColor: 'divider',
                    cursor: 'pointer',
                    '&:hover': {
                      color: '#7878FF'
                    }
                  }}
                >
                  <Typography variant="body1">{category.name}</Typography>
                  <Chip 
                    label={category.count} 
                    size="small" 
                    sx={{ 
                      bgcolor: '#7878FF',
                      color: 'white'
                    }} 
                  />
                </Box>
              ))}

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" fontWeight="bold" mb={2}>
                پربازدیدترین مقالات
              </Typography>
              
              {blogPosts.slice(0, 3).map(post => (
                <Box 
                  key={post.id} 
                  sx={{ 
                    display: 'flex',
                    gap: 2,
                    mb: 2,
                    cursor: 'pointer',
                    '&:hover': {
                      '& .title': {
                        color: '#7878FF'
                      }
                    }
                  }}
                >
                  <Avatar 
                    variant="rounded" 
                    src={post.image} 
                    sx={{ width: 60, height: 60 }} 
                  />
                  <Box>
                    <Typography 
                      className="title" 
                      variant="body2" 
                      fontWeight="bold"
                      sx={{ transition: 'color 0.3s' }}
                    >
                      {post.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {post.date}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Card>
          </Grid>

          <Grid item size={{xs: 12, sm: 12, md: 8, lg: 9}}>
            <Grid container spacing={4}>
              {blogPosts.map((post, index) => (
                <Grid 
                  key={post.id} 
                  item 
                  size={{xs: 12, sm: 12, md: 6, lg: 4}}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card sx={{ 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 4,
                      boxShadow: theme.shadows[2],
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: theme.shadows[6]
                      }
                    }}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={post.image}
                        alt={post.title}
                        sx={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Chip 
                          label={post.category} 
                          size="small" 
                          sx={{ 
                            mb: 2,
                            bgcolor: '#7878FF',
                            color: 'white'
                          }} 
                        />
                        <Typography 
                          variant="h6" 
                          fontWeight="bold" 
                          mb={1}
                          sx={{ 
                            minHeight: 64,
                            lineHeight: 1.5 
                          }}
                        >
                          {post.title}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          color="text.secondary" 
                          mb={2}
                          sx={{ minHeight: 60 }}
                        >
                          {post.excerpt}
                        </Typography>
                      </CardContent>
                      <Box sx={{ 
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        px: 3,
                        pb: 3
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar sx={{ width: 24, height: 24 }} />
                          <Typography variant="caption">{post.author}</Typography>
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                          {post.readTime}
                        </Typography>
                      </Box>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ 
              display: 'flex',
              justifyContent: 'center',
              mt: 6
            }}>
              <Button
                variant="outlined"
                size="large"
                endIcon={<Icon icon="mdi:chevron-left" />}
                sx={{
                  borderRadius: 3,
                  px: 4,
                  py: 1,
                  borderColor: '#7878FF',
                  color: '#7878FF',
                  '&:hover': {
                    bgcolor: '#7878FF',
                    color: 'white',
                    borderColor: '#7878FF'
                  }
                }}
              >
                مشاهده مقالات بیشتر
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Blog;