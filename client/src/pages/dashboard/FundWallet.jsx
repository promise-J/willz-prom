import React, { useState } from "react";
import Container from "../../components/Container";
import { useAuth } from "../../context/AuthContext";
import PaystackButton from "../../components/paystack/PaystackButton";


const FundWallet = () => {
  const {userInfo} = useAuth()
  const [amount, setAmount] = useState('');
  
  return (
    <Container>
      <div className="bg-red-300d  mt-[70px] md:w-1/2 mx-auto">
        <h1 className="text-center text-2xl md:text-3xl">Fund wallet</h1>
        <div className="flex flex-col justify-center gap-3 w-full">
          <marquee behavior="" className='my-5 text-red-500 italic font-light' direction="">Please do not leave or refresh the page while making payment as you might not be verified</marquee>
          <label htmlFor="">Enter Amount</label>
          <div className="flex items-center w-full border-2 border-grey-200 rounded-lg">
            <div className="text-white h-full p-2 rounded-lg bg-blue-900">
              <span className="text-sm">NGN(₦)</span>
            </div>
            <input
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              type="text"
              className="w-full py-2 px-4 rounded-lg"
              placeholder="100"
            />
          </div>
        </div>
        {
          amount >= 100 &&
        <PaystackButton
          handleSubmit={() => {}}
          data={{
            email: userInfo?.email,
            amount: amount * 100,
            metadata: { amount, email: userInfo?.email },
          }}
        />
        }
        {/* <button className='bg-blue-900 text-white font-bold w-full py-3 rounded-lg mt-10'>PROCEED TO PAY</button> */}
      </div>
    </Container>
  );
};

export default FundWallet;
