import React, { useContext } from 'react';
import { Box, Typography, Divider, Switch, Stack } from '@mui/material';
import { ThemeContext } from '../theme/ThemeContext';

const ThemeSettings = () => {
  const {
    darkMode,
    toggleDarkMode,
    accessibilityMode,
    toggleAccessibilityMode,
  } = useContext(ThemeContext);

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 600,
        mx: 'auto',
        p: 2,
        filter: accessibilityMode ? 'invert(1) hue-rotate(180deg)' : 'none',
        transition: 'filter 0.3s ease',
      }}
    >
      <Typography variant="h6" gutterBottom>نمایش ظاهری</Typography>
      <Stack spacing={3}>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'center', gap: 1, width: '100%' }}>
          <Typography noWrap>ظاهر تیره</Typography>
          <Divider sx={{ borderStyle: 'dashed', borderColor: 'rgba(0,0,0,0.5)', height: 2 }} />
          <Switch checked={darkMode} onChange={toggleDarkMode} color="primary" />
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'center', gap: 1, width: '100%' }}>
          <Typography noWrap>حالت نگاتیو</Typography>
          <Divider sx={{ borderStyle: 'dashed', borderColor: 'rgba(0,0,0,0.5)', height: 2 }} />
          <Switch checked={accessibilityMode} onChange={toggleAccessibilityMode} color="secondary" />
        </Box>
      </Stack>
    </Box>
  );
};

export default ThemeSettings;
