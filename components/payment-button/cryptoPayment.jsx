import Web3 from "web3";
import Axios from '../../utils/axios.interceptor';
import { toast } from 'react-toastify';
const CryptoPaymentButton = ({ buttonText = 'Pay with Crypto', userData,btnClass='btn-primary', paymentResponse }) => {
    
   const inrToEth = 0
   const receiverAddress = "0xD58DBD71B1A789C01668C141E5d55C30FD4c618F"

    const getAccounts = async () => {
        try {
          return await window.ethereum.request({ method: 'eth_accounts' });
        } catch (e) {
          return [];
        }
    }
    
    const openMetamask = async () => {
        window.web3 = new Web3(window.ethereum);
        let addresses = await getAccounts();
        if (!addresses.length) {
          try {
            addresses = await window.ethereum.enable();
          } catch (e) {
            return false;
          }
        }
        console.log(addresses)
        return addresses.length ? addresses[0] : null;
    };
    
    const  getEthConversion = async() => {
        const url='https://min-api.cryptocompare.com/data/price?fsym=INR&tsyms=ETH';
        let data = await Axios.get(url);                    
        return data;
    }
    
    
    
    const makePayment = async () => {

      const data =  await getEthConversion();
      inrToEth = data.data.ETH;

      let  address = receiverAddress;
      let amount = 0.5;
      let payableEther = inrToEth * amount;

      console.log(payableEther);

      try {

        let web3 = new Web3(Web3.givenProvider);
        let sender = openMetamask();
        let publicAddress = await sender;

        console.log(publicAddress);

        const response = await web3.eth.sendTransaction({
            to: address,
            value: web3.utils.toWei(String(payableEther), 'ether'),
            from: publicAddress
          })
          if(response.transactionHash){
            //! If transaction is successful
            paymentResponse({status: 'Failed', data: response});
            toast.success(`Payment Successfully! The transaction hash is : ${response.transactionHash}`);
          }else{
            //! If transaction fails
            toast.error('Error occurred during communication with server');
            paymentResponse({status: 'Failed', error: 'error'});
          }


      } catch (error) {
        console.log(error);
        paymentResponse({status: 'Failed', error: error});
        toast.error('Error occurred during communication with server');
      }      
    }


    return (
        <div style={{display:'inline-block'}}>
          <button className={["btn btn-sm ",btnClass].join(" ")} onClick={makePayment}>
            {buttonText}
          </button>
        </div>
      );

}

export default CryptoPaymentButton;