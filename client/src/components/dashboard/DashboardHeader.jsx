import React from "react";
import { useAuth } from "../../context/AuthContext";
import { FiMenu } from "react-icons/fi";
import DashboardDropDown from "./DashboardDropDown";

const DashboardHeader = ({setShowDashboardSidebar, showDashboardSidebar}) => {
  const { userInfo } = useAuth();
    
  const showMenu = ()=>{
    setShowDashboardSidebar(true)
  }

  return (
    <div className="py-3 flex justify-end items-center pe-3 md:pe-10 border-b-[1px] border-gray-300">
      <DashboardDropDown setShowSidebar={setShowDashboardSidebar} showSidebar={showDashboardSidebar} />
      {
        <FiMenu onClick={showMenu} size={20} className="ms-8 md:ms-2 md:me-8 lg:hidden block" cursor={'pointer'} />
      }
    </div>
  );
};

export default DashboardHeader;
