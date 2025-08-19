import React, { useEffect, useState } from 'react';
import { Box, Typography, Stepper, Step, StepLabel } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { StepIcon, steps, GradientPaper, ColorConnector } from '../components/styles';
import BasicLevel from '../components/BasicLevel';
import IntermediateLevel from '../components/IntermediateLevel';
import AdvancedLevel from '../components/AdvancedLevel';
import CompletedLevel from '../components/CompletedLevel';
import useAuthStore from '../context/authStore';

const IdentityVerification = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [activeStep, setActiveStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (user?.kyc_level !== undefined) {
      setActiveStep(user.kyc_level); 
    }
  }, [user]);

  const handleStepComplete = () => {
    setShowSuccess(true);
    setTimeout(() => navigate('/dashboard'), 5000);
  };

  const renderStepContent = () => {
    if (showSuccess) {
      return (
        <GradientPaper>
          <Typography
            variant="h5"
            align="center"
            sx={{ fontWeight: 'bold', mb: 2, color: 'white' }}
          >
            🎉 ثبت اطلاعات با موفقیت انجام شد
          </Typography>
          <Typography align="center" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            شما به داشبورد منتقل خواهید شد...
          </Typography>
        </GradientPaper>
      );
    }

    switch (activeStep) {
      case 0: return <BasicLevel onNext={handleStepComplete} />;
      case 1: return <IntermediateLevel onNext={handleStepComplete} />;
      case 2: return <AdvancedLevel onComplete={handleStepComplete} />;
      case 3: return <CompletedLevel />;
      default: return null;
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: "linear-gradient(190.5deg, #1a652a 0.9%, rgba(220,244,241,1) 87.7%)",
        py: 8,
        px: 2
      }}
    >
      <Box sx={{ maxWidth: 800, mx: 'auto', width: '100%', mb: 6 }}>
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: 'bold',
            mb: 2,
            background: 'linear-gradient(90deg, #fff, #fff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          فرآیند احراز هویت
        </Typography>

        <Typography
          variant="body1"
          align="center"
          sx={{ color: 'rgba(255, 255, 255, 0.7)', maxWidth: 600, mx: 'auto', mb: 4 }}
        >
          برای دسترسی کامل به امکانات پلتفرم، لطفاً مراحل زیر را با دقت تکمیل کنید
        </Typography>

        <Stepper
          activeStep={activeStep} connector={<ColorConnector />}
          sx={{
            mb: 6,
            '& .MuiStepLabel-label': { color: 'rgba(255, 255, 255, 0.7) !important', mt: 1 },
            '& .MuiStepLabel-active': { color: 'white !important', fontWeight: 'bold' }
          }}
        >
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel
               sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}
                StepIconComponent={() => (
                  <StepIcon active={index <= activeStep}>
                    {index < activeStep ? (
                      <CheckCircle sx={{ fontSize: 20 }} />
                    ) : (
                      index + 1
                    )}
                  </StepIcon>
                )}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mt: 4 }}>{renderStepContent()}</Box>
      </Box>

      <Box sx={{ mt: 'auto', textAlign: 'center', pt: 4 }}>
        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.4)' }}>
          تمامی اطلاعات شما با امنیت کامل ذخیره می‌شود
        </Typography>
      </Box>
    </Box>
  );
};

export default IdentityVerification;
