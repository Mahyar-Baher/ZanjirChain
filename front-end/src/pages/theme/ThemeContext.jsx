import React, { createContext, useState, useMemo, useContext } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export const CustomThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [primaryColor, setPrimaryColor] = useState('#7878FF');
  const [accessibilityMode, setAccessibilityMode] = useState(false);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  const changePrimaryColor = (color) => setPrimaryColor(color);
  const toggleAccessibilityMode = () => setAccessibilityMode((prev) => !prev);

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode: darkMode ? 'dark' : 'light',
        primary: { main: primaryColor },
        background: { default: darkMode ? '#121212' : '#f5f5f5' },
      },
      typography: { fontSize: accessibilityMode ? 16 : 14 },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              ...(accessibilityMode && {
                filter: 'invert(1) hue-rotate(180deg)',
                transition: 'filter 0.3s ease',
              }),
            },
          },
        },
      },
    });
  }, [darkMode, primaryColor, accessibilityMode]);

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        primaryColor,
        changePrimaryColor,
        accessibilityMode,
        toggleAccessibilityMode,
      }}
    >
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeContext };
