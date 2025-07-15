import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1a652a', contrastText: '#fff' },
    background: { default: '#000', paper: '#abae89' },
    text: { primary: '#abae89', secondary: '#abae89' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          borderRadius: 8,
          padding: '10px 24px',
          backgroundColor: '#1a652a',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#1f8f66',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1a652a',
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#1a652a', contrastText: '#000' },
    background: { default: '#121212', paper: '#1e1e1e' },
    text: { primary: '#eee', secondary: '#aaa' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          borderRadius: 8,
          padding: '10px 24px',
          backgroundColor: '#1a652a',
          color: '#000',
          '&:hover': {
            backgroundColor: '#1f8f66',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1a652a',
        },
      },
    },
  },
});
