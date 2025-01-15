import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HomeSidebar from "../components/HomeSidebar";

const DashboardLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false)

  const token_key = localStorage.getItem("app-ser-token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token_key) {
      navigate("/login");
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

export default DashboardLayout;
