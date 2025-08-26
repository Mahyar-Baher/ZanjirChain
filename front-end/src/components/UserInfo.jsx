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
  first_name: "نام",
  last_name: "نام خانوادگی",
  national_code: "کد ملی",
  mobile_number: "شماره تلفن همراه",
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
    first_name,
    last_name,
    national_code,
    mobile_number,
    avatarUrl,
  } = formData;

  return (
    <Box sx={{ width: "100%", p: 3, direction: "rtl" }}>
      <Typography variant="h5" mb={2}>اطلاعات من</Typography>

      <Card elevation={0} sx={{ backgroundColor: "transparent", borderRadius: 3 }}>
        <CardContent>
          <Grid container spacing={3} flexDirection="row-reverse">

            <Grid size={{xs:12, md:12}}>
              {isEditing ? (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
                  <TextField label={labels.first_name} value={first_name || ""} onChange={handleChange("first_name")} fullWidth size="small" />
                  <TextField label={labels.last_name} value={last_name || ""} onChange={handleChange("last_name")} fullWidth size="small" />
                  <TextField label={labels.national_code} value={national_code || ""} onChange={handleChange("national_code")} fullWidth size="small" />
                  <TextField label={labels.mobile_number} value={mobile_number || ""} onChange={handleChange("mobile_number")} fullWidth size="small" />
                </Box>
              ) : (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
                  <InfoRow label={labels.first_name} value={first_name} />
                  <InfoRow label={labels.last_name} value={last_name} />
                  <InfoRow label={labels.national_code} value={national_code} />
                  <InfoRow label={labels.mobile_number} value={mobile_number} />
                </Box>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserInfo;
