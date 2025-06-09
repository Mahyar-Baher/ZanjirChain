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
import TableIncomeOutcome from '../components/TableIncomeOutcome';
import Navbarbox from '../components/navbarbox';
import { useOutletContext } from 'react-router-dom';
// import navItems from '../data/navItems';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(3),
  borderRadius: 16,
  color: theme.palette.text.primary,
  boxShadow: theme.shadows[2],
}));

const History = () => {
  const { darkMode } = useOutletContext();
//   const toman = 0;
//   const tether = 0;
//   const rate = 85000;
////   const HistoryMenu = navItems.find(item => item.label === 'تاریخچه');
  return (
    <Paper sx={{ minHeight: '100vh', bgcolor: darkMode ? '#121212' : '#f5f5f5' }}>
      <Grid container spacing={0} sx={{ height: {xs:'fit-content', md:'fit-content'},justifyContent: { xs: 'flex-end', md: 'flex-end' }, alignItems: { xs: 'flex-center', md: 'flex-start' } }}>
        <Grid item size="auto">
          <Navbarbox />
        </Grid>
        <Grid item size="grow" sx={{ p: 2, pt:4}}>
          <Grid container spacing={{ xs: 1, md: 1 }} sx={{ justifyContent: { xs: 'flex-end', md: 'flex-start' }, alignItems: { xs: 'flex-center', md: 'flex-start' } }} >
            {/* <Grid item size={{xs: 12,sm: 12, md: 3, lg:2}} sx={{pr:{lg:2}}}>
              <SidebarChildrenMenu childrenItems={HistoryMenu?.children || []} />
            </Grid> */}
            <Grid item size={{xs:12,sm: 12,md: 12, lg:12}} sx={{ height:{xs:'fit-content', md:'fit-content',lg: '100%'},}}>
              <TableIncomeOutcome/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default History;
