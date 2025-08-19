import React, { useState } from 'react';
import {
  useMediaQuery, useTheme,Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, TextField,
  Typography, Box, Checkbox, FormControlLabel
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
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

  const filteredData = cryptoData.filter((crypto) => {
    const matchesSearch =
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase());

    const hasBalance = !hideEmptyBalances || parseFloat(crypto.total) > 0;

    return matchesSearch && hasBalance;
  });

  return (
    <Box sx={{ p: 1, width: '100%', backgroundColor: 'transparent', border: 'none', boxShadow: 'none' }}>
      <Box sx={{ display: 'flex', flexDirection: {xs: 'column', sm:'row'}, alignItems: 'center', justifyContent: {xs: 'center', sm:'space-between'}, mb: 2, px: 3 }}>
        <Typography sx={{ fontWeight: "900", fontSize: '30px', ml: 1 }}>
          لیست ارزها
        </Typography>
        <TextField
          label="جستجو: نام رمزارز موردنظر را وارد کنید"
          variant="standard"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ borderRadius: '24%', ml: 'auto', width: {xs:'100%',md: 'fit-content'}}}
        />
        <FormControlLabel
          fullWidth
          control={
            <Checkbox
              checked={hideEmptyBalances}
              onChange={(e) => setHideEmptyBalances(e.target.checked)}
            />
          }
          label="مخفی کردن ارزهای بدون موجودی"
        />
      </Box>

      <TableContainer sx={{ backgroundColor: 'transparent', border: 'none', boxShadow: 'none', overflow: 'auto' }}>
        <Table sx={{ borderCollapse: 'separate', borderSpacing: '0 8px', backgroundColor: 'transparent' }}>
          <TableHead sx={{ backgroundColor: '#80808c3f' }}>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: 'bold', borderTopRightRadius: '22px', borderBottomRightRadius: '22px', borderBottom: 'none' }}>#</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>نام</TableCell>
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
                  <Icon icon={crypto.icon} width="28" height="28"></Icon>
                </TableCell>
                <TableCell align="center">{crypto.name}</TableCell>
                <TableCell align="center">{crypto.symbol.toUpperCase()}</TableCell>
                <TableCell align="center">{crypto.total}</TableCell>
                <TableCell align="center">{crypto.change}</TableCell>
                <TableCell align="center">{crypto.tetherPrice}</TableCell>
                <TableCell align="center" sx={{ borderTopLeftRadius: '22px', borderBottomLeftRadius: '22px', borderBottom: 'none' }}>
                  <Button variant={isMdUp ? 'text' : 'contained'} size="small" sx={{ mx: 0, p: 0 }}>برداشت</Button>
                  <Button variant={isMdUp ? 'text' : 'contained'} size="small" sx={{ mx: 0, p: 0, mt:{xs: 1,md:0} }}>واریز</Button>
                  <Button variant={isMdUp ? 'text' : 'contained'} color="primary" size="small" sx={{ mx: 0, p: 0,  mt:{xs: 1,md: 0} }}>
                    خرید/فروش
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filteredData.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ borderBottom: 'none' }}>رمز ارزی پیدا نشد</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default CryptoTable;
