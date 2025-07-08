import React, { createContext, useState, useEffect, useMemo, useContext } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';

const ThemeContext = createContext();

export const useThemeContext = () => {
  return useContext(ThemeContext);
};

export const CustomThemeProvider = ({ children }) => {
  const getInitialSetting = (key, defaultValue) => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('themeSettings');
      return saved ? JSON.parse(saved)[key] ?? defaultValue : defaultValue;
    }
    return defaultValue;
  };

  const [darkMode, setDarkMode] = useState(() => getInitialSetting('darkMode', false));
  const [primaryColor, setPrimaryColor] = useState(() => getInitialSetting('primaryColor', '#7878FF'));
  const [accessibilityMode, setAccessibilityMode] = useState(() => getInitialSetting('accessibilityMode', false));
  const [persianNumbers, setPersianNumbers] = useState(() => getInitialSetting('persianNumbers', false));

  useEffect(() => {
    const settings = {
      darkMode,
      primaryColor,
      accessibilityMode,
      persianNumbers
    };
    localStorage.setItem('themeSettings', JSON.stringify(settings));
    
    // اعمال تغییرات به کل document
    if (persianNumbers) {
      document.documentElement.style.fontFamily = "'Vazir', sans-serif";
      document.documentElement.style.fontFeatureSettings = '"ss01", "tnum"';
      document.documentElement.classList.add('persian-numbers');
    } else {
      document.documentElement.style.fontFamily = '';
      document.documentElement.style.fontFeatureSettings = '';
      document.documentElement.classList.remove('persian-numbers');
    }
  }, [darkMode, primaryColor, accessibilityMode, persianNumbers]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);
  const changePrimaryColor = (color) => setPrimaryColor(color);
  const toggleAccessibilityMode = () => setAccessibilityMode(prev => !prev);
  const togglePersianNumbers = () => setPersianNumbers(prev => !prev);

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
        fontFamily: persianNumbers 
          ? '"Vazir", sans-serif'
          : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              fontFeatureSettings: persianNumbers ? '"ss01", "tnum"' : 'normal',
            },
          },
        },
      },
    });
  }, [darkMode, primaryColor, accessibilityMode, persianNumbers]);

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        primaryColor,
        changePrimaryColor,
        accessibilityMode,
        toggleAccessibilityMode,
        persianNumbers,
        togglePersianNumbers,
      }}
    >
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeContext };