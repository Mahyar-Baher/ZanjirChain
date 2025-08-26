import React, { useState } from 'react';
import {
  useMediaQuery, useTheme, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Box, Button, TextField, Typography, Grid,
  FormControlLabel, Checkbox, Paper
} from '@mui/material';
import { Icon } from '@iconify/react';

const cryptoData = [
  { name: 'Bitcoin', icon: 'token-branded:btc', symbol: 'btc', total: '0', change: '0%', tetherPrice: '0' },
  { name: 'Ethereum', icon: 'token-branded:eth', symbol: 'eth', total: '1.5', change: '0%', tetherPrice: '0' },
  { name: 'Toman', icon: 'tabler:currency-iranian-rial', symbol: 'rial', total: '0', change: '0%', tetherPrice: '0' },
  { name: 'BNB', icon: 'token-branded:bnb', symbol: 'bnb', total: '0.8', change: '0%', tetherPrice: '0' },
  { name: 'Solana', icon: 'token-branded:sol', symbol: 'sol', total: '0', change: '0%', tetherPrice: '0' },
];

const CryptoTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [hideEmptyBalances, setHideEmptyBalances] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // تشخیص موبایل

  const filteredData = cryptoData.filter((crypto) => {
    const matchesSearch =
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    const hasBalance = !hideEmptyBalances || parseFloat(crypto.total) > 0;
    return matchesSearch && hasBalance;
  });

  return (
    <Box sx={{ p: 0, width: '100%', backgroundColor: 'transparent', border: 'none', boxShadow: 'none' }}>
      {/* هدر شامل عنوان، جستجو و چک‌باکس */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'stretch', sm: 'center' },
          justifyContent: { xs: 'center', sm: 'space-between' },
          mb: 2,
          px: 3,
        }}
      >
        <Typography sx={{ fontWeight: '900', fontSize: { xs: '24px', sm: '30px' }, mb: { xs: 2, sm: 0 } }}>
          لیست ارزها
        </Typography>
        <TextField
          label="جستجو: نام رمزارز موردنظر را وارد کنید"
          variant="standard"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            borderRadius: '24px',
            ml: { sm: 'auto' },
            width: { xs: '100%', md: 'fit-content' },
            '& .MuiInputBase-input': { fontSize: { xs: '14px', sm: '16px' } },
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={hideEmptyBalances}
              onChange={(e) => setHideEmptyBalances(e.target.checked)}
              sx={{ '& .MuiSvgIcon-root': { fontSize: { xs: '20px', sm: '24px' } } }}
            />
          }
          label="مخفی کردن ارزهای بدون موجودی"
          sx={{ mt: { xs: 2, sm: 0 }, fontSize: { xs: '14px', sm: '16px' } }}
        />
      </Box>

      {/* نمایش کارتی در موبایل و جدولی در دسکتاپ */}
      {isMobile ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, px: 2 }}>
          {filteredData.map((crypto) => (
            <Paper
              key={crypto.icon}
              sx={{
                backgroundColor: '#80808c3f',
                borderRadius: '22px',
                p: 2,
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid size={{xs:12}} display="flex" alignItems="center" justifyContent="center">
                  <Icon icon={crypto.icon} width="32" height="32" />
                  <Typography sx={{ ml: 1, fontWeight: 'bold', fontSize: '16px' }}>
                    {crypto.name} ({crypto.symbol.toUpperCase()})
                  </Typography>
                </Grid>
                <Grid size={{xs:4}} textAlign='center'>
                  <Typography sx={{ fontSize: '14px', color: 'text.secondary' }}>موجودی</Typography>
                  <Typography sx={{ fontSize: '14px' }}>{crypto.total}</Typography>
                </Grid>
                <Grid siz={{xs:4}} textAlign='center'>
                  <Typography sx={{ fontSize: '14px', color: 'text.secondary' }}>تغییر</Typography>
                  <Typography sx={{ fontSize: '14px' }}>{crypto.change}</Typography>
                </Grid>
                <Grid size={{xs:4}} textAlign="center">
                  <Typography sx={{ fontSize: '14px', color: 'text.secondary' }}>قیمت تتر</Typography>
                  <Typography sx={{ fontSize: '14px' }}>{crypto.tetherPrice}</Typography>
                </Grid>
                <Grid size={{xs:12}} display="flex" flexDirection="column" justifyContent='end' gap={1}>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      background: 'linear-gradient(90deg, #26A17B, #1a652a)',
                      borderRadius: '12px',
                      fontSize: '14px',
                    }}
                  >
                    برداشت
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      background: 'linear-gradient(90deg, #26A17B, #1a652a)',
                      borderRadius: '12px',
                      fontSize: '14px',
                    }}
                  >
                    واریز
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ borderRadius: '12px', fontSize: '14px' }}
                  >
                    خرید/فروش
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          ))}
          {filteredData.length === 0 && (
            <Typography sx={{ textAlign: 'center', py: 2, color: 'text.secondary' }}>
              رمز ارزی پیدا نشد
            </Typography>
          )}
        </Box>
      ) : (
        <TableContainer sx={{ backgroundColor: 'transparent', border: 'none', boxShadow: 'none', overflow: 'auto' }}>
          <Table sx={{ borderCollapse: 'separate', borderSpacing: '0 8px', backgroundColor: 'transparent' }}>
            <TableHead sx={{ backgroundColor: '#80808c3f' }}>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: 'bold', borderTopRightRadius: '22px', borderBottomRightRadius: '22px', borderBottom: 'none' }}>#</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: 'none' }}>نام</TableCell>
                <TableCell align="center" sx={{ borderBottom: 'none' }}>نماد</TableCell>
                <TableCell align="center" sx={{ borderBottom: 'none' }}>موجودی</TableCell>
                <TableCell align="center" sx={{ borderBottom: 'none' }}>تغییر (%)</TableCell>
                <TableCell align="center" sx={{ borderBottom: 'none' }}>قیمت تتر</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', borderTopLeftRadius: '22px', borderBottomLeftRadius: '22px', borderBottom: 'none' }}>عملیات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ backgroundColor: '#80808c3f' }}>
              {filteredData.map((crypto) => (
                <TableRow key={crypto.icon} sx={{ '& td': { borderBottom: 'none' } }}>
                  <TableCell align="center" sx={{ borderTopRightRadius: '22px', borderBottomRightRadius: '22px', borderBottom: 'none' }}>
                    <Icon icon={crypto.icon} width="28" height="28" />
                  </TableCell>
                  <TableCell align="center">{crypto.name}</TableCell>
                  <TableCell align="center">{crypto.symbol.toUpperCase()}</TableCell>
                  <TableCell align="center">{crypto.total}</TableCell>
                  <TableCell align="center">{crypto.change}</TableCell>
                  <TableCell align="center">{crypto.tetherPrice}</TableCell>
                  <TableCell align="center" sx={{ borderTopLeftRadius: '22px', borderBottomLeftRadius: '22px', borderBottom: 'none' }}>
                    <Box display='flex' justifyContent="center" flexDirection={{xs: 'column', md: 'column', lg: 'row'}}>
                      <Button variant="text" size="small" sx={{ mx: 0, p: 0 }}>برداشت</Button>
                      <Button variant="text" size="small" sx={{ mx: 0, p: 0, ml: 1 }}>واریز</Button>
                      <Button variant="text" color="primary" size="small" sx={{ mx: 0, p: 0, ml: 1 }}>
                        خرید/فروش
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
              {filteredData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ borderBottom: 'none' }}>
                    رمز ارزی پیدا نشد
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default CryptoTable;