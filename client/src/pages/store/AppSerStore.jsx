import React from 'react'
import { Link } from 'react-router-dom'
import { RiStore2Line } from "react-icons/ri";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";

const AppSerStore = () => {
  return (
    <div className=''>
        <h1 className='text-center text-[25px] md:text-[40px] mt-8 text-blue-900'>Welcome to App Ser Store</h1>
        <div className='flex flex-col items-center'>
        <Link to="/app-ser-store/services">
          <button
            className="mt-8 bg-white text-blue-900 px-8 py-3 text-xl rounded-lg shadow-lg hover:bg-gray-100 transition flex flex-col items-center gap-5"
          >
            <span>View Our Services</span>
            <RiStore2Line size={35} />
          </button>
          </Link>
          <p className='my-8'>OR</p>
          <Link to="/app-ser-store/products">
          <button
            className="bg-white text-blue-900 px-8 py-4 text-xl rounded-lg shadow-lg hover:bg-gray-100 transition flex flex-col items-center gap-5"
          >
            <span>View Our Products</span>
            <MdOutlineProductionQuantityLimits size={35} />
          </button>
          </Link>
        </div>
    </div>
  )
}

export default AppSerStore