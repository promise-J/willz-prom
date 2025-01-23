import React, { useState } from "react";
import { FaChevronUp } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const DashboardSidebarItem = ({
  title,
  icon,
  isParent,
  path,
  listData,
  handleCloseSidebar,
}) => {
  const { pathname } = useLocation();
  const [openMenu, setOpenMenu] = useState(false)

  //professional pictures, video coverage, content creation, events coverage.

  return isParent ? (
      <div className="">
        <div
          onClick={()=> setOpenMenu(!openMenu)}
          className={`flex items-center ${
            ['/dashboard/classic-dish', '/dashboard/local-dish', '/dashboard/conventional-dish'].includes(pathname) && "bg-blue-400 bg-opacity-30"
          } hover:bg-blue-400 hover:bg-opacity-30 py-2 cursor-pointer rounded-sm ps-3 my-2 relative`}
        >
          {/* <PiBowlFood color="white" size={24} /> */}
          {icon}
          <span className="ms-2 text-white">{title}</span>
          {
            openMenu ?
          <FaChevronUp
            color="white"
            className="absolute top-[30%] right-2"
          /> :
          <FaChevronDown
            color="white"
            className="absolute top-[30%] right-2"
          />
          }
        </div>
        <div className={`${!openMenu ? 'hidden' : 'block'}`}>
          {listData?.map((list) => (
            <div
             key={list.title}
              className={`flex ${pathname == list.link && "bg-blue-400 bg-opacity-30"} items-center hover:bg-blue-400 hover:bg-opacity-30 cursor-pointer rounded-sm ps-10 my-1 relative`}
            >
              <Link to={list.link} className="text-white">{list.title}</Link>
            </div>
          ))}
        </div>
      </div>
  ) : (
    <Link onClick={handleCloseSidebar} to={path}>
      <div
        className={`flex items-center ${
          pathname == path && "bg-blue-400 bg-opacity-30"
        } hover:bg-blue-400 hover:bg-opacity-30 py-2 cursor-pointer rounded-sm ps-3 my-2`}
      >
        {/* <FaTv color="white" size={24} /> */}
        {icon}
        <span className="ms-2 text-white">{title}</span>
      </div>
    </Link>
  );
};

export default DashboardSidebarItem;
