import React from "react";
import Container from "../../components/Container";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const VendorHome = () => {
  const { userInfo } = useAuth();
  return (
    <Container>
      <div className="flex py-2 px-5 justify-between md:items-center md:flex-row flex-col gap-3">
        <img
          className="md:h-[50px] md:w-[50px] h-[30px] w-[30px] rounded-full"
          src={userInfo?.image?.imageUrl}
          alt=""
        />
        <span className="font-bold uppercase">{userInfo?.username}</span>
      </div>
      <div className="flex justify-center mt-5">
        <div className="md:w-[60%]">
            <div className="flex py-2 justify-between border border-blue-50 rounded-lg px-2 mb-3 flex-col md:flex-row gap-2">
                <span>Slogan</span>
                <span className="font-light text-md text-gray-400">We offer the best, nothing but the best.</span>
            </div>
            <div className="flex py-2 justify-between border border-blue-50 rounded-lg px-2 mb-3 flex-col md:flex-row gap-2">
                <span>Category</span>
                <span className="font-light text-md text-gray-400">Fashion.</span>
            </div>
            <div className="flex py-2 justify-between border border-blue-50 rounded-lg px-2 mb-3 flex-col md:flex-row gap-2">
                <span>Sub category</span>
                <span className="font-light text-md text-gray-400">Clothes, Belts, shoes.</span>
            </div>
            <div className="flex py-2 justify-between border border-blue-50 rounded-lg px-2 mb-3 flex-col md:flex-row gap-2">
                <span>Offer</span>
                <span className="font-light text-md text-gray-400">Product.</span>
            </div>
            <div className="flex py-2 justify-between rounded-lg px-2 mb-3">
                <Link className="w-full" to="/dashboard/vendor-catalog">
                <button className="border py-1 rounded-lg w-full">View Catalog</button>
                </Link>
            </div>
        </div>
      </div>
    </Container>
  );
};

export default VendorHome;
