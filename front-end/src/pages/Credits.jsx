import { styled } from '@mui/material/styles';
import {
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import SidebarChildrenMenu from '../components/SidebarChildrenMenu';
import CreditList from '../components/CreditList';
import ShabaNumbers from '../components/ShabaNumbers';
import Navbarbox from '../components/navbarbox';
import navItems from '../data/navItems';
import React, { useContext } from 'react';
import { ThemeContext } from '../theme/ThemeContext';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(3),
  borderRadius: 16,
  color: theme.palette.text.primary,
  boxShadow: theme.shadows[2],
}));
const Credits = () => {
//   const toman = 0;
//   const tether = 0;
//   const rate = 85000;
 const {
    accessibilityMode,
  } = useContext(ThemeContext);

  const CreditsMenu = navItems.find(item => item.label === 'مدیریت حساب');
  return (
    <Paper sx={{ minHeight: '100vh', bgcolor: (theme) => theme.palette.background.default,filter: accessibilityMode ? 'invert(1) hue-rotate(180deg)' : 'none' }}>
      <Grid container spacing={0} sx={{ height: {xs:'fit-content', md:'fit-content'},justifyContent: { xs: 'flex-end', md: 'flex-end' }, alignItems: { xs: 'flex-center', md: 'flex-start' } }}>
        <Grid item size="auto">
          <Navbarbox />
        </Grid>
        <Grid item size="grow" sx={{ p: 2, pt:4}}>
          <Grid container spacing={{ xs: 1, md: 1 }} sx={{ justifyContent: { xs: 'flex-end', md: 'flex-start' }, alignItems: { xs: 'flex-center', md: 'flex-start' } }} >
            <Grid item size={{xs: 12,sm: 12, md: 4, lg:3,xl:2}} sx={{pr:{lg:2}}}>
              <SidebarChildrenMenu childrenItems={CreditsMenu?.children || []} />
            </Grid>
            <Grid item size={{xs: 12,sm: 12, md: 8, lg:9,xl:10}}  sx={{ height: { xs: 'fit-content', lg: '100%' } }}>
              <Grid container spacing={2} direction="column" sx={{ height: '100%', pt:3}}>
                <Grid item>
                  <Item  sx={{display: 'flex', flexDirection: 'column',justifyContent: 'space-between',p: 1, px:5,backgroundColor:'rgba(0, 0, 0, 0.02)'}} className="bg-img-hexed">
                      <Typography variant="h6" fontWeight='800'>
                          مشخصات بانکی باید به نام باشد و در غیر این صورت تأیید نمی شود
                      </Typography>
                  </Item>
                </Grid>
                <Grid item>
                  <Grid container spacing={2}>
                    <Grid item size={{xs:12,md:6}}>
                      <Item sx={{display: 'flex',flexDirection: 'column',justifyContent: 'space-between',p: 0, }} className="bg-img-hexed">
                        <CreditList/>
                      </Item>
                    </Grid>
                    <Grid item size={{xs:12,md:6}}>
                      <Item sx={{display: 'flex',flexDirection: 'column',justifyContent: 'space-between',p: 0, }} className="bg-img-hexed">
                        <ShabaNumbers/>
                      </Item>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Credits;
