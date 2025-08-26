import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, Box } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { useNavigate } from "react-router-dom";

const TetherPriceHome = () => {
  const [price, setPrice] = useState(null);
  const [changePercent, setChangePercent] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const USD_TO_IRT = 100000;

  useEffect(() => {
    let timer = null;
    const aborter = new AbortController();

    const fetchPrice = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=usd&include_24hr_change=true",
          { signal: aborter.signal, cache: "no-store" }
        );
        const data = await response.json();

        if (data.tether && data.tether.usd) {
          const tetherPriceUSD = parseFloat(data.tether.usd);
          const tetherPriceIRT = tetherPriceUSD * USD_TO_IRT;
          setPrice(tetherPriceIRT);

          const change = parseFloat(data.tether.usd_24h_change);
          if (!Number.isNaN(change)) {
            setChangePercent(change.toFixed(0));
          }
        } else {
          throw new Error("Invalid");
        }

        setError(null);
      } catch (e) {
        console.error("Fetch failed:", e);
        setError("-------");
      }
    };

    fetchPrice();
    timer = setInterval(fetchPrice, 30000);

    return () => {
      if (timer) clearInterval(timer);
      aborter.abort();
    };
  }, []);
  const showPrice = error
  ? error
  : price != null
  ? price.toLocaleString("fa-IR", {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    })
  : "در حال بارگذاری...";

  const isUp = (changePercent ?? 0) >= 0;

  return (
    <Grid
      size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 7 }}
      textAlign="end"
      display="flex"
      flexDirection="column"
      justifyContent={{ xs: "center", md: "center" }}
      alignItems={{ xs: "center", md: "end" }}
      mb={{xs: 5, md: 7}}
      sx={{ p: 0, px: {xs: 0 ,md: 8}, borderRadius: "16px" }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ mb: 2, color: (theme) => theme.palette.text.primary, fontSize: { xs: 30, sm: 35 } }}
      >
        نرخ لحظه ای دلار/تتر
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          gap: 1.5,
          mb: 3,
        }}
      >
        <Typography
          variant="h2"
          fontWeight="bold"
          sx={{ color:(theme) => theme.palette.text.primary, fontSize: { xs: 45, sm: 77 } }}
        >
          {showPrice}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: isUp ? "#26A17B" : "red",
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold">
            {changePercent != null ? `${changePercent}%` : "—"}
          </Typography>
          <TrendingUpIcon
            sx={{
              fontSize: 48,
              transform: isUp ? "rotate(0deg)" : "rotate(180deg)",
            }}
          />
        </Box>
      </Box>

      <Button
        variant="contained"
        onClick={() => navigate("/Login")}
        sx={{
          bgcolor: "#1b5e20",
          borderRadius: "12px",
          px: {xs: 2 , md: 9},
          py: 1.5,
          fontWeight: "bold",
          fontSize: "1rem",
          "&:hover": { bgcolor: "#145a3a" },
        }}
      >
        چطور سریعاً تتر بخریم؟
      </Button>
    </Grid>
  );
};

export default TetherPriceHome;
