import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ApiSetup from "../utils/ApiSetup";
import { useModal } from "../context/ModalContext";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useVtu } from "../context/VtuContext";

const PaystackCallBack = () => {
  const api = ApiSetup();
  const navigate = useNavigate()
  const { userInfo } = useAuth();
  const { setTransactionData } = useVtu();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const trxref = searchParams.get("trxref");
  const reference = searchParams.get("reference");

  useEffect(() => {

    async function verifyPayment() {
    //   setAppLoading(true)
      const res = await axios.get(`https://api.paystack.co/transaction/verify/${trxref}`, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_PAYSTACK_SECRET_KEY}`,
        },
      });
    //   setAppLoading(false)

    const metadata = res?.data?.data?.metadata

    const trxData = {
      userId: userInfo?._id,
      type: "wallet",
      amount: metadata?.amount,
      description: "Fund wallet",
      trxref: res?.data?.data?.id.toString()+"-id",
      transaction: reference,
      recipient: res?.data?.data?.customer?.email,
      status: "success",
    };


      console.log({ res: res?.data, trxData });

      if(res?.data?.data?.status == 'success'){
          setTransactionData(trxData)
          return navigate('/dashboard?fundwallet=yes')
        // const fundRes = await axios.put('https://app-sar.onrender.com/api/users/fund-account', {headers: {
        //   'Authorization': `Bearer ${token}`,
        //   'Content-Type': 'application/json'
        // }}, trxData)
        // .put('users/fund-account', trxData)

        // console.log({fundRes: fundRes?.data})
        // if(fundRes?.data?.success){
        //   return navigate('/dashboard')
        // }else{
        //   toast.error(fundRes?.data?.data?.error)
        //   return navigate('/dashboard')
        // }
      }else{
        return toast.error("We couldn't validate your payment. Please try again later.")
      }
    }
    if(token){
      verifyPayment();
    }
  }, [searchParams, userInfo, token]);

  return (
    <div>
      <div className="h-[100vh] flex justify-center items-center">
        <h1 className="text-3xl animate-ping">Please wait...</h1>
      </div>
    </div>
  );
};

export default PaystackCallBack;
