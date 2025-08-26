import React, { useState } from 'react';
import { Box, Stack } from '@mui/material';
import DepositTabs from './DepositTabs';
import PaymentMethodTabs from './PaymentMethodTabs';
import MethodContent from './MethodContent';

const tomanMethods = ['درگاه پرداخت', 'واریز آفلاین'];
const cryptoMethods = [];

const IncomeDepositSection = () => {
  const [activeTab, setActiveTab] = useState('toman');
  const [activeMethod, setActiveMethod] = useState(0);
  const methods = activeTab === 'toman' ? tomanMethods : cryptoMethods;

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 3 }}>
      <DepositTabs activeTab={activeTab} setActiveTab={setActiveTab} setActiveMethod={setActiveMethod} />
      <Box sx={{ p: {xs: 0 ,md: 2}, pb: 0 }}>
        <PaymentMethodTabs methods={methods} activeMethod={activeMethod} setActiveMethod={setActiveMethod} />
        <Box sx={{ width: '100%', p: {xs: 0, md: 2}, border: '0px solid #ccc', borderRadius: 2, minHeight: 400, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <MethodContent activeMethod={activeMethod} isCrypto={activeTab === 'crypto'} />
        </Box>
      </Box>
    </Box>
  );
};

export default IncomeDepositSection;