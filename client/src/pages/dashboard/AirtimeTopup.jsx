import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import PaystackButton from "../../components/paystack/PaystackButton";
import { useAuth } from "../../context/AuthContext";
import ApiSetup from "../../utils/ApiSetup";
import { useModal } from "../../context/ModalContext";
import { useVtu } from "../../context/VtuContext";
import toast from "react-hot-toast";

const AirtimeTopup = () => {
  const { userInfo } = useAuth();
  const { vtuBalance, purchaseAirtime } = useVtu();
  const { setAppLoading } = useModal();
  const [selectedProvider, setSelectedProvider] = useState("");
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const api = ApiSetup();

  const handleSubmit = async (metadata) => {
    try {
      const res = await purchaseAirtime({
        phone,
        network: selectedProvider,
        amount,
        metadata,
      });
    } catch (error) {
      console.log("error from transaction", error);
    }
  };

  return (
    <Container>
      <h1>Purchase Airtime</h1>
      <div className="shadow-lg w-full md:w-2/3 mx-auto mt-5 py-2 px-1 md:px-3 flex flex-col gap-4 outline-none">
      {amount > vtuBalance && <marquee className='text-blue-900' behavior="" direction="">Processing amount #{amount}. We are unable to attend to this amount at the moment.</marquee>}
        <div className="py-1 flex justify-between items-center">
          {selectedProvider && (
            <p className="font-bold text-lg">
              You selected: (#400) {selectedProvider}
            </p>
          )}
          {selectedProvider && (
            <img
              className="w-[50px] h-[50px] rounded-full border object-contain"
              src={`/images/${selectedProvider}-logo.png`}
              alt={`${selectedProvider}-logo`}
            />
          )}
        </div>
        <p>balance: {vtuBalance}</p>
        <select
          onChange={(e) => setSelectedProvider(e.target.value)}
          name=""
          id=""
          className="py-3 px-2 w-full border border-gray-300 rounded-lg"
        >
          <option value="">Select a service provider</option>
          <option value="mtn">MTN</option>
          <option value="glo">GLO</option>
          <option value="airtel">AIRTEL</option>
          <option value="9-mobile">9 MOBILE</option>
        </select>
        <div className="py-1 px-1 md:px-4">
          <input
            onChange={(e) => {
              const value = e.target.value
              if (typeof +e.target.value !== "number"){
                console.log(typeof e.target.value)
              };
              setPhone(e.target.value);
            }}
            type="tel"
            placeholder="09018283828"
            className="border w-full mt-4 py-2 px-2 outline-none"
          />
          <input
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            placeholder="50"
            className="border w-full mt-4 py-2 px-2 outline-none"
          />
        </div>
        <div>
          {vtuBalance > amount && selectedProvider && amount >= 50 && phone.length == 11 && (
            <PaystackButton
              handleSubmit={handleSubmit}
              data={{
                email: userInfo?.email,
                amount: amount * 100,
                metadata: { phone, amount, email: userInfo?.email },
              }}
            />
          )}
        </div>
      </div>
    </Container>
  );
};

export default AirtimeTopup;
