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
import SidebarChildrenMenu from '../components/SidebarChildrenMenu';
import Switchprise from '../components/Switchprise';
import CryptoTable from '../components/CryptoTable';
import IncomeDepositSection from '../components/IncomeDepositSection';
import Navbarbox from '../components/navbarbox';
import { useOutletContext } from 'react-router-dom';
import navItems from '../data/navItems';

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
  const tether = 0;
  const rate = 85000;
  const walletMenu = navItems.find(item => item.label === 'کیف پول');
  return (
    <Paper sx={{ minHeight: '100vh', bgcolor: darkMode ? '#121212' : '#f5f5f5' }}>
      <Grid container spacing={0} sx={{ height: {xs:'fit-content', md:'fit-content'},justifyContent: { xs: 'flex-end', md: 'flex-end' }, alignItems: { xs: 'flex-center', md: 'flex-start' } }}>
        <Grid item size="auto">
          <Navbarbox />
        </Grid>
        <Grid item size={{xs: 12,sm: 12, md: 3, lg:2}} sx={{pr:{lg:2}}}>
          <SidebarChildrenMenu childrenItems={walletMenu?.children || []} />
        </Grid>
        <Grid item size="grow" sx={{ p: 2, pt:4}}>
          <Grid container spacing={{ xs: 1, md: 1 }} sx={{ justifyContent: { xs: 'flex-end', md: 'flex-start' }, alignItems: { xs: 'flex-center', md: 'flex-start' } }} >
            <IncomeDepositSection/>
            <Grid item size={{xs: 12,sm:12,md:12 ,lg:2}} sx={{ height:'100%',mt:{xl:5.1}, alignContent: 'end'}}>
              <Item sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center',alignItems:'center',p:1}}>
                <Typography fontWeight={600} fontSize={'12px'} textAlign="center" mb={1}>
                  ارزش دارایی‌های شما
                </Typography>
                <DualProgress tether={tether} toman={toman} rate={rate} />
              </Item>
            </Grid>
            <Grid item size={{xs: 12,sm: 12, md: 12, lg:12}} sx={{pl:0, mt: 3}}>
              <Item sx={{ height: '100%',backgroundColor:'#e9e9e9', display: 'flex', flexDirection: 'row', justifyContent: 'space-between',alignItems:'center',p:1}}>
                  <Box sx={{display:'felx'}}>
                    <Typography fontWeight={600} textAlign="center" mb={1}>
                      دریافت پاداش خودکار هفتگی
                    </Typography>
                    <Typography variant="caption" sx={{fontSize:'13px'}} color="text.secondary">
                      دریافت پاداش ۲۰٪ هفته شمار تومانی
                    </Typography>
                  </Box>
                  <Box>
                    <Switchprise />
                  </Box>
                </Item>
            </Grid>
            <Grid item size={{xs: 12,sm: 12, md: 12, lg:12}} sx={{pl:0, mt: 3}}>
              <Item sx={{ height: '100%',backgroundColor:'transparent', display: 'flex', flexDirection: 'row', justifyContent: 'space-between',alignItems:'center',p:1}}>
                  <CryptoTable/>
              </Item>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Wallet;
