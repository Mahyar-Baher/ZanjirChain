import React, { useState } from 'react';
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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import NoDataImage from '/media/images/empty_box.webp'; // تصویر دلخواه‌تان را جایگزین کنید

const AddressList = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [rows, setRows] = useState([]);

  const handleAdd = () => {
    if (name && address) {
      setRows([...rows, { name, address }]);
      setName('');
      setAddress('');
      setOpen(false);
    }
  };

  const handleDelete = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  return (
    <Paper sx={{ p: 1, backgroundColor: 'transparent', border: 'none', boxShadow: 'none' }}>
      <Box sx={{display: 'grid',gridTemplateColumns: 'auto 1fr auto',alignItems: 'center',gap: 1,width: '100%',p:1}}>
        <Typography sx={{ fontWeight: "900", fontSize: '30px' }}>آدرس‌ها</Typography>
        <Divider  sx={{    borderStyle: 'dashed',   borderColor: 'rgba(0,0,0,1)',   height: 2 }}/>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
          sx={{
            mr: 1,
            color:'text.primary',
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
              <TableCell align="center" sx={{ fontWeight: 'bold', borderTopRightRadius: '22px', borderBottomRightRadius: '22px', borderBottom: 'none' }}>نام</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>آدرس</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', borderTopLeftRadius: '22px', borderBottomLeftRadius: '22px', borderBottom: 'none' }}>عملیات</TableCell>
            </TableRow>
          </TableHead>

          <TableBody sx={{ backgroundColor: '#80808c3f' }}>
            {rows.length > 0 ? (
              rows.map((row, index) => (
                <TableRow key={index} sx={{ '& td': { borderBottom: 'none' } }}>
                  <TableCell align="center" sx={{ borderTopRightRadius: '22px', borderBottomRightRadius: '22px' }}>{row.name}</TableCell>
                  <TableCell align="center">{row.address}</TableCell>
                  <TableCell align="center" sx={{ borderTopLeftRadius: '22px', borderBottomLeftRadius: '22px' }}>
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
                    هیچ ردیفی برای نمایش وجود ندارد
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={open} onClose={() => setOpen(false)}>
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
          <Typography variant="h6" fontWeight="bold" sx={{color:'text.primary',}}>افزودن آدرس جدید</Typography>
          <TextField
            label="نام"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <TextField
            label="آدرس"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
            multiline
            rows={3}
          />
          <Button variant="contained" sx={{fontWeight:'800',fontSize:'16px',color:'text.primary'}} onClick={handleAdd}>ثبت</Button>
        </Box>
      </Modal>
    </Paper>
  );
};

export default AddressList;
