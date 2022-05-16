import PaymentButton from '../../components/payment-button/paymentButton';
import { useEffect, useState } from 'react';
const Sell = () => {
  const [counter, setCounter] = useState(0);

  const userData = {
    name: 'Sudipta Sarkar',
    email: 'sudipta.sarkar4545@gmail.com',
    contact: '1234567890',
    address: 'KOL',
    amount: 500,

  };


  const onPayClick = (responseData) => {
    console.log(responseData)
  };

  return (
      <>  
      <div style={{marginTop:'150px'}} className="d-flex align-items-center justify-content-center">
      <PaymentButton userData={userData} paymentResponse={onPayClick}></PaymentButton>
      </div>      
      </>  
  );
};

export default Sell;
