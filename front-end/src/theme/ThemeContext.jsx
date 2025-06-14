import React, { createContext, useState, useMemo, useContext, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';

const ThemeContext = createContext();

export const useThemeContext = () => {
  return useContext(ThemeContext);
};

export const CustomThemeProvider = ({ children }) => {
  // خواندن مقدار اولیه از localStorage یا مقدار پیش‌فرض
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true' ? true : false;
  });

  const [primaryColor, setPrimaryColor] = useState('#7878FF');

  const [accessibilityMode, setAccessibilityMode] = useState(() => {
    const saved = localStorage.getItem('accessibilityMode');
    return saved === 'true' ? true : false;
  });

  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  const changePrimaryColor = (color) => setPrimaryColor(color);
  const toggleAccessibilityMode = () => setAccessibilityMode((prev) => !prev);

  // ذخیره تغییرات در localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('accessibilityMode', accessibilityMode);
  }, [accessibilityMode]);

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode: darkMode ? 'dark' : 'light',
        primary: { main: primaryColor },
        background: {
          default: darkMode ? '#121212' : '#f5f5f5',
        },
      },
      typography: {
        fontSize: accessibilityMode ? 16 : 14,
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
