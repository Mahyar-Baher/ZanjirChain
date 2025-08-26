import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  Paper,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
const BuySellHome = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("buy");
  const [unitType, setUnitType] = useState("tether");
  const [amount, setAmount] = useState("");
  const [tetherPrice, setTetherPrice] = useState(100000);
  const [equivalentAmount, setEquivalentAmount] = useState(0);
  const profitFactor = 1.04; // فرضاً 2٪ سود، می‌توانید از API بگیرید

  // قیمت تتر از نوبیتکس
  useEffect(() => {
    const fetchTetherPrice = async () => {
      try {
        const response = await fetch(""); // آدرس API نوبیتکس
        const data = await response.json();
        const price = mode === "buy" ? data.ask?.[0]?.[0] : data.bid?.[0]?.[0];
        if (price) setTetherPrice(parseFloat(price));
      } catch (error) {
        console.error("Error fetching tether price:", error);
      }
    };

    fetchTetherPrice();
    const interval = setInterval(fetchTetherPrice, 30000);
    return () => clearInterval(interval);
  }, [mode]);

  // محاسبه معادل با اعمال فی
  useEffect(() => {
    if (amount && !isNaN(amount)) {
      const parsedAmount = parseFloat(amount);

      // محاسبه فی
      const profitCut = (profitFactor - 1) / (profitFactor + 1);
      const finalValue = parsedAmount - parsedAmount * profitCut;

      // محاسبه مقدار نهایی برای کاربر
      if (unitType === "tether") {
        // ورودی: تتر -> خروجی: تومان
        setEquivalentAmount(finalValue * tetherPrice);
      } else {
        // ورودی: تومان -> خروجی: تتر
        setEquivalentAmount(finalValue / tetherPrice);
      }
    } else {
      setEquivalentAmount(0);
    }
  }, [amount, tetherPrice, unitType, profitFactor]);

  // وقتی تب واحد عوض شد: ورودی و معادل رو پاک کن
  const handleUnitChange = (_e, val) => {
    if (!val || val === unitType) return;
    setUnitType(val);
    setAmount("");
    setEquivalentAmount(0);
  };

  // محدودیت و پاکسازی ورودی
  const handleAmountChange = (e) => {
    let val = e.target.value.replace(/[^0-9.]/g, ""); // فقط رقم و نقطه

    if (unitType === "tether") {
      // حداکثر 6 رقم قبل از اعشار + 6 رقم اعشار
      if (val.includes(".")) {
        const [intPart, decPart = ""] = val.split(".");
        const safeInt = intPart.slice(0, 6);
        const safeDec = decPart.slice(0, 6);
        val = safeInt + (safeDec ? "." + safeDec : "");
      } else {
        val = val.slice(0, 6);
      }
    } else {
      // تومان: اعشار حذف و حداکثر 12 رقم
      val = val.replace(/\./g, "");
      val = val.slice(0, 10);
    }

    setAmount(val);
  };

  // فرمت نمایش معادل
  const formatEquivalentAmount = (value, type) => {
    if (type === "tether") {
      return value.toLocaleString("fa-IR", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 6,
      });
    }
    // تومان = بدون اعشار
    return value.toLocaleString("fa-IR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };


  return (
    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 5 }} mb={{xs: 3, md: 7}}>
     
      {/* دکمه‌های خرید/فروش */}
      <Grid container spacing={0} sx={{ mb: 0, px: 2, justifyContent: "space-between" }}>
        <Grid size={{ xs: 5.5 }}>
          <Button
            fullWidth
            variant={mode === "buy" ? "contained" : "outlined"}
            sx={{
              borderRadius: "12px 12px 0px 0px",
              bgcolor: mode === "buy" ? "#2C9F45" : (theme) => theme.palette.background.paper,
              color: mode === "buy" ? "#fff" : (theme) => theme.palette.text.primary,
              border: "4px solid " + (mode === "buy" ? "#2C9F45" : "#0d3a1a"),
              borderBottom: 0,
              fontWeight: "bold",
              "&:hover": { bgcolor: mode === "buy" ? "#2C9F45" : (theme) => theme.palette.background.paper },
            }}
            onClick={() => setMode("buy")}
          >
            خرید تتر
          </Button>
        </Grid>
        <Grid size={{ xs: 5.5 }}>
          <Button
            fullWidth
            variant={mode === "sell" ? "contained" : "outlined"}
            sx={{
              borderRadius: "12px 12px 0px 0px",
              bgcolor: mode === "sell" ? "#2C9F45" : (theme) => theme.palette.background.paper,
              color: mode === "sell" ? "#fff" : (theme) => theme.palette.text.primary,
              border: "4px solid " + (mode === "sell" ? "#2C9F45" : "#0d3a1a"),
              borderBottom: 0,
              fontWeight: "bold",
              "&:hover": { bgcolor: mode === "sell" ? "#2C9F45" : (theme) => theme.palette.background.paper },
            }}
            onClick={() => setMode("sell")}
          >
            فروش تتر
          </Button>
        </Grid>
      </Grid>

      {/* پنل ورودی */}
      <Paper
        elevation={0}
        sx={{
          mt: -0.2,
          borderRadius: "16px",
          overflow: "hidden",
          color: "#fff",
          bgcolor: "#1a652a",
          py: 3,
          textAlign: "start",
        }}
      >
        {/* تب واحد */}
        <ToggleButtonGroup
          value={unitType}
          exclusive
          onChange={handleUnitChange}
          sx={{ mb: 2, width: "100%" }}
        >
          <ToggleButton
            value="tether"
            sx={{
              flex: 1,
              fontSize: 18,
              borderRadius: 50,
              color: "#fff",
              ml: 2,
              border: "none",
              boxShadow: "rgba(0,0,0,0.35) 0px 5px 15px",
              "&.Mui-selected": { bgcolor: "#2C9F45", color: "#fff" },
            }}
          >
            بر حسب تتر
          </ToggleButton>
          <ToggleButton
            value="toman"
            sx={{
              flex: 1,
              fontSize: 18,
              borderRadius: 50,
              color: "#fff",
              border: "none",
              boxShadow: "rgba(0,0,0,0.35) 0px 5px 15px",
              "&.Mui-selected": { bgcolor: "#2C9F45", color: "#fff" },
            }}
          >
            بر حسب تومان
          </ToggleButton>
        </ToggleButtonGroup>

        <Box sx={{ p: 3, pt: 1 }}>
          {/* اینپوت مقدار */}
          <Box>
            <Typography variant="h6" sx={{ mb: 1, width: "100%" }}>
              {mode === "buy" ? "بـــــرای خریـــــد" : "بـــــرای فـــــروش"}
            </Typography>
            <TextField
              value={amount}
              onChange={handleAmountChange}
              placeholder={unitType === "tether" ? "مثلاً 200" : "مثلاً 2500000"}
              InputProps={{
                endAdornment: (
                  <Typography sx={{ color: "#fff", ml: 3 }}>
                    {unitType === "tether" ? "تتر" : "تومان"}
                  </Typography>
                ),
              }}
              sx={{
                width: "100%",
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#2C9F45",
                  borderRadius: "12px",
                  color: "#fff",
                  "& fieldset": { border: "none" },
                },
                input: { textAlign: "start" },
              }}
            />
          </Box>

          {/* معادل */}
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <Typography variant="h3" fontWeight="bold" sx={{ mb: 1, color: "#fff" }}>
              {formatEquivalentAmount(equivalentAmount, unitType === "tether" ? "toman" : "tether")}
            </Typography>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 900, color: "seashell" }}>
              {unitType === "tether" ? "تومان" : "تتر"}
            </Typography>
          </Box>

          {/* دکمه پرداخت */}
          <Button
            fullWidth
            onClick={() => navigate("/Login")}
            sx={{
              borderRadius: "12px",
              bgcolor: "#2C9F45",
              color: "#fff",
              fontWeight: "bold",
              py: 1.5,
              "&:hover": { bgcolor: "#0d3a1a" },
            }}
          >
            پرداخت کنید
          </Button>
        </Box>
      </Paper>
    </Grid>

  );
};

export default BuySellHome;