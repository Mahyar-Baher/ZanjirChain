import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  Grid, 
  Paper, 
  CircularProgress, 
  Stack 
} from '@mui/material';
import Navbarbox from '../components/navbarbox';
import { useOutletContext } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const ActionButton = styled(Button)(({ theme, colorType }) => ({
  padding: theme.spacing(4),
  fontSize: '0.8125rem',
  fontWeight: 'bold',
  borderRadius: 0,
  backgroundColor: colorType === 'sky' ? '#87CEEB' : '#9370DB',
  '&:hover': {
    backgroundColor: colorType === 'sky' ? '#6cb4d1' : '#7a5fb8',
  },
  '&:first-of-type': {
    borderBottomLeftRadius: '4px !important',
  },
  '&:last-of-type': {
    borderBottomRightRadius: '4px !important',
  },
}));

const Wallet = () => {
  const { darkMode } = useOutletContext();
  const [progress, setProgress] = useState(0);
  const [walletData, setWalletData] = useState({
    toman: { balance: 0, available: 0 },
    tether: { balance: 0, available: 0 },
    total: { toman: 0, tether: 0 }
  });

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
  //   }, 400);
  //   // fetchWalletData().then(data => setWalletData(data));    
  //   return () => clearInterval(timer);
  // }, []);

  return (
    <Paper sx={{ height: '100vh', bgcolor: darkMode ? '#121212' : '#f5f5f5' }}>
      <Grid container sx={{ height: '100%' }}>
        <Navbarbox />
        
        <Grid container spacing={2} sx={{ pt: 5, px: 2 }}>
          <Grid item size={{ xs: 12, md: 4 }} sx={{borderRadius: 2,overflow: 'hidden', justifyItems: 'left' }}>
            <Item sx={{p:0}} className='shadow'>
              <Box className="bg-img-hexed">
                <Box className="bg-img-hexed-d">
                  <Box className="bg-secondary bg-opacity-10 p-3 pe-5">
                    <Typography  variant="h4" className='fw-semibold text-end'>
                      تومان
                    </Typography>
                    <Typography className='fw-semibold text-start mt-2'>
                      تومان 0.00
                    </Typography>
                    <Typography className='fw-semibold text-start mt-2'>
                      موجودی در دسترس 0
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box>
              <Stack direction="row" className='rounded-bottom-2 overflow-hodden' spacing={0}>
                <Button variant="contained" className="rounded-0 fw-bold bg-btn-sky" sx={{py:4, fontSize: '13px',borderRadius: '0px 0px 5px 0px !important'}} fullWidth>برداشت</Button>
                <Button variant="contained" className="rounded-0 fw-bold bg-btn-sky" sx={{py:4, fontSize: '13px'}} fullWidth>واریز</Button>
                <Button variant="contained" className="rounded-0 fw-bold bg-btn-sky" sx={{py:4, fontSize: '13px'}} fullWidth>تاریخچه</Button>
                <Button variant="contained" className="rounded-0 fw-bold bg-btn-sky" sx={{py:4, fontSize: '13px',borderRadius: '0px 0px 0px 5px !important'}} fullWidth>تبدیل به تتر</Button>
              </Stack>
              </Box>
            </Item>
          </Grid>
          <Grid item size={{ xs: 12, md: 4 }} sx={{borderRadius: 2,overflow: 'hidden' }}>
            <Item sx={{p:0}} className='shadow'>
              <Box className="bg-img-hexed">
                <Box className="bg-img-hexed-d">
                  <Box className="bg-secondary bg-opacity-10 p-3 pe-5">
                    <Typography  variant="h4" className='fw-semibold text-end'>
                      تتر
                    </Typography>
                    <Typography className='fw-semibold text-start mt-2'>
                      تتر 0.00
                    </Typography>
                    <Typography className='fw-semibold text-start mt-2'>
                      موجودی در دسترس 0
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box>
              <Stack direction="row" spacing={0}>
                <Button variant="contained" className="rounded-0 fw-bold bg-btn-purple" sx={{py:4, fontSize: '13px',borderRadius: '0px 0px 5px 0px !important'}} fullWidth color="secondary">برداشت</Button>
                <Button variant="contained" className="rounded-0 fw-bold bg-btn-purple" sx={{py:4, fontSize: '13px'}} fullWidth color="secondary">واریز</Button>
                <Button variant="contained" className="rounded-0 fw-bold bg-btn-purple" sx={{py:4, fontSize: '13px'}} fullWidth color="secondary">تاریخچه</Button>
                <Button variant="contained" className="rounded-0 fw-bold bg-btn-purple" sx={{py:4, fontSize: '13px',borderRadius: '0px 0px 0px 5px !important'}} fullWidth color="secondary">تبدیل به تومان</Button>
              </Stack>
              </Box>
            </Item>
          </Grid>
          <Grid item size={{ xs: 12, md: 2 }} sx={{borderRadius: 2}}>
            <Item  className="shadow">
              <Box>
                <Typography sx={{mb:1}}>
                  ارزش دارایی های شما
                </Typography>
                <Box position="relative" sx={{mt:1}} display="inline-flex">
                  <CircularProgress size={150} variant="determinate" value={progress} />
                  <Box top={0} left={0} bottom={0} right={0} position="absolute" display="flex" alignItems="center" justifyContent="center">
                    <Typography variant="caption" component="div" color="text.secondary" className="fw-semibold" sx={{fontSize: '17px,'}}>
                      تومان: 0<br />تتر: 0.0
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Item>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Wallet;