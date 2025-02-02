import React, { useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../context/AuthContext";
import { useModal } from "../../context/ModalContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const GoogleAuthComponent = () => {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const navigate = useNavigate();

  const { signinWithGoogle } = useAuth();
  const { setAppLoading } = useModal();

  const onSuccess = async (response) => {
    try {
      setAppLoading(true)
      const credential = response.credential;
      const decoded = jwtDecode(credential);
      const payload = {
        email: decoded?.email,
        username: decoded?.name,
        password: decoded?.jti,
        first_name: decoded?.family_name,
        last_name: decoded?.given_name,
        image: {
          imageUrl: decoded?.picture,
          publicId: "",
        },
      };
      const res = await signinWithGoogle(payload);
      setAppLoading(false)
      if (res?.data?.data.google_type == "register") {
        toast.success("You have sign up successfully");
        return navigate("/login");
      } else if (res?.data?.data?.google_type == "login") {
        toast.success("You have logged in successfully");
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onFailure = (error) => {
    console.log("Login Failed:", error);
  };

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <div className="flex justify-center">
        <GoogleLogin
          onSuccess={onSuccess}
          onError={onFailure}
          text="God is good"
          theme="filled_blue"
          shape="pill" // "square" or "pill"
          size="large" // "large", "medium", "small"
          width={"100%"}
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleAuthComponent;
