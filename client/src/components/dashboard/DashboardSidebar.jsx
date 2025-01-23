import React from "react";
import { MdHome, MdWallet } from "react-icons/md";
import { LuSquareChartGantt } from "react-icons/lu";
import { BsGlobe } from "react-icons/bs";
import { MdLightbulbOutline } from "react-icons/md";
import { FaTv } from "react-icons/fa";
import { PiBowlFood } from "react-icons/pi";
import { GiHealthPotion } from "react-icons/gi";
import { MdVideoCameraFront } from "react-icons/md";
import { Link, useOutletContext } from "react-router-dom";

export const DashboardSidebar = ({showSidebar}) => {
    
  return (
    <div className={`h-[100vh] lg:w-[250px] ${showSidebar ? '!w-[80vw]' : '!w-0'} transition-all duration-300 ease-in-out border border-r-1 bg-blue-900 lg:block absolute md:static z-10`}>
      <div className="h-full overflow-auto">
        <div className="py-4">
          <img
            src="/images/app-sar.jpg"
            className="h-[35px] w-[100px] ms-[30px]"
          />
        </div>
        <div className="px-2 mt-10">
          <Link to='/dashboard'>
            <div className="flex items-center bg-blue-400 hover:bg-blue-400 hover:bg-opacity-30 bg-opacity-30 py-2 cursor-pointer rounded-sm ps-3 my-2">
            <MdHome color="white" size={24} />
            <span className="ms-2 text-white">Dashboard</span>
          </div>
          </Link>
          <Link to='/dashboard/fund-wallet'>
          <div className="flex items-center hover:bg-blue-400 hover:bg-opacity-30 py-2 cursor-pointer rounded-sm ps-3 my-2">
            <MdWallet color="white" size={24} />
            <span className="ms-2 text-white">Fund Wallet</span>
          </div>
          </Link>
          <div className="w-[100%] bg-gray-400 h-[1px] my-4"></div>
          <Link to='/dashboard/airtime-top-up'>
          <div className="flex items-center bg-blue-400 hover:bg-blue-400 hover:bg-opacity-30 bg-opacity-30 py-2 cursor-pointer rounded-sm ps-3 my-2">
            <LuSquareChartGantt color="white" size={24} />
            <span className="ms-2 text-white">Airtime Topup</span>
          </div>
          </Link>
          <Link to='/dashboard/data-top-up'>
          <div className="flex items-center hover:bg-blue-400 hover:bg-opacity-30 py-2 cursor-pointer rounded-sm ps-3 my-2">
            <BsGlobe color="white" size={24} />
            <span className="ms-2 text-white">Data Topup</span>
          </div>
          </Link>
          <div className="w-[100%] bg-gray-400 h-[1px] my-4"></div>
          <Link to='/dashboard/electricity-bill'>
          <div className="flex items-center bg-blue-400 hover:bg-blue-400 hover:bg-opacity-30 bg-opacity-30 py-2 cursor-pointer rounded-sm ps-3 my-2">
            <MdLightbulbOutline color="white" size={24} />
            <span className="ms-2 text-white">Pay Electricity</span>
          </div>
          </Link>
          <Link to='/dashboard/tv-subscription'>
          <div className="flex items-center hover:bg-blue-400 hover:bg-opacity-30 py-2 cursor-pointer rounded-sm ps-3 my-2">
            <FaTv color="white" size={24} />
            <span className="ms-2 text-white">TV Subscription</span>
          </div>
          </Link>
          <div className="w-[100%] bg-gray-400 h-[1px] my-4"></div>
          <Link to='/dashboard/food-paddi'>
          <div className="flex items-center bg-blue-400 hover:bg-blue-400 hover:bg-opacity-30 bg-opacity-30 py-2 cursor-pointer rounded-sm ps-3 my-2">
            <PiBowlFood color="white" size={24} />
            <span className="ms-2 text-white">Food Paddi</span>
          </div>
          </Link>
          <Link to='/dashboard/health-paddi'>
          <div className="flex items-center hover:bg-blue-400 hover:bg-opacity-30 py-2 cursor-pointer rounded-sm ps-3 my-2">
            <GiHealthPotion color="white" size={24} />
            <span className="ms-2 text-white">Health Paddi</span>
          </div>
          </Link>
          <Link to='/dashboard/studio-paddi'>
          <div className="flex items-center hover:bg-blue-400 hover:bg-opacity-30 py-2 cursor-pointer rounded-sm ps-3 my-2">
            <MdVideoCameraFront color="white" size={24} />
            <span className="ms-2 text-white">Studio Paddi</span>
          </div>
          </Link>
          <div className="w-[100%] bg-gray-400 h-[1px] my-4"></div>
        </div>
      </div>
    </div>
  );
};
