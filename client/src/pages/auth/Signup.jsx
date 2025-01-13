import React, { useState } from "react";
import { FiEyeOff } from "react-icons/fi";
import { IoMailUnreadOutline } from "react-icons/io5";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import GoogleAuthComponent from "../../components/google/GoogleAuthComponent";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast";

const initialRegisterData = {
  email: '',
  username: '',
  password: ''
}


const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [registerData, setRegisterData] = useState(initialRegisterData)

  const navigate = useNavigate()

  const {signup, authError, isLoading} = useAuth()

  const handleChange = (e)=>{
    const {name, value} = e.target
    setRegisterData({...registerData, [name]: value})
  }

  const handleSignup = async()=>{
    try {
      const payload = {
        email: registerData.email,
        username: registerData.username,
        password: registerData.password
      }
      const res = await signup(payload)
      if(res?.data?.success){
        const data_response = res?.data?.data?.message
        toast.success(data_response)
        navigate('/login')
      }else{
        const error = res?.data?.data?.error ? res?.data?.data?.error : 'something went wrong'
        toast.error(error)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className="md:w-2/3 w-full md:px-2 px-4 mx-auto mt-20 p-3 shadow-lg">
        <h1 className="text-center text-2xl">Sign up now</h1>
        <div className="mt-4 relative">
          <IoMailUnreadOutline className="absolute top-2 right-3" />
          <input
            value={registerData.email}
            name="email"
            onChange={handleChange}
            type="text"
            placeholder="Enter your email"
            className="px-4 border-gray-300 border py-4 w-full h-full outline-none"
          />
        </div>
        <div className="mt-4 relative">
          {showPassword ? (
            <FiEyeOff
              className="absolute top-2 right-3"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <MdOutlineRemoveRedEye
              className="absolute top-2 right-3"
              onClick={() => setShowPassword(!showPassword)}
              size={18}
            />
          )}
          <input
          value={registerData.password}
          name="password"
          onChange={handleChange}
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="px-4 border-gray-300 border py-4 w-full h-full outline-none"
          />
          <div className="mt-4 relative">
            <FaRegUser className="absolute top-2 right-3" />
            <input
            value={registerData.username}
            name="username"
            onChange={handleChange}
              type="text"
              placeholder="Enter your username"
              className="px-4 border-gray-300 border py-4 w-full h-full outline-none"
            />
          </div>
          <div className="mt-4">
            <button onClick={handleSignup} className="bg-blue-900 text-white px-4 py-3 w-full rounded-lg">
              Sign up
            </button>
          </div>
        </div>
        <div className="mt-4 py-4 flex flex-col items-center">
          <h2>
            Already have an account?{" "}
            <Link className="text-blue-900" to="/login">
              Sign in
            </Link>
          </h2>
        </div>
        <GoogleAuthComponent />
      </div>
    </div>
  );
};

export default Signup;
