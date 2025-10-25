/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  CircularProgress, 
  Stack, 
  useMediaQuery, 
  useTheme,
  MenuItem,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Modal
} from '@mui/material';
import { ArrowBack, CheckCircle, AccountBalanceWallet } from '@mui/icons-material';
import SaveIcon from '@mui/icons-material/Save';
import TransactionSummary from './TransactionSummary';
import SnackBarNotification from './SnackBarNotification';
import useAuthStore from '../context/authStore';
import axios from 'axios';

const profitFactor = 1.04;

const labelstyle = (text) => {
  
}

// کامپوننت آیکون‌های شبکه
const NetworkIcon = ({ network, size = 24 }) => {
  const colors = {
    'Ethereum': '#627EEA',
    'Tron': '#FF060A',
    'BNB Smart Chain': '#F3BA2F',
    'Polygon': '#8247E5',
    'Arbitrum': '#28A0F0',
    'Optimism': '#FF0420',
    'Avalanche': '#E84142',
    'Solana': '#14F195'
  };
  
  const getInitials = (name) => {
    return name.split(' ').map(word => word.charAt(0)).join('').substring(0, 2);
  };
  
  return (
    <Box
      sx={{
        width: size,
        height: size,
        backgroundColor: colors[network] || '#ccc',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: size * 0.3,
        fontWeight: 'bold'
      }}
    >
      {getInitials(network)}
    </Box>
  );
};

// کامپوننت آیکون‌های ارز
const CurrencyIcon = ({ currency, size = 20 }) => {
  const colors = {
    'USDT': '#26A17B',
    'USDC': '#2775CA',
    'DAI': '#F5AC37',
    'ETH': '#627EEA',
    'BNB': '#F3BA2F',
    'MATIC': '#8247E5'
  };
  
  return (
    <Box
      sx={{
        width: size,
        height: size,
        backgroundColor: colors[currency] || '#ccc',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: size * 0.5,
        fontWeight: 'bold'
      }}
    >
      {currency.charAt(0)}
    </Box>
  );
};

