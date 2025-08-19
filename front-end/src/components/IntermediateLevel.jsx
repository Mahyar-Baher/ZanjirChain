import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { CameraAlt } from '@mui/icons-material';
import { GradientPaper, LevelIcon, FileUploadBox, StyledButton } from './styles';

const IntermediateLevel = ({ onNext }) => {
  return React.createElement(
    GradientPaper,
    null,
    React.createElement(
      LevelIcon,
      null,
      React.createElement(CameraAlt, { fontSize: 'inherit' })
    ),
    React.createElement(
      Typography,
      { variant: 'h5', align: 'center', gutterBottom: true, sx: { fontWeight: 'bold', mb: 3, color: 'white' } },
      'احراز هویت سطح کاربردی'
    ),
    React.createElement(
      Typography,
      { variant: 'body1', align: 'center', sx: { color: 'rgba(255, 255, 255, 0.8)', mb: 4 } },
      'لطفاً یک عکس واضح که در آن کارت ملی، شناسنامه، و چهره شما قابل مشاهده باشد، آپلود کنید.'
    ),
    React.createElement(
      FileUploadBox,
      null,
      React.createElement(CameraAlt, { sx: { fontSize: 48, color: 'rgba(255, 255, 255, 0.3)', mb: 2 } }),
      React.createElement(
        Typography,
        { variant: 'body1', sx: { color: 'rgba(255, 255, 255, 0.6)', mb: 2 } },
        'برای آپلود فایل اینجا کلیک کنید یا فایل را بکشید و رها کنید'
      ),
      React.createElement(
        Typography,
        { variant: 'body2', sx: { color: 'rgba(255, 255, 255, 0.4)' } },
        'فرمت‌های مجاز: JPG, PNG (حداکثر 5MB)'
      )
    ),
    React.createElement(
      Box,
      { sx: { mt: 4, display: 'flex', justifyContent: 'center', gap: 2 } },
      React.createElement(
        Button,
        {
          variant: 'outlined',
          sx: {
            color: 'rgba(255, 255, 255, 0.7)',
            borderColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: 12,
            px: 4,
            py: 1.5
          }
        },
        'بازگشت'
      ),
      React.createElement(
        StyledButton,
        { variant: 'contained', size: 'large', onClick: onNext },
        'مرحله بعد'
      )
    )
  );
};

export default IntermediateLevel;