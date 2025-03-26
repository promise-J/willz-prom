import React from "react";
import { IoMdMenu } from "react-icons/io";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ setShowSidebar }) => {
  const { logOut, token } = useAuth();
  return (
    <div className="border-b-2 h-[90px]">
      <div className="flex justify-between px-8 h-full items-center">
        <Link to="/">
          <img className="w-[80px] h-[50px]" src="/images/app-sarr.jpg" />
        </Link>
        <div className="flex items-center h-full gap-12">
          {/* {token && (
            <button
            onClick={() => {
              logOut()
              handleClickItem;
            }}
            className="bg-blue-900 py-1 px-2 rounded-lg text-white w-full"
          >
            Logout
          </button>
          )} */}
          <IoMdMenu
            className="md:hidden"
            onClick={() => setShowSidebar(true)}
            cursor={"pointer"}
            size={25}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
