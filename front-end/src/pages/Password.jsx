import { useLocation } from 'react-router-dom';
import { Container, Grid, CircularProgress, Box } from '@mui/material';
import WarningsBox from '../components/warningbox';
import { Suspense, lazy } from 'react';

// Lazy load PasswordForm
const PasswordForm = lazy(() => import('../components/PasswordForm'));

const Password = () => {
  const location = useLocation();
  const phone = location.state?.phone;

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        bgcolor: (theme) => theme.palette.background.default,
        overflow: 'auto',
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
            justifyContent: 'start',
            p: { xs: 2, md: 5 },
            py: { xs: 4, md: 5 },
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: { xs: '100%', md: 500 },
              px: { xs: 0, sm: 2 },
            }}
          >
            <Suspense
              fallback={
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '200px',
                  }}
                >
                  <CircularProgress />
                </div>
              }
            >
              <PasswordForm phone={phone} />
            </Suspense>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Password;
