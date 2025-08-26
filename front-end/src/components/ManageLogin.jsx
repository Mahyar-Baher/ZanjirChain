import React, { useState, useEffect } from 'react'; 
import { Box, Typography, Button, Table, TableHead, TableRow, TableCell, TableBody, Paper, TableContainer } from '@mui/material'; 
import LogoutIcon from '@mui/icons-material/Logout'; 
import NoDataImage from '/media/images/empty_box.webp'; 
import { useNavigate } from 'react-router-dom';

const formatDate = (isoString) => { 
  const date = new Date(isoString); 
  const days = ['یکشنبه','دوشنبه','سه‌شنبه','چهارشنبه','پنجشنبه','جمعه','شنبه']; 
  const dayName = days[date.getDay()]; 
  const formattedDate = date.toLocaleDateString('fa-IR',{ year:'numeric', month:'long', day:'numeric', hour:'2-digit', minute:'2-digit' }); 
  return `${dayName}، ${formattedDate}`; 
};

const ManageLogin = () => { 
  const [sessions, setSessions] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => { 
    let activeSessions = []; 
    try { 
      const authStorage = localStorage.getItem('auth-storage'); 
      const parsed = JSON.parse(authStorage); 
      activeSessions = parsed?.state?.user?.active_sessions || []; 
    } catch (e) { 
      console.error('Error parsing auth-storage:', e); 
    } 
    setSessions(activeSessions); 
  }, []);

  const handleLogoutAll = () => { 
    localStorage.removeItem('auth-storage'); 
    navigate('/logOut'); 
  };

  return ( 
    <Paper sx={{ p: 3, borderRadius: 3, backgroundColor: 'transparent', boxShadow: 'none' }}> 
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}> 
        <Typography variant="h6" fontWeight={900}>مدیریت ورود به پنل</Typography> 
        <Button variant="outlined" color="error" startIcon={<LogoutIcon style={{marginLeft:'8px'}}/>} sx={{ borderRadius: 2, fontWeight:'bold', p:0.3 }} onClick={handleLogoutAll}>خروج از بقیه حساب‌ها</Button> 
      </Box> 
      <TableContainer component={Paper} sx={{ backgroundColor:'transparent', boxShadow:'none' }}> 
        <Table sx={{ borderCollapse:'separate', borderSpacing:'0 8px' }}> 
          <TableHead sx={{ backgroundColor:'#80808c3f' }}> 
            <TableRow> 
              <TableCell align="center" sx={{ fontWeight:'bold', borderTopRightRadius:'22px', borderBottomRightRadius:'22px' }}>نام</TableCell> 
              <TableCell align="center" sx={{ fontWeight:'bold', borderTopLeftRadius:'22px', borderBottomLeftRadius:'22px' }}>آخرین فعالیت</TableCell> 
            </TableRow> 
          </TableHead> 
          <TableBody sx={{ backgroundColor:'#80808c3f' }}> 
            {sessions.length > 0 ? sessions.map((session,index)=>( 
              <TableRow key={index} sx={{ '& td':{ borderBottom:'none' } }}> 
                <TableCell align="center" sx={{ borderTopRightRadius:'22px', borderBottomRightRadius:'22px' }}>{session.device}</TableCell> 
                <TableCell align="center" sx={{ borderTopLeftRadius:'22px', borderBottomLeftRadius:'22px' }}>{session.current?'نشست فعلی':'نشست پیشین'} - {formatDate(session.last_active_at)}</TableCell> 
              </TableRow> 
            )) : ( 
              <TableRow> 
                <TableCell colSpan={2} align="center" sx={{ borderBottom:'none', py:5 }}> 
                  <img src={NoDataImage} alt="No data" width={120} /> 
                  <Typography sx={{ mt:2, color:'text.secondary' }}>هیچ سشن فعالی برای نمایش وجود ندارد</Typography> 
                </TableCell> 
              </TableRow> 
            )} 
          </TableBody> 
        </Table> 
      </TableContainer> 
    </Paper> 
  ); 
};

export default ManageLogin;
