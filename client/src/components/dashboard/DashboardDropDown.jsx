import React from 'react'
import { IoMdClose } from "react-icons/io";
import { PiBowlFood } from 'react-icons/pi';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { MdHome, MdLightbulbOutline, MdVideoCameraFront, MdWallet } from 'react-icons/md';
import { LuSquareChartGantt } from 'react-icons/lu';
import { BsGlobe } from 'react-icons/bs';
import { FaTv } from 'react-icons/fa';
import { GiHealthPotion } from 'react-icons/gi';


const DashboardDropDown = ({setShowSidebar, showSidebar}) => {
    const {userInfo} = useAuth()
    const {pathname} = useLocation()

    const handleCloseSidebar = ()=>{
        setShowSidebar(false)
      }

  return (
    <div className={`${showSidebar ? 'w-full' : 'w-0'} transition-all duration-300 ease-in-out h-[100vh] z-10 fixed top-0 left-0`}>
        <div className='h-full overflow-auto bg-blue-900'>
            <IoMdClose onClick={handleCloseSidebar} color='white' size={20} cursor='pointer' className='absolute right-5 top-5 font-bold' />
            <div className="py-4 flex justify-between pe-5">
          <img
            src="/images/app-sar.jpg"
            className="h-[35px] w-[100px] ms-[30px]"
          />
          {userInfo?.image?.imageUrl ? (
            <img
              className="h-8 rounded-full border-2 border-gray-300 cursor-pointer me-12"
              alt="profile image"
              referrerPolicy="no-referrer"
              src="https://lh3.googleusercontent.com/a/ACg8ocKEiv_NYOP4ulsGCZBsLhTFMWZZqww9v08BUY_bfEHp81RlfNsN"
            />
          ) : (
            <img
              className="h-8 rounded-full border-2 border-gray-300 cursor-pointer me-12"
              src="/images/profileImage.png"
            />
          )}
        </div>
        <div className="px-2 mt-10">
          <Link onClick={handleCloseSidebar} to="/dashboard">
            <div className={`flex items-center ${pathname == '/dashboard' && 'bg-blue-400 bg-opacity-30'} hover:bg-blue-400 hover:bg-opacity-30 py-2 cursor-pointer rounded-sm ps-3 my-2`}>
              <MdHome color="white" size={24} />
              <span className="ms-2 text-white">Dashboard</span>
            </div>
          </Link>
          <Link onClick={handleCloseSidebar} to="/dashboard/fund-wallet">
          <div className={`flex items-center ${pathname == '/dashboard/fund-wallet' && 'bg-blue-400 bg-opacity-30'} hover:bg-blue-400 hover:bg-opacity-30 py-2 cursor-pointer rounded-sm ps-3 my-2`}>
              <MdWallet color="white" size={24} />
              <span className="ms-2 text-white">Fund Wallet</span>
            </div>
          </Link>
          <div className="w-[100%] bg-gray-400 h-[1px] my-4"></div>
          <Link onClick={handleCloseSidebar} to="/dashboard/airtime-top-up">
          <div className={`flex items-center ${pathname == '/dashboard/airtime-top-up' && 'bg-blue-400 bg-opacity-30'} hover:bg-blue-400 hover:bg-opacity-30 py-2 cursor-pointer rounded-sm ps-3 my-2`}>
              <LuSquareChartGantt color="white" size={24} />
              <span className="ms-2 text-white">Airtime Topup</span>
            </div>
          </Link>
          <Link onClick={handleCloseSidebar} to="/dashboard/data-top-up">
          <div className={`flex items-center ${pathname == '/dashboard/data-top-up' && 'bg-blue-400 bg-opacity-30'} hover:bg-blue-400 hover:bg-opacity-30 py-2 cursor-pointer rounded-sm ps-3 my-2`}>
              <BsGlobe color="white" size={24} />
              <span className="ms-2 text-white">Data Topup</span>
            </div>
          </Link>
          <div className="w-[100%] bg-gray-400 h-[1px] my-4"></div>
          <Link onClick={handleCloseSidebar} to="/dashboard/electricity-bill">
          <div className={`flex items-center ${pathname == '/dashboard/electricity-bill' && 'bg-blue-400 bg-opacity-30'} hover:bg-blue-400 hover:bg-opacity-30 py-2 cursor-pointer rounded-sm ps-3 my-2`}>
              <MdLightbulbOutline color="white" size={24} />
              <span className="ms-2 text-white">Pay Electricity</span>
            </div>
          </Link>
          <Link onClick={handleCloseSidebar} to="/dashboard/tv-subscription">
          <div className={`flex items-center ${pathname == '/dashboard/tv-subscription' && 'bg-blue-400 bg-opacity-30'} hover:bg-blue-400 hover:bg-opacity-30 py-2 cursor-pointer rounded-sm ps-3 my-2`}>
              <FaTv color="white" size={24} />
              <span className="ms-2 text-white">TV Subscription</span>
            </div>
          </Link>
          <div className="w-[100%] bg-gray-400 h-[1px] my-4"></div>
          <Link onClick={handleCloseSidebar} to="/dashboard/food-paddi">
          <div className={`flex items-center ${pathname == '/dashboard/food-paddi' && 'bg-blue-400 bg-opacity-30'} hover:bg-blue-400 hover:bg-opacity-30 py-2 cursor-pointer rounded-sm ps-3 my-2`}>
              <PiBowlFood color="white" size={24} />
              <span className="ms-2 text-white">Food Paddi</span>
            </div>
          </Link>
          <Link onClick={handleCloseSidebar} to="/dashboard/health-paddi">
          <div className={`flex items-center ${pathname == '/dashboard/health-paddi' && 'bg-blue-400 bg-opacity-30'} hover:bg-blue-400 hover:bg-opacity-30 py-2 cursor-pointer rounded-sm ps-3 my-2`}>
              <GiHealthPotion color="white" size={24} />
              <span className="ms-2 text-white">Health Paddi</span>
            </div>
          </Link>
          <Link onClick={handleCloseSidebar} to="/dashboard/studio-paddi">
          <div className={`flex items-center ${pathname == '/dashboard/studio-paddi' && 'bg-blue-400 bg-opacity-30'} hover:bg-blue-400 hover:bg-opacity-30 py-2 cursor-pointer rounded-sm ps-3 my-2`}>
              <MdVideoCameraFront color="white" size={24} />
              <span className="ms-2 text-white">Studio Paddi</span>
            </div>
          </Link>
          <div className="w-[100%] bg-gray-400 h-[1px] my-4"></div>
        </div>
        </div>
    </div>
  )
}

export default DashboardDropDown