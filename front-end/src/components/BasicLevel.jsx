import React, { useState, useEffect } from 'react';
import { Grid, Typography, MenuItem, Box, Modal, Button as MuiButton } from '@mui/material';
import { VerifiedUser } from '@mui/icons-material';
import { GradientPaper, LevelIcon, StyledTextField, StyledButton } from './styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const months = [
  { name: 'فروردین', value: 1 },
  { name: 'اردیبهشت', value: 2 },
  { name: 'خرداد', value: 3 },
  { name: 'تیر', value: 4 },
  { name: 'مرداد', value: 5 },
  { name: 'شهریور', value: 6 },
  { name: 'مهر', value: 7 },
  { name: 'آبان', value: 8 },
  { name: 'آذر', value: 9 },
  { name: 'دی', value: 10 },
  { name: 'بهمن', value: 11 },
  { name: 'اسفند', value: 12 },
];

const SuccessPage = () => {
  const navigate = useNavigate();
  useEffect(() => { const timer = setTimeout(() => navigate('/dashboard'), 2000); return () => clearTimeout(timer); }, [navigate]);
  return (
    <GradientPaper sx={{ textAlign: 'center', py: 6 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'white', mb: 2 }}>تمام شد!</Typography>
      <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mb: 4 }}>اطلاعات شما با موفقیت ثبت شد. در حال انتقال به داشبورد...</Typography>
    </GradientPaper>
  );
};

