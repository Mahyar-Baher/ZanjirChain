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
import navItems from '../data/navItems';
import CompleteIdenity from '../components/CompleteIdenity';
import QuickBuyAndSell from '../components/QuickBuyAndSell';
import TetherChartDash from '../components/TetherChartDash';
import AddsMaster from '../components/AddsMaster';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(3),
  borderRadius: 16,
  color: theme.palette.text.primary,
  boxShadow: theme.shadows[2],
}));

const Dashboard = () => {
  const { darkMode } = useOutletContext();
  const toman = 2000000;
  const tether = 1000;
  const rate = 85000;
  const size = 140;
  const DashboardMenu = navItems.find(item => item.label === 'کیف پول');
  return (
    <Paper sx={{ minHeight: '100vh', bgcolor: darkMode ? '#121212' : '#f5f5f5' }}>
      <Grid container spacing={0} sx={{ height: {xs:'fit-content', md:'fit-content'},justifyContent: { xs: 'flex-end', md: 'flex-end' }, alignItems: { xs: 'flex-center', md: 'flex-start' } }}>
        <Grid item size="auto">
          <Navbarbox />
        </Grid>
        <Grid item size="grow" sx={{ p: 2, pt:4}}>
          <Grid container spacing={{ xs: 1, md: 2 }} sx={{ justifyContent: { xs: 'flex-end', md: 'flex-start' }, alignItems: { xs: 'flex-center', md: 'flex-start' } }} >
            <Grid item size={{xs: 12,sm: 12, md: 12, lg:12}} sx={{pr:{lg:2}}}>
              <Box sx={{display: 'grid',gridTemplateColumns: 'auto 1fr auto',alignItems: 'center',gap: 1,width: '100%',py:2}}>
                <Typography Wrap sx={{fontWeight: '900'}}>سطح ارتقای احراز هویت</Typography>
                <Divider  sx={{    borderStyle: 'dashed',   borderColor: 'rgba(0, 0, 0, 0.5)',   height: 2 }}/>
                <Typography fontSize='12px' color="text.secondary" Wrap>مرحله به مرحله پیش بروید تا خدمات بهتری را دریافت نمایید</Typography>
              </Box>
            </Grid>
            <Grid item size={{xs: 12,sm: 12, md: 9, lg:9}} sx={{py:0}}>
              <CompleteIdenity activeStep={1} />
            </Grid>
            <Grid item size={{xs:12,sm: 12,md: 3, lg:3}} sx={{ height:{xs:'fit-content', md:'fit-content',lg: '100%'}}}>
              <Item sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' , p:0}}>
                <Box>
                  <Button fullWidth variant="contained" className="bg-btn-sky" sx={{ fontSize:{md:14,xl:17}  ,p:{md:1.7}}}>
                    تکمیل احراز هویت
                  </Button>
                </Box>
              </Item>
            </Grid>
            <Grid item size={{xs: 12,sm:12,md:12 ,lg:8}} sx={{ height:{xs:'fit-content', md:'fit-content',lg: '100%'}}}>
              <Item sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' ,p:0}}>
                <Box sx={{py:1,px:3 }} >
                  <Typography variant='h6' sx={{fontWeight: '900'}}>
                    خرید و فروش سریع
                  </Typography>
                  <QuickBuyAndSell/>
                </Box>
              </Item>
              <Item sx={{ height: '100%', py: 1,px:3, mt: {xs:2,md:4} }}><Box sx={{ p: 1 }}><Typography variant='h6' sx={{ fontWeight: '900' }}>ارزش کل دارایی شما</Typography><Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 0, justifyContent: { xs: 'center', md: 'space-between' }, alignItems: 'center' }}><Box sx={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'center', gap: 1, flexGrow: 1, minWidth: { xs: '100%', sm: 300, md: 220 }, maxWidth: 400 }}><Typography noWrap>تومان</Typography><Divider sx={{ borderStyle: 'dashed', borderColor: '#000', height: 2 }} /><Typography noWrap sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{Number(toman).toLocaleString()}</Typography><Typography noWrap>تتر</Typography><Divider sx={{ borderStyle: 'dashed', borderColor: '#000', height: 2 }} /><Typography noWrap sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{Number(tether).toLocaleString()}</Typography></Box><Box sx={{ flexGrow: 1, minWidth: { xs: '100%', sm: 250, md: '40%' },mr:{xs:0,xl:4}, textAlign: { xs: 'center', sm: 'center' } }}><Typography textAlign='center' noWrap>کیف پول شما خالی است</Typography><Button fullWidth variant="contained" sx={{ fontSize: 19, p: 0, height: 'fit-content', mt: 1 }}>خرید</Button></Box><Box sx={{ flexGrow: 1, width:"fit-content", display: 'flex', justifyContent:{xs:'center',md:'center',xl:'flex-end'} }}><DualProgress size={size} tether={tether} toman={toman} rate={rate} /></Box></Box></Box></Item>
            </Grid>
            <Grid item size={{xs: 12,sm:12,md:12 ,lg:4}} sx={{ height:'100%', alignContent: 'end'}}>
                <TetherChartDash />
            </Grid>
            <Grid item size={{xs: 12,sm: 12, md: 12, lg:12}} sx={{pl:0, mt: 3}}>
              <Grid container spacing={2}>
                <AddsMaster/>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Dashboard;
