import React, { useState } from 'react';
import {
  useMediaQuery, useTheme, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Box, Button, TextField, Typography, Grid,
  FormControlLabel, Checkbox, Paper
} from '@mui/material';
import { Icon } from '@iconify/react';



const CryptoTable = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [hideEmptyBalances, setHideEmptyBalances] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // تشخیص موبایل

  const assetuserhave = props.walletBalenc;

  const cryptoData = Object.keys(assetuserhave).map(network => {
    const tokenKeys = Object.keys(assetuserhave[network]);
    return tokenKeys.map(token => ({
      name: `${token} on ${network}`, 
      icon: `token-branded:usdt`,  
      symbol: token.toLowerCase(),
      total: assetuserhave[network][token].total,
      change: '0%',                // اگه داری، می‌تونی اینو هم از API بگیری
      tetherPrice: 100
    }));
  }).flat(); 

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
          variant='standard'
          placeholder='جستجو'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            borderRadius: '24px',
            ml: "10px",
            width: { xs: '100%', md: 'fit-content' },
            '& .MuiInputBase-input': { fontSize: { xs: '14px', sm: '16px' } },
          }}
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
                <TableCell align="center" sx={{ fontWeight: 'bold', borderTopLeftRadius: '22px', borderBottomLeftRadius: '22px', borderBottom: 'none' }}>قیمت تتر</TableCell>
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
                  <TableCell align="center" sx={{ borderTopLeftRadius: '22px', borderBottomLeftRadius: '22px', borderBottom: 'none' }}>{crypto.tetherPrice}</TableCell>
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