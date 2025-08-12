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
import Navbarbox from '../components/navbarbox';
import navItems from '../data/navItems';
import CompleteIdenity from '../components/CompleteIdenity';
import QuickBuyAndSell from '../components/QuickBuyAndSell';
import TetherChartDash from '../components/TetherChartDash';
import AddsMaster from '../components/AddsMaster';
import AllPrice from '../components/AllPrice';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(3),
  borderRadius: 16,
  color: theme.palette.text.primary,
  boxShadow: theme.shadows[2],
}));


const Dashboard = ({ hideNavBox = false }) => {
  const DashboardMenu = navItems.find(item => item.label === 'کیف پول');
  return (
    <Paper sx={{ minHeight: '100vh',pb:6,  bgcolor: (theme) => theme.palette.background.default }}>
      <Grid container spacing={0} sx={{ height: {xs:'fit-content', md:'fit-content'},justifyContent: { xs: 'flex-end', md: 'flex-end' }, alignItems: { xs: 'flex-center', md: 'flex-start' } }}>
        <Grid item size="auto">
          {!hideNavBox && (
            <Navbarbox />
          )}
        </Grid>
        <Grid item size="grow" sx={{ p: 2, pt:4}}>
          <Grid container spacing={{ xs: 1, md: 2 }} sx={{ justifyContent: { xs: 'flex-end', md: 'flex-start' }, alignItems: { xs: 'flex-center', md: 'flex-start' } }} >
            <Grid item size={{xs: 12,sm: 12, md: 12, lg:12}} sx={{pr:{lg:2}}}>
              <Box sx={{display: 'grid',gridTemplateColumns: 'auto 1fr auto',alignItems: 'center',gap: 1,width: '100%',py:2}}>
                <Typography wrap sx={{fontWeight: '900'}}>سطح ارتقای احراز هویت</Typography>
                <Divider  sx={{    borderStyle: 'dashed',   borderColor: 'rgba(0, 0, 0, 0.5)',   height: 2 }}/>
                <Typography fontSize='12px' color="text.secondary" wrap>مرحله به مرحله پیش بروید تا خدمات بهتری را دریافت نمایید</Typography>
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
              <Item sx={{ height: '100%', py: 1,px:3, mt: {xs:2,md:1} }}>
                <AllPrice/>
              </Item>
            </Grid>
            <Grid item size={{xs: 12,sm:12,md:12 ,lg:4}} sx={{ height:'100%', alignContent: 'end'}}>
                <TetherChartDash />
            </Grid>
            <Grid item size={{xs: 12,sm: 12, md: 12, lg:12}} sx={{pl:0}}>
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
