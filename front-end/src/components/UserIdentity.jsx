import React, { useState, useEffect } from "react";
import { Box, Typography, Stepper, Step, StepLabel, StepConnector, Button, styled } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";

const steps = ["احراز هویت پایه", "  کاربردی", "احراز هویت پیشرفته"];
const COLORS = { active: "#2196F3", inactive1: "#90CAF9", inactive2: "#E3F2FD" };

const IdentityConnector = styled(StepConnector)(() => ({
  marginRight: 12,
  "& .MuiStepConnector-line": { borderRightWidth: 2, borderRadius: 1, borderColor: COLORS.inactive1, transition: "border-color .3s ease" },
  "&.Mui-active .MuiStepConnector-line, &.Mui-completed .MuiStepConnector-line": { borderColor: COLORS.active },
}));

const StepIconRoot = styled("div")(({ ownerState }) => ({
  display: "flex", alignItems: "center", justifyContent: "center",
  width: 28, height: 28, borderRadius: "50%",
  backgroundColor: ownerState.bg,
  color: ownerState.color,
  border: `2px solid ${ownerState.border}`,
  fontWeight: "bold",
  transition: "all .3s ease",
}));

function IdentityStepIcon({ stepNumber, activeStep }) {
  let bg = "#fff", color = COLORS.inactive1, border = COLORS.inactive1;
  if (activeStep >= stepNumber) { bg = COLORS.active; border = COLORS.active; color = "#fff"; }
  else if (activeStep + 1 === stepNumber) { bg = COLORS.inactive1; border = COLORS.inactive1; color = "#fff"; }
  return <StepIconRoot ownerState={{ bg, color, border }}>{stepNumber}</StepIconRoot>;
}

const CompletedLevel = () => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <Box sx={{ textAlign: "center", py: 0 }}>
      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={300} onConfettiComplete={() => setShowConfetti(false)} />}
      <Box sx={{ width: 110, height: 110, borderRadius: "50%", background: "linear-gradient(135deg, #26A17B, #1a652a)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 30px" }}>
        <CheckCircle sx={{ fontSize: 60, color: "white" }} />
      </Box>
      <Typography variant="h5" sx={{ fontWeight: "bold", color: "black", mb: 2 }}>تبریک! احراز هویت شما تکمیل شد! 🎉</Typography>
      <Typography variant="body2" sx={{ color: "rgba(0,0,0,0.7)", maxWidth: 500, margin: "0 auto", mb: 4 }}>تمامی مراحل احراز هویت با موفقیت انجام شد و اکنون می‌توانید از امکانات پلتفرم استفاده کنید.</Typography>
    </Box>
  );
};

const UserIdentity = ({ activeStep = 0 }) => {
  const navigate = useNavigate();
  const nextLevel = steps[activeStep] || "احراز هویت پایه";

  return (
    <Box sx={{ maxWidth: 460, mx: "auto", p: 4, direction: "rtl" }}>
      <Typography variant="h5" fontWeight="bold" textAlign="right" mb={{ lg: 8 }}>ارتقای سطح کاربری</Typography>
      <Stepper orientation="vertical" activeStep={activeStep - 1} connector={<IdentityConnector />} sx={{ direction: "ltr" }}>
        {steps.map((label, index) => {
          const StepIconComponent = () => <IdentityStepIcon stepNumber={index + 1} activeStep={activeStep} />;
          return (
            <Step key={label} completed={index + 1 < activeStep}>
              <StepLabel StepIconComponent={StepIconComponent}>
                <Typography variant="body1" fontWeight={index + 1 === activeStep ? "bold" : "normal"} textAlign="right">{label}</Typography>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep < 3 ? (
        <Box elevation={2} sx={{ p: 2, mt: { lg: 3 }, textAlign: "right", borderRadius: 3 }}>
          <Typography variant="body2" color="text.secondary" mt={1} textAlign="right">مرحله به مرحله پیش بروید تا خدمات بهتری را دریافت نمایید</Typography>
          <Typography variant="body1" my={3}>تکمیل سطح&nbsp;<Typography component="span" fontWeight="bold">{nextLevel}</Typography></Typography>
          <Button variant="contained" fullWidth size="large" onClick={() => navigate("/identityVerification")}>تکمیل احراز هویت</Button>
        </Box>
      ) : (
        <CompletedLevel />
      )}
    </Box>
  );
};

export default UserIdentity;
