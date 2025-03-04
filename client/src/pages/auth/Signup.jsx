import React, { useEffect, useState } from "react";
import { FiEyeOff } from "react-icons/fi";
import { IoMailUnreadOutline } from "react-icons/io5";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { AiOutlineCloseCircle } from "react-icons/ai"
import { AiOutlineCheckCircle } from "react-icons/ai"
import { FaRegUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import GoogleAuthComponent from "../../components/google/GoogleAuthComponent";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast";
import { useModal } from "../../context/ModalContext";
import ApiSetup from "../../utils/ApiSetup";
import Select from 'react-select';
import { checkPasswordStrength } from "../../validations";


const initialRegisterData = {
  email: "",
  username: "",
  password: "",
  first_name: "",
  last_name: "",
  c_password: "",
};

const Signup = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ];

  
  const [showPassword, setShowPassword] = useState(false);
  const [registerData, setRegisterData] = useState(initialRegisterData);
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [subCategories, setSubCategories] = useState([])
  const [selectedSubCategories, setSelectedSubCategories] = useState([])
  const [passwordStrength, setPasswordStrength] = useState({
    minLength: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
    isStrong: false
  });
  
  const api = ApiSetup()

  const navigate = useNavigate();

  const { signup, setUserType, userType, isLoading } = useAuth();
  const { setAppLoading } = useModal();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name=='password'){
      const result = checkPasswordStrength(value);
      setPasswordStrength(result);
    }
    console.log('marry')
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleSignup = async () => {
    try {
      const payload = {
        email: registerData.email,
        username: registerData.username,
        password: registerData.password,
        first_name: registerData.first_name,
        last_name: registerData.last_name,
      };
      if(!passwordStrength.isStrong){
        return toast.error('Please, enter a strong password', {position: "top-right"})
      }
      if(registerData?.password != registerData?.c_password){
        return toast.error('Password and confirm password must match', {position: 'top-right'})
      }

      setAppLoading(true);
      const res = await signup(payload);
      setAppLoading(false);
      setUserType('')
      if (res?.data?.success) {
        const data_response = res?.data?.data?.message;
        toast.success(data_response, {position: 'top-right'});
        navigate(`/registration?email=${registerData?.email}`);
      } else {
        const error = res?.data?.data?.error
          ? res?.data?.data?.error
          : "something went wrong";
        toast.error(error, {position: 'top-right'});
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    async function fetchCategories(){
      try {
        const res = await api.get('categories/category')
        setCategories(res?.data?.data?.message)
      } catch (error) {
        
      }
    }
    fetchCategories()
  },[])

  function handleSelectedCategory(e){
    const {value} = e.target
    setSelectedCategory(value)
    const selectedCat = categories.find(cat=> cat._id == value)
    setSelectedSubCategories(selectedCat.categories)
  }

  const handleSubcategoryChange = (e) => {
    setSelectedOptions(e.value); // Update selected option state
    console.log('Selected Option:', e.value);
  };

  const handleChangeSubCategory = (event) => {
    const options = event.target.options;
    const values = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        values.push(options[i].value);
      }
    }
    setSelectedSubCategories(values);
  };


  return (
    <div>
      <div className="md:w-1/3 w-full md:px-2 px-4 mx-auto mt-20 p-3 shadow-lg">
        <h1 className="text-center text-2xl">Sign up now</h1>
        <div className="mt-4 relative rounded-lg">
          <IoMailUnreadOutline className="absolute top-2 right-3" />
          <input
            value={registerData.email}
            name="email"
            onChange={handleChange}
            type="text"
            placeholder="Enter your email"
            className="px-4 border-gray-300 rounded-lg border py-4 w-full h-full outline-none"
          />
        </div>
        <div className="mt-4 relative rounded-lg">
          <FaRegUser className="absolute top-2 right-3" />
          <input
            value={registerData.first_name}
            name="first_name"
            onChange={handleChange}
            type="text"
            placeholder="Enter your first name"
            className="px-4 border-gray-300 rounded-lg border py-4 w-full h-full outline-none"
          />
        </div>
        <div className="mt-4 relative rounded-lg">
          <FaRegUser className="absolute top-2 right-3" />
          <input
            value={registerData.last_name}
            name="last_name"
            onChange={handleChange}
            type="text"
            placeholder="Enter your last name"
            className="px-4 border-gray-300 rounded-lg border py-4 w-full h-full outline-none"
          />
        </div>
        <div className="mt-4 relative rounded-lg">
          <FaRegUser className="absolute top-2 right-3" />
          <input
            value={registerData.username}
            name="username"
            onChange={handleChange}
            type="text"
            placeholder="Enter your username"
            className="px-4 border-gray-300 border rounded-lg py-4 w-full h-full outline-none"
          />
        </div>
        <div className="mt-4 relative rounded-lg">
          {showPassword ? (
            <FiEyeOff
              className="absolute top-4 right-3"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <MdOutlineRemoveRedEye
              className="absolute top-4 right-3"
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
            className="px-4 border-gray-300 rounded-lg border py-4 w-full h-full outline-none"
          />
        </div>
        {/* Password checker starts */}
        { registerData?.password &&
        <div style={{ marginTop: '20px' }}>
        <p className="flex items-center my-1">
          {passwordStrength.minLength ? (
            <AiOutlineCheckCircle style={{ color: 'green', marginRight: '10px' }} />
          ) : (
            <AiOutlineCloseCircle style={{ color: 'red', marginRight: '10px' }} />
          )}
          <span>Minimum 8 characters</span>
        </p>
        <p className="flex items-center my-1">
          {passwordStrength.uppercase ? (
            <AiOutlineCheckCircle style={{ color: 'green', marginRight: '10px' }} />
          ) : (
            <AiOutlineCloseCircle style={{ color: 'red', marginRight: '10px' }} />
          )}
          At least one uppercase letter
        </p>
        <p className="flex items-center my-1">
          {passwordStrength.lowercase ? (
            <AiOutlineCheckCircle style={{ color: 'green', marginRight: '10px' }} />
          ) : (
            <AiOutlineCloseCircle style={{ color: 'red', marginRight: '10px' }} />
          )}
          At least one lowercase letter
        </p>
        <p className="flex items-center my-1">
          {passwordStrength.number ? (
            <AiOutlineCheckCircle style={{ color: 'green', marginRight: '10px' }} />
          ) : (
            <AiOutlineCloseCircle style={{ color: 'red', marginRight: '10px' }} />
          )}
          At least one number
        </p>
        <p className="flex items-center my-1">
          {passwordStrength.specialChar ? (
            <AiOutlineCheckCircle style={{ color: 'green', marginRight: '10px' }} />
          ) : (
            <AiOutlineCloseCircle style={{ color: 'red', marginRight: '10px' }} />
          )}
          At least one special character
        </p>
        </div>
        }
        {/* Password checker ends */}
        <div className="mt-4 relative rounded-lg">
          {showPassword ? (
            <FiEyeOff
              className="absolute top-4 right-3"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <MdOutlineRemoveRedEye
              className="absolute top-4 right-3"
              onClick={() => setShowPassword(!showPassword)}
              size={18}
            />
          )}
          <input
            value={registerData.c_password}
            name="c_password"
            onChange={handleChange}
            type={showPassword ? "text" : "password"}
            placeholder="Confirm your password"
            className="px-4 border-gray-300 rounded-lg border py-4 w-full h-full outline-none"
          />
        </div>
        <div className="mt-4">
          <button
            onClick={handleSignup}
            className="bg-blue-900 text-white px-4 py-3 w-full rounded-lg"
          >
            {isLoading ? "Loading..." : "Sign up"}
          </button>
        </div>
      </div>
      <div className="mt-4 py-4 flex flex-col items-center">
        <h2>
          Already have an account?{" "}
          <Link className="text-green-600" to="/login">
            Sign in
          </Link>
        </h2>
      </div>
      <GoogleAuthComponent />
    </div>
  );
};

export default Signup;
