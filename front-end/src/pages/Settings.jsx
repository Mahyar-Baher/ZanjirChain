import React, { useContext } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Grid,
  Paper,
} from '@mui/material';
import SidebarChildrenMenu from '../components/SidebarChildrenMenu';
import MarketSettings from '../components/MarketSettings';
import MessagesSetting from '../components/MessagesSetting';
import ThemeSettings from '../components/ThemeSettings';
import Navbarbox from '../components/navbarbox';
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

const Settings = () => {
  const {
    accessibilityMode,
  } = useContext(ThemeContext);

  const SettingsMenu = navItems.find(item => item.label === 'مدیریت حساب');

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
        <Grid item size="auto">
          <Navbarbox />
        </Grid>
        <Grid item size="grow" sx={{ p: 2, pt: 4 }}>
          <Grid container spacing={{ xs: 1, md: 1 }} sx={{ justifyContent: { xs: 'flex-end', md: 'flex-start' }, alignItems: { xs: 'center', md: 'flex-start' } }}>
            <Grid item size={{ xs: 12, sm: 12, md: 4, lg: 3, xl: 2 }} sx={{ pr: { lg: 2 } }}>
              <SidebarChildrenMenu childrenItems={SettingsMenu?.children || []} />
            </Grid>
            <Grid item size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 5 }} sx={{ height: { xs: 'fit-content', md: 'fit-content', lg: '100%' },pt:3 }}>
              <Item sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 0 }} className='bg-img-hexed'>
                <MarketSettings />
              </Item>
              <Item sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 3, mt: 3 }} className='bg-img-hexed'>
                <MessagesSetting />
              </Item>
            </Grid>
            <Grid item size={{ xs: 12, sm: 6, md: 12, lg: 4 }} sx={{ height: { xs: 'fit-content', md: 'fit-content', lg: '100%' },pt:3 }}>
              <Item sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 0 }} className='bg-img-hexed'>
                <ThemeSettings />
              </Item>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Settings;