import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import useAuthStore from '../context/authStore';
import { 
  SolanaIcon, 
  EthereumIcon, 
  TronIcon, 
  UsdtIcon, 
  UsdcIcon,
  EthIcon,
  WethIcon,
  DaiIcon,
  LinkIcon,
  UniIcon,
  SolIcon,
  RayIcon,
  SrmIcon,
  OrcaIcon,
  TrxIcon,
  BttIcon,
  SunIcon
} from '../IconsComp/iconscomp';

const Item = styled(Paper)(({ theme }) => ({
  boxShadow: '0 0 0',
  backgroundColor: "#317540",
  color: "#fff",
}));

// تابع برای انتخاب آیکون مناسب برای هر توکن
const getTokenIcon = (symbol) => {
  const symbolLower = symbol.toLowerCase();
  
  const iconMap = {
    'usdt': UsdtIcon,
    'usdc': UsdcIcon,
    'eth': EthIcon,
    'weth': WethIcon,
    'dai': DaiIcon,
    'link': LinkIcon,
    'uni': UniIcon,
    'sol': SolIcon,
    'ray': RayIcon,
    'srm': SrmIcon,
    'orca': OrcaIcon,
    'trx': TrxIcon,
    'btt': BttIcon,
    'sun': SunIcon,
  };
  
  return iconMap[symbolLower];
};

// تابع برای انتخاب آیکون شبکه
const getNetworkIcon = (network) => {
  const networkLower = network.toLowerCase();
  
  if (networkLower.includes('ethereum') || networkLower.includes('eth')) {
    return EthereumIcon;
  } else if (networkLower.includes('solana') || networkLower.includes('sol')) {
    return SolanaIcon;
  } else if (networkLower.includes('tron') || networkLower.includes('trx')) {
    return TronIcon;
  }
  
  return null;
};

