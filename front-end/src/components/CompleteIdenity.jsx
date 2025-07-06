import { Box } from '@mui/material';

const baseWidthPercent = 98;
const widthsPercent = [baseWidthPercent, baseWidthPercent * 0.64, baseWidthPercent * 0.28]; 

const StepArrow = ({ text, color, width }) => (
  <Box sx={{ width, height: 52, position: 'relative' }}>
    <Box
      sx={{
        width: '100%',
        height: '60px',
        bgcolor: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        fontSize: { xs: 12, sm: 14, md: 15 },
        fontWeight: 600,
        color: '#fff',
        position: 'relative',
        pl: 0,
        borderRadius: '0 0 30px 0',
        '&::before': {
          content: '""',
          position: 'absolute',
          left: -19.5,
          top: 0,
          width: 20,
          height: '100%',
          bgcolor: color,
          clipPath: 'polygon(0 50%,100% 0,100% 100%)',
        },
      }}
    >
      {text}
    </Box>
  </Box>
);

const CompleteIdenity = ({ activeStep = 0 }) => {
  const steps = [
    { label: 'سطح پیشرفته' },
    { label: 'سطح کاربردی' },
    { label: 'سطح پایه' },
  ];

  const colors = {
    active: '#7878FF',
    inactive1: '#A3A8FF', 
    inactive2: '#D1D4FF', 
  };

  return (
    <Box sx={{ position: 'relative', width: `${baseWidthPercent}%`, height: 80, ml: 0 }}>
      {steps.map((step, i) => {
        const stepNumber = steps.length - i;

      let color;
        switch (activeStep) {
        case 1:
            if (stepNumber === 1) {
            color = colors.active;
            } else if (stepNumber === 2) {
            color = colors.inactive1;
            } else if (stepNumber === 3) {
            color = colors.inactive2;
            }
            break;

        case 2:
            if (stepNumber <= 2) {
            color = colors.active;
            } else if (stepNumber === 3) {
            color = colors.inactive1;
            }
            break;

        case 3:
            color = colors.active;
            break;

        default:
            color = colors.inactive2;
        }


        return (
          <Box
            key={step.label}
            sx={{
              position: 'absolute',
              width: `${widthsPercent[i]}%`,
              zIndex: i + 1,
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              borderRadius: '0 0 48px 0',
            }}
          >
            <StepArrow text={step.label} color={color} width="100%" />
          </Box>
        );
      })}
    </Box>
  );
};

export default CompleteIdenity;
