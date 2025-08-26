import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import Confetti from 'react-confetti';
import { GradientPaper, StyledButton, pulse } from './styles';
import { useNavigate } from 'react-router-dom';

const CompletedLevel = () => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return React.createElement(
    GradientPaper,
    { sx: { textAlign: 'center', py: 6 } },
    showConfetti && React.createElement(Confetti, { width: windowSize.width, height: windowSize.height, recycle: false, numberOfPieces: 300, onConfettiComplete: () => setShowConfetti(false) }),
    React.createElement(
      Box,
      { sx: { width: 120, height: 120, borderRadius: '50%', background: 'linear-gradient(135deg, #26A17B, #1a652a)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 30px', animation: `${pulse} 2s ease infinite` } },
      React.createElement(CheckCircle, { sx: { fontSize: 60, color: 'white' } })
    ),
    React.createElement(Typography, { variant: 'h4', sx: { fontWeight: 'bold', color: 'white', mb: 2 } }, 'تبریک! احراز هویت شما تکمیل شد! 🎉'),
    React.createElement(Typography, { variant: 'body1', sx: { color: 'rgba(255, 255, 255, 0.8)', maxWidth: 500, margin: '0 auto', mb: 4 } }, 'تمامی مراحل احراز هویت با موفقیت انجام شد. حالا می‌توانید از تمام امکانات پلتفرم ما با خیال راحت استفاده کنید!'),
    React.createElement(
      Box,
      { sx: { display: 'flex', justifyContent: 'center', gap: 2, mt: 4 } },
      React.createElement(StyledButton, { variant: 'contained', onClick: () => alert('به دنیای خفن‌ها خوش آمدید! 😎'), 'aria-label': 'شروع ماجراجویی', sx: { px: 6 } }, 'شروع ماجراجویی!'),
      React.createElement(Button, { variant: 'outlined', 'aria-label': 'رفتن به پروفایل', sx: { color: 'rgba(255, 255, 255, 0.7)', borderColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 12, px: 4, py: 1.5, '&:hover': { borderColor: 'rgba(255, 255, 255, 0.4)' } }, onClick: () => navigate('/dashboard') }, 'پروفایل من')
    )
  );
};

export default CompletedLevel;
