import { createContext, useContext, useEffect, useState } from "react";
import ApiSetup from "../utils/ApiSetup";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const route = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [authError, setAuthError] = useState("");
  const token = localStorage.getItem("app-ser-token");

  const [email, setEmail] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("male");
  const [phoneNo, setPhoneNo] = useState("");

  const api = ApiSetup();

  const signup = async (body) => {
    setIsLoading(true);
    const res = await api.post("users/register", body);
    setIsLoading(false);
    return res;
  };
  const signin = async (body) => {
    setIsLoading(true);
    const res = await api.post("users/login", body);
    setIsLoading(false);
    return res;
  };
  const signinWithGoogle = async (body) => {
    setIsLoading(true);
    const res = await api.post("users/google-auth", body);
    setIsLoading(false);
    return res;
  };
  const verifyEmail = async (body) => {
    setIsLoading(true);
    const res = await api.post("users/verify-email", body);
    setIsLoading(false);
    return res;
  };

  const verifyAcc = async (email) => {
    setIsLoading(true);
    const res = await api.post(`/users/verify-email?email=${email}`);

    if (res.success == true) {
      setIsLoading(false);
      setIsError(false);
      return res;
    } else {
      setIsLoading(false);
      setIsError(
        "Something went wrong processing your request. Please try again later!"
      );
      return res;
    }
  };

  const fetchUser = async () => {
    try {
      if (token) {
        const res = await api.get("users/get-account");
        console.log({ res: res?.data });
        if (res?.data?.success == true) {
          setUserInfo(res?.data?.data);
        } else if (res?.data?.message == "jwt_expired") {
          localStorage.removeItem("app-ser-token");
          toast.error("Login has expired, kindly log in again!");
          navigate("/login");
        } else {
          localStorage.removeItem("app-ser-token");
          navigate("/login");
        }
      }
    } catch (error) {
      localStorage.removeItem("app-ser-token");
      // navigate("/auth/login")
    }
  };

  useEffect(() => {
    fetchUser();
  }, [token]);

  const updateUser = async (body, url) => {
    const res = await api.putFormData(url, body);
    console.log(res);

    return res;
  };

  const logOut = () => {
    localStorage.removeItem("app-ser-token");
    setUserInfo(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        updateUser,
        fetchUser,
        userInfo,
        token,
        signup,
        signin,
        logOut,
        verifyAcc,
        isLoading,
        setIsLoading,
        isError,
        setIsError,
        authError,
        signinWithGoogle,
        verifyEmail
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
