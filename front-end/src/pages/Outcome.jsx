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
import SidebarChildrenMenu from '../components/SidebarChildrenMenu';
import HistoryLastOutcome from '../components/HistoryLastOutcome';
import Navbarbox from '../components/navbarbox';
import navItems from '../data/navItems';
import OutcomeDepositSection from '../components/OutcomeDepositSection';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(3),
  borderRadius: 16,
  color: theme.palette.text.primary,
  boxShadow: theme.shadows[2],
}));

const Outcome = () => {
  const walletMenu = navItems.find(item => item.label === 'کیف پول');
  return (
    <Paper sx={{ minHeight: '100vh',  bgcolor: (theme) => theme.palette.background.default }}>
      <Grid container spacing={0} sx={{ height: {xs:'fit-content', md:'fit-content'},justifyContent: { xs: 'flex-end', md: 'flex-end' }, alignItems: { xs: 'flex-center', md: 'flex-start' } }}>
        <Grid item size="auto">
          <Navbarbox />
        </Grid>
        <Grid item size="grow" sx={{ p: 2, pt:4}}>
          <Grid container spacing={{ xs: 1, md: 1 }} sx={{ justifyContent: { xs: 'flex-end', md: 'flex-start' }, alignItems: { xs: 'flex-center', md: 'flex-start' } }} >
            <Grid item size={{xs: 12,sm: 12, md: 12, lg:2}} sx={{pr:{lg:2}}}>
              <SidebarChildrenMenu childrenItems={walletMenu?.children || []} />
            </Grid>
            <Grid item size={{xs:12,sm: 12,md: 12, lg:5.7}} sx={{ height:{xs:'fit-content', md:'fit-content',lg: '100%'}}}>
              <Item sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' , p:0}}>
                <OutcomeDepositSection/>
              </Item>
            </Grid>
            <Grid item size={{xs: 12,sm:12,md:12 ,lg:4.3}} sx={{ height:{xs:'100%', md:'100%',lg: '100%'}}}>
              <Item sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' ,p:0}} className='bg-img-hexed'>
                <Box sx={{py:3, px:2}} >
                  <Box sx={{display: 'grid',gridTemplateColumns: 'auto 1fr auto',alignItems: 'center',gap: 1,width: '100%',}}>
                    <Typography noWrap>کمترین مبلغ واریز</Typography>
                    <Divider  sx={{    borderStyle: 'dashed',   borderColor: 'rgba(0, 0, 0, 0.5)',   height: 2 }}/>
                    <Typography noWrap>400 هزار تومان</Typography>
                  </Box>
                  <Box sx={{mt:3,display: 'grid',gridTemplateColumns: 'auto 1fr auto',alignItems: 'center',gap: 1,width: '100%',}}>
                    <Typography noWrap>بیشترین مبلغ واریز</Typography>
                    <Divider  sx={{    borderStyle: 'dashed',   borderColor: 'rgba(0, 0, 0, 0.5)',   height: 2 }}/>
                    <Typography noWrap>30 میلیون تومان</Typography>
                  </Box>
                </Box>
              </Item>
              <Item sx={{height:'100%', mt:3, p:4}}>
               <Box sx={{ mt: 2}}>
                  <Typography sx={{ textAlign: 'justify',lineHeight: 2 }}>
                    کاربر گرامی، امکان افزایش موجودی کیف‌پول تومانی از طریق حساب <strong>بلوبانک</strong> برای <strong>واریز شناسه‌دار</strong> وجود ندارد. لطفاً توجه داشته باشید که اگر هنگام انتقال وجه، شناسه واریز را <strong>وارد نکنید</strong> یا آن را <strong>اشتباه وارد کنید</strong>، مبلغ به حساب شما اضافه نخواهد شد و پیگیری آن نیز امکان‌پذیر نخواهد بود.
                  </Typography>
                </Box>
              </Item>
            </Grid>
            <Grid item size={{xs: 12,sm: 12, md: 12, lg:2}} sx={{pl:0, mt: 3}}>
              
            </Grid>
            <Grid item size={{xs: 12,sm: 12, md: 12, lg:10}} sx={{pl:0, mt: 3}}>
              <Item sx={{ height: '100%',backgroundColor:'transparent', display: 'flex', flexDirection: 'row', justifyContent: 'space-between',alignItems:'center',p:1}}>
                <HistoryLastOutcome/>
              </Item>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Outcome;
