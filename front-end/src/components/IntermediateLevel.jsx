import React, { useState, useCallback } from "react";
import { Box, Typography, Button } from "@mui/material";
import { CameraAlt, CloudUpload } from "@mui/icons-material";
import { useDropzone } from "react-dropzone";
import { GradientPaper, LevelIcon, FileUploadBox, StyledButton } from "./styles";

const IntermediateLevel = ({ onNext }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    const uploaded = acceptedFiles[0];
    if (!uploaded) return;

    // چک کردن پسوند
    const validTypes = ["image/jpeg", "image/png"];
    if (!validTypes.includes(uploaded.type)) {
      setError("فقط فایل‌های JPG و PNG مجاز هستند.");
      setFile(null);
      return;
    }

    // چک کردن حجم
    if (uploaded.size > 5 * 1024 * 1024) {
      setError("حجم فایل نباید بیشتر از 5MB باشد.");
      setFile(null);
      return;
    }

    setError("");
    setFile(uploaded);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
  });

  return (
    <GradientPaper>
      <LevelIcon>
        <CameraAlt fontSize="inherit" />
      </LevelIcon>

      <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", mb: 3, color: "white" }}
      >
        احراز هویت سطح کاربردی
      </Typography>

      <Typography
        variant="body1"
        align="center"
        sx={{ color: "rgba(255, 255, 255, 0.8)", mb: 4 }}
      >
        لطفاً یک عکس واضح که در آن کارت ملی، شناسنامه، و چهره شما قابل مشاهده باشد، آپلود کنید.
      </Typography>

      {/* Dropzone */}
      <FileUploadBox
        {...getRootProps()}
        sx={{
          border: "2px dashed rgba(255,255,255,0.4)",
          borderRadius: 4,
          p: 4,
          textAlign: "center",
          cursor: "pointer",
          transition: "0.3s",
          background: isDragActive
            ? "rgba(255,255,255,0.1)"
            : "rgba(255,255,255,0.05)",
          "&:hover": { background: "rgba(255,255,255,0.08)" },
        }}
      >
        <input {...getInputProps()} />
        {file ? (
          <Box>
            <img
              src={URL.createObjectURL(file)}
              alt="preview"
              style={{
                maxWidth: "100%",
                maxHeight: "200px",
                borderRadius: "12px",
                marginBottom: "12px",
              }}
            />
            <Typography sx={{ color: "white" }}>{file.name}</Typography>
          </Box>
        ) : (
          <>
            <CloudUpload
              sx={{ fontSize: 60, color: "rgba(255, 255, 255, 0.5)", mb: 2 }}
            />
            <Typography
              variant="body1"
              sx={{ color: "rgba(255, 255, 255, 0.8)", mb: 1 }}
            >
              {isDragActive
                ? "فایل را اینجا رها کنید"
                : "برای آپلود فایل کلیک کنید یا فایل را بکشید و رها کنید"}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "rgba(255, 255, 255, 0.5)" }}
            >
              فرمت‌های مجاز: JPG, PNG (حداکثر 5MB)
            </Typography>
          </>
        )}
      </FileUploadBox>

      {error && (
        <Typography
          sx={{ color: "#ff6b6b", textAlign: "center", mt: 2, fontSize: 14 }}
        >
          {error}
        </Typography>
      )}

      {/* Buttons */}
      <Box sx={{ mt: 4, display: "flex", justifyContent: "center", gap: 2 }}>
        <Button
          variant="outlined"
          sx={{
            color: "rgba(255, 255, 255, 0.7)",
            borderColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: 12,
            px: 4,
            py: 1.5,
          }}
        >
          بازگشت
        </Button>
        <StyledButton
          variant="contained"
          size="large"
          onClick={onNext}
          disabled={!file}
        >
          مرحله بعد
        </StyledButton>
      </Box>
    </GradientPaper>
  );
};

export default IntermediateLevel;
