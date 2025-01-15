import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HomeSidebar from "../components/HomeSidebar";

const DefaultLayout = () => {
  const token_key = localStorage.getItem("app-ser-token");
  const {pathname} = useLocation()
  const navigate = useNavigate()
  const [showSidebar, setShowSidebar] = useState(false)

  useEffect(() => {
    if (token_key) {
      if(pathname == '/login' || pathname == '/sign-up'){
        navigate("/dashboard");
      }
    }
  }, [navigate, token_key]);

  return (
    <div className="">
      {showSidebar && <HomeSidebar setShowSidebar={setShowSidebar} />}
      <Navbar setShowSidebar={setShowSidebar} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
