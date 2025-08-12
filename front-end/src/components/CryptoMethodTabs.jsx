import React from 'react';
import { Tabs, Tab } from '@mui/material';

const CryptoMethodTabs = ({ methods, method, setMethod }) => {
  return (
    <Tabs
      value={method}
      onChange={(_, v) => setMethod(v)}
      variant="scrollable"
      scrollButtons="auto"
      allowScrollButtonsMobile
      aria-label="methods tabs"
      sx={{
        direction: { xs: 'ltr', sm: 'rtl' },
        borderTop: '1px solid #eee',
        '& .MuiTabs-indicator': {
          backgroundColor: '#1a652a',
          top: 0,
          bottom: 'unset',
        },
        '& .Mui-selected': { color: '#1a652a !important' },
        '& .MuiTab-root': { fontSize: '12px', p: 0 },
        mb: 1,
      }}
    >
      {methods.map((m) => (
        <Tab key={m} label={m} sx={{ fontSize: 12 }} />
      ))}
    </Tabs>
  );
};

export default CryptoMethodTabs;