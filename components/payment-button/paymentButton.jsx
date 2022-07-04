import Axios from '../../utils/axios.interceptor';
const PaymentButton = ({ buttonText = 'Pay Now', userData, paymentResponse }) => {
  const makePayment = async () => {
    
    const status = await initializeRazorpay();
    if (!status) {
      console.log('Razorpay Failed to load');
      return;
    }

    let data = await Axios.post('/utilities/razorpay', {userid: '0', amount: userData.amount});
    const responseData = data.data

   // const responseData = await fetch('/api/razorpay', { method: 'POST',body: JSON.stringify({amount: userData.amount}) }).then((t) => t.json());
    
    var options = {
      key: 'rzp_test_7hUvqKUbEBiMqi',
      name: userData.name,
      currency: responseData.currency,
      amount: (responseData.amount),
      order_id: responseData.id,
      description: userData.productDescription,
      // image: "img/logo.png",
      handler: function (response) {
        paymentResponse({status: 'Success', data: response});
      },
      prefill: {
        name: userData.name,
        email: userData.email,
        contact: userData.contact
      },
      notes: {
        address: userData.address
      },
      theme: {
        color: '#FE4E0E'
      },
      modal: {
        ondismiss: function () {
            paymentResponse({status: 'Failed', error: {code: 'Payment Modal Closed'}});
        }
      }
    };

    console.log(options);

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on('payment.failed', function (response) {
       paymentResponse({status: 'Failed', error: response.error ,data: response.error});      
    });
  };

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  return (
    <div style={{display:'inline-block'}}>
      <button className="btn btn-sm btn-primary" onClick={makePayment}>
        {buttonText}
      </button>
    </div>
  );
};

export default PaymentButton;
