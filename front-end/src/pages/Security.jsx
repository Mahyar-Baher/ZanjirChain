import React, { useContext } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import SidebarChildrenMenu from '../components/SidebarChildrenMenu';
import Navbarbox from '../components/navbarbox';
import LoginHistory from '../components/LoginHistory';
import ManageSecurity from '../components/ManageSecurity';
import ManageLogin from '../components/ManageLogin';
import navItems from '../data/navItems';
import { ThemeContext } from '../theme/ThemeContext';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(3),
  borderRadius: 16,
  color: theme.palette.text.primary,
  boxShadow: theme.shadows[2],
}));

const Security = () => {
  const {
    accessibilityMode,
  } = useContext(ThemeContext);

  const SecurityMenu = navItems.find(item => item.label === 'مدیریت حساب');

  return (
    <Paper
      sx={{
        minHeight: '100vh',
        bgcolor: (theme) => theme.palette.background.default,
        filter: accessibilityMode ? 'invert(1) hue-rotate(180deg)' : 'none',
        transition: 'filter 0.3s ease',
      }}
    >
      <Grid container spacing={0} sx={{ height: { xs: 'fit-content', md: 'fit-content' }, justifyContent: { xs: 'flex-end', md: 'flex-end' }, alignItems: { xs: 'center', md: 'flex-start' } }}>
        <Grid item size={{xs: 12 ,md:"auto"}}>
          <Navbarbox />
        </Grid>
        <Grid item size="grow" sx={{ p: 2, pt: 4 }}>
          <Grid container spacing={{ xs: 1, md: 1 }} sx={{ justifyContent: { xs: 'flex-end', md: 'flex-start' }, alignItems: { xs: 'center', md: 'flex-start' } }}>
            <Grid item size={{ xs: 12, sm: 10, md: 12, lg: 3, xl: 2 }} sx={{ pr: { lg: 2 } }}>
              <SidebarChildrenMenu childrenItems={SecurityMenu?.children || []} />
            </Grid>
            <Grid item size={{ xs: 12, sm: 10, md: 12, lg: 4, xl: 5 }} sx={{ height: { xs: 'fit-content', md: 'fit-content', lg: '100%' }, pt:3 }}>
                <Item sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 0 }} className='bg-img-hexed'>
                    <LoginHistory/>
                </Item>
                <Item sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 3, mt: 2 }} className='bg-img-hexed'>
                <Typography>
                    درصورتی که هرکدام از حساب های شما تا 90 روز غیرفعال بماند، به صورت خودکار از نشست خود خارج خواهید شد.
                </Typography>
                </Item>
                <Item sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 3, mt: 2 }} className='bg-img-hexed'>
                    <Typography>
                        تنها شش نشست اخیر شما فعال باقی می‌مانند تا از حساب کاربری‌تان بهتر محافظت شود
                    </Typography>
                </Item>
                <Item sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 3, mt: 2 }} className='bg-img-hexed'>
                    <Typography>
                        در صورت شناسایی فعالیت مشکوک، نشست شما بلافاصله پایان می‌یابد تا از دسترسی غیرمجاز جلوگیری شود.
                    </Typography>
                </Item>
            </Grid>
            <Grid item size={{ xs: 12, sm: 10, md: 12, lg: 4 }} sx={{ height: { xs: 'fit-content', md: 'fit-content', lg: '100%' },pt:3 }}>
              {/* <Item sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 0 }} className='bg-img-hexed'>
                <ManageSecurity/>
              </Item> */}
              <Item sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 0, mt:0 }} className='bg-img-hexed'>
                <ManageLogin/>
              </Item>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Security;