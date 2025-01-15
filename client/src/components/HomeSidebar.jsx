import React from "react";
import { MdClear } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const HomeSidebar = ({ setShowSidebar }) => {
  const { userInfo, logOut } = useAuth();

  const handleClickItem = () => {
    setShowSidebar(false);
  };
  return (
    <div className="h-[100vh] fixed w-full z-10 overflow-hidden">
      <div className="relative bg-gray-100 h-full w-full pt-4">
        <MdClear
          onClick={() => setShowSidebar(false)}
          size={30}
          fontWeight={600}
          cursor="pointer"
          className="absolute right-6 top-4"
        />
        <div className="mt-3 flex items-center px-3 gap-5 mb-10">
          <img
            className="w-[40px] h-[40px] rounded-full"
            src="/images/app-sar.jpg"
            alt=""
          />
          <h4>App Ser</h4>
        </div>
        <div className="text-2xl my-3 rounded-lg py-2 flex justify-center">
          <Link onClick={handleClickItem} to="/">
            <h1>Home</h1>
          </Link>
        </div>
        <div className="text-2xl my-3 rounded-lg py-2 flex justify-center">
          <Link onClick={handleClickItem} to="/about">
            <h1>About</h1>
          </Link>
        </div>
        <div className="text-2xl my-3 rounded-lg py-2 flex justify-center">
          <Link onClick={handleClickItem} to="/contact-us">
            <h1>Contact us</h1>
          </Link>
        </div>
        {userInfo ? (
          <div className="text-2xl px-5 mt-10 rounded-lg py-2 flex justify-center gap-4">
            <button
              onClick={() => {
                logOut()
                handleClickItem;
              }}
              className="bg-blue-900 py-2 text-white w-full"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="text-2xl mt-10 rounded-lg py-3 px-2 flex justify-between gap-8">
            <Link onClick={handleClickItem} className="w-full" to="/login">
              <button className="border border-blue-900 py-2 w-full">
                Login
              </button>
            </Link>
            <Link
              onClick={handleClickItem}
              to="/sign-up"
              className="text-white w-full"
            >
              <button className="bg-blue-900 py-2 text-white w-full">
                Sign up
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeSidebar;
