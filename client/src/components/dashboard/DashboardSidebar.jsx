import React from "react";
import { MdHome, MdWallet } from "react-icons/md";
import { LuSquareChartGantt } from "react-icons/lu";
import { BsGlobe, BsShop } from "react-icons/bs";
import { MdLightbulbOutline } from "react-icons/md";
import { FaTv, FaUser } from "react-icons/fa";
import { PiBowlFood } from "react-icons/pi";
import { GiHealthPotion } from "react-icons/gi";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import DashboardSidebarItem from "./DashboardSidebarItem";
import { MdVideoCameraBack } from "react-icons/md";
import { FaSalesforce } from "react-icons/fa6";

export const DashboardSidebar = ({ setShowSidebar }) => {
  const { userInfo, logOut } = useAuth();
  const handleCloseSidebar = () => {
    setShowSidebar(false);
  };

  return (
    <div
      className={`h-[100vh] min-w-[250px] hidden lg:block transition-all duration-300 ease-in-out bg-blue-900`}
    >
      <div className="h-full overflow-auto">
        <div className="py-1 flex justify-between pe-5 bg-white">
          <Link to='/'>
            <img
              src="/images/app-sarr.jpg"
              className="h-[35px] w-[100px] ms-[30px]"
            />
          </Link>
          {userInfo?.image?.imageUrl ? (
            <img
              className="h-8 rounded-full border-2 border-gray-300 cursor-pointer"
              alt="profile image"
              referrerPolicy="no-referrer"
              src={userInfo?.image?.imageUrl}
            />
          ) : (
            <img
              className="h-8 rounded-full border-2 border-gray-300 cursor-pointer"
              src="/images/profileImage.png"
            />
          )}
        </div>
        {userInfo?.userType == "client" && (
          <UserDashboard handleCloseSidebar={handleCloseSidebar} />
        )}
        {userInfo?.userType == "admin" && (
          <AdminDashboard handleCloseSidebar={handleCloseSidebar} />
        )}
        {userInfo?.userType == "vendor" && (
          <VendorDashboard handleCloseSidebar={handleCloseSidebar} />
        )}
      </div>
    </div>
  );
};

