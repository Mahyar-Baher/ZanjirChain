import { Box, Button, TextField, Typography, Chip, Avatar } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NetworkSelect from './NetworkSelect';
import TokenSelect from './TokenSelectModal';
import { Icon } from '@iconify/react';
import useAuthStore from '../context/authStore'; // فرضاً مسیر فایل useAuthStore.js

export default function CryptoPaymentForm() {
  const { token, wallet } = useAuthStore(); // توکن و ولت رو از useAuthStore بگیر
  const [tokens, setTokens] = useState([]);
  const [selectedToken, setSelectedToken] = useState(null);
  const [networks, setNetworks] = useState({});
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTokens = async () => {
      if (!token) {
        setError('توکن احراز هویت یافت نشد. لطفاً دوباره وارد شوید.');
        return;
      }

      // اگر اطلاعات ولت در useAuthStore موجوده، از همون استفاده کن
      if (wallet && wallet.currency === 'usdt') {
        const usdtNetworks = {};
        Object.entries(wallet.networks || {}).forEach(([network, address]) => {
          usdtNetworks[network.toLowerCase()] = address;
        });

        const tetherToken = {
          name: 'Tether',
          symbol: 'USDT',
          networks: usdtNetworks,
        };
        setTokens([tetherToken]);
        return;
      }

      // در غیر این صورت، درخواست به API
      setLoading(true);
      try {
        const res = await axios.post(
          'https://amirrezaei2002x.shop/laravel/api/getAllWallets',
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (res.data && Array.isArray(res.data)) {
          const rawTokens = res.data;
          const usdtNetworks = {};
          rawTokens.forEach(wallet => {
            usdtNetworks[wallet.network.toLowerCase()] = wallet.address;
          });

          const tetherToken = {
            name: 'Tether',
            symbol: 'USDT',
            networks: usdtNetworks,
          };
          setTokens([tetherToken]);
        } else {
          setError('پاسخ API نامعتبر است.');
        }
      } catch (error) {
        setError(error.response?.data?.message || 'خطا در دریافت اطلاعات ولت.');
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  }, [token, wallet]);

  const handleTokenSelect = (token) => {
    setSelectedToken(token);
    setNetworks(token.networks || {});
    setSelectedNetwork('');
  };

  return (
    <Box 
      sx={{ 
        mx: 'auto', 
        p: 0,
        borderRadius: 4,
        mt: 0
      }}
    >
      {/* نمایش لودینگ یا خطا */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <Typography>در حال بارگذاری...</Typography>
        </Box>
      )}
      {error && (
        <Box sx={{ mb: 2 }}>
          <Typography color="error">{error}</Typography>
        </Box>
      )}

      {/* بخش انتخاب رمز ارز */}
      <Box sx={{ mb: 1 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 1, 
            fontWeight: 700,
            color: '#1a652a',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <Icon icon="mdi:currency-usd-circle" width={28} height={28} />
          انتخاب رمز ارز
        </Typography>
        
        {selectedToken ? (
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: "space-between",
              p: 1, 
              borderRadius: 3, 
              bgColor: 'background.paper',
              position: 'relative'
            }}
          >
            <Avatar 
              sx={{ 
                bgcolor: '#c8e6c9', 
                width: 40, 
                height: 40,
                boxShadow: '0 3px 8px rgba(0,0,0,0.1)'
              }}
            >
              <Icon 
                icon={`cryptocurrency-color:${selectedToken.symbol.toLowerCase()}`} 
                width={40} 
                height={40} 
              />
            </Avatar>
            
            <Box sx={{ ml: 3 }}>
              <Typography variant="body1" sx={{ fontWeight: 800, color: '#2e7d32' }}>
                {selectedToken.name}
              </Typography>
              <Chip 
                label={selectedToken.symbol} 
                sx={{ 
                  mt: 1, 
                  p: 0,
                  bgcolor: '#28a745', 
                  color: 'white', 
                  fontWeight: 700,
                  fontSize: '0.6rem'
                }} 
              />
            </Box>
            
            <Button 
              variant="outlined" 
              onClick={() => setSelectedToken(null)}
              sx={{ 
                minWidth: 'auto',
                p: 1,
                color: '#28a745',
                borderColor: '#28a745'
              }}
            >
              <Icon icon="mdi:refresh" width={20} height={20} />
            </Button>
          </Box>
        ) : (
          <TokenSelect
            tokens={tokens}
            onSelect={handleTokenSelect}
          />
        )}
      </Box>

      {/* بخش انتخاب شبکه */}
      {selectedToken && (
        <Box sx={{ mb: 0 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 1, 
              fontWeight: 700,
              color: '#2e7d32',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <Icon icon="mdi:network" width={28} height={28} />
            انتخاب شبکه انتقال
          </Typography>
          
          <NetworkSelect
            networks={networks}
            selectedNetwork={selectedNetwork}
            onChange={setSelectedNetwork}
            tokenIcon={selectedToken?.symbol}
          />
        </Box>
      )}
    </Box>
  );
}