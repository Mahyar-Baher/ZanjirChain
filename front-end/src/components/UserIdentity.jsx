import React from "react";
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  Button,
  Paper,
  styled,
} from "@mui/material";

const steps = [
  "احراز هویت پایه",
  "احراز هویت کاربردی",
  "احراز هویت پیشرفته",
];

const COLORS = {
  active: "#2196F3",
  inactive1: "#90CAF9",
  inactive2: "#E3F2FD",
};

const IdentityConnector = styled(StepConnector)(() => ({
  marginRight: 12,
  "& .MuiStepConnector-line": {
    borderRightWidth: 2,
    borderRadius: 1,
    borderColor: COLORS.inactive1,
    transition: "border-color .3s ease",
  },
  "&.Mui-active .MuiStepConnector-line, &.Mui-completed .MuiStepConnector-line": {
    borderColor: COLORS.active,
  },
}));

const StepIconRoot = styled("div")(({ ownerState }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 28,
  height: 28,
  borderRadius: "50%",
  backgroundColor: ownerState.bg,
  color: ownerState.color,
  border: `2px solid ${ownerState.border}`,
  fontWeight: "bold",
  transition: "all .3s ease",
}));

function IdentityStepIcon({ stepNumber, activeStep }) {
  let bg, color, border;
  switch (activeStep) {
    case 1:
      if (stepNumber === 1) {
        bg = COLORS.active;
        border = COLORS.active;
        color = "#fff";
      } else if (stepNumber === 2) {
        bg = COLORS.inactive1;
        border = COLORS.inactive1;
        color = "#fff";
      } else {
        bg = "#fff";
        border = COLORS.inactive1;
        color = COLORS.inactive1;
      }
      break;
    case 2:
      if (stepNumber <= 2) {
        bg = COLORS.active;
        border = COLORS.active;
        color = "#fff";
      } else {
        bg = "#fff";
        border = COLORS.inactive1;
        color = COLORS.inactive1;
      }
      break;
    case 3:
      bg = COLORS.active;
      border = COLORS.active;
      color = "#fff";
      break;
    default:
      bg = "#fff";
      border = COLORS.inactive1;
      color = COLORS.inactive1;
  }
  return (
    <StepIconRoot ownerState={{ bg, color, border }}>{stepNumber}</StepIconRoot>
  );
}

const UserIdentity = ({ activeStep = 1 }) => {
  const showCard = activeStep < 3;
  const nextLevel = steps[activeStep] || "";
  return (
    <Box sx={{ maxWidth: 460, mx: "auto", p: 4, direction: "rtl" }}>
      <Typography variant="h5" fontWeight="bold" textAlign="right" mb={{lg:8}}>
        ارتقای سطح کاربری
      </Typography>
      <Stepper
        orientation="vertical"
        activeStep={activeStep - 1}
        connector={<IdentityConnector />}
        sx={{ direction: "ltr" }}
      >
        {steps.map((label, index) => {
          const StepIconComponent = () => (
            <IdentityStepIcon stepNumber={index + 1} activeStep={activeStep} />
          );
          return (
            <Step key={label} completed={index < activeStep}>
              <StepLabel StepIconComponent={StepIconComponent}>
                <Typography
                  variant="body1"
                  fontWeight={index + 1 === activeStep ? "bold" : "normal"}
                  textAlign="right"
                >
                  {label}
                </Typography>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {showCard && (
        <Box elevation={2} sx={{ p: 2, mt:{lg:9}, textAlign: "right", borderRadius: 3 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            mt={1}
            textAlign="right"
          >
            مرحله به مرحله پیش بروید تا خدمات بهتری را دریافت نمایید
          </Typography>
          <Typography variant="body1" my={3}>
            تکمیل سطح احراز هویت به&nbsp;
            <Typography component="span" fontWeight="bold">
              {nextLevel}
            </Typography>
          </Typography>
          <Button variant="contained" fullWidth size="large">
            تکمیل احراز هویت
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default UserIdentity;
