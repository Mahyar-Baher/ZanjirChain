import React, { useEffect, useState, useMemo } from 'react';
import {
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import useAuthStore from '../context/authStore';


const Item = styled(Paper)(({ theme }) => ({
  boxShadow: '0 0 0',
  backgroundColor: "#317540",
  color: "#fff",
}));



const TetherChartDash = () => {
  const { wallet, fetchWalletBalance } = useAuthStore();
  const [toman, setToman] = useState(0);
  const [tether, setTether] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const rate = 100000;
    const size = 150;

    useEffect(() => {
      
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
    <Paper sx={{ p: 1, borderRadius: 3 , height:155 , backgroundColor:"#317540" }}>
      <Item>
          {Object.entries(wallet).map(([token , info])=> {
            if(token != "finalltotalindollar" && token != "finalltotalintoman" && token != "success"){
                return token
            }
          })}
      </Item>
    </Paper>
    </>
  );
};

export default TetherChartDash;
