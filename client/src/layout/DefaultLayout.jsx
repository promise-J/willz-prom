import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";

const DefaultLayout = () => {
  const token_key = localStorage.getItem("app-ser-token");
  const {pathname} = useLocation()
  const navigate = useNavigate()
  const [showSidebar, setShowSidebar] = useState(false)
  const {userInfo} = useAuth()

  // useEffect(() => {
  //   if (userInfo) {
  //     if(!pathname.includes('dashboard')){
  //       navigate("/dashboard");
  //     }
  //   }
  // }, [navigate, userInfo, pathname]);

  return (
    <div className="">
      {showSidebar && <Sidebar setShowSidebar={setShowSidebar} />}
      <Navbar setShowSidebar={setShowSidebar} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
