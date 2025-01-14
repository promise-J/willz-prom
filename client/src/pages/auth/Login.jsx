import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMailUnreadOutline } from "react-icons/io5";
import { FiEyeOff } from "react-icons/fi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import GoogleAuthComponent from "../../components/google/GoogleAuthComponent";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast";

const initialLoginData = {
  password: '',
  email: ''
}

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState(initialLoginData);

  const navigate = useNavigate()
  const {signin, authError, isLoading} = useAuth()

  const handleChange = (e)=>{
    const {name, value} = e.target
    setLoginData({...loginData, [name]: value})
  }

  const handleLogin = async()=>{
    try {
      const payload = {
        email: loginData.email,
        password: loginData.password
      }
      const res = await signin(payload)
      if(res?.data?.success){
        toast.success('Logged in successfully.')
        navigate('/dashboard')
      }else{
        console.log(res?.data?.data,'the login error')
        const error = res?.data?.data?.error ? res?.data?.data?.error : 'something went wrong'
        toast.error(error)
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div>
      <div className="md:w-2/3  mx-auto mt-20 p-3 shadow-lg">
        <h1 className="text-center text-2xl">Login in now</h1>
        <div className="flex flex-col gap-4 mt-10">
          <div className="mt-4 relative">
            <IoMailUnreadOutline className="absolute top-2 right-3" />
            <input
              value={loginData.email}
              name="email"
              onChange={handleChange}
              type="text"
              placeholder="Enter your email"
              className="px-4 border-gray-300 border py-4 w-full h-full outline-none"
            />
          </div>
          <div className="mt-4 relative">
            {showPassword ? <FiEyeOff 
            className="absolute top-2 right-3"
             onClick={()=> setShowPassword(!showPassword)} /> : <MdOutlineRemoveRedEye className="absolute top-2 right-3" onClick={()=> setShowPassword(!showPassword)} size={18} />}
            <input
              value={loginData.password}
              name="password"
              onChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              className="px-4 border-gray-300 border py-4 w-full h-full outline-none"
            />
          </div>
          <div className="mt-4">
            <button onClick={handleLogin} className="bg-blue-900 text-white px-4 py-3 w-full rounded-lg">
              {isLoading ? 'Loading' : 'Sign in'}
            </button>
          </div>
        </div>
        <div className="mt-4 py-4 flex flex-col items-center">
          <h2>
            Dont have an account yet?{" "}
            <Link className="text-blue-900" to="/sign-up">
              Sign up
            </Link>
          </h2>
        </div>
        <GoogleAuthComponent />
      </div>
    </div>
  );
};

export default Login;
