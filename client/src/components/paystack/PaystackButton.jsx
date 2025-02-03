import React, { useState } from 'react';
import axios from 'axios';
import ApiSetup from '../../utils/ApiSetup';
import { toast } from 'react-hot-toast';
import { PaystackButton } from "react-paystack"

const PaystackComponent = ({data:  {email, amount} }) => {
  const [loading, setLoading] = useState(false);
  const api = ApiSetup()


  const componentProps = {
    email,
    amount,
    metadata: {
      name: 'promise',
      phone: '0918382938',
    },
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
    text: "Pay Now",
    onSuccess: (response) =>{
        const redirect_url = response?.redirecturl
        if(response.message == 'Approved'){
            window.location.href = redirect_url
        } 
    },
    onClose: () => alert("Wait! Don't leave :("),
  }

//   const initiatePayment = async () => {
//     setLoading(true);
//     console.log({email, amount})
//     try {
//       // Request a payment link from your backend
//       const response = await api.post('/paystack/create-payment-link', {
//         email,
//         amount,
//       });
//       const payment_link = response?.data?.data?.message
//       if(!payment_link){
//         return toast.error('Something went wrong initializing your payment. Please try again later.')
//       }
//       return window.location.href = payment_link;

//       // Redirect the user to Paystack's payment page
//     } catch (error) {
//       console.error('Error initiating payment:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

  return (
    <PaystackButton className='bg-blue-500 text-white py-2 px-4 rounded-lg' {...componentProps} />
    // <button className='border-gray-100 border-[1px] px-4 py-2 bg-blue-500 text-white rounded-lg' onClick={initiatePayment} disabled={loading}>
    //   {loading ? 'Processing...' : 'Pay Now'}
    // </button>
  );
};

export default PaystackComponent;