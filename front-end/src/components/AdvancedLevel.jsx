import React, { useState } from 'react';
import { Box, Typography, Grid, Avatar } from '@mui/material';
import { Description } from '@mui/icons-material';
import { GradientPaper, LevelIcon, FileUploadBox, StyledButton } from './styles';

const AdvancedLevel = ({ onComplete }) => {
  const [selectedOption, setSelectedOption] = useState('bill');
  
  return React.createElement(
    GradientPaper,
    null,
    React.createElement(
      LevelIcon,
      null,
      React.createElement(Description, { fontSize: 'inherit' })
    ),
    React.createElement(
      Typography,
      { variant: 'h5', align: 'center', gutterBottom: true, sx: { fontWeight: 'bold', mb: 3, color: 'white' } },
      'احراز هویت سطح پیشرفته'
    ),
    React.createElement(
      Typography,
      { variant: 'body1', align: 'center', sx: { color: 'rgba(255, 255, 255, 0.8)', mb: 4 } },
      'برای تکمیل این سطح، لطفاً یکی از گزینه‌های زیر را انتخاب و مدارک مربوطه را آپلود کنید.'
    ),
    React.createElement(
      Grid,
      { container: true, spacing: 3, sx: { mb: 4 } },
      React.createElement(
        Grid,
        { size: { xs: 12, sm: 4 } },
        React.createElement(
          Box,
          {
            sx: {
              border: selectedOption === 'bill' ? '2px solid #26A17B' : '2px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 16,
              p: 3,
              backgroundColor: selectedOption === 'bill' ? 'rgba(38, 161, 123, 0.1)' : 'rgba(255, 255, 255, 0.03)',
              cursor: 'pointer',
              height: '100%',
              transition: 'all 0.3s ease'
            },
            onClick: () => setSelectedOption('bill')
          },
          React.createElement(
            Box,
            { sx: { display: 'flex', alignItems: 'center', mb: 2 } },
            React.createElement(Avatar, { sx: { bgcolor: selectedOption === 'bill' ? '#26A17B' : 'rgba(255, 255, 255, 0.1)', mr: 2 } }, '1'),
            React.createElement(Typography, { variant: 'subtitle1', sx: { fontWeight: 'bold', color: 'white' } }, 'قبض خدمات')
          ),
          React.createElement(Typography, { variant: 'body2', sx: { color: 'rgba(255, 255, 255, 0.6)', pl: 7 } }, 'قبض آب، برق یا گاز با نام و آدرس شما')
        )
      ),
      React.createElement(
        Grid,
        { size: { xs: 12, sm: 4 } },
        React.createElement(
          Box,
          {
            sx: {
              border: selectedOption === 'bank' ? '2px solid #26A17B' : '2px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 16,
              p: 3,
              backgroundColor: selectedOption === 'bank' ? 'rgba(38, 161, 123, 0.1)' : 'rgba(255, 255, 255, 0.03)',
              cursor: 'pointer',
              height: '100%',
              transition: 'all 0.3s ease'
            },
            onClick: () => setSelectedOption('bank')
          },
          React.createElement(
            Box,
            { sx: { display: 'flex', alignItems: 'center', mb: 2 } },
            React.createElement(Avatar, { sx: { bgcolor: selectedOption === 'bank' ? '#26A17B' : 'rgba(255, 255, 255, 0.1)', mr: 2 } }, '2'),
            React.createElement(Typography, { variant: 'subtitle1', sx: { fontWeight: 'bold', color: 'white' } }, 'صورت‌حساب بانکی')
          ),
          React.createElement(Typography, { variant: 'body2', sx: { color: 'rgba(255, 255, 255, 0.6)', pl: 7 } }, 'صورت‌حساب بانکی با آدرس تأییدشده')
        )
      ),
      React.createElement(
        Grid,
        { size: { xs: 12, sm: 4 } },
        React.createElement(
          Box,
          {
            sx: {
              border: selectedOption === 'video' ? '2px solid #26A17B' : '2px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 16,
              p: 3,
              backgroundColor: selectedOption === 'video' ? 'rgba(38, 161, 123, 0.1)' : 'rgba(255, 255, 255, 0.03)',
              cursor: 'pointer',
              height: '100%',
              transition: 'all 0.3s ease'
            },
            onClick: () => setSelectedOption('video')
          },
          React.createElement(
            Box,
            { sx: { display: 'flex', alignItems: 'center', mb: 2 } },
            React.createElement(Avatar, { sx: { bgcolor: selectedOption === 'video' ? '#26A17B' : 'rgba(255, 255, 255, 0.1)', mr: 2 } }, '3'),
            React.createElement(Typography, { variant: 'subtitle1', sx: { fontWeight: 'bold', color: 'white' } }, 'تأیید ویدئویی')
          ),
          React.createElement(Typography, { variant: 'body2', sx: { color: 'rgba(255, 255, 255, 0.6)', pl: 7 } }, 'ویدئوی کوتاه تأیید هویت (10-15 ثانیه)')
        )
      )
    ),
    React.createElement(
      FileUploadBox,
      null,
      React.createElement(Description, { sx: { fontSize: 48, color: 'rgba(255, 255, 255, 0.3)', mb: 2 } }),
      React.createElement(
        Typography,
        { variant: 'body1', sx: { color: 'rgba(255, 255, 255, 0.6)', mb: 2 } },
        selectedOption === 'video' ? 'ویدئوی تأیید هویت خود را آپلود کنید' : 'فایل مربوطه را اینجا آپلود کنید'
      ),
      React.createElement(
        Typography,
        { variant: 'body2', sx: { color: 'rgba(255, 255, 255, 0.4)' } },
        selectedOption === 'video' ? 'فرمت‌های مجاز: MP4, MOV (حداکثر 20MB)' : 'فرمت‌های مجاز: PDF, JPG, PNG (حداکثر 10MB)'
      )
    ),
    React.createElement(
      Box,
      { sx: { mt: 4, display: 'flex', justifyContent: 'center' } },
      React.createElement(
        StyledButton,
        { variant: 'contained', size: 'large', onClick: onComplete, sx: { px: 6 } },
        'تکمیل فرایند'
      )
    )
  );
};

export default AdvancedLevel;