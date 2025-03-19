import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ApiSetup from "../utils/ApiSetup";
import { useModal } from "../context/ModalContext";
import { toast } from "react-hot-toast";
import axios from "axios";

const PaystackCallBack = () => {
  const api = ApiSetup();
  const navigate = useNavigate()
  const { setAppLoading } = useModal();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const trxref = searchParams.get("trxref");
    async function verifyPayment() {
    //   setAppLoading(true)
      const res = await axios.get(`https://api.paystack.co/transaction/verify/${trxref}`, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_PAYSTACK_SECRET_KEY}`,
        },
      });
    //   setAppLoading(false)
      console.log({ res: res?.data });
      if(res?.data?.data?.status == 'success'){
        const fundRes = await api.put('users/fund-account', {amount: res?.data?.data?.amount/100})
        console.log(fundRes?.data)
        if(fundRes?.data?.success){
          toast.success('Account funded successfully')
          return navigate('/dashboard')
        }
      }else{
        return toast.error("We couldn't validate your payment. Please try again later.")
      }
    }
    verifyPayment();
  }, [searchParams]);

  return (
    <div>
      <div className="h-[100vh] flex justify-center items-center">
        <h1 className="text-3xl animate-ping">Please wait...</h1>
      </div>
    </div>
  );
};

export default PaystackCallBack;
