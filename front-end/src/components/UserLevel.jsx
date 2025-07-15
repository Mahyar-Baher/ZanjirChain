import React from "react";
import { Box, Typography } from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";

// رنگ‌های ثابت سطوح
const purple = "#1a652a";   // بنفش
const gold = "#FFD700";   // طلایی
const silver = "#C0C0C0"; // نقره‌ای
const bronze = "#CD7F32"; // برنز

const rgbCycle = keyframes`
  0%   { color: ${gold}; }
  25%  { color: ${purple}; }
  50%  { color: ${silver}; }
  75%  { color: ${bronze}; }
  100% { color: ${gold}; }
`;
const StyledSvgWrapper = styled("div", {
  shouldForwardProp: (prop) => prop !== "animate",
})(({ animate, color }) => ({
  color,
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  ...(animate && {
    animation: `${rgbCycle} 3s linear infinite`,
  }),
}));

// متن وسط SVG
const CenterText = styled(Typography, {
  shouldForwardProp: (prop) => !["animate", "fontSizePx"].includes(prop),
})(({ animate, color, fontSizePx }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  fontWeight: 700,
  fontSize: `${fontSizePx}px`,
  color,
  ...(animate && {
    animation: `${rgbCycle} 6s linear infinite`,
  }),
}));

const getLevelInfo = (level) => {
  switch (level) {
    case 1:
      return { text: "1", color: gold, animate: false };
    case 2:
      return { text: "2", color: silver, animate: false };
    case 3:
      return { text: "3", color: bronze, animate: false };
    case 0:
      return { text: "★", color: purple, animate: true };
    default:
      return { text: "-", color: silver, animate: false };
  }
};

const UserLevel = ({ level = 1, size = 64 }) => {
  const { text, color, animate } = getLevelInfo(level);
  const fontSizePx = Math.round(size * 0.38);

  return (
    <Box
      position="relative"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      width={size}
      height={size}
    >
      <StyledSvgWrapper animate={animate} color={color}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            fillOpacity="0"
            stroke="currentColor"
            strokeDasharray="64"
            strokeDashoffset="64"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 12c0 -4.97 4.03 -9 9 -9c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9Z"
          >
            <animate
              fill="freeze"
              attributeName="fill-opacity"
              begin="0.8s"
              dur="0.15s"
              values="0;0.3"
            />
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              dur="0.8s"
              values="64;0"
            />
          </path>
        </svg>
      </StyledSvgWrapper>
      <CenterText animate={animate} color={color} fontSizePx={fontSizePx}>
        {text}
      </CenterText>
    </Box>
  );
};

export default UserLevel;
