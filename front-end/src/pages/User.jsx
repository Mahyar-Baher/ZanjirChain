import { styled } from '@mui/material/styles';
import {
  Grid,
  Paper,
} from '@mui/material';
import SidebarChildrenMenu from '../components/SidebarChildrenMenu';
import UserInfoWrapper from '../components/UserInfoWrapper';
import Navbarbox from '../components/navbarbox';
import UserInLev from '../components/UserInLev';
import UserIdentity from '../components/UserIdentity';
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
const User = () => {
  const { darkMode } = useOutletContext();
//   const toman = 0;
//   const tether = 0;
//   const rate = 85000;
  const UserMenu = navItems.find(item => item.label === 'مدیریت حساب');
  return (
    <Paper sx={{ minHeight: '100vh', bgcolor: darkMode ? '#121212' : '#f5f5f5' }}>
      <Grid container spacing={0} sx={{ height: {xs:'fit-content', md:'fit-content'},justifyContent: { xs: 'flex-end', md: 'flex-end' }, alignItems: { xs: 'flex-center', md: 'flex-start' } }}>
        <Grid item size="auto">
          <Navbarbox />
        </Grid>
        <Grid item size="grow" sx={{ p: 2, pt:4}}>
          <Grid container spacing={{ xs: 1, md: 1 }} sx={{ justifyContent: { xs: 'flex-end', md: 'flex-start' }, alignItems: { xs: 'flex-center', md: 'flex-start' } }} >
            <Grid item size={{xs: 12,sm: 12, md: 4, lg:3,xl:2}} sx={{pr:{lg:2}}}>
              <SidebarChildrenMenu childrenItems={UserMenu?.children || []} />
            </Grid>
            <Grid item size={{xs:12,sm: 12,md: 4, lg:4, xl:5}} sx={{ height:{xs:'fit-content', md:'fit-content',lg: '100%'}}}>
              <Item sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' , p:0}} className='bg-img-hexed'>
                <UserInfoWrapper/>
              </Item>
              <Item sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' , p:3, mt:3}} className='bg-img-hexed'>
                <UserInLev/>
              </Item>
            </Grid>
            <Grid item size={{xs: 12,sm:6,md:12 ,lg:4}} sx={{ height:{xs:'fit-content', md:'fit-content',lg: '100%'}}}>
              <Item sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' ,p:0}} className='bg-img-hexed'>
                <UserIdentity activeStep={2}/>
              </Item>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default User;
