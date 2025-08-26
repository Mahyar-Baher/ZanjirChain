// AdvancedLevel.jsx (JSX)
import React, { useState, useCallback, useMemo, useEffect } from "react";
import { Box, Typography, Grid, Avatar, LinearProgress } from "@mui/material";
import { Description, CloudUpload, PictureAsPdf, Movie } from "@mui/icons-material";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { GradientPaper, LevelIcon, FileUploadBox, StyledButton } from "./styles";

const AdvancedLevel = ({
  onComplete,
  uploadUrl,      // مثلا: "https://amirrezaei2002x.shop/laravel/api/kyc-level-Advanced"
  token,          // اگر لازم داری هدر Authorization بفرستی
}) => {
  const [selectedOption, setSelectedOption] = useState("bill"); // bill | bank | video
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  // تنظیمات فرمت و حجم مجاز بر اساس گزینه انتخابی
  const optionConfig = useMemo(() => {
    const commonDoc = {
      accepts: {
        "application/pdf": [".pdf"],
        "image/jpeg": [".jpg", ".jpeg"],
        "image/png": [".png"],
      },
      maxSize: 10 * 1024 * 1024, // 10MB
      help: "فرمت‌های مجاز: PDF, JPG, PNG (حداکثر 10MB)",
      label: "فایل مربوطه را اینجا آپلود کنید",
      icon: <PictureAsPdf sx={{ fontSize: 48, color: "rgba(255,255,255,0.3)", mb: 2 }} />,
    };
    const videoCfg = {
      accepts: {
        "video/mp4": [".mp4"],
        "video/quicktime": [".mov"], // برای .mov
      },
      maxSize: 20 * 1024 * 1024, // 20MB
      help: "فرمت‌های مجاز: MP4, MOV (حداکثر 20MB)",
      label: "ویدئوی تأیید هویت خود را آپلود کنید",
      icon: <Movie sx={{ fontSize: 48, color: "rgba(255,255,255,0.3)", mb: 2 }} />,
    };

    if (selectedOption === "video") return videoCfg;
    if (selectedOption === "bill") return { ...commonDoc, help: "قبض آب/برق/گاز - " + commonDoc.help };
    if (selectedOption === "bank") return { ...commonDoc, help: "صورت‌حساب بانکی - " + commonDoc.help };
    return commonDoc;
  }, [selectedOption]);

  // وقتی گزینه عوض شد، فایل قبلی و خطا پاک بشن
  useEffect(() => {
    if (file) {
      const allowedMimes = Object.keys(optionConfig.accepts);
      if (!allowedMimes.includes(file.type)) {
        setFile(null); // فقط وقتی فرمت سازگار نیست پاک می‌کنه
      }
    }
    setError(""); // خطا همیشه پاک میشه
  }, [selectedOption, optionConfig, file]);
  

  const onDrop = useCallback(
    (acceptedFiles) => {
      const uploaded = acceptedFiles[0];
      if (!uploaded) return;

      // چک نوع
      const allowedMimes = Object.keys(optionConfig.accepts);
      if (!allowedMimes.includes(uploaded.type)) {
        setError("فرمت فایل با گزینه انتخاب‌شده همخوانی ندارد.");
        setFile(null);
        return;
      }

      // چک حجم
      if (uploaded.size > optionConfig.maxSize) {
        setError("حجم فایل از حد مجاز بیشتر است.");
        setFile(null);
        return;
      }

      setError("");
      setFile(uploaded);
    },
    [optionConfig]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: optionConfig.accepts,
    maxSize: optionConfig.maxSize,
  });

  const isImage = (f) => f && ["image/jpeg", "image/png"].includes(f.type);
  const isPdf = (f) => f && f.type === "application/pdf";
  const isVideo = (f) => f && (f.type === "video/mp4" || f.type === "video/quicktime");

  const handleUpload = async () => {
    if (!file) {
      setError("ابتدا فایل معتبر انتخاب کنید.");
      return;
    }
    if (!uploadUrl) {
      setError("آدرس آپلود تنظیم نشده است.");
      return;
    }

    try {
      setUploading(true);
      setProgress(0);
      setError("");

      const formData = new FormData();
      formData.append("type", selectedOption); // در صورت نیاز سمت سرور
      formData.append("file", file);

      await axios.post(uploadUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        onUploadProgress: (evt) => {
          if (!evt.total) return;
          const percent = Math.round((evt.loaded * 100) / evt.total);
          setProgress(percent);
        },
      });

      // موفقیت
      setUploading(false);
      setProgress(100);
      onComplete && onComplete();
    } catch (e) {
      console.error(e);
      setUploading(false);
      setProgress(0);
      setError("خطا در آپلود فایل. دوباره تلاش کنید.");
      // console.error(e);
    }
  };

  return (
    <GradientPaper>
      <LevelIcon>
        <Description fontSize="inherit" />
      </LevelIcon>

      <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: "bold", mb: 3, color: "white" }}>
        احراز هویت سطح پیشرفته
      </Typography>
      <Typography variant="body1" align="center" sx={{ color: "rgba(255, 255, 255, 0.8)", mb: 4 }}>
        برای تکمیل این سطح، لطفاً یکی از گزینه‌های زیر را انتخاب و مدارک مربوطه را آپلود کنید.
      </Typography>

      {/* گزینه‌ها */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Box
            sx={{
              border: selectedOption === "bill" ? "2px solid #26A17B" : "2px solid rgba(255,255,255,0.1)",
              borderRadius: 16,
              p: 3,
              backgroundColor: selectedOption === "bill" ? "rgba(38,161,123,0.1)" : "rgba(255,255,255,0.03)",
              cursor: "pointer",
              height: "100%",
              transition: "all 0.3s ease",
            }}
            onClick={() => setSelectedOption("bill")}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Avatar sx={{ bgcolor: selectedOption === "bill" ? "#26A17B" : "rgba(255,255,255,0.1)", mr: 2 }}>1</Avatar>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "white" }}>
                قبض خدمات
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)", pl: 7 }}>
              قبض آب، برق یا گاز با نام و آدرس شما
            </Typography>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <Box
            sx={{
              border: selectedOption === "bank" ? "2px solid #26A17B" : "2px solid rgba(255,255,255,0.1)",
              borderRadius: 16,
              p: 3,
              backgroundColor: selectedOption === "bank" ? "rgba(38,161,123,0.1)" : "rgba(255,255,255,0.03)",
              cursor: "pointer",
              height: "100%",
              transition: "all 0.3s ease",
            }}
            onClick={() => setSelectedOption("bank")}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Avatar sx={{ bgcolor: selectedOption === "bank" ? "#26A17B" : "rgba(255,255,255,0.1)", mr: 2 }}>2</Avatar>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "white" }}>
                صورت‌حساب بانکی
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)", pl: 7 }}>
              صورت‌حساب بانکی با آدرس تأییدشده
            </Typography>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <Box
            sx={{
              border: selectedOption === "video" ? "2px solid #26A17B" : "2px solid rgba(255,255,255,0.1)",
              borderRadius: 16,
              p: 3,
              backgroundColor: selectedOption === "video" ? "rgba(38,161,123,0.1)" : "rgba(255,255,255,0.03)",
              cursor: "pointer",
              height: "100%",
              transition: "all 0.3s ease",
            }}
            onClick={() => setSelectedOption("video")}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Avatar sx={{ bgcolor: selectedOption === "video" ? "#26A17B" : "rgba(255,255,255,0.1)", mr: 2 }}>3</Avatar>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "white" }}>
                تأیید ویدئویی
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)", pl: 7 }}>
              ویدئوی کوتاه تأیید هویت (10-15 ثانیه)
            </Typography>
          </Box>
        </Grid>
      </Grid>

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
          background: isDragActive ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)",
          "&:hover": { background: "rgba(255,255,255,0.08)" },
        }}
      >
        <input {...getInputProps()} />
        {file ? (
          <Box>
            {/* آیکن بالای پیش‌نمایش */}
            {optionConfig.icon}

            {/* پیش‌نمایش مطابق نوع فایل */}
            {isImage(file) && (
              <img
                src={URL.createObjectURL(file)}
                alt="preview"
                style={{ maxWidth: "100%", maxHeight: 220, borderRadius: 12, marginBottom: 12 }}
              />
            )}
            {isPdf(file) && (
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 1 }}>
                <PictureAsPdf sx={{ mr: 1 }} />
                <Typography sx={{ color: "white" }}>{file.name}</Typography>
              </Box>
            )}
            {isVideo(file) && (
              <video
                src={URL.createObjectURL(file)}
                controls
                style={{ width: "100%", maxHeight: 260, borderRadius: 12, marginBottom: 12 }}
              />
            )}

            <Typography sx={{ color: "white" }}>{file.name}</Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }}>
              {(file.size / (1024 * 1024)).toFixed(2)} MB
            </Typography>
          </Box>
        ) : (
          <>
            <CloudUpload sx={{ fontSize: 60, color: "rgba(255,255,255,0.5)", mb: 2 }} />
            <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.8)", mb: 1 }}>
              {isDragActive ? "فایل را اینجا رها کنید" : optionConfig.label}
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>
              {optionConfig.help}
            </Typography>
          </>
        )}
      </FileUploadBox>

      {error && (
        <Typography sx={{ color: "#ff6b6b", textAlign: "center", mt: 2, fontSize: 14 }}>
          {error}
        </Typography>
      )}

      {uploading && (
        <Box sx={{ mt: 2 }}>
          <LinearProgress variant="determinate" value={progress} />
          <Typography align="center" sx={{ color: "rgba(255,255,255,0.7)", mt: 1 }}>
            در حال آپلود... {progress}%
          </Typography>
        </Box>
      )}

      <Box sx={{ mt: 4, display: "flex", justifyContent: "center", gap: 2 }}>
        <StyledButton
          variant="contained"
          size="large"
          onClick={handleUpload}
          sx={{ px: 6 }}
          disabled={!file || uploading}
        >
          آپلود و تکمیل فرایند
        </StyledButton>
      </Box>
    </GradientPaper>
  );
};

export default AdvancedLevel;
