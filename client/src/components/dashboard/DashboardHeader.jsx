import React from "react";
import { useAuth } from "../../context/AuthContext";
import { FiMenu } from "react-icons/fi";

const DashboardHeader = ({setShowDashboardSidebar, showDashboardSidebar}) => {
  const { userInfo } = useAuth();
    
  const handleToggle = ()=>{
    setShowDashboardSidebar(!showDashboardSidebar)
  }

  return (
    <div className="py-3 flex justify-end items-center pe-3 md:pe-10 border-b-[1px] border-gray-300">
      {
      userInfo?.image?.imageUrl ? (
        <img
          className="h-8 rounded-full border-2 border-gray-300 cursor-pointer"
          alt="profile image"
          referrerPolicy="no-referrer"
          src='https://lh3.googleusercontent.com/a/ACg8ocKEiv_NYOP4ulsGCZBsLhTFMWZZqww9v08BUY_bfEHp81RlfNsN'
        />
      ) : (
        <img
          className="h-8 rounded-full border-2 border-gray-300 cursor-pointer"
          src="/images/profileImage.png"
        />
      )}
      <FiMenu onClick={handleToggle} size={20} className="ms-8 md:ms-2 md:me-8 lg:hidden block" cursor={'pointer'} />
    </div>
  );
};

export default DashboardHeader;
