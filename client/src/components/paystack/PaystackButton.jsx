import React, { useState } from 'react';
import ApiSetup from '../../utils/ApiSetup';
import { PaystackButton } from "react-paystack"

const PaystackComponent = ({data:  {email, amount, metadata}, handleSubmit}) => {
  const api = ApiSetup()


  const componentProps = {
    email,
    amount: amount || 0,
    metadata: metadata,
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
    text: "Fund Account",
    onSuccess: (response) =>{
        const redirect_url = response?.redirecturl
        if(response.status == 'success' && redirect_url){
          console.log(response, redirect_url)
            // handleSubmit(response)
            const urlWithToken = new URL(redirect_url, window.location.href);
            urlWithToken.searchParams.append("payment", 'appser');
            window.location.href = urlWithToken.toString();

            // window.location.href = redirect_url
        }else{
          console.log('something went wrong')
        }
    },
    onClose: () => alert("Wait! Don't leave :("),
    onerror: ()=> console.log('error is here')
  }

  return (
    <PaystackButton className='bg-blue-900 text-white font-bold w-full py-3 rounded-lg mt-10' {...componentProps} />
  );
};

export default PaystackComponent;