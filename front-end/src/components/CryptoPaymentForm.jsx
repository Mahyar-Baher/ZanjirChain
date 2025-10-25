import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  FormControl,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import useAuthStore from "../context/authStore";

export default function CryptoPaymentForm() {
  const { token } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [wallets, setWallets] = useState({}); // {ethereum: "0x...", tron: "T...", solana: "W..."}
  const [selectedNetwork, setSelectedNetwork] = useState("Ethereum");
  const [selectedToken, setSelectedToken] = useState("USDT");

  // لیست شبکه‌ها
  const networks = ["Ethereum", "Solana", "Tron"];

  // لیست ارزها برای هر شبکه
  const currencies = {
    Ethereum: ["USDT", "USDC", "ETH", "WETH", "DAI", "LINK", "UNI"],
    Solana: ["USDT", "USDC", "SOL", "RAY", "SRM", "ORCA"],
    Tron: ["USDT", "USDC", "TRX", "BTT", "SUN"],
  };

  useEffect(() => {
    const fetchWallets = async () => {
      if (!token) {
        setError("توکن احراز هویت یافت نشد.");
        return;
      }

      setLoading(true);
      try {
        const res = await axios.post(
          "https://pump-ex.com/laravel/api/getAllWallets",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (Array.isArray(res.data)) {
          const map = {};
          res.data.forEach(({ network, address }) => {
            map[network.toLowerCase()] = address;
          });
          setWallets(map);
        } else {
          setError("پاسخ API نامعتبر است.");
        }
      } catch (err) {
        setError(err.response?.data?.message || "خطا در دریافت ولت‌ها.");
      } finally {
        setLoading(false);
      }
    };

    fetchWallets();
  }, [token]);

  const currentAddress = wallets[selectedNetwork.toLowerCase()] || "—";

  return (
    <Box>
      {error && <Typography color="error">{error}</Typography>}
      {loading ? (
        <Box textAlign="center" py={5}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* انتخاب شبکه */}
          <Typography mb={1}>انتخاب شبکه</Typography>
          <FormControl fullWidth>
            <Select
              value={selectedNetwork}
              onChange={(e) => {
                setSelectedNetwork(e.target.value);
                setSelectedToken(currencies[e.target.value][0]);
              }}
            >
              {networks.map((net) => (
                <MenuItem key={net} value={net}>
                  {net}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* انتخاب ارز */}
          <Typography mb={1} mt={4}>
            انتخاب ارز
          </Typography>
          <FormControl fullWidth>
            <Select
              value={selectedToken}
              onChange={(e) => setSelectedToken(e.target.value)}
            >
              {currencies[selectedNetwork].map((curr) => (
                <MenuItem key={curr} value={curr}>
                  {curr}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* نمایش آدرس */}
          <Box mt={6}>
            <Typography mb={1}>
              آدرس {selectedToken} ({selectedNetwork})
            </Typography>
            <Box
              p={2}
              border="1px solid"
              flexDirection={"column"}
              borderColor="divider"
              borderRadius={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography mb={2} sx={{ wordBreak: "break-all", maxWidth: "100%" }}>
                {currentAddress}
              </Typography>
              <Button

                onClick={() => navigator.clipboard.writeText(currentAddress)}
                variant="outlined"
                size="small"
                
              >
                کپی
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}
