import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ApiSetup from "../../utils/ApiSetup";

const AppSerStoreType = () => {
  const { storeType } = useParams();
  const [items, setItems] = useState([]);

  const api = ApiSetup();

  useEffect(() => {
    const fetchStoreType = async () => {
      try {
        const res = await api.get(
          `categories/category?categoryType=${storeType}`
        );
        setItems(res?.data?.data?.message);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStoreType();
  }, [storeType]);

  return (
    <div className="">
      <h1 className="text-center text-[25px] md:text-[40px] mt-8 text-blue-900">
        Our <span className="capitalize">{storeType}</span>
      </h1>
      <div className="grid grid-cols-2 gap-8 p-4">
        {items.map((item, index) => (
          <div key={index} className="md:px-3 shadow-lg rounded-lg py-8 border border-blue-100">
            <h1 className="text-2xl md:text-3xl">{item?.name}</h1>
            <div className="flex gap-4 flex-wrap mt-8">
                {
                    item?.categories.map(cat=>(
                        <span className="border border-blue-900 py-1 rounded-[30px] px-4 cursor-pointer" key={cat}>#{cat}</span>
                    ))
                }
            </div>
            <Link to={`/app-ser-store/${storeType}/${item?._id}`}>
            <button className="mt-6 w-full border border-blue-900 rounded-lg py-2 font-bold text-blue-900">View</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppSerStoreType;
