/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Box, Typography, Divider, useMediaQuery, useTheme, CircularProgress, Grid , Paper} from '@mui/material';
import DualProgress from '../components/DualProgress';
import useAuthStore from '../context/authStore';
import { lightBlue, red } from '@mui/material/colors';
import { styled } from '@mui/material/styles';



const Item = styled(Paper)(({ theme }) => ({
  boxShadow: '0 0 0',
  padding : "20px",
  paddingTop : "8px",
  paddingBottom : "8px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  borderRadius : "0px",
}));


const AllPrice = () => {
  const { wallet, fetchWalletBalance } = useAuthStore();
  const [toman, setToman] = useState(0);
  const [tether, setTether] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const rate = 100000;
  const size = 150;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    // console.log("📌 Wallet State:", wallet);
    const loadWallet = async () => {
      setLoading(true);
      setError(null);

      if (!wallet) {
        try {
          await fetchWalletBalance();
        } catch (err) {
          console.error('خطا در فراخوانی fetchWalletBalance:', err);
          setError('خطا در بارگذاری اطلاعات ولت.');
          setLoading(false);
          return;
        }
      }

      if (wallet) {
        try {
          const tomanBalance = parseFloat(wallet.finalltotalintoman || 0);
          const tetherBalance = parseFloat(wallet.finalltotalindollar || 0);

          // تومان: بدون اعشار
          const formattedToman = tomanBalance.toLocaleString('fa-IR', {
              maximumFractionDigits: 0
          });

          // دلار: حداکثر 3 رقم اعشار
          const formattedDollar = tetherBalance.toLocaleString('en-US', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 3
          });
          if (isNaN(tomanBalance) || isNaN(tetherBalance)) {
            throw new Error('مقادیر wallet نامعتبر هستند');
          }
          setToman(formattedToman);
          setTether(formattedDollar);
        } catch (error) {
          console.error('خطا در پردازش داده‌های ولت:', error);
          setError('خطا در پردازش اطلاعات ولت.');
          setToman(0);
          setTether(0);
        }
      } else {
        setError('اطلاعات ولت یافت نشد.');
        setToman(0);
        setTether(0);
      }
      setLoading(false);
    };

    loadWallet();
  }, [wallet, fetchWalletBalance]);

  return (
    <>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, sm: 4, md: 4 }} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <DualProgress size={isMobile ? 120 : size} tether={tether} toman={toman} rate={rate} />
        </Grid>
        <Grid size={{ xs: 12, sm: 8, md: 8 }}>  
          <Item>
            <Box fontSize={20} fontWeight={"bold"}>موجودی تومانی</Box>
            <Box>
            <Typography
                fontSize={20}
                fontWeight={"bold"}
                noWrap
              >
                {toman} تومان
              </Typography>
            </Box>
          </Item>
          <Item>
            <Box fontSize={20} fontWeight={"bold"}>موجودی ارزی</Box>
            <Box >
            <Typography
                fontSize={20}
                fontWeight={"bold"}
                noWrap
              >
                {isNaN(tether)
                  ? '۰'
                  : tether.toLocaleString('en-US', {
                      minimumFractionDigits: 1,
                      maximumFractionDigits: 6,
                    })}{' '}
                ارز
            </Typography>
            </Box>
          </Item>
          <hr style={{ marginTop:"5px" , marginBottom:"5px" }} />
          <Item>
            <Box fontSize={15} fontWeight={"bold"}>ارزش تومانی موجودی ارزی</Box>
            <Box fontSize={15} fontWeight={"bold"}>
              <Typography
                  fontSize={15}
                  fontWeight={"bold"}
                >
                  {isNaN(tether * rate)
                    ? '۰'
                    : (tether * rate).toLocaleString('fa-IR')} تومان
              </Typography>
            </Box>
          </Item>
        </Grid>
      </Grid>
    </>
  );
};

export default AllPrice;