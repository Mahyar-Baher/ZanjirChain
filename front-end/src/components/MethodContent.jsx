import React from 'react';
import TomanPaymentForm from './TomanPaymentForm';
import CryptoPaymentForm from './CryptoPaymentForm';

const MethodContent = ({ activeMethod, isCrypto }) => {
  return (
    <div>
      {isCrypto ? (
        <CryptoPaymentForm activeMethod={activeMethod} />
      ) : (
        <TomanPaymentForm activeMethod={activeMethod} />
      )}
    </div>
  );
};

export default MethodContent;