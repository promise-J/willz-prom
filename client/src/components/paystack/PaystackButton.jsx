import React, { useState } from 'react';
import ApiSetup from '../../utils/ApiSetup';
import { PaystackButton } from "react-paystack"

const PaystackComponent = ({data:  {email, amount, metadata}, handleSubmit}) => {
  const [loading, setLoading] = useState(false);
  const api = ApiSetup()


  const componentProps = {
    email,
    amount: amount || 3000,
    metadata: metadata,
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
    text: "Pay Now",
    onSuccess: (response) =>{
        const redirect_url = response?.redirecturl
        if(response.status == 'success'){
          console.log({response})
            handleSubmit(response)
            // window.location.href = redirect_url
        } 
    },
    onClose: () => alert("Wait! Don't leave :("),
  }

  return (
    <PaystackButton className='bg-blue-500 text-white py-2 px-4 rounded-lg' {...componentProps} />
  );
};

export default PaystackComponent;