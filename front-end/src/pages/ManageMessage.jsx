import { styled } from '@mui/material/styles';
import {
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import SidebarChildrenMenu from '../components/SidebarChildrenMenu';
import MessageList from '../components/MessageList';
import Navbarbox from '../components/navbarbox';
import navItems from '../data/navItems';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(3),
  borderRadius: 16,
  color: theme.palette.text.primary,
  boxShadow: theme.shadows[2],
}));
const ManageMessage = () => {
//   const toman = 0;
//   const tether = 0;
//   const rate = 85000;
  const ManageMessageMenu = navItems.find(item => item.label === 'مدیریت حساب');
  return (
    <Paper sx={{ minHeight: '100vh', bgcolor: (theme) => theme.palette.background.default }}>
      <Grid container spacing={0} sx={{ height: {xs:'fit-content', md:'fit-content'},justifyContent: { xs: 'flex-end', md: 'flex-end' }, alignItems: { xs: 'flex-center', md: 'flex-start' } }}>
        <Grid item size="auto">
          <Navbarbox />
        </Grid>
        <Grid item size="grow" sx={{ p: 2, pt:4}}>
          <Grid container spacing={{ xs: 1, md: 1 }} sx={{ justifyContent: { xs: 'flex-end', md: 'flex-start' }, alignItems: { xs: 'flex-center', md: 'flex-start' } }} >
            <Grid item size={{xs: 12,sm: 12, md: 4, lg:3,xl:2}} sx={{pr:{lg:2}}}>
              <SidebarChildrenMenu childrenItems={ManageMessageMenu?.children || []} />
            </Grid>
            <Grid item size={{xs: 12,sm: 12, md: 8, lg:9,xl:10}}  sx={{ height: { xs: 'fit-content', lg: '100%' },pt:3 }}>
              <MessageList/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ManageMessage;
