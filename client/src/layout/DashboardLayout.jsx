import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { DashboardSidebar } from "../components/dashboard/DashboardSidebar";

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
      {showSidebar && <Sidebar setShowSidebar={setShowSidebar} />}
      {/* <Navbar setShowSidebar={setShowSidebar} /> */}
      <main className="flex h-[100vh]">
        <DashboardSidebar />
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
