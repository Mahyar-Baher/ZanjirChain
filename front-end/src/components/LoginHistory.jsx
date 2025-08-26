import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, Paper, Divider, TableContainer } from '@mui/material';
import NoDataImage from '/media/images/empty_box.webp';

const LoginHistory = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let sessions = [];
    try {
      const authStorage = localStorage.getItem('auth-storage');
      const parsed = JSON.parse(authStorage);
      sessions = parsed?.state?.user?.active_sessions || [];
    } catch (e) {
      console.error('Error parsing auth-storage:', e);
    }
    setRows(sessions);
  }, []);

  return (
    <Paper sx={{ p: 2, backgroundColor: 'transparent', border: 'none', boxShadow: 'none' }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'auto 1fr', alignItems: 'center', gap: 1, width: '100%', mb: 2 }}>
        <Typography sx={{ fontWeight: 900, fontSize: '20px', color: 'text.primary' }}>تاریخچه ورود</Typography>
        <Divider sx={{ borderStyle: 'dashed', borderColor: 'rgba(0,0,0,0.5)', height: 2 }} />
      </Box>
      <TableContainer component={Paper} sx={{ backgroundColor: 'transparent', border: 'none', boxShadow: 'none' }}>
        <Table sx={{ borderCollapse: 'separate', borderSpacing: '0 10px', minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{bgcolor: 'Window' }}>
              <TableCell align="center" sx={{ fontWeight: 'bold', borderTopRightRadius: '16px', borderBottomRightRadius: '16px', color: '#333' }}>دستگاه</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', color: '#333' }}>سیستم عامل</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', color: '#333' }}>مرورگر</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', color: '#333' }}>IP</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', color: '#333' }}>آخرین فعالیت</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 ? rows.map((row, index) => (
              <TableRow key={index} sx={{  '& td': { borderBottom: 'none', paddingY: 1.5 } }}>
                <TableCell align="center" sx={{ borderTopRightRadius: '16px', borderBottomRightRadius: '16px' }}>{row.device}</TableCell>
                <TableCell align="center">{row.os}</TableCell>
                <TableCell align="center">{row.browser}</TableCell>
                <TableCell align="center">{row.ip}</TableCell>
                <TableCell align="center">{new Date(row.last_active_at).toLocaleString('fa-IR')}</TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 5 }}>
                  <img src={NoDataImage} alt="No data" width={120} />
                  <Typography sx={{ mt: 2, color: 'text.secondary' }}>هیچ سشن فعالی برای نمایش وجود ندارد</Typography>
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
