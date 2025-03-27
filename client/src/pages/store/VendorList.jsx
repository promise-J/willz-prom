import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ApiSetup from "../../utils/ApiSetup";
import EmptyData from "../../components/NA/EmptyData";
import { useModal } from "../../context/ModalContext";

const VendorList = () => {
  const {setAppLoading} = useModal()
  const { categoryId } = useParams();
  const [vendors, setVendors] = useState([]);

  const api = ApiSetup();

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        setAppLoading(true)
        const res = await api.get(
          `categories/get-cateogory-by-id/${categoryId}`
        );
        setAppLoading(false)
        setVendors(res?.data?.data?.message);
      } catch (error) {
        console.log(error);
      }
    };
    if (categoryId) {
      fetchVendors();
    }
  }, [categoryId]);
  console.log(vendors[0]);

  return (
    <div className="">
      <h1 className="text-center text-[25px] md:text-[40px] mt-8 text-blue-900">
        See our Vendors
      </h1>
      <div className={`${vendors?.length > 0 && "grid"} grid-cols-2 gap-8 p-4`}>
        {vendors.length > 0 ? (
          vendors.map((item, index) => (
            <div
              key={index}
              className="md:px-3 shadow-lg rounded-lg py-3 border border-blue-100"
            >
              <div className="flex flex-col md:flex-row items-center justify-between">
                <h1 className="text-2xl font-semibold">{item?.companyName}</h1>
                <img
                  className="h-[40px] rounded-lg"
                  src={item?.image?.imageUrl}
                  alt=""
                />
              </div>
              <p className="my-5 font-light text-[13px] italic">
                {item?.slogan}
              </p>
              <i className="block text-sm font-bold">Category</i>
              <p className="font-light">{item?.category?.name}</p>
              <i className="block text-sm mt-5 font-bold">Sub category</i>
              <div className="flex gap-4 flex-wrap mt-2">
                {item?.subcategories.map((cat) => (
                  <span
                    className="border font-light italic text-[14px] border-blue-100 py-1 rounded-[30px] px-4 cursor-pointer"
                    key={cat}
                  >
                    #{cat}
                  </span>
                ))}
              </div>
              <p className="font-light mt-3 text-[11px] italic">
                Email us @: {item?.email}
              </p>
              <Link to={`/vendor/${item?._id}`}>
                <button className="mt-6 w-full border border-blue-100 rounded-lg py-2 font-bold text-blue-900 hover:bg-blue-900 hover:text-white">
                  View Catalog
                </button>
              </Link>
            </div>
          ))
        ) : (
          <EmptyData title="No Vendors Found" />
        )}
      </div>
    </div>
  );
};

export default VendorList;
