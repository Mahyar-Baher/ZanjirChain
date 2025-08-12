import React from 'react';
import { Button, Stack } from '@mui/material';

const DepositTabs = ({ activeTab, setActiveTab, setActiveMethod }) => {
  return (
    <Stack direction="row" spacing={0} mt={3} sx={{ border: '1px solid #1a652a', p: 0.4 }}>
      <Button
        fullWidth
        variant={activeTab === 'toman' ? 'contained' : 'text'}
        sx={{ fontSize: 12, ml: 0.5, color: activeTab === 'toman' ? '#fff' : '#1a652a', backgroundColor: activeTab === 'toman' ? '#1a652a' : 'transparent' }}
        onClick={() => { setActiveTab('toman'); setActiveMethod(0); }}
      >
        واریز تومان
      </Button>
      <Button
        fullWidth
        variant={activeTab === 'crypto' ? 'contained' : 'text'}
        sx={{ fontSize: 12, mr: 0.5, color: activeTab === 'crypto' ? '#fff' : '#1a652a', backgroundColor: activeTab === 'crypto' ? '#1a652a' : 'transparent' }}
        onClick={() => { setActiveTab('crypto'); setActiveMethod(0); }}
      >
        واریز رمز ارز
      </Button>
    </Stack>
  );
};

export default DepositTabs;