import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div>
      <div className="w-2/3 mx-auto mt-20 p-3 shadow-lg">
        <h1 className="text-center text-2xl">Sign up now</h1>
        <div className="flex flex-col gap-4 mt-10">
          <div className="mt-4">
            <input
              type="text"
              placeholder="Enter your email"
              className="px-4 border-gray-300 border py-4 w-full h-full outline-none"
            />
          </div>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Enter your password"
              className="px-4 border-gray-300 border py-4 w-full h-full outline-none"
            />
          </div>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Enter your username"
              className="px-4 border-gray-300 border py-4 w-full h-full outline-none"
            />
          </div>
          <div className="mt-4">
            <button className="bg-blue-900 text-white px-4 py-3 w-full rounded-lg">Sign up</button>
          </div>

        </div>
        <div className="mt-4 py-4 flex flex-col items-center">
            <h2>Already have an account? <Link className="text-blue-900" to='/login'>Sign in</Link></h2>
        </div>
        <div className="mt-4 py-4 flex flex-col items-center">
            <h1 className="text-blue-900 flex gap-3 cursor-pointer">Sign up with <img className="w-[30px] h-[30px]" src="/images/google-image.png" /></h1>
        </div>
      </div>
    </div>
  );
};

export default Signup;
