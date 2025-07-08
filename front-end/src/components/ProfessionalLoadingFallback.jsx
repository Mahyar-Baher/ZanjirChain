import React from 'react';
import { 
  Box, 
  CircularProgress, 
  Typography, 
  Fade,
  useTheme
} from '@mui/material';
import { keyframes } from '@emotion/react';

const pulseAnimation = keyframes`
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
`;

const ProfessionalLoadingFallback = () => {
  const theme = useTheme();
  
  return (
    <Fade in={true} timeout={500}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          background: theme.palette.mode === 'dark'
            ? `linear-gradient(135deg, ${theme.palette.background.default} 0%, #121212 100%)`
            : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, #f5f5f5 100%)`,
          animation: `${pulseAnimation} 2s infinite ease-in-out`,
          p: 3,
          textAlign: 'center'
        }}
      >
        <CircularProgress
          size={64}
          thickness={3}
          sx={{
            color: theme.palette.primary.main,
            mb: 3,
            '& circle': { strokeLinecap: 'round' },
            '& .MuiCircularProgress-circle': { animationDuration: '1.5s' }
          }}
        />
        
        <Typography
          variant="h6"
          component="div"
          sx={{
            color: theme.palette.text.primary,
            fontWeight: 600,
            position: 'relative',
            '&::after': {
              content: '"..."',
              display: 'inline-block',
              width: '1em',
              textAlign: 'left',
              animation: `${keyframes`
                0% { content: '.'; }
                33% { content: '..'; }
                66% { content: '...'; }
              `} 1.5s infinite`
            }
          }}
        >
          در حال بارگذاری محتوا
        </Typography>
        
        <Typography
          variant="caption"
          sx={{
            mt: 2,
            color: theme.palette.text.secondary,
            maxWidth: 500,
            lineHeight: 1.7
          }}
        >
          لطفاً کمی صبر کنید، بهترین تجربه کاربری در حال آماده‌سازی است
        </Typography>
        
        <Box
          sx={{
            width: 300,
            height: 4,
            bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
            borderRadius: 2,
            mt: 4,
            overflow: 'hidden',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              height: '100%',
              width: '50%',
              background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}, transparent)`,
              animation: `${keyframes`
                0% { transform: translateX(-100%); }
                100% { transform: translateX(200%); }
              `} 1.5s infinite linear`
            }
          }}
        />
      </Box>
    </Fade>
  );
};

export default ProfessionalLoadingFallback;