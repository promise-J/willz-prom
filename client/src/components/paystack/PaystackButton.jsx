import React, { useState } from "react";
import ApiSetup from "../../utils/ApiSetup";
import { PaystackButton } from "react-paystack";

const PaystackComponent = ({
  data: { email, amount, metadata },
  handleSubmit,
}) => {
  const api = ApiSetup();

  const componentProps = {
    email,
    amount: amount || 3000,
    metadata: metadata,
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
    text: "Fund Account",
    onSuccess: (response) => {
      const redirect_url = response?.redirecturl;
      if (response.status == "success" && redirect_url) {
        console.log(response, redirect_url);
        // handleSubmit(response)
        window.history.replaceState(null, "", redirect_url);
      } else {
        console.log("something went wrong");
      }
    },
    onClose: () => alert("Wait! Don't leave :("),
    onerror: () => console.log("error is here"),
  };

  return (
    <PaystackButton
      className="bg-blue-500 text-white py-2 px-4 rounded-lg"
      {...componentProps}
    />
  );
};

export default PaystackComponent;
