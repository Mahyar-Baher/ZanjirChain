import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Modal,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Divider,
  TableContainer,
  MenuItem,
  Select,
  InputAdornment,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import NoDataImage from '/media/images/empty_box.webp';

const networkOptions = [
  'TRC20 (Tron Network)',
  'ERC20 (Ethereum Network)',
  'BEP20 (Binance Smart Chain)',
  'OMNI (Bitcoin Omni Layer)',
  'Polygon (MATIC)',
  'SOL (Solana)',
  'AVAX-C (Avalanche C-Chain)',
  'Arbitrum One',
  'Optimism',
  'TON (The Open Network)',
  'دیگر شبکه ها'
];


const AddressList = () => {
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState('');
  const [network, setNetwork] = useState('');
  const [customNetwork, setCustomNetwork] = useState('');
  const [rows, setRows] = useState([]);
  const [isCustomNetwork, setIsCustomNetwork] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && Array.isArray(user.wallet_addresses)) {
      setRows(user.wallet_addresses);
    }
  }, []);

  const handleAdd = () => {
    if (address && (network || customNetwork)) {
      const networkName = isCustomNetwork ? customNetwork : network;
      const newAddress = {
        address,
        network: networkName
      };

      const updatedRows = [...rows, newAddress];
      setRows(updatedRows);
      setAddress('');
      setNetwork('');
      setCustomNetwork('');
      setIsCustomNetwork(false);
      setOpen(false);

      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        user.wallet_addresses = updatedRows;
        localStorage.setItem('user', JSON.stringify(user));
      }
    }
  };

  const handleDelete = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);

    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      user.wallet_addresses = updatedRows;
      localStorage.setItem('user', JSON.stringify(user));
    }
  };

  const handleNetworkChange = (e) => {
    const value = e.target.value;
    if (value === 'دیگر شبکه ها') {
      setIsCustomNetwork(true);
      setNetwork('');
    } else {
      setIsCustomNetwork(false);
      setNetwork(value);
      setCustomNetwork('');
    }
  };

  return (
    <Paper sx={{ p: 1, backgroundColor: 'transparent', border: 'none', boxShadow: 'none' }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'center', gap: 1, width: '100%', p: 1 }}>
        <Typography sx={{ fontWeight: '900', fontSize: '30px' }}>آدرس‌ها</Typography>
        <Divider sx={{ borderStyle: 'dashed', borderColor: 'rgba(0,0,0,1)', height: 2 }} />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
          sx={{
            mr: 1,
            color: 'text.primary',
            borderRadius: 2,
            textTransform: 'none',
            px: 2,
            py: 0.7,
            borderColor: '#7878FF',
            gap: 0.5,
            fontWeight: '500'
          }}
        >
          افزودن آدرس
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ backgroundColor: 'transparent', border: 'none', boxShadow: 'none' }}>
        <Table sx={{ borderCollapse: 'separate', borderSpacing: '0 8px' }}>
          <TableHead sx={{ backgroundColor: '#80808c3f' }}>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: 'bold', borderRadius: '22px 0 0 22px', borderBottom: 'none' }}>شبکه</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: 'none' }}>آدرس</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', borderRadius: '0 22px 22px 0', borderBottom: 'none' }}>عملیات</TableCell>
            </TableRow>
          </TableHead>

          <TableBody sx={{ backgroundColor: '#80808c3f' }}>
            {rows.length > 0 ? (
              rows.map((row, index) => (
                <TableRow key={index} sx={{ '& td': { borderBottom: 'none' } }}>
                  <TableCell align="center" sx={{ borderRadius: '22px 0 0 22px' }}>{row.network}</TableCell>
                  <TableCell align="center">{row.address}</TableCell>
                  <TableCell align="center" sx={{ borderRadius: '0 22px 22px 0' }}>
                    <Button color="error" size="small" onClick={() => handleDelete(index)}>
                      حذف
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ borderBottom: 'none', py: 5 }}>
                  <img src={NoDataImage} alt="No data" width={120} />
                  <Typography sx={{ mt: 2, color: 'text.secondary' }}>
                    هیچ آدرسی برای نمایش وجود ندارد
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={open} onClose={() => {
        setOpen(false);
        setIsCustomNetwork(false);
        setNetwork('');
        setCustomNetwork('');
      }}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}>
          <Typography variant="h6" fontWeight="bold" sx={{ color: 'text.primary' }}>افزودن آدرس جدید</Typography>
          
          {isCustomNetwork ? (
            <TextField
              label="نام شبکه"
              value={customNetwork}
              onChange={(e) => setCustomNetwork(e.target.value)}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => {
                      setIsCustomNetwork(false);
                      setCustomNetwork('');
                    }}>
                      <CloseIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          ) : (
            <Select
              value={network}
              onChange={handleNetworkChange}
              displayEmpty
              fullWidth
              renderValue={(selected) => selected || "انتخاب شبکه"}
            >
              {networkOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          )}

          <TextField
            label="آدرس"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
            multiline
            rows={3}
          />

          <Button 
            variant="contained" 
            sx={{ fontWeight: '800', fontSize: '16px', color: 'text.primary' }} 
            onClick={handleAdd}
            disabled={!address || (!network && !customNetwork)}
          >
            ثبت
          </Button>
        </Box>
      </Modal>
    </Paper>
  );
};

export default AddressList;