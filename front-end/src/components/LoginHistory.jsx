import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Divider,
  TableContainer,
  Button,
} from '@mui/material';
import NoDataImage from '/media/images/empty_box.webp'; // مسیر تصویر جایگزین شود

const LoginHistory = () => {
  const [rows, setRows] = useState([
    // نمونه داده برای تست:
    // { device: 'Chrome on Windows', location: 'تهران، ایران', ip: '192.168.1.1', time: '1403/03/20 - 14:35' },
  ]);

  const handleLogout = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  return (
    <Paper sx={{ p: 1, backgroundColor: 'transparent', border: 'none', boxShadow: 'none' }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'auto 1fr', alignItems: 'center', gap: 1, width: '100%', }}>
        <Typography sx={{ fontWeight: 900, fontSize: '20px' }}>تاریخچه ورود</Typography>
        <Divider sx={{ borderStyle: 'dashed', borderColor: 'rgba(0,0,0,1)', height: 2 }} />
      </Box>

      <TableContainer component={Paper} sx={{ backgroundColor: 'transparent', border: 'none', boxShadow: 'none' }}>
        <Table sx={{ borderCollapse: 'separate', borderSpacing: '0 8px' }}>
          <TableHead sx={{ backgroundColor: '#80808c3f' }}>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: 'bold', borderTopRightRadius: '22px', borderBottomRightRadius: '22px' }}>دستگاه</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>مکان</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>IP</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>زمان</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', borderTopLeftRadius: '22px', borderBottomLeftRadius: '22px' }}>عملیات</TableCell>
            </TableRow>
          </TableHead>

          <TableBody sx={{ backgroundColor: '#80808c3f' }}>
            {rows.length > 0 ? (
              rows.map((row, index) => (
                <TableRow key={index} sx={{ '& td': { borderBottom: 'none' } }}>
                  <TableCell align="center" sx={{ borderTopRightRadius: '22px', borderBottomRightRadius: '22px' }}>{row.device}</TableCell>
                  <TableCell align="center">{row.location}</TableCell>
                  <TableCell align="center">{row.ip}</TableCell>
                  <TableCell align="center">{row.time}</TableCell>
                  <TableCell align="center" sx={{ borderTopLeftRadius: '22px', borderBottomLeftRadius: '22px' }}>
                    <Button color="error" size="small" onClick={() => handleLogout(index)}>
                      خروج
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ borderBottom: 'none', py: 5 }}>
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
    </Paper>
  );
};

export default LoginHistory;
