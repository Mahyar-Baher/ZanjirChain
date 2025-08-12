import { useState, useEffect, Suspense, lazy } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Grid, CircularProgress } from '@mui/material';
import WarningsBox from '../components/warningbox';

// Lazy load components
const PasswordForm = lazy(() => import('../components/PasswordForm'));
const GoogleAuthForm = lazy(() => import('../components/GoogleAuthForm'));

const Password = () => {
  const location = useLocation();
  const phone = location.state?.phone;
  const [isGoogleAuthVerified, setIsGoogleAuthVerified] = useState(false);

  useEffect(() => {
    setIsGoogleAuthVerified(false);
  }, []);

  const handleGoogleAuthSuccess = () => {
    setIsGoogleAuthVerified(true);
  };

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        bgcolor: (theme) => theme.palette.background.default,
      }}
    >
      <Grid container sx={{ flex: 1, m: 0, flexDirection: { xs: 'column-reverse', md: 'row' } }}>
        <Grid item size={{ xs: 12, md: 5 }}>
          <WarningsBox />
        </Grid>

        <Grid
          item
          size={{ xs: 12, md: 7 }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
            p: { xs: 2, md: 5 },
          }}
        >
          <Suspense fallback={<CircularProgress />}>
            {isGoogleAuthVerified ? (
              <PasswordForm phone={phone} />
            ) : (
              <GoogleAuthForm phone={phone} onSuccess={handleGoogleAuthSuccess} />
            )}
          </Suspense>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Password;