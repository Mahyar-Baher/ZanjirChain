// src/pages/NotFound.js
import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Paper,
  useTheme 
} from '@mui/material';
import { Link } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { keyframes } from '@emotion/react';

const NotFound = () => {
  const theme = useTheme();
  
  // انیمیشن برای آیکون
  const floatAnimation = keyframes`
    0% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
    100% { transform: translateY(0px); }
  `;
  
  return (
    <Container 
      maxWidth={false} 
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.palette.mode === 'dark' 
          ? 'linear-gradient(135deg, #2c3e50, #1a1a2e)' 
          : 'linear-gradient(135deg, #e0f7fa, #bbdefb)',
        p: 3,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          maxWidth: 600,
          width: '100%',
          borderRadius: 4,
          overflow: 'hidden',
          boxShadow: '0 15px 30px rgba(0,0,0,0.2)',
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
          }
        }}
      >
        <Box
          sx={{
            background: theme.palette.mode === 'dark' 
              ? 'linear-gradient(45deg, #26A17B, #1A652A)' 
              : 'linear-gradient(45deg, #1A652A, #26A17B)',
            py: 3,
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: 120,
              height: 120,
              borderRadius: '50%',
              bgcolor: theme.palette.background.paper,
              mb: 3,
              animation: `${floatAnimation} 3s ease-in-out infinite`,
            }}
          >
            <ErrorOutlineIcon 
              sx={{ 
                fontSize: 70, 
                color: 'error.main',
              }} 
            />
          </Box>
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontWeight: 700, 
              color: 'common.white',
              letterSpacing: 1,
              textShadow: '0 2px 4px rgba(0,0,0,0.2)',
            }}
          >
            404
          </Typography>
        </Box>
        
        <Box
          sx={{
            p: 4,
            textAlign: 'center',
            bgcolor: 'background.paper',
          }}
        >
          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom 
            sx={{ 
              fontWeight: 600,
              color: theme.palette.mode === 'dark' ? 'primary.light' : 'primary.dark',
              mt: 1,
            }}
          >
            صفحه مورد نظر یافت نشد
          </Typography>
          
          <SentimentVeryDissatisfiedIcon 
            sx={{ 
              fontSize: 50, 
              color: 'text.secondary', 
              my: 1,
            }} 
          />
          
          <Typography 
            variant="h6" 
            color="text.secondary" 
            gutterBottom
            sx={{ mb: 2 }}
          >
            متأسفیم، صفحه‌ای که به دنبال آن هستید وجود ندارد یا حذف شده است.
          </Typography>
          
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ mb: 2 }}
          >
            ممکن است آدرس را اشتباه وارد کرده باشید یا صفحه به مکان دیگری منتقل شده باشد.
          </Typography>
          
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/"
            sx={{
              mt: 1,
              px: 5,
              py: 1.5,
              borderRadius: 50,
              fontWeight: 600,
              fontSize: '1.1rem',
              background: theme.palette.mode === 'dark' 
              ? 'linear-gradient(45deg, #26A17B, #1A652A)' 
              : 'linear-gradient(45deg, #1A652A, #26A17B)',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 6px 15px rgba(0,0,0,0.3)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            بازگشت به صفحه اصلی
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default NotFound;