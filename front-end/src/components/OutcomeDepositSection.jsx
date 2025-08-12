import React, { useState } from 'react';
import { Box } from '@mui/material';
import WithdrawalTabs from './WithdrawalTabs';
import CryptoMethodTabs from './CryptoMethodTabs';
import BalanceDisplay from './BalanceDisplay';
import WithdrawalForm from './WithdrawalForm';

const cryptoMethods = ['انتقال داخلی', 'شبکه TRC20', 'شبکه BEP20', 'شبکه ERC20'];
const methodKeys = ['internal_network', 'trc20', 'bep20', 'erc20'];

const WithdrawalSection = () => {
  const [tab, setTab] = useState('toman');
  const [method, setMethod] = useState(0);

  const walletData = JSON.parse(localStorage.getItem('wallet')) || {};
  const balanceToman = Number(walletData?.balance_toman || 0);
  const balanceTether = Number(walletData?.balance_tether || 0);

  return (
    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <WithdrawalTabs tab={tab} setTab={setTab} setMethod={setMethod} />
      <BalanceDisplay balanceToman={balanceToman} balanceTether={balanceTether} />
      {tab === 'crypto' && (
        <CryptoMethodTabs methods={cryptoMethods} method={method} setMethod={setMethod} />
      )}
      <Box sx={{ border: '0px solid #ccc', borderRadius: 2, p: 2, minHeight: 300 }}>
        <WithdrawalForm
          activeMethod={method}
          isCrypto={tab === 'crypto'}
          balanceToman={balanceToman}
          balanceTether={balanceTether}
          methodKeys={methodKeys}
        />
      </Box>
    </Box>
  );
};

export default WithdrawalSection;