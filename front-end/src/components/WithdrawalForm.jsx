import React from 'react';
import TomanForm from './TomanForm.jsx';
import CryptoForm from './CryptoForm.jsx';

const WithdrawalForm = ({ activeMethod, isCrypto, balanceToman, balanceTether, methodKeys }) => {
  return (
    <div>
      {isCrypto ? (
        <CryptoForm
          activeMethod={activeMethod}
          balanceTether={balanceTether}
          methodKeys={methodKeys}
        />
      ) : (
        <TomanForm balanceToman={balanceToman} />
      )}
    </div>
  );
};

export default WithdrawalForm;