import React, { useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const GoogleAuthComponent = ({text}) => {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  
  const onSuccess = (response) => {
    const credential = response.credential;
    const decoded = jwtDecode(credential);
    console.log({ decoded });

    // Send the token to your backend for verification
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
          width={'100%'}
  
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleAuthComponent;
