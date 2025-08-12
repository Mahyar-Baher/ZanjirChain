import { Box, Button, TextField, Typography, Chip, Avatar } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NetworkSelect from './NetworkSelect';
import TokenSelect from './TokenSelectModal'; // فرض می‌کنیم TokenSelect به نسخه کارتی تغییر کرده
import { Icon } from '@iconify/react';

export default function CryptoDepositForm() {
  const [tokens, setTokens] = useState([]);
  const [selectedToken, setSelectedToken] = useState(null);
  const [networks, setNetworks] = useState({});
  const [selectedNetwork, setSelectedNetwork] = useState('');

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('توکن پیدا نشد');
          return;
        }
        const res = await axios.post(
          'https://amirrezaei2002x.shop/laravel/api/getAllWallets',
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data && Array.isArray(res.data)) {
          const rawTokens = res.data;

          // فقط تتر و آدرس های مختلف شبکه هاش
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
          console.error('پاسخ API نامعتبر است:', res.data);
        }
      } catch (error) {
        console.error('خطا در دریافت توکن‌ها:', error);
      }
    };

    fetchTokens();
  }, []);

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

      {/* بخش انتخاب رمز ارز */}
      <Box sx={{ mb: 1 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 2, 
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
              justifyContent:"space-between",
              p: 1, 
              borderRadius: 3, 
              bgColor: 'Background.paper',
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
                  p:0,
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
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 2, 
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