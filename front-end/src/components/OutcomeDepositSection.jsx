import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import WithdrawalTabs from './WithdrawalTabs';
import CryptoMethodTabs from './CryptoMethodTabs';
import BalanceDisplay from './BalanceDisplay';
import WithdrawalForm from './WithdrawalForm';
import useAuthStore from '../context/authStore'; // مسیر فایل useAuthStore.js

const cryptoMethods = [];
const methodKeys = [];

const WithdrawalSection = () => {
  const { wallet, fetchWalletBalance } = useAuthStore();
  const [tab, setTab] = useState('toman');
  const [method, setMethod] = useState(0);
  const [balanceToman, setBalanceToman] = useState(0);
  const [balanceTether, setBalanceTether] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          const tomanBalance = parseFloat(wallet.totalToman || 0);
          const tetherBalance = parseFloat(wallet.with_creadit_total_balance_formatted || 0);
          if (isNaN(tomanBalance) || isNaN(tetherBalance)) {
            throw new Error('مقادیر wallet نامعتبر هستند');
          }
          setBalanceToman(tomanBalance);
          setBalanceTether(tetherBalance);
        } catch (error) {
          console.error('خطا در پردازش داده‌های ولت:', error);
          setError('خطا در پردازش اطلاعات ولت.');
          setBalanceToman(0);
          setBalanceTether(0);
        }
      } else {
        setError('اطلاعات ولت یافت نشد.');
        setBalanceToman(0);
        setBalanceTether(0);
      }
      setLoading(false);
    };

    loadWallet();
  }, [wallet, fetchWalletBalance]);

  return (
    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box sx={{ mb: 2 }}>
          <Typography color="error">{error}</Typography>
        </Box>
      ) : (
        <>
          <WithdrawalTabs tab={tab} setTab={setTab} setMethod={setMethod} />
          <BalanceDisplay balanceToman={balanceToman} balanceTether={balanceTether} />
          {tab === 'crypto' && cryptoMethods.length > 0 && (
            <CryptoMethodTabs methods={cryptoMethods} method={method} setMethod={setMethod} />
          )}
          <Box sx={{ border: '0px solid #ccc', borderRadius: 2, p: 2, minHeight: 300 }}>
            <WithdrawalForm
              activeMethod={method}
              isCrypto={tab === 'crypto'}
              balanceToman={balanceToman}
              balanceTether={balanceTether}
              methodKeys={methodKeys}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default WithdrawalSection;