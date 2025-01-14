import React from "react";
import { IoMdMenu } from "react-icons/io";import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { logOut, token } = useAuth();
  return (
    <div className="border-b-2 h-[90px]">
      <div className="flex justify-between px-8 h-full items-center">
        <img className="w-[80px] h-[50px]" src="/images/app-sar.jpg" />
        <div className="flex items-center h-full gap-12">
          {token ? (
            <button onClick={logOut}>Logout</button>
          ) : (
            <Link className="text-blue-900" to="/sign-up">
              Sign up
            </Link>
          )}
          <IoMdMenu cursor={"pointer"} size={25} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
