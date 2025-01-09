import React from "react";
import { ImMenu } from "react-icons/im";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="border-b-2 h-[90px]">
      <div className="flex justify-between px-8 h-full items-center">
        <h1>AppSar logo</h1>
        <div className="flex items-center h-full gap-12">
          <Link className="text-blue-900" to='/sign-up'>Sign up</Link>
          <ImMenu cursor={'pointer'} size={25} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
