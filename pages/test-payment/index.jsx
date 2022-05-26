import PaymentButton from '../../components/payment-button/paymentButton';
import Layout from '../../components/layout';
import { toast } from 'react-toastify';
import CryptoPaymentButton from '../../components/payment-button/cryptoPayment';
const Sell = () => {
 
 

  const userData = {
    name: 'Sudipta Sarkar',
    email: 'sudipta.sarkar4545@gmail.com',
    contact: '1234567890',
    address: 'KOL',
    amount: 500,

  };


  const onPayClick = (responseData) => {
    console.log(responseData)

    if (responseData.error) {
      toast.error(responseData.error.code)
    }    
  };

  return (
    <Layout title="Payment Page">

      <div style={{marginTop:'150px', marginBottom:'20px'}} className="d-flex align-items-center justify-content-center">
               
         <PaymentButton userData={userData} paymentResponse={onPayClick}></PaymentButton>
      </div>     

      <div style={{marginTop:'20px', marginBottom:'300px'}} className="d-flex align-items-center justify-content-center">
               
         <CryptoPaymentButton userData={userData} paymentResponse={onPayClick} buttonText='Crypto Payment' btnClass='btn-success'> </CryptoPaymentButton>
      </div>  
    </Layout>  
  );
};

export default Sell;
