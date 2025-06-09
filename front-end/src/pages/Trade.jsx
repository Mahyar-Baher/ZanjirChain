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
import { useOutletContext } from 'react-router-dom';
import navItems from '../data/navItems';
import EasyBuyAndSell from '../components/EasyBuyAndSell';
import TetherChartDash from '../components/TetherChartDash';
import TableBuyAndSell from '../components/TableBuyAndSell';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(3),
  borderRadius: 16,
  color: theme.palette.text.primary,
  boxShadow: theme.shadows[2],
}));

const Trade = () => {
  const { darkMode } = useOutletContext();
//   const toman = 2000000;
//   const tether = 1000;
//   const rate = 85000;
//   const size = 140;
  const TradeMenu = navItems.find(item => item.label === 'کیف پول');
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
                <Typography Wrap sx={{fontWeight: '900'}}>معامله آسان تتر</Typography>
              </Box>
            </Grid>
            <Grid item size={{xs: 12,sm:12,md:12 ,lg:8}} sx={{ height:{xs:'fit-content', md:'fit-content',lg: '100%'}}}>
              <Item sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' ,p:0}}>
                <Box sx={{py:1,px:3 }} >
                  <EasyBuyAndSell/>
                </Box>
              </Item>
            </Grid>
            <Grid item size={{xs: 12,sm:12,md:12 ,lg:4}} sx={{ height:'100%', alignContent: 'end'}}>
                <TetherChartDash hideLatestRate />
            </Grid>
            <Grid item size={{xs: 12,sm: 12, md: 12, lg:12}} sx={{pl:0, mt: 3}}>
                <TableBuyAndSell/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Trade;