const BasicLevel = ({ onNext, nationalCode, token }) => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [gender, setGender] = useState('');
  const [referral, setReferral] = useState('');
  const [dayError, setDayError] = useState('');
  const [monthError, setMonthError] = useState('');
  const [yearError, setYearError] = useState('');
  const [showSuccess,] = useState(false);
  const [underageModal, setUnderageModal] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [confirmSuccess, setConfirmSuccess] = useState(false);

  const getMaxDay = (monthValue) => { if (!monthValue) return 31; const monthNum = parseInt(monthValue, 10); return monthNum >= 1 && monthNum <= 6 ? 31 : 30; };
  const getAge = (dayValue, monthValue, yearValue) => { if (!dayValue || !monthValue || !yearValue) return null; const birthYear = parseInt(yearValue, 10); const birthMonth = parseInt(monthValue, 10); const birthDay = parseInt(dayValue, 10); const today = new Date(); let age = today.getFullYear() - (birthYear + 621); if (today.getMonth() + 1 < birthMonth || (today.getMonth() + 1 === birthMonth && today.getDate() < birthDay)) age -= 1; return age; };
  const validateDay = (value) => { const dayNum = parseInt(value, 10); const maxDay = getMaxDay(month); if (!value) { setDayError('روز الزامی است'); return false; } if (isNaN(dayNum) || dayNum < 1 || dayNum > maxDay) { setDayError(`روز باید بین ۱ و ${maxDay} باشد`); return false; } setDayError(''); return true; };
  const validateMonth = (value) => { if (!value) { setMonthError('ماه الزامی است'); return false; } setMonthError(''); return true; };
  const validateYear = (value) => { const yearNum = parseInt(value, 10); if (!value) { setYearError('سال الزامی است'); return false; } if (isNaN(yearNum) || yearNum < 1300 || yearNum > 1404) { setYearError('سال باید بین ۱۳۰۰ و ۱۴۰۴ باشد'); return false; } setYearError(''); return true; };
  const handleMonthChange = (value) => { const maxDay = getMaxDay(value); let newDay = day; if (day && parseInt(day, 10) > maxDay) newDay = maxDay.toString(); setMonth(value); setDay(newDay); setMonthError(''); setDayError(''); };

  const handleSubmit = async () => {
    const isDayValid = validateDay(day);
    const isMonthValid = validateMonth(month);
    const isYearValid = validateYear(year);
    if (!(isDayValid && isMonthValid && isYearValid)) return;
    const age = getAge(day, month, year);
    if (age < 18) { setUnderageModal(true); return; }
    try {
      const response = await axios.put(
        'https://amirrezaei2002x.shop/laravel/api/kyc-level-One',
        { national_code: nationalCode, daybr: parseInt(day,10), monthbr: parseInt(month,10), yearbt: parseInt(year,10) },
        { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
      );
      setApiResponse(response.data);
    } catch (err) { console.error(err); alert('خطا در ارسال اطلاعات به سرور'); }
  };

  const handleConfirm = async () => {
    setConfirmLoading(true);
    try {
      await axios.put(
        'https://amirrezaei2002x.shop/laravel/api/users/kyc-level-One-Confirm',
        { statuse: true },
        { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
      );
      setConfirmSuccess(true);
      onNext();
    } catch (err) { console.error(err); alert('خطا در تایید نهایی'); }
    setConfirmLoading(false);
  };

  if (showSuccess) return <SuccessPage />;

  return (
    <GradientPaper>
      <LevelIcon><VerifiedUser fontSize="inherit" /></LevelIcon>
      <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight:'bold', mb:3, color:'white' }}>احراز هویت سطح پایه</Typography>
      <Grid container spacing={3}>
        <Grid size={{xs:12, sm:4}}>
          <StyledTextField fullWidth label="روز" type="number" variant="outlined" value={day} onChange={(e)=>{ setDay(e.target.value); validateDay(e.target.value); }} error={!!dayError} helperText={dayError} inputProps={{ min:1, max:getMaxDay(month) }} sx={{ "& input[type=number]::-webkit-outer-spin-button,& input[type=number]::-webkit-inner-spin-button":{WebkitAppearance:'none',margin:0},"& input[type=number]":{MozAppearance:'textfield'}}}/>
        </Grid>
        <Grid size={{xs:12, sm:4}}>
          <StyledTextField fullWidth select label="ماه" variant="outlined" value={month} onChange={(e)=>handleMonthChange(e.target.value)} error={!!monthError} helperText={monthError}>
            {months.map(m=><MenuItem key={m.value} value={m.value}>{m.name}</MenuItem>)}
          </StyledTextField>
        </Grid>
        <Grid size={{xs:12, sm:4}}>
          <StyledTextField fullWidth label="سال" type="number" variant="outlined" value={year} onChange={(e)=>{ setYear(e.target.value); validateYear(e.target.value); }} error={!!yearError} helperText={yearError} inputProps={{ min:1300,max:1404 }} sx={{ "& input[type=number]::-webkit-outer-spin-button,& input[type=number]::-webkit-inner-spin-button":{WebkitAppearance:'none',margin:0},"& input[type=number]":{MozAppearance:'textfield'}}}/>
        </Grid>
        <Grid size={{xs:12, sm:6}}>
          <StyledTextField fullWidth select label="جنسیت" variant="outlined" value={gender} onChange={(e)=>setGender(e.target.value)} defaultValue="">
            <MenuItem value="male">مرد</MenuItem>
            <MenuItem value="female">زن</MenuItem>
            <MenuItem value="other">سایر</MenuItem>
          </StyledTextField>
        </Grid>
        <Grid size={{xs:12, sm:6}}>
          <StyledTextField fullWidth select label="روش آشنایی" variant="outlined" value={referral} onChange={(e)=>setReferral(e.target.value)} defaultValue="">
            <MenuItem value="friend">دوستان</MenuItem>
            <MenuItem value="social">شبکه‌های اجتماعی</MenuItem>
            <MenuItem value="ads">تبلیغات</MenuItem>
            <MenuItem value="other">سایر</MenuItem>
          </StyledTextField>
        </Grid>
        <Grid size={{xs:12}} sx={{ mt:2 }}>
          <StyledButton variant="contained" fullWidth size="large" onClick={handleSubmit}>مرحله بعد</StyledButton>
        </Grid>
      </Grid>

      {apiResponse && (
        <Box sx={{ mt:4, p:2, border:'1px solid rgba(255,255,255,0.2)', borderRadius:2 }}>
          <Typography variant="h6" sx={{ mb:2, color:'white' }}>اطلاعات بازیابی شده:</Typography>
          <Typography sx={{ color:'white' }}>نام: {apiResponse.first_name}</Typography>
          <Typography sx={{ color:'white' }}>نام خانوادگی: {apiResponse.last_name}</Typography>
          <Typography sx={{ color:'white' }}>نام پدر: {apiResponse.father_name}</Typography>
          <Typography sx={{ color:'white' }}>زنده بودن: {apiResponse.alive?'بلی':'خیر'}</Typography>
          <Typography sx={{ color:'white' }}>تاریخ تولد: {day}/{month}/{year}</Typography>
          <Typography sx={{ color:'white' }}>کد ملی: {nationalCode}</Typography>
          <StyledButton variant="contained" fullWidth sx={{ mt:2 }} onClick={handleConfirm} disabled={confirmLoading}>
            {confirmLoading ? 'در حال پردازش...' : 'تایید نهایی'}
          </StyledButton>
          {confirmSuccess && <Typography sx={{ color:'#26A17B', mt:2 }}>اطلاعات با موفقیت تایید شد!</Typography>}
        </Box>
      )}

      <Modal open={underageModal} onClose={()=>setUnderageModal(false)}>
        <GradientPaper sx={{ maxWidth:400, mx:'auto', mt:'20%', p:4, textAlign:'center' }}>
          <Typography variant="h6" sx={{ mb:2, color:'white' }}>شما زیر سن قانونی هستید</Typography>
          <Typography variant="body2" sx={{ mb:3, color:'rgba(255,255,255,0.8)'}}>متاسفانه شما اجازه ادامه ثبت نام را ندارید.</Typography>
          <MuiButton variant="contained" onClick={()=>setUnderageModal(false)} sx={{ mt:1, background:'#26A17B' }}>بستن</MuiButton>
        </GradientPaper>
      </Modal>
    </GradientPaper>
  );
};

export default BasicLevel;
