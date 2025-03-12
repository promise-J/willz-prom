import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast";

const VerifyEmail = () => {
  const { verifyEmail } = useAuth();
  const location = useLocation();
  const navigate = useNavigate()
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");
  const token = localStorage.getItem('app-ser-token')

    useEffect(()=>{
        if(token){
          navigate('/dashboard')
        }
      },[token])


  const handleVerifyEmail = async () => {
    try {
      const payload = { email };
      const res = await verifyEmail(payload);
      if (res?.data?.success) {
        const message = res?.data?.data?.message;
        toast.success(message)
        navigate('/login')
      } else {
        const error = res?.data?.data?.error
        toast.success(error);
        navigate('/login')
      }

    } catch (error) {
        console.log(error, "the verify email");
      console.log(error);
    }
  };
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-8">
      <h2 className="text-[55px]">Welcome to App Ser!</h2>
      <p className="text-[30px]">Verify your email</p>
      <button
        onClick={handleVerifyEmail}
        className="bg-blue-900 text-white px-5 py-2 rounded-lg"
      >
        Verify Email
      </button>
    </div>
  );
};

export default VerifyEmail;