const CryptoForm = () => {
  const [open, setOpen] = React.useState(false);
  const { wallet, token, fetchWalletBalance, user, setUser } = useAuthStore();
  const [cryptoAddress, setCryptoAddress] = useState('');
  const [cryptoAmount, setCryptoAmount] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [snack, setSnack] = useState(false);
  const [error, setError] = useState(null);
  const [balanceTether, setBalanceTether] = useState(0);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [apiMessage, setApiMessage] = useState(null);
  const [lodingforsendbut , serLodingforsendbut] = useState(false)

  // State های مربوط به انتخاب شبکه و ارز
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [finalSelection, setFinalSelection] = useState({
    network: null,
    currency: null
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // لیست شبکه‌ها
  const networksToSelect = [
    { label: "Ethereum", icon: <NetworkIcon network="Ethereum" /> },
    { label: "Tron", icon: <NetworkIcon network="Tron" /> },
    { label: "BNB Smart Chain", icon: <NetworkIcon network="BNB Smart Chain" /> },
    { label: "Polygon", icon: <NetworkIcon network="Polygon" /> },
    { label: "Arbitrum", icon: <NetworkIcon network="Arbitrum" /> },
    { label: "Optimism", icon: <NetworkIcon network="Optimism" /> },
    { label: "Avalanche", icon: <NetworkIcon network="Avalanche" /> },
    { label: "Solana", icon: <NetworkIcon network="Solana" /> }
  ];

  // فانکشن اعتبار سنجی ادرس
  const validateCryptoAddress = (cryptoAddress, network, currency) => {
    if (!cryptoAddress || !network || !currency) return false;
  
    switch (network) {
      case "Ethereum":
      case "BNB Smart Chain":
      case "Polygon":
      case "Arbitrum":
      case "Optimism":
      case "Avalanche":
        // همه اینا روی EVM هستن → آدرس با 0x شروع بشه و 42 کاراکتر باشه
        return /^0x[a-fA-F0-9]{40}$/.test(cryptoAddress);
  
      case "Tron":
        // آدرس‌های ترون معمولا با T شروع می‌شن و طول 34 دارن
        return /^T[a-zA-Z0-9]{33}$/.test(cryptoAddress);
  
      case "Solana":
        // آدرس‌های سولانا بیس۵۸ هستن (معمولا 32 تا 44 کاراکتر)
        return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(cryptoAddress);
  
      default:
        return false;
    }
  };

  // لیست ارزها برای هر شبکه
  const currencyByNetwork = {
    "Ethereum": [
      { label: "USDT", icon: <CurrencyIcon currency="USDT" /> },
      { label: "USDC", icon: <CurrencyIcon currency="USDC" /> },
      { label: "DAI", icon: <CurrencyIcon currency="DAI" /> }
    ],
    "Tron": [
      { label: "USDT", icon: <CurrencyIcon currency="USDT" /> },
      { label: "USDC", icon: <CurrencyIcon currency="USDC" /> }
    ],
    "BNB Smart Chain": [
      { label: "USDT", icon: <CurrencyIcon currency="USDT" /> },
      { label: "USDC", icon: <CurrencyIcon currency="USDC" /> }
    ],
    "Polygon": [
      { label: "USDT", icon: <CurrencyIcon currency="USDT" /> },
      { label: "USDC", icon: <CurrencyIcon currency="USDC" /> }
    ],
    "Arbitrum": [
      { label: "USDT", icon: <CurrencyIcon currency="USDT" /> },
      { label: "USDC", icon: <CurrencyIcon currency="USDC" /> }
    ],
    "Optimism": [
      { label: "USDT", icon: <CurrencyIcon currency="USDT" /> },
      { label: "USDC", icon: <CurrencyIcon currency="USDC" /> }
    ],
    "Avalanche": [
      { label: "USDT", icon: <CurrencyIcon currency="USDT" /> },
      { label: "USDC", icon: <CurrencyIcon currency="USDC" /> }
    ],
    "Solana": [
      { label: "USDT", icon: <CurrencyIcon currency="USDT" /> },
      { label: "USDC", icon: <CurrencyIcon currency="USDC" /> }
    ]
  };

  useEffect(() => {
    const loadWallet = async () => {
      setLoading(true);
      if (!wallet) {
        await fetchWalletBalance();
      }
      if (wallet) {
        // const tetherBalance = parseFloat(wallet.with_creadit_total_balance_formatted || 0);
        // setBalanceTether(tetherBalance);
        const UserHaveThisAsset = Object.keys(wallet)
          .filter(key => typeof wallet[key] === "object")
          .reduce((acc, key) => {
            acc[key] = wallet[key];
            return acc;
          }, {});
        console.log(wallet.finalltotalindollar)
      }
      if (user) {
        const addresses = Array.isArray(user.crypto_addresses) ? user.crypto_addresses : [];
        setSavedAddresses(addresses);
        if (addresses.length > 0) {
          setCryptoAddress(addresses[0]);
        }
      }
      setLoading(false);
    };
    loadWallet();
  }, [wallet, fetchWalletBalance, user]);

  // تنظیم مقدار اولیه برای شبکه و ارز
  useEffect(() => {
    if (!finalSelection.network && networksToSelect.length > 0) {
      const defaultNetwork = networksToSelect[0];
      const defaultCurrency = currencyByNetwork[defaultNetwork.label]?.[0];
      setFinalSelection({
        network: defaultNetwork,
        currency: defaultCurrency
      });
    }
  }, [networksToSelect]);

  const handleCryptoAmountChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d{0,6}$/.test(value) && value.length <= 12) {
      setCryptoAmount(value);
    }
  };

  const parsedTether = parseFloat(cryptoAmount) || 0;
  const profitCut = (profitFactor - 1) / (profitFactor + 1);
  const feeTether = parsedTether * profitCut;
  const netTether = parsedTether - feeTether;
  // console.log(parsedTether)
  // Functions برای مدیریت انتخاب شبکه و ارز
  const handleOpenModal = () => {
    setIsModalOpen(true);
    setStep(1);
    setSelectedNetwork(finalSelection.network);
    setSelectedCurrency(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setStep(1);
    setSelectedNetwork(null);
    setSelectedCurrency(null);
  };

  const handleNetworkSelect = (network) => {
    setSelectedNetwork(network);
  };

  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency);
  };

  const handleContinue = () => {
    if (selectedNetwork) {
      setStep(2);
      // تنظیم ارز اول به عنوان پیش‌فرض
      const defaultCurrency = currencyByNetwork[selectedNetwork.label]?.[0];
      setSelectedCurrency(defaultCurrency);
    }
  };

  const handleConfirm = () => {
    if (selectedNetwork && selectedCurrency) {
      setFinalSelection({
        network: selectedNetwork,
        currency: selectedCurrency
      });
      handleCloseModal();
    }
  };

  const handleBack = () => {
    setStep(1);
    setSelectedCurrency(null);
  };

  const handleSubmit = async () => {
    
    setError(null);
    setApiMessage(null);

    if (!token) {
      setError('لطفاً ابتدا وارد شوید.');
      setSnack(true);
      return;
    }

    // اعتبارسنجی آدرس (می‌تونید برای شبکه‌های مختلف متفاوت باشه)
    const isValid = validateCryptoAddress(
      cryptoAddress,
      finalSelection.network?.label,
      finalSelection.currency?.label
    );
    
    if (!isValid) {
        setError('آدرس مقصد شما نامعتبر است');
        setSnack(true);
        return;
    }

    // let amountcheck = wallet[finalSelection.network.label][finalSelection.currency.label]["total"]
    // if (parsedTether > amountcheck) {
    //   setError(`موجودی کافی نیست. موجودی: ${amountcheck.toLocaleString('en-US', {
    //     minimumFractionDigits: 0,
    //     maximumFractionDigits: 6,
    //   })} ${finalSelection.currency.label}`);
    //   setSnack(true);
    //   return;
    // }

    if (parsedTether <= 0) {
      setError('مقدار برداشت باید بزرگتر از صفر باشد.');
      setSnack(true);
      return;
    }
    setOpen(true)
    const data = {
      toaddress: cryptoAddress,
      network: finalSelection.network.label,
      currency: finalSelection.currency.label,
      amount: parsedTether,
      automatic: true,
    };

    try {
      setSubmitting(true);
      const response = await axios.post(
        'https://pump-ex.com/laravel/api/sendcoinapi',
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          timeout: 300000,
        }
      );

      setApiMessage(response.data.message || 'درخواست ثبت شد');

      if (response.data.status) {
        await fetchWalletBalance();
        // ذخیره آدرس کریپتو اگر جدید باشه
        // if (!savedAddresses.includes(cryptoAddress)) {
        //   const updatedAddresses = [...savedAddresses, cryptoAddress];
        //   setUser({ ...user, crypto_addresses: updatedAddresses });
        //   setSavedAddresses(updatedAddresses);
        // }
        // setCryptoAddress(savedAddresses.length > 0 ? savedAddresses[0] : '');
        // setCryptoAmount('');
      } else {
        setError(response.data.message || 'خطا در ثبت درخواست');
      }
    } catch (err) {
      console.error('❌ Submit Error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'خطا در ثبت درخواست');
    } finally {
      setSubmitting(false);
      setSnack(true);
    }
  };

  const handeltosend = async () => {}

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: { xs: '200px', sm: '300px' } }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 0, sm: 1 }, mx: 'auto', direction: 'rtl', maxWidth: { xs: '100%', sm: '600px' } }}>
      
      <Card sx={{ mb: 2 , bgcolor:"inherit" }}>
        <CardContent sx={{ py: 2 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            انتخاب فعلی:
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            {finalSelection.network && finalSelection.currency ? (
              <>
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  bgcolor: 'primary.light',
                  color: 'primary.contrastText',
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 2,
                  fontSize: '0.875rem'
                }}>
                  <NetworkIcon network={finalSelection.network.label} size={16} />
                  {finalSelection.network.label}
                </Box>
                <Typography variant="body2">+</Typography>
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  bgcolor: 'secondary.light',
                  color: 'secondary.contrastText',
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 2,
                  fontSize: '0.875rem'
                }}>
                  <CurrencyIcon currency={finalSelection.currency.label} size={16} />
                  {finalSelection.currency.label}
                </Box>
              </>
            ) : (
              <Typography color="text.secondary">در حال بارگذاری...</Typography>
            )}
          </Box>
        </CardContent>
      </Card>

      <Button
        variant="contained"
        onClick={handleOpenModal}
        fullWidth
        size="large"
        startIcon={<AccountBalanceWallet sx={{ml:"5px"}} />}
        loading={lodingforsendbut}
        loadingPosition='start'
        sx={{ 
          mb: 2,
          
        }}
      >
        {lodingforsendbut ? "درحال پردازش" : "تغییر شبکه "}
      </Button>

      
      <Box mb={-1} mt={1}>آدرس مقصد</Box>
      <TextField
        fullWidth
        select={savedAddresses.length > 0}
        color='black'
        margin="normal"
        value={cryptoAddress}
        onChange={(e) => setCryptoAddress(e.target.value)}
        sx={{ mb: 2}}
        placeholder="مثلاً 0x1234567890abcdef..."
      >
        {savedAddresses.map((addr, idx) => (
          <MenuItem key={idx} value={addr}>
            {addr.slice(0, 10)}...{addr.slice(-8)}
          </MenuItem>
        ))}
      </TextField>
      
      <Box mb={-1} mt={1}>مقدار برداشت</Box>
      <TextField
        fullWidth
        margin="normal"
        type="text"
        color='black'
        inputMode="decimal"
        value={cryptoAmount}
        onChange={handleCryptoAmountChange}
        sx={{ mb: 0 }}
        placeholder="مثلاً 11,4"
        error={parsedTether > wallet && cryptoAmount !== ''}
        helperText={
          parsedTether > balanceTether && cryptoAmount !== ''
            ? `موجودی کافی نیست. موجودی: ${Number(wallet.finalltotalindollar).toFixed(4)} ${finalSelection.currency?.label || 'USDT'}`
            : ''
        }
      />

      <TransactionSummary
        items={[
          ['کارمزد', feeTether.toFixed(6), finalSelection.currency?.label || 'USDT'],
          ['خالص دریافتی', netTether.toFixed(6), finalSelection.currency?.label || 'USDT'],
          ['مقدار وارد شده', parsedTether.toFixed(6), finalSelection.currency?.label || 'USDT'],
          ['موجودی فعلی', balanceTether.toFixed(6), finalSelection.currency?.label || 'USDT'],
        ]}
      />

      <Stack direction="row" spacing={1} mt={1}>
        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          disabled={submitting}
          sx={{ fontSize: isMobile ? '0.9rem' : '1rem', py: isMobile ? 1 : 1.5 }}
        >
          {submitting ? 'در حال ارسال...' : 'ثبت برداشت'}
        </Button>
      </Stack>



      <Dialog 
        open={isModalOpen} 
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            direction: 'rtl'
          }
        }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {step === 2 && (
              <IconButton onClick={handleBack} size="small">
                <ArrowBack />
              </IconButton>
            )}
            <Typography variant="h6">
              {step === 1 ? 'انتخاب شبکه' : `انتخاب ارز برای ${selectedNetwork?.label}`}
            </Typography>
          </Box>
          {step === 2 && selectedNetwork && (
            <Box sx={{ mt: 1 }}>
              <Box sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                bgcolor: 'primary.light',
                color: 'primary.contrastText',
                px: 1.5,
                py: 0.5,
                borderRadius: 2,
                fontSize: '0.75rem'
              }}>
                <NetworkIcon network={selectedNetwork.label} size={16} />
                {selectedNetwork.label}
              </Box>
            </Box>
          )}
        </DialogTitle>

        <DialogContent sx={{ px: 3, py: 2 }}>
          {step === 1 ? (
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
              gap: 2 
            }}>
              {networksToSelect.map((network) => (
                <Card
                  key={network.label}
                  sx={{
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: 2,
                    borderColor: selectedNetwork?.label === network.label ? 'primary.main' : 'grey.300',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4
                    }
                  }}
                  onClick={() => handleNetworkSelect(network)}
                >
                  <CardContent sx={{ textAlign: 'center', py: 2, position: 'relative' }}>
                    <NetworkIcon network={network.label} size={40} />
                    <Typography variant="body1" fontWeight="bold" sx={{ mt: 1 }}>
                      {network.label}
                    </Typography>
                    {selectedNetwork?.label === network.label && (
                      <CheckCircle 
                        color="primary" 
                        sx={{ position: 'absolute', top: 8, right: 8 }} 
                      />
                    )}
                  </CardContent>
                </Card>
              ))}
            </Box>
          ) : (
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)' },
              gap: 1.5 
            }}>
              {currencyByNetwork[selectedNetwork?.label]?.map((currency) => (
                <Card
                  key={currency.label}
                  sx={{
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    border: 2,
                    borderColor: selectedCurrency?.label === currency.label ? 'secondary.main' : 'grey.300',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: 3
                    }
                  }}
                  onClick={() => handleCurrencySelect(currency)}
                >
                  <CardContent sx={{ textAlign: 'center', py: 1.5, position: 'relative' }}>
                    <CurrencyIcon currency={currency.label} size={32} />
                    <Typography variant="body2" fontWeight="medium" sx={{ mt: 0.5 }}>
                      {currency.label}
                    </Typography>
                    {selectedCurrency?.label === currency.label && (
                      <CheckCircle 
                        color="secondary" 
                        sx={{ position: 'absolute', top: 4, right: 4, fontSize: 16 }} 
                      />
                    )}
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button onClick={handleCloseModal} variant="outlined">
            انصراف
          </Button>
          {step === 1 ? (
            <Button
              onClick={handleContinue}
              variant="contained"
              disabled={!selectedNetwork}
            >
              ادامه
            </Button>
          ) : (
            <Button
              onClick={handleConfirm}
              variant="contained"
              disabled={!selectedCurrency}
            >
              تأیید انتخاب
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Snackbar نوتیفیکیشن */}
      <SnackBarNotification
        open={snack}
        onClose={() => setSnack(false)}
        message={error || apiMessage}
      />


      
      <Modal
        open={open}
        onClose={handleClose}
        >
          <Box
           sx={{
            backgroundColor:"white"
            ,width:"50%"
            ,height:"300px"
            ,borderRadius:"10px"
            ,position:"absolute"
            ,top:"50%"
            ,left:"50%"
            ,transform:"translate(-50%,-50%)"
            ,color:"black"
            ,padding:"30px"
            }}>
              
              <Box>{submitting ? <Box sx={{color:"black !important",position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)" }} display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>  <Button  color='primary' variant='standard' loading></Button> <Box pt={1}>درحال ثبت</Box> <Box pt={1}>انتقال ممکن است یک دقیقه طول بکشد</Box> <Box pt={1} color={"gray"}>پس لطفا پنیک نکنید (:</Box>  </Box>: ""}</Box>
              <Box p={1} sx={{color:"black !important",position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)" }} textAlign={"center"}> {error || apiMessage} </Box>
              <Box textAlign={"center"} sx={{position:"absolute", bottom:"0px", left:"50%", transform:"translate(-50%,-50%)"  }}>
                  <Button variant='outlined' onClick={submitting ? null : handleClose} color='black' >بستن</Button>
              </Box>
            </Box>
        </Modal>
    </Box>
  );
};

export default CryptoForm;