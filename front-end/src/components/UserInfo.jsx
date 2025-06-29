import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Avatar,
  Card,
  CardContent,
  Button,
  TextField,
  ButtonBase,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const labels = {
  userId: "شناسه کاربری",
  first_name: "نام",
  last_name: "نام خانوادگی",
  birth_date: "تاریخ تولد",
  national_code: "کد ملی",
  mobile_number: "شماره تلفن همراه",
  email: "ایمیل",
};

const InfoRow = ({ label, value }) => (
  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
    <Typography variant="body2" color="text.secondary" fontWeight="800">
      {label}:
    </Typography>
    <Typography variant="body1">{value || "-"}</Typography>
  </Box>
);

const UserInfo = ({ user, onEdit }) => {
  const [formData, setFormData] = useState(user);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleChange = (field) => (e) => {
    const updated = { ...formData, [field]: e.target.value };
    setFormData(updated);
    if (isEditing) {
      onEdit(updated);
    }
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formDataImage = new FormData();
    formDataImage.append("avatar", file);

    fetch("/api/upload-avatar", {
      method: "POST",
      body: formDataImage,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.avatarUrl) {
          const updated = { ...formData, avatarUrl: data.avatarUrl };
          setFormData(updated);
          onEdit(updated);
        }
      })
      .catch((err) => console.error("خطا در آپلود آواتار:", err));
  };

  const {
    id,
    first_name,
    last_name,
    birth_date,
    national_code,
    mobile_number,
    email,
    avatarUrl,
  } = formData;

  return (
    <Box sx={{ width: "100%", p: 3, direction: "rtl" }}>
      <Typography variant="h5" mb={2}>اطلاعات من</Typography>

      <Card elevation={0} sx={{ backgroundColor: "transparent", borderRadius: 3 }}>
        <CardContent>
          <Grid container spacing={3} flexDirection="row-reverse">
            <Grid item xs={12} md={3}>
              <Box display="flex" justifyContent="center">
                <ButtonBase component="label" sx={{ borderRadius: "40px", overflow: "hidden" }}>
                  <Avatar src={avatarUrl} sx={{ width: 80, height: 80 }}>
                    {first_name?.charAt(0)}
                  </Avatar>
                  <input type="file" hidden accept="image/*" onChange={handleAvatarChange} />
                </ButtonBase>
              </Box>
            </Grid>

            <Grid item xs={12} md={9}>
              {isEditing ? (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
                  <TextField label={labels.userId} value={id || ""} fullWidth size="small" disabled />
                  <TextField label={labels.first_name} value={first_name || ""} onChange={handleChange("first_name")} fullWidth size="small" />
                  <TextField label={labels.last_name} value={last_name || ""} onChange={handleChange("last_name")} fullWidth size="small" />
                  <TextField label={labels.birth_date} value={birth_date || ""} onChange={handleChange("birth_date")} fullWidth size="small" />
                  <TextField label={labels.national_code} value={national_code || ""} onChange={handleChange("national_code")} fullWidth size="small" />
                  <TextField label={labels.mobile_number} value={mobile_number || ""} onChange={handleChange("mobile_number")} fullWidth size="small" />
                  <TextField label={labels.email} value={email || ""} onChange={handleChange("email")} fullWidth size="small" />
                </Box>
              ) : (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
                  <InfoRow label={labels.userId} value={id} />
                  <InfoRow label={labels.first_name} value={first_name} />
                  <InfoRow label={labels.last_name} value={last_name} />
                  <InfoRow label={labels.birth_date} value={birth_date} />
                  <InfoRow label={labels.national_code} value={national_code} />
                  <InfoRow label={labels.mobile_number} value={mobile_number} />
                  <InfoRow label={labels.email} value={email} />
                </Box>
              )}
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth variant="contained" size="large"
                sx={{ borderRadius: 2, py: 1.5 }}
                startIcon={<EditOutlinedIcon sx={{ ml: 1.3 }} />}
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? " پایان ویرایش " : " ویرایش اطلاعات "}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserInfo;
