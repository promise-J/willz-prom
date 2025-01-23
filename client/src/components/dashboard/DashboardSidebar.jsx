import React from "react";
import { MdHome, MdWallet } from "react-icons/md";
import { LuSquareChartGantt } from "react-icons/lu";
import { BsGlobe } from "react-icons/bs";
import { MdLightbulbOutline } from "react-icons/md";
import { FaTv } from "react-icons/fa";
import { PiBowlFood } from "react-icons/pi";
import { GiHealthPotion } from "react-icons/gi";
import { MdVideoCameraFront } from "react-icons/md";
import { IoIosArrowDown, IoMdArrowUp } from "react-icons/io";
import { Link, useLocation, useOutletContext } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import DashboardSidebarItem from "./DashboardSidebarItem";

export const DashboardSidebar = ({ showSidebar, setShowSidebar }) => {
    const {pathname} = useLocation()
  const { userInfo } = useAuth();
  const handleCloseSidebar = ()=>{
    setShowSidebar(false)
  }

  return (
    <div
      className={`h-[100vh] min-w-[250px] hidden lg:block transition-all duration-300 ease-in-out bg-blue-900`}
    >
      <div className="h-full overflow-auto">
        <div className="py-4 flex justify-between pe-5">
          <img
            src="/images/app-sar.jpg"
            className="h-[35px] w-[100px] ms-[30px]"
          />
          {userInfo?.image?.imageUrl ? (
            <img
              className="h-8 rounded-full border-2 border-gray-300 cursor-pointer"
              alt="profile image"
              referrerPolicy="no-referrer"
              src="https://lh3.googleusercontent.com/a/ACg8ocKEiv_NYOP4ulsGCZBsLhTFMWZZqww9v08BUY_bfEHp81RlfNsN"
            />
          ) : (
            <img
              className="h-8 rounded-full border-2 border-gray-300 cursor-pointer"
              src="/images/profileImage.png"
            />
          )}
        </div>
        <div className="px-2 mt-10">
          <DashboardSidebarItem
            handleCloseSidebar={handleCloseSidebar}
            title='Dashboard'
            icon={<MdHome color='white' size={24} />}
            path='/dashboard'
           />
          <DashboardSidebarItem
            handleCloseSidebar={handleCloseSidebar}
            title='Fund Wallet'
            icon={<MdWallet color='white' size={24} />}
            path='/dashboard/fund-wallet'
           />
          <div className="w-[100%] bg-gray-400 h-[1px] my-4"></div>
          <DashboardSidebarItem
            title='Airtime Topup'
            icon={<LuSquareChartGantt color='white' size={24} />}
            path='/dashboard/airtime-top-up'
            handleCloseSidebar={handleCloseSidebar}
           />
          <DashboardSidebarItem
            title='Data Topup'
            icon={<BsGlobe color='white' size={24} />}
            path='/dashboard/data-top-up'
            handleCloseSidebar={handleCloseSidebar}
           />
          <div className="w-[100%] bg-gray-400 h-[1px] my-4"></div>
          <DashboardSidebarItem
            title='Pay Electricity'
            icon={<MdLightbulbOutline color='white' size={24} />}
            path='/dashboard/electricity-bill'
            handleCloseSidebar={handleCloseSidebar}
           />
          <DashboardSidebarItem
            handleCloseSidebar={handleCloseSidebar}
            title='TV Subscription'
            icon={<FaTv color='white' size={24} />}
            path='/dashboard/tv-subscription'
           />
          <div className="w-[100%] bg-gray-400 h-[1px] my-4"></div>
          <DashboardSidebarItem
            title='Food Paddi'
            icon={<PiBowlFood color='white' size={24} />}
            path='/dashboard/food-paddi'
            isParent
            listData={[{title: 'Local dish', link: '/dashboard/local-dish'}, {title: 'Classic dish', link: '/dashboard/classic-dish'}, {title: 'Conventional dish', link: '/dashboard/conventional-dish'}]}
            handleCloseSidebar={handleCloseSidebar}
           />
            <DashboardSidebarItem
            handleCloseSidebar={handleCloseSidebar}
            title='Health Paddi'
            icon={<GiHealthPotion color='white' size={24} />}
            path='/dashboard/health-paddi'
           />
            <DashboardSidebarItem
            handleCloseSidebar={handleCloseSidebar}
            title='Studio Paddi'
            icon={<GiHealthPotion color='white' size={24} />}
            path='/dashboard/studio-paddi'
           />
          <div className="w-[100%] bg-gray-400 h-[1px] my-4"></div>
        </div>
      </div>
    </div>
  );
};
