import { Suspense, lazy } from 'react';
import { Container, Grid, CircularProgress } from '@mui/material';
import WarningsBox from '../components/warningbox';
import { useNavigate } from 'react-router-dom';

// Lazy load component
const GoogleAuthenticatorFirst = lazy(() => import('../components/GoogleAuthenticatorFirst'));

const GoogleAuthenticator = () => {
  const navigate = useNavigate();
  const phone = localStorage.getItem('phone');
  const token = localStorage.getItem('token');
  
  if (!token || !phone) {
    console.error('Missing token or phone:', { token, phone });
    setTimeout(() => navigate('/Login'), 0);
    return;
  }

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        bgcolor: (theme) => theme.palette.background.default,
      }}
    >
      <Grid
        container
        sx={{
          flex: 1,
          m: 0,
          display: 'flex',
          flexDirection: { xs: 'column-reverse', md: 'row' },
          minHeight: '100%',
        }}
      >
        <Grid item size={{ xs: 12, md: 5 }} sx={{ p: 0, m: 0 }}>
          <WarningsBox />
        </Grid>

        <Grid
          item
          size={{ xs: 12, md: 7 }}
          sx={{
            display: 'flex',
            alignItems: { xs: 'flex-start', md: 'center' },
            justifyContent: 'space-between',
            p: { xs: 2, md: 3 },
            py: { xs: 4, md: 5 },
          }}
        >
          <Suspense fallback={
            <div style={{ 
              width: '100%', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              minHeight: '200px'
            }}>
              <CircularProgress />
            </div>
          }>
            <GoogleAuthenticatorFirst phone={phone} token={token} />
          </Suspense>
        </Grid>
      </Grid>
    </Container>
  );
};

export default GoogleAuthenticator;