import { styled } from '@mui/material/styles';
import { keyframes } from '@emotion/react';
import { Box, Paper, TextField, Button } from '@mui/material';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

// 🎞 انیمیشن‌ها
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// 📌 استایل‌ها
const GradientPaper = styled(Paper)(() => ({
  padding: '32px',
  borderRadius: 24,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
  background: 'linear-gradient(145deg, #1a2e2e, #162a3e)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  animation: `${fadeIn} 0.6s ease-out`,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    background: 'linear-gradient(90deg, #26A17B, #1a652a)',
  }
}));

const LevelIcon = styled(Box)(() => ({
  width: 60,
  height: 60,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 20px',
  background: 'linear-gradient(135deg, #26A17B, #1a652a)',
  color: 'white',
  fontSize: 28,
  boxShadow: '0 4px 20px rgba(38, 161, 123, 0.3)',
}));

const StepIcon = styled(Box, { shouldForwardProp: (prop) => prop !== 'active' })(
  ({ active }) => ({
    width: 32,
    height: 32,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: active ? '#26A17B' : 'rgba(255, 255, 255, 0.1)',
    color: active ? 'white' : 'rgba(255, 255, 255, 0.5)',
    fontWeight: 'bold',
    marginRight: 8,
  })
);

// 🎨 کانکتور سفارشی برای Stepper با پشتیبانی RTL/LTR و حذف خط اضافی بعد از آخرین استپر
const ICON_SIZE = 12;
const OFFSET = ICON_SIZE / 2 + 4; // فاصله خط از مرکز آیکن
const TOP = ICON_SIZE / 2 + 10;    // محل عمودی خط

const ColorConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: TOP,
    ...(theme.direction === 'rtl'
      ? { left: `calc(50% + ${OFFSET}px)`, right: `calc(-50% + ${OFFSET}px)` }
      : { left: `calc(-50% + ${OFFSET}px)`, right: `calc(50% + ${OFFSET}px)` }),
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 2,
    border: 0,
    borderRadius: 2,
    background: 'rgba(255,255,255,0.2)',
  },
  [`&.${stepConnectorClasses.active} .${stepConnectorClasses.line}`]: {
    background: 'linear-gradient(90deg, #26A17B, #1a652a)',
  },
  [`&.${stepConnectorClasses.completed} .${stepConnectorClasses.line}`]: {
    background: 'linear-gradient(90deg, #26A17B, #1a652a)',
  },
}));

const StyledTextField = styled(TextField)(() => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
    '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
    '&.Mui-focused fieldset': {
      borderColor: '#26A17B',
      boxShadow: '0 0 0 2px rgba(38, 161, 123, 0.2)',
    },
  },
  '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
  '& .MuiInputBase-input': { color: 'white' }
}));

const StyledButton = styled(Button)(() => ({
  borderRadius: 12,
  padding: '12px 24px',
  fontWeight: 'bold',
  textTransform: 'none',
  fontSize: 16,
  background: 'linear-gradient(90deg, #26A17B, #1a652a)',
  boxShadow: '0 4px 15px rgba(38, 161, 123, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(38, 161, 123, 0.4)',
    background: 'linear-gradient(90deg, #1a652a, #26A17B)',
  },
  '&:active': { transform: 'translateY(0)' }
}));

const FileUploadBox = styled(Box)(() => ({
  border: '2px dashed rgba(255, 255, 255, 0.2)',
  borderRadius: 16,
  padding: 32,
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  backgroundColor: 'rgba(255, 255, 255, 0.03)',
  '&:hover': {
    borderColor: '#26A17B',
    backgroundColor: 'rgba(38, 161, 123, 0.05)',
  }
}));

const steps = ['اطلاعات پایه', 'تصویر مدارک', 'تأیید هویت', 'تکمیل شده'];

export {
  GradientPaper,
  LevelIcon,
  StepIcon,
  ColorConnector,
  StyledTextField,
  StyledButton,
  FileUploadBox,
  fadeIn,
  pulse,
  steps
};
