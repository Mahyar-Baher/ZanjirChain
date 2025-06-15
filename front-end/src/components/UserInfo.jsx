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
import axios from "axios";

const labels = {
  userId: "شناسه کاربری",
  firstName: "نام",
  lastName: "نام خانوادگی",
  birthDate: "تاریخ تولد",
  nationalId: "کد ملی",
  phone: "شماره تلفن همراه",
  email: "آدرس ایمیل",
};

const InfoRow = ({ label, value }) => (
  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
    <Typography variant="body2" color="text.secondary" fontWeight="800">
      {label}:
    </Typography>
    <Typography variant="body1">{value || "-"}</Typography>
  </Box>
);

const UserInfo = () => {
  const [user, setUser] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .post("https://amirrezaei2002x.shop/laravel/api/chektoken", { token })
        .then((response) => {
          if (response.data.success) {
            setUser(response.data.user);
            setWallet(response.data.wallet);
            setFormData(response.data.user);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("wallet", JSON.stringify(response.data.wallet));
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  const handleChange = (field) => (event) => {
    const newData = { ...formData, [field]: event.target.value };
    setFormData(newData);
    if (isEditing) {
      setUser(newData);
      // می‌تونی اینجا درخواست ذخیره تغییرات به سرور بزنی
    }
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const formDataImage = new FormData();
      formDataImage.append("avatar", file);

      fetch("/api/upload-avatar", {
        method: "POST",
        body: formDataImage,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.avatarUrl) {
            const newData = { ...formData, avatarUrl: data.avatarUrl };
            setFormData(newData);
            setUser(newData);
            // می‌تونی درخواست ذخیره آواتار به سرور بزنی
          }
        })
        .catch((err) => {
          console.error("خطا در آپلود آواتار:", err);
        });
    }
  };

  if (!user || !formData) return null;

  const {
    id: userId,
    first_name: firstName,
    last_name: lastName,
    birth_date: birthDate,
    national_code: nationalId,
    mobile_number: phone,
    email,
    avatarUrl,
  } = formData;

  return (
    <Box sx={{ width: "100%", p: 3, direction: "rtl" }}>
      <Typography variant="h5" mb={2}>
        اطلاعات من
      </Typography>

      <Card elevation={0} sx={{ backgroundColor: "transparent", borderRadius: 3 }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center" flexDirection="row-reverse">
            <Grid item xs={12} md={12} lg={3}>
              <Box display="flex" justifyContent="center">
                <ButtonBase
                  component="label"
                  sx={{ borderRadius: "40px", overflow: "hidden", position: "relative", width: 80, height: 80 }}
                >
                  <Avatar src={avatarUrl} sx={{ width: 80, height: 80, fontSize: 38 }}>
                    {firstName?.charAt(0)}
                  </Avatar>
                  <input type="file" accept="image/*" hidden onChange={handleAvatarChange} />
                </ButtonBase>
              </Box>
            </Grid>

            <Grid item xs={12} md={12} lg={9}>
              {isEditing ? (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
                  <TextField label={labels.userId} value={userId || ""} disabled fullWidth size="small" />
                  <TextField label={labels.firstName} value={firstName || ""} onChange={handleChange("first_name")} fullWidth size="small" />
                  <TextField label={labels.lastName} value={lastName || ""} onChange={handleChange("last_name")} fullWidth size="small" />
                  <TextField label={labels.birthDate} value={birthDate || ""} onChange={handleChange("birth_date")} fullWidth size="small" />
                  <TextField label={labels.nationalId} value={nationalId || ""} onChange={handleChange("national_code")} fullWidth size="small" />
                  <TextField label={labels.phone} value={phone || ""} onChange={handleChange("mobile_number")} fullWidth size="small" />
                  <TextField label={labels.email} value={email || ""} onChange={handleChange("email")} fullWidth size="small" />
                </Box>
              ) : (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
                  <InfoRow label={labels.userId} value={userId} />
                  <InfoRow label={labels.firstName} value={firstName} />
                  <InfoRow label={labels.lastName} value={lastName} />
                  <InfoRow label={labels.birthDate} value={birthDate} />
                  <InfoRow label={labels.nationalId} value={nationalId} />
                  <InfoRow label={labels.phone} value={phone} />
                  <InfoRow label={labels.email} value={email} />
                </Box>
              )}
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                size="large"
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
