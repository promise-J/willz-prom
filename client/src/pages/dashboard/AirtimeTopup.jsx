import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import PaystackButton from "../../components/paystack/PaystackButton";
import { useAuth } from "../../context/AuthContext";
import ApiSetup from "../../utils/ApiSetup";
import { useModal } from "../../context/ModalContext";
import { useVtu } from "../../context/VtuContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const AirtimeTopup = () => {
  const { userInfo } = useAuth();
  const { setAppLoading } = useModal();
  const [selectedProvider, setSelectedProvider] = useState("");
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const api = ApiSetup();

  const handleSubmit = async () => {
    try {
      // const res = await purchaseAirtime({
      //   phone,
      //   network: selectedProvider,
      //   amount,
      //   metadata,
      // });
      const payload = {
        mobile_number: phone,
        network: handleNetworkIdConvert(),
        amount,
      }
      setAppLoading(true)
      const res = await api.post("vtu/airtime", payload);
      console.log(res.data,'the airtime ')
      setAppLoading(false)

      if (!res?.data?.success) {
        return toast.message("An error occurred while purchasing airtime");
      }

      setPhone('')
      setSelectedProvider('')
      setAmount('')
      toast.success("Airtime purchased successfully");

    } catch (error) {
      console.log("error from transaction", error);
    }
  };

  function handleNetworkIdConvert(){
    if(selectedProvider == 'MTN'){
      return '1'
    }else if(selectedProvider == 'GLO'){
      return '2'
    }else if(selectedProvider == 'AIRTEL'){
      return '4'
    }else if(selectedProvider == '9MOBILE'){
      return '3'
    }
    return '0'
  }

  return (
    <Container>
      <h1>Purchase Airtime</h1>
      <div className="shadow-lg w-full md:w-2/3 mx-auto mt-5 pb-5 py-2 px-1 md:px-3 flex flex-col gap-4 outline-none">
        <div className="py-1 flex justify-between items-center">
          {selectedProvider && (
            <img
              className="w-[50px] h-[50px] rounded-full border object-contain"
              src={`/images/${selectedProvider}-logo.png`}
              alt={`${selectedProvider}-logo`}
            />
          )}
        </div>
        <select
          onChange={(e) => setSelectedProvider(e.target.value)}
          name=""
          id=""
          className="py-3 px-2 w-full border border-gray-300 rounded-lg"
        >

          <option value="">Select a service provider</option>
          <option value="MTN">MTN</option>
          <option value="GLO">GLO</option>
          <option value="AIRTEL">AIRTEL</option>
          <option value="9-MOBILE">9 MOBILE</option>
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
            type="text"
            placeholder="50"
            className="border w-full mt-4 py-2 px-2 outline-none"
          />
        </div>
        <div>
          {selectedProvider && amount >= 50 && phone.length == 11 && 
          (
            <>
              {
                userInfo?.balance < amount ? 
                <Link className="bg-blue-500 text-white py-2 px-4 rounded-lg" to='/dashboard/fund-wallet'>Fund Wallet</Link> : 
                <button onClick={handleSubmit} className="bg-blue-500 text-white py-2 px-4 rounded-lg">Pay Now</button>
              }
          </>
          )
          }
        </div>
      </div>
    </Container>
  );
};

export default AirtimeTopup;