function UserDashboard({ handleCloseSidebar }) {
  const { userInfo, logOut } = useAuth();

  return (
    <>
      <div className="px-2 mt-10">
        <DashboardSidebarItem
          handleCloseSidebar={handleCloseSidebar}
          title="Dashboard"
          icon={<MdHome color="white" size={24} />}
          path="/dashboard"
        />
        <DashboardSidebarItem
          handleCloseSidebar={handleCloseSidebar}
          title="Fund Wallet"
          icon={<MdWallet color="white" size={24} />}
          path="/dashboard/fund-wallet"
        />
        <div className="w-[100%] bg-gray-400 h-[1px] my-4"></div>
        <DashboardSidebarItem
          title="Airtime Topup"
          icon={<LuSquareChartGantt color="white" size={24} />}
          path="/dashboard/airtime-top-up"
          handleCloseSidebar={handleCloseSidebar}
        />
        <DashboardSidebarItem
          title="Data Topup"
          icon={<BsGlobe color="white" size={24} />}
          path="/dashboard/data-top-up"
          handleCloseSidebar={handleCloseSidebar}
        />
        <div className="w-[100%] bg-gray-400 h-[1px] my-4"></div>
        <DashboardSidebarItem
          title="Pay Electricity"
          icon={<MdLightbulbOutline color="white" size={24} />}
          path="/dashboard/electricity-bill"
          handleCloseSidebar={handleCloseSidebar}
        />
        <DashboardSidebarItem
          handleCloseSidebar={handleCloseSidebar}
          title="TV Subscription"
          icon={<FaTv color="white" size={24} />}
          path="/dashboard/tv-subscription"
        />
        <div className="w-[100%] bg-gray-400 h-[1px] my-4"></div>
        <DashboardSidebarItem
          title="Food Paddi"
          icon={<PiBowlFood color="white" size={24} />}
          path="/dashboard/food-paddi"
          isParent
          listData={[
            { title: "Local dish", link: "/dashboard/local-dish" },
            { title: "Classic dish", link: "/dashboard/classic-dish" },
            {
              title: "Conventional dish",
              link: "/dashboard/conventional-dish",
            },
          ]}
          handleCloseSidebar={handleCloseSidebar}
        />
        <DashboardSidebarItem
          handleCloseSidebar={handleCloseSidebar}
          title="Health Paddi"
          icon={<GiHealthPotion color="white" size={24} />}
          path="/dashboard/health-paddi"
        />
        <DashboardSidebarItem
          handleCloseSidebar={handleCloseSidebar}
          title="Studio Paddi"
          icon={<MdVideoCameraBack color="white" size={24} />}
          path="/dashboard/studio-paddi"
        />
        <button
          onClick={logOut}
          className="text-white mt-2 w-full py-1 rounded-lg border border-white"
        >
          Logout
        </button>
        <div className="w-[100%] bg-gray-400 h-[1px] my-4"></div>
      </div>
    </>
  );
}
function AdminDashboard({ handleCloseSidebar }) {
  const { userInfo, logOut } = useAuth();

  return (
    <>
      <div className="px-2 mt-10">
        <DashboardSidebarItem
          handleCloseSidebar={handleCloseSidebar}
          title="Dashboard"
          icon={<MdHome color="white" size={24} />}
          path="/dashboard"
        />
        <DashboardSidebarItem
          handleCloseSidebar={handleCloseSidebar}
          title="Fund Wallet"
          icon={<MdWallet color="white" size={24} />}
          path="/dashboard/fund-wallet"
        />
        <DashboardSidebarItem
          title="VTU Section"
          icon={<PiBowlFood color="white" size={24} />}
          path="/dashboard/food-paddi"
          isParent
          listData={[
            { title: "Airtime Top up", link: "/dashboard/airtime-top-up" },
            { title: "Data top up", link: "/dashboard/data-top-up" },
            {
              title: "Pay electricity bill",
              link: "/dashboard/electricity-bill",
            },
            { title: "TV Subscription", link: "/dashboard/tv-subscription" },
          ]}
          handleCloseSidebar={handleCloseSidebar}
        />
        <div className="w-[100%] bg-gray-400 h-[1px] my-4"></div>
        <DashboardSidebarItem
          handleCloseSidebar={handleCloseSidebar}
          title="Manage Vendors"
          icon={<BsShop color="white" size={24} />}
          path="/dashboard/vendors"
        />
        <DashboardSidebarItem
          handleCloseSidebar={handleCloseSidebar}
          title="Manage Category"
          icon={<BsShop color="white" size={24} />}
          path="/dashboard/categories"
        />

        <button
          onClick={logOut}
          className="text-white mt-2 w-full py-1 rounded-lg border border-white"
        >
          Logout
        </button>
        <div className="w-[100%] bg-gray-400 h-[1px] my-4"></div>
      </div>
    </>
  );
}
function VendorDashboard({ handleCloseSidebar }) {
  const { userInfo, logOut } = useAuth();

  return (
    <>
      <div className="px-2 mt-10">
        <DashboardSidebarItem
          handleCloseSidebar={handleCloseSidebar}
          title="Dashboard"
          icon={<MdHome color="white" size={24} />}
          path="/dashboard"
        />
        <DashboardSidebarItem
          handleCloseSidebar={handleCloseSidebar}
          title="Fund Wallet"
          icon={<MdWallet color="white" size={24} />}
          path="/dashboard/fund-wallet"
        />
        <DashboardSidebarItem
          title="VTU Section"
          icon={<PiBowlFood color="white" size={24} />}
          path="/dashboard/food-paddi"
          isParent
          listData={[
            { title: "Airtime Top up", link: "/dashboard/airtime-top-up" },
            { title: "Data top up", link: "/dashboard/data-top-up" },
            {
              title: "Pay electricity bill",
              link: "/dashboard/electricity-bill",
            },
            { title: "TV Subscription", link: "/dashboard/tv-subscription" },
          ]}
          handleCloseSidebar={handleCloseSidebar}
        />
        <div className="w-[100%] bg-gray-400 h-[1px] my-4"></div>
        <DashboardSidebarItem
          handleCloseSidebar={handleCloseSidebar}
          title="My View"
          icon={<FaUser color="white" size={22} />}
          path="/dashboard/vendor"
        />
        <DashboardSidebarItem
          handleCloseSidebar={handleCloseSidebar}
          title="My Catalog"
          icon={<FaUser color="white" size={22} />}
          path="/dashboard/vendor-catalog"
        />
        <DashboardSidebarItem
          handleCloseSidebar={handleCloseSidebar}
          title="Manage Profile"
          icon={<FaUser color="white" size={22} />}
          path="/dashboard/profile"
        />

        <button
          onClick={logOut}
          className="text-white mt-2 w-full py-1 rounded-lg border border-white"
        >
          Logout
        </button>
        <div className="w-[100%] bg-gray-400 h-[1px] my-4"></div>
      </div>
    </>
  );
}
