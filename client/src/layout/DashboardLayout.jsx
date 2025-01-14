import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const DashboardLayout = () => {
  const token_key = localStorage.getItem("app-ser-token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token_key) {
      navigate("/login");
    }
  }, [navigate, token_key]);

  return (
    <div className="">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
