import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  Snackbar,
  IconButton,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Autocomplete
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import useAuthStore from '../context/authStore';
import { Icon } from '@iconify/react';
import  {SolanaIcon , EthereumIcon, TronIcon , UsdtIcon , UsdcIcon, EthIcon, WethIcon, DaiIcon, LinkIcon, UniIcon, SolIcon, RayIcon, SrmIcon, OrcaIcon, TrxIcon, BttIcon, SunIcon}  from '../IconsComp/iconscomp';

const labelSx = {
  color: '#fff',
  backgroundColor: '#1a652a',
  p: 0.55,
  width: 90,
  textAlign: 'center',
  marginTop: -0.45,
  borderRadius: '4px',
  '&.Mui-focused': { color: '#fff', backgroundColor: '#1a652a' }
};

const USDT_PRICE = 100000;
const PROFIT_FACTOR = 1.04;

const toEnglishNumber = (str) => {
  return str.replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)));
};

const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const parseFormattedNumber = (str) => {
  return parseFloat(str.replace(/,/g, '')) || 0;
};

const QuickBuyAndSell = () => {
  const { wallet, fetchWalletBalance, token } = useAuthStore();

   // لیست شبکه‌ها
   const networksToselect = [
    { label: "Ethereum", icon: <EthereumIcon /> },
    { label: "Solana", icon: <SolanaIcon /> },
    { label: "Tron", icon: <TronIcon /> },
  ];

  // لیست ارزها برای هر شبکه
  const currencyByNetwork = {
    "Ethereum": [
      { label: "USDT", icon: <UsdtIcon /> },
      { label: "USDC", icon: <UsdcIcon /> },
      { label: "ETH", icon: <EthIcon /> },
      { label: "WETH", icon: <WethIcon /> },
      { label: "DAI", icon: <DaiIcon /> },
      { label: "LINK", icon: <LinkIcon /> },
      { label: "UNI", icon: <UniIcon /> },
    ],
    "Solana": [
      { label: "USDT", icon: <UsdtIcon /> },
      { label: "USDC", icon: <UsdcIcon /> },
      { label: "SOL", icon: <SolIcon /> },
      { label: "RAY", icon: <RayIcon /> },
      { label: "SRM", icon: <SrmIcon /> },
      { label: "ORCA", icon: <OrcaIcon /> },
    ],
    "Tron": [
      { label: "USDT", icon: <UsdtIcon /> },
      { label: "USDC", icon: <UsdcIcon /> },
      { label: "TRX", icon: <TrxIcon /> },
      { label: "BTT", icon: <BttIcon /> },
      { label: "SUN", icon: <SunIcon /> },
    ]
  };

  // State ها
  const [isReversed, setIsReversed] = useState(false);
  const [toman, setToman] = useState('');
  const [tether, setTether] = useState('');
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState("ETH");
  const [selectedCurrencyIcon, setSelectedCurrencyIcon] = useState("ETH");
  const [walletBalance, setWalletBalance] = useState({
    balance_toman: 0,
    balance_tether: {}
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State های جدید برای network و currency
  const [selectednetwork, setSelectednetwork] = useState(networksToselect[0]);
  const [selectedcurrency, setSelectedcurrency] = useState(null);
  const [currencyToselect, setCurrencyToselect] = useState([]);
  const [isCurrencySelected, setisCurrencySelected] = useState(false);
  const [isDisable , setIsDisable] = useState(false)

  // useEffect برای تغییر لیست ارزها وقتی شبکه عوض میشه
  useEffect(() => {
    if (selectednetwork) {
      const newCurrencies = currencyByNetwork[selectednetwork.label] || [];
      setCurrencyToselect(newCurrencies);
      
      // اگر ارز انتخاب شده در شبکه جدید وجود نداشته باشد، reset کن
      if (selectedcurrency) {
        const currencyExists = newCurrencies.find(currency => 
          currency.label === selectedcurrency.label
        );
        if (!currencyExists) {
          setSelectedcurrency(null);
          setisCurrencySelected(false);
        }
      }
    }
  }, [selectednetwork]);

  // تابع انتخاب ارز
  const selectCurrencyHandler = (newValue) => {
    setSelectedcurrency(newValue);
    setisCurrencySelected(!!newValue);
    if (newValue) {
      setSelectedCurrency(newValue.label);
      setSelectedCurrencyIcon(newValue.label);
    }
  };

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
          const UserHaveThisAsset = Object.keys(wallet)
          .filter(key => typeof wallet[key] === "object")
          .reduce((acc, key) => {
            acc[key] = wallet[key];
            return acc;
          }, {});
          
          const tetherBalance = (UserHaveThisAsset || 0);
          setWalletBalance({
            balance_toman: tomanBalance,
            balance_tether: tetherBalance
          });
        } catch (error) {
          console.error('خطا در پردازش داده‌های ولت:', error);
          setError('خطا در پردازش اطلاعات ولت.');
          setWalletBalance({
            balance_toman: 0,
            balance_tether: 0
          });
        }
      } else {
        setError('اطلاعات ولت یافت نشد.');
        setWalletBalance({
          balance_toman: 0,
          balance_tether: 0
        });
      }
      setLoading(false);
    };

    loadWallet();
  }, [wallet, fetchWalletBalance]);

  // تنظیم ارز پیش‌فرض وقتی شبکه بارگذاری شد
  useEffect(() => {
    if (currencyToselect.length > 0 && !selectedcurrency) {
      setSelectedcurrency(currencyToselect[0]);
      setisCurrencySelected(true);
      setSelectedCurrency(currencyToselect[0].label);
      setSelectedCurrencyIcon(currencyToselect[0].label);
    }
  }, [currencyToselect]);

  const handleSwap = () => {
    setIsReversed(prev => !prev);
    setToman('');
    setTether('');
  };

  // فقط اعداد برای تومان
  const handleTomanChange = (e) => {
    let value = e.target.value.replace(/[^0-9۰-۹]/g, '');
    value = toEnglishNumber(value);
    const enValue = parseFloat(value);
    setToman(formatNumber(value));
    if (!isNaN(enValue)) {
      const profitCut = (PROFIT_FACTOR - 1) / (PROFIT_FACTOR + 1);
      const finalValue = enValue - (enValue * profitCut);
      const tetherAmount = finalValue / USDT_PRICE;
      setTether(tetherAmount.toFixed(6));
    } else {
      setTether('');
    }
  };

  // فقط اعداد و یک نقطه برای ارز
  const handleTetherChange = (e) => {
    let value = e.target.value.replace(/[^0-9۰-۹.]/g, '');
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts[1]; // فقط اولین نقطه را نگه دار
    }
    value = toEnglishNumber(value);
    const enValue = parseFloat(value);
    setTether(value);
    if (!isNaN(enValue)) {
      const profitCut = (PROFIT_FACTOR - 1) / (PROFIT_FACTOR + 1);
      const finalValue = enValue - (enValue * profitCut);
      const tomanAmount = finalValue * USDT_PRICE;
      setToman(formatNumber(Math.round(tomanAmount).toString()));
    } else {
      setToman('');
    }
  };

  const handleSubmit = async () => {
    if (!token) {
      setSnackMessage('لطفاً ابتدا وارد شوید.');
      setSnackOpen(true);
      return;
    }

    if (!selectednetwork || !selectedcurrency) {
      setSnackMessage('لطفاً شبکه و ارز را انتخاب کنید.');
      setSnackOpen(true);
      return;
    }

    const isBuy = !isReversed;
    const ba_toman = parseFormattedNumber(toman);
    const ba_tether = parseFormattedNumber(tether);

    // if (isBuy && (ba_toman < 145000 || ba_toman > 25000000)) {
    //   setSnackMessage('مقدار تومان باید بین ۱۴۵,۰۰۰ و ۲۵,۰۰۰,۰۰۰ باشد');
    //   setSnackOpen(true);
    //   return;
    // }
    // if (!isBuy && (ba_tether < 5 || ba_tether > 25000)) {
    //   setSnackMessage('مقدار ارز باید بین ۵ و ۲۵,۰۰۰ باشد');
    //   setSnackOpen(true);
    //   return;
    // }

    // if (isBuy && ba_toman > walletBalance.balance_toman) {
    //   setSnackMessage('موجودی تومان کافی نیست');
    //   setSnackOpen(true);
    //   return;
    // }
    
    let relativeassetvalue = null
    const totaluserhave = walletBalance.balance_tether?.[selectednetwork.label]?.[selectedCurrency]?.total;
    // if(tether > totaluserhave && totaluserhave !== undefined){
    //   setSnackMessage('موجودی ارز کافی نیست');
    //   setSnackOpen(true);
    //   return;
    // }


    const data = {
      amount: isBuy ? ba_toman : ba_tether,
      currency: selectedcurrency.label,
      network: selectednetwork.label,
      whatTOwhat: isBuy ? 0 : 1,
      ExchangeRate: USDT_PRICE,
      automatic: true,
      tether : tether,
      toman : toman,
      totaluserhave : totaluserhave,
    };

    console.log(data , relativeassetvalue)
    try {
      setLoading(true);
      const response = await axios.post(
        'https://pump-ex.com/laravel/api/TomanToCoin',
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          timeout: 30000
        }
      );

      if (response.data.status) {
        await fetchWalletBalance();
        setSnackMessage(response.data.message || (isBuy ? 'خرید ارز با موفقیت انجام شد' : 'فروش ارز با موفقیت انجام شد'));
        setSnackOpen(true);
        setToman('');
        setTether('');
      } else {
        throw new Error(response.data.message || 'خطا در انجام عملیات');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      const errorMessage = error.response?.data?.message || 
        (error.code === 'ECONNABORTED' ? 'اتصال به سرور برقرار نشد' : 
        (isBuy ? 'خطا در خرید ارز' : 'خطا در فروش ارز'));
      setSnackMessage(errorMessage);
      setSnackOpen(true);
    } finally {
      setLoading(false);
    }
  };


  

  const tomanField = (
    <Box width="100%" textAlign="end" mt={isReversed ? 0 : 1} mb={isReversed ? 0 : 3}>
      <Typography variant="caption" color="text.secondary" sx={{ m: 2 }}>
        موجودی: {formatNumber(walletBalance.balance_toman)} تومان
      </Typography>
      <Box mb={1} textAlign={"start"}>مقدار</Box>
      <TextField
        name="tomanQ"
        type="text"
        inputMode="numeric"
        value={toman}
        onChange={handleTomanChange}
        placeholder="مقدار بین 500,000 هزار تومان تا 25,000,000 هزار تومان"
        fullWidth
        sx={{
          '& .MuiInputLabel-root': labelSx,
          '& .MuiInputLabel-shrink': { px: 0.75 }
        }}
      />
    </Box>
  );

  const lablecu = (
    <>
      <Box display={"flex"} justifyContent={"space-around"} alignItems={"center"} mb={-1} color={"white"}>
        <Box fontSize={"small"} >{selectednetwork ? selectednetwork.icon : ""}</Box>
        <Box mb={0.4}>|</Box>
        <Box fontSize={"small"} >{selectedcurrency ? selectedcurrency.icon : ""}</Box>
      </Box>
    </>
  );

  const lableselectnetwork = (<Box sx={{paddingX:"10px", backgroundColor:"initial"}}>انتخاب شبکه</Box>);
  const lableselectcurrency = (<Box sx={{paddingX:"10px", backgroundColor:"initial"}}>انتخاب ارز</Box>);

  const tetherField = (
    <>
      <Grid container spacing={1} sx={{width:"100%"}} mt={3}>
        <Grid size={6}>
          <Autocomplete
            options={networksToselect}
            getOptionLabel={(option) => option.label}
            value={selectednetwork}
            onChange={(event, newValue) => {
              setSelectednetwork(newValue);
            }}
            renderInput={(params) => (
              <>
              <Box mb={1}>شبکه</Box>
              <TextField
                {...params}
                fullWidth
                InputProps={{
                  ...params.InputProps,
                  startAdornment: selectednetwork ? (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mr: 1 }}>
                      {selectednetwork.icon}
                    </Box>
                  ) : null
                }}
              />
              </>

            )}
            renderOption={(props, option) => (
              <Box
                component="li"
                {...props}
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                {option.icon}
                {option.label}
              </Box>
            )}
            ListboxProps={{
              sx: {
                maxHeight: 200,
                overflow: "auto",
              }
            }}
          />
        </Grid>
        <Grid size={6}>
          <Autocomplete
            options={currencyToselect}
            getOptionLabel={(option) => option.label}
            value={selectedcurrency}
            onChange={(event, newValue) => {
              selectCurrencyHandler(newValue);
            }}
            renderInput={(params) => (
              <>
              <Box mb={1}>ارز</Box>
              <TextField
                {...params}

                fullWidth
                disabled={!selectednetwork}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: selectedcurrency ? (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mr: 1 }}>
                      {selectedcurrency.icon}
                    </Box>
                  ) : null
                }}
              />
              </>

            )}
            renderOption={(props, option) => (
              <Box
                component="li"
                {...props}
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                {option.icon}
                {option.label}
              </Box>
            )}
            ListboxProps={{
              sx: {
                maxHeight: 200,
                overflow: "auto",
              }
            }}
            noOptionsText="ابتدا شبکه را انتخاب کنید"
          />
        </Grid>
      </Grid>
      <Box width="100%" textAlign="end" mt={isReversed ? 1 : 0} mb={isReversed ? 3 : 0}>
        <TextField
          name="tetherQ"
          type="text"
          inputMode="numeric"
          value={tether}
          onChange={handleTetherChange}
          placeholder="مقدار بین 5 تا 25,000"
          fullWidth
          disabled={isDisable}
          
          sx={{
            '& .MuiInputLabel-root': labelSx,
            '& .MuiInputLabel-shrink': { px: 0.75 }
          }}
        />
      </Box>
    </>
  );

  return (
    <Box>
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
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'column' },
              justifyContent: 'center',
              alignItems: 'center',
              p: { xs: 0, md: 3 },
              gap: 1
            }}
          >
            
            {isReversed ? tetherField : tomanField}

            <Button
              onClick={handleSwap}
              variant="outlined"
              sx={{
                fontSize: 10,
                p: 0,
                height: 'fit-content',
                '& .icon': {
                  fontSize: 30,
                  transform: {
                    xs: 'rotate(120deg)',
                    md: 'rotate(90deg)',
                  },
                },
              }}
            >
              <Icon icon="mdi:exchange" className="icon" />
            </Button>

            {isReversed ? tomanField : tetherField}
          </Box>

          <Stack
            direction="row"
            spacing={0}
            alignItems="center"
            justifyContent="center"
            sx={{ width: '100%', mt: 1 }}
          >
            <Typography
              variant="caption"
              textAlign="center"
              color="text.secondary"
            >
              مقدار دقیق دریافتی با توجه به نرخ لحظه‌ای ارز محاسبه می‌شود
            </Typography>
          </Stack>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              my: 1.5,
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Button
              fullWidth
              variant="contained"
              color={isReversed ? 'error' : 'success'}
              onClick={handleSubmit}
              disabled={!toman || !tether || loading || !selectednetwork || !selectedcurrency}
            >
              {isReversed ? 'فروش ارز' : 'خرید ارز'}
            </Button>
          </Box>
        </>
      )}

      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => setSnackOpen(false)}
        message={snackMessage}
        action={
          <IconButton size="small" onClick={() => setSnackOpen(false)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Box>
  );
};

export default QuickBuyAndSell;