const TetherChartDash = () => {
  const { wallet, fetchWalletBalance } = useAuthStore();
  const [toman, setToman] = useState(0);
  const [tether, setTether] = useState(0);
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
          const tomanBalance = parseFloat(wallet.finalltotalintoman || 0);
          const tetherBalance = parseFloat(wallet.finalltotalindollar || 0);
          
          const formattedToman = tomanBalance.toLocaleString('fa-IR', {
            maximumFractionDigits: 0
          });

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
    <Paper sx={{ p: 1, borderRadius: 3, backgroundColor: "#317540" }}>
      <Item sx={{ 
        background: 'linear-gradient(135deg, #1e4620 0%, #2a5a2f 100%)', 
        maxHeight: '600px', 
        overflow: 'hidden', 
        display: 'flex', 
        flexDirection: 'column' 
      }}>
        <Box 
          m={2} 
          fontWeight="bold" 
          fontSize="1.3rem"
          sx={{
            background: 'linear-gradient(90deg, rgb(255, 255, 255), #4ade80)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: 'center',
            letterSpacing: '1px',
            flexShrink: 0
          }}
        >
          پرتفوی دیجیتال شما
        </Box>
        
        {wallet ? (
          <Box 
            sx={{
              overflowY: 'auto',
              px: 2,
              pb: 2,
              '&::-webkit-scrollbar': {
                width: 6,
              },
              '&::-webkit-scrollbar-track': {
                background: 'rgba(255,255,255,0.05)',
                borderRadius: 3,
              },
              '&::-webkit-scrollbar-thumb': {
                background: 'rgba(74, 222, 128, 0.4)',
                borderRadius: 3,
                '&:hover': {
                  background: 'rgba(74, 222, 128, 0.6)',
                }
              }
            }}
          >
            <Box 
              display="grid" 
              gridTemplateColumns="repeat(auto-fit, minmax(280px, 1fr))" 
              gap={2}
            >
              {Object.entries(wallet)
                .filter(([network, tokens]) => 
                  typeof tokens === "object" && 
                  !Array.isArray(tokens) &&
                  network !== "finalltotalindollar" && 
                  network !== "finalltotalintoman" && 
                  network !== "success" && 
                  network !== "from_cache"
                )
                .map(([network, tokens]) => {
                  const NetworkIcon = getNetworkIcon(network);
                  
                  return (
                    <Box 
                      key={network}
                      sx={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: 3,
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        overflow: 'hidden',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        maxHeight: '400px',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                          border: '1px solid rgba(74, 222, 128, 0.4)',
                        }
                      }}
                    >
                      {/* هدر شبکه */}
                      <Box 
                        py={1.5}
                        px={2}
                        sx={{
                          background: 'linear-gradient(90deg, rgba(74, 222, 128, 0.15), rgba(74, 222, 128, 0.15))',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          flexShrink: 0
                        }}
                      >
                        <Box 
                          display="flex" 
                          alignItems="center" 
                          justifyContent="center"
                          gap={1}
                        >
                          {NetworkIcon && (
                            <Box 
                              sx={{ 
                                display: 'flex', 
                                alignItems: 'center',
                                color: '#4ade80',
                                filter: 'drop-shadow(0 0 8px rgba(74, 222, 128, 0.6))'
                              }}
                            >
                              <NetworkIcon />
                            </Box>
                          )}
                          <Box 
                            fontWeight="bold" 
                            fontSize="1.1rem"
                            sx={{ 
                              color: '#4ade80',
                              textTransform: 'uppercase',
                              letterSpacing: '1.5px',
                              textShadow: '0 2px 10px rgba(74, 222, 128, 0.3)'
                            }}
                          >
                            {network}
                          </Box>
                        </Box>
                      </Box>

                      {/* لیست توکن‌ها - با اسکرول */}
                      <Box 
                        sx={{
                          overflowY: 'auto',
                          p: 2,
                          flexGrow: 1,
                          '&::-webkit-scrollbar': {
                            width: 4,
                          },
                          '&::-webkit-scrollbar-track': {
                            background: 'rgba(255,255,255,0.03)',
                            borderRadius: 2,
                          },
                          '&::-webkit-scrollbar-thumb': {
                            background: 'rgba(74, 222, 128, 0.3)',
                            borderRadius: 2,
                            '&:hover': {
                              background: 'rgba(74, 222, 128, 0.5)',
                            }
                          }
                        }}
                      >
                        {Object.entries(tokens).map(([symbol, tokenData], idx) => {
                          const TokenIcon = getTokenIcon(symbol);
                          
                          return (
                            <Box 
                              key={`${network}-${symbol}`}
                              display="flex"
                              justifyContent="space-between"
                              alignItems="center"
                              py={1.5}
                              px={2}
                              mb={1}
                              sx={{
                                background: idx % 2 === 0 
                                  ? 'linear-gradient(90deg, rgba(255,255,255,0.03), rgba(255,255,255,0.06))' 
                                  : 'transparent',
                                borderRadius: 2,
                                borderLeft: '3px solid transparent',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                  borderLeft: '3px solid #4ade80',
                                  background: 'linear-gradient(90deg, rgba(74, 222, 128, 0.1), rgba(255,255,255,0.05))',
                                  transform: 'translateX(5px)',
                                }
                              }}
                            >
                              <Box 
                                display="flex" 
                                alignItems="center" 
                                gap={1.5}
                              >
                                <Box 
                                  sx={{
                                    width: 35,
                                    height: 35,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}
                                >
                                  {TokenIcon ? (
                                    <TokenIcon />
                                  ) : (
                                    <Box 
                                      sx={{
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: '50%',
                                        background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 'bold',
                                        fontSize: '0.85rem',
                                        boxShadow: '0 4px 15px rgba(74, 222, 128, 0.4)',
                                        color: '#fff'
                                      }}
                                    >
                                      {symbol.slice(0, 2).toUpperCase()}
                                    </Box>
                                  )}
                                </Box>
                                <Box>
                                  <Box fontWeight="600" fontSize="0.95rem">
                                    {symbol}
                                  </Box>
                                  <Box 
                                    fontSize="0.7rem" 
                                    sx={{ 
                                      color: 'rgba(255,255,255,0.5)',
                                      textTransform: 'uppercase'
                                    }}
                                  >
                                    Token
                                  </Box>
                                </Box>
                              </Box>
                              
                              <Box textAlign="right">
                                <Box 
                                  fontFamily="monospace" 
                                  fontWeight="bold"
                                  fontSize="1rem"
                                  sx={{ 
                                    color: '#4ade80',
                                    textShadow: '0 0 10px rgba(74, 222, 128, 0.3)'
                                  }}
                                >
                                  {Number(tokenData.total).toFixed(5)}
                                </Box>
                                <Box 
                                  fontSize="0.7rem" 
                                  sx={{ color: 'rgba(255,255,255,0.4)' }}
                                >
                                  موجودی
                                </Box>
                              </Box>
                            </Box>
                          );
                        })}
                      </Box>

                      {/* فوتر - تعداد توکن‌ها */}
                      <Box 
                        py={1}
                        px={2}
                        sx={{
                          background: 'rgba(0,0,0,0.2)',
                          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                          textAlign: 'center',
                          fontSize: '0.75rem',
                          color: 'rgba(255,255,255,0.6)',
                          flexShrink: 0
                        }}
                      >
                        {Object.keys(tokens).length} دارایی
                      </Box>
                    </Box>
                  );
                })}
            </Box>
          </Box>
        ) : (
          <Box 
            textAlign="center" 
            py={5}
            sx={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: 2,
              m: 2
            }}
          >
            <Box 
              component="span" 
              sx={{ 
                fontSize: '2rem',
                animation: 'spin 1s linear infinite',
                display: 'inline-block'
              }}
            >
              ⟳
            </Box>
            <Box mt={1} sx={{ opacity: 0.7 }}>
              در حال بارگذاری پرتفوی شما...
            </Box>
          </Box>
        )}

        <style>
          {`
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.5; }
            }
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}
        </style>
      </Item>
    </Paper>
  );
};

export default TetherChartDash;