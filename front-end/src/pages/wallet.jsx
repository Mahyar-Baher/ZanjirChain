import { styled } from '@mui/material/styles';
import {
  Box,
  Button,
  Typography,
  Grid,
  Paper,
  Stack,
  Divider
} from '@mui/material';
import DualProgress from '../components/DualProgress';
import Navbarbox from '../components/navbarbox';
import { useOutletContext } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(3),
  borderRadius: 16,
  color: theme.palette.text.primary,
  boxShadow: theme.shadows[2],
}));

const Wallet = () => {
  const { darkMode } = useOutletContext();
  const toman = 0;
  const tether = 100;
  const rate = 85000;

  return (
    <Paper sx={{ minHeight: '100vh', bgcolor: darkMode ? '#121212' : '#f5f5f5' }}>
      <Grid container sx={{ height: {xs:'fit-content', md:'fit-content'} }}>
        <Navbarbox />

        <Grid item size="grow" sx={{ p: 4 }}>
          <Grid container spacing={2} sx={{ height:{xs:'fit-content', md:'fit-content'} }}>
            <Grid item size={{xs: 12,md: 6, lg:5}} sx={{ height:{xs:'fit-content', md:'fit-content',lg: '100%'} }}>
              <Item sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' , p:0}}>
                <Box sx={{p:2, pb:0}}>
                  <Typography variant="h6" fontWeight={600} textAlign="right">
                    تومان
                  </Typography>
                  <Typography mt={1} textAlign="left">
                    {toman.toLocaleString()} تومان
                  </Typography>
                  <Typography variant="body2" mt={1} color="text.secondary" textAlign="left">
                    موجودی در دسترس: 0
                  </Typography>
                </Box>
                <Stack direction="row" spacing={0} mt={3}>
                  <Button fullWidth variant="contained" className="bg-btn-sky" sx={{ fontSize: 12, borderRadius: '0px 0px 10px 0px', p:{xs:1,md:2} }}>
                    برداشت
                  </Button>
                  <Button fullWidth variant="contained" className="bg-btn-sky" sx={{ fontSize: 12, borderRadius: '0px 0px 0px 0px' , p:{xs:1,md:2}}}>
                    واریز
                  </Button>
                  <Button fullWidth variant="contained" className="bg-btn-sky" sx={{ fontSize: 12, borderRadius: '0px 0px 0px 0px' , p:{xs:1,md:2}}}>
                    تاریخچه
                  </Button>
                  <Button fullWidth variant="contained" className="bg-btn-sky" sx={{ fontSize: 12, borderRadius: '0px 0px 0px 10px', p:{xs:1,md:0} }}>
                    تبدیل به تتر
                  </Button>
                </Stack>
              </Item>
            </Grid>
            <Grid item size={{xs: 12,md:6 ,lg:5}} sx={{ height:{xs:'fit-content', md:'fit-content',lg: '100%'}}}>
              <Item sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' ,p:0}}>
                <Box sx={{p:2, pb:0}}>
                  <Typography variant="h6" fontWeight={600} textAlign="right">
                    تتر
                  </Typography>
                  <Typography mt={1} textAlign="left">
                    {tether} تتر
                  </Typography>
                  <Typography variant="body2" mt={1} color="text.secondary" textAlign="left">
                    موجودی در دسترس: 0
                  </Typography>
                </Box>
                <Stack direction="row" spacing={0} mt={3}>
                  <Button fullWidth variant="contained" className="bg-btn-purple" sx={{ fontSize: 12,borderRadius: '0px 0px 10px 0px',p:{xs:1,md:2} }}>
                    برداشت
                  </Button>
                  <Button fullWidth variant="contained" className="bg-btn-purple" sx={{ fontSize: 12,borderRadius: '0px 0px 0px 0px',p:{xs:1,md:2} }}>
                    واریز
                  </Button>
                  <Button fullWidth variant="contained" className="bg-btn-purple" sx={{ fontSize: 12,borderRadius: '0px 0px 0px 0px',p:{xs:1,md:2} }}>
                    تاریخچه
                  </Button>
                  <Button fullWidth variant="contained" className="bg-btn-purple" sx={{ fontSize: 12,borderRadius: '0px 0px 0px 10px',p:{xs:1,md:0} }}>
                    تبدیل به تومان
                  </Button>
                </Stack>
              </Item>
            </Grid>
            <Grid item size={{xs: 12, md:12 ,lg:2}} sx={{ height:'100%'}}>
              <Item sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center',alignItems:'center',p:1}}>
                <Typography fontWeight={600} textAlign="center" mb={2}>
                  ارزش دارایی‌های شما
                </Typography>
                <DualProgress tether={tether} toman={toman} rate={rate} />
              </Item>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Wallet;
