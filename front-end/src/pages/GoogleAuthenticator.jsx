import { Suspense, lazy } from 'react';
import { Container, Grid, CircularProgress } from '@mui/material';
import WarningsBox from '../components/warningbox';
import { useNavigate } from 'react-router-dom';

// Lazy load component
const GoogleAuthenticatorFirst = lazy(() => import('../components/GoogleAuthenticatorFirst'));

const GoogleAuthenticator = () => {
  const navigate = useNavigate();
  const phone = localStorage.getItem('phone'); // Retrieve phone from signup
  const token = localStorage.getItem('token'); // Retrieve token from signup
  if (!token || !phone) {
    console.error('Missing token or phone:', { token, phone });
    setTimeout(() => navigate('/Login'), 0);
    return;
  }

  console.log('Passing to GoogleAuthenticatorFirst:', { phone, token });

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        minHeight:'100vh',
        bgcolor: (theme) => theme.palette.background.default,
      }}
    >
      <Grid container sx={{ flex: 1, m: 0, flexDirection:'row',minHeight:'100vh', }}>
        <Grid item size={{ xs: 12, md: 4 }} display={{xs:'none',md:'flex'}}>
          <WarningsBox />
        </Grid>

        <Grid
          item
          size={{ xs: 12, md: 8 }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
            p: { xs: 1, md: 6 },
          }}
        >
          <Suspense fallback={<CircularProgress />}>
            <GoogleAuthenticatorFirst phone={phone} token={token} />
          </Suspense>
        </Grid>
        <Grid item size={{ xs: 12, md: 5 }} display={{xs:'flex',md:'none'}}>
          <WarningsBox />
        </Grid>
      </Grid>
    </Container>
  );
};

export default GoogleAuthenticator;