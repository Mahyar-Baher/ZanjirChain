import React from 'react';
import { Tabs, Tab } from '@mui/material';

const PaymentMethodTabs = ({ methods, activeMethod, setActiveMethod }) => {
  if (!methods || methods.length === 0) {
    return null;
  }

  return (
    <Tabs
      value={activeMethod}
      onChange={(_, newValue) => setActiveMethod(newValue)}
      variant="fullWidth"
      sx={{
        direction: 'rtl',
        mt: 1,
        borderTop: '1px solid #eee',
        '& .MuiTabs-indicator': { backgroundColor: '#1a652a', top: 0, bottom: 'unset' },
        '& .MuiSelected': { color: '#1a652a !important' },
        '& .MuiTab-root': { fontSize: 12, p: 0 },
        mb: 0,
      }}
    >
      {methods.map((label, idx) => (
        <Tab key={idx} label={label} sx={{ fontSize: 12 }} />
      ))}
    </Tabs>
  );
};

export default PaymentMethodTabs;