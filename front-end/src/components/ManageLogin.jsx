import React from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
  Divider,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import NoDataImage from '/media/images/empty_box.webp';

const sessions = [
  {
    name: 'Chrome - Windows 10',
    isCurrent: true,
    timestamp: '2025-06-12T10:45:00',
  },
  {
    name: 'Safari - iPhone 14 Pro',
    isCurrent: false,
    timestamp: '2025-06-10T22:10:00',
  },
];

const formatDate = (isoString) => {
  const date = new Date(isoString);
  const days = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه'];
  const dayName = days[date.getDay()];
  const formattedDate = date.toLocaleDateString('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  return `${dayName}، ${formattedDate}`;
};

const ManageLogin = () => {
  return (
    <Paper sx={{ p: 3, borderRadius: 3, backgroundColor: 'transparent', boxShadow: 'none' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight={900}>
          مدیریت ورود به پنل
        </Typography>
        <Button
          variant="outlined"
          color="error"
          startIcon={<LogoutIcon style={{marginLeft: '8px'}} />}
          sx={{ borderRadius: 2, fontWeight: 'bold',p: 0.3 }}
        >
          خروج از بقیه حساب‌ها
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
        <Table sx={{ borderCollapse: 'separate', borderSpacing: '0 8px' }}>
          <TableHead sx={{ backgroundColor: '#80808c3f' }}>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: 'bold', borderTopRightRadius: '22px', borderBottomRightRadius: '22px' }}>
                نام
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', borderTopLeftRadius: '22px', borderBottomLeftRadius: '22px' }}>
                آخرین فعالیت
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ backgroundColor: '#80808c3f' }}>
            {sessions.length > 0 ? (
              sessions.map((session, index) => (
                <TableRow key={index} sx={{ '& td': { borderBottom: 'none' } }}>
                  <TableCell align="center" sx={{ borderTopRightRadius: '22px', borderBottomRightRadius: '22px' }}>
                    {session.name}
                  </TableCell>
                  <TableCell align="center" sx={{ borderTopLeftRadius: '22px', borderBottomLeftRadius: '22px' }}>
                    {session.isCurrent ? 'نشست فعلی' : 'نشست پیشین'} - {formatDate(session.timestamp)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} align="center" sx={{ borderBottom: 'none', py: 5 }}>
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

      {/* Divider
      <Divider sx={{ my: 4, borderStyle: 'dashed' }} />

      <Box mt={3}>
        <Typography variant="h6" fontWeight="bold" mb={1}>
            بعدا اضافه کنم
        </Typography>
        <ul style={{ paddingRight: '1rem', lineHeight: '2' }}>
          <li>نمایش موقعیت جغرافیایی تقریبی نشست</li>
          <li>امکان مسدودسازی نشست‌های خاص</li>
          <li>هشدار هنگام ورود از مکان جدید</li>
          <li>فعال‌سازی تایید ایمیل هنگام ورود جدید</li>
          <li>ثبت فعالیت‌های مشکوک و اعلان فوری</li>
        </ul>
      </Box> */}
    </Paper>
  );
};

export default ManageLogin;
