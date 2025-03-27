import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ApiSetup from "../../utils/ApiSetup";
import { formatNumberWithCommas } from "../../utils/helpers";
import EmptyData from "../../components/NA/EmptyData";
import { useModal } from "../../context/ModalContext";

const VendorDisplayCatalog = () => {
  const {setAppLoading} = useModal()
  const [catalogs, setCatalogs] = useState([]);

  const api = ApiSetup()
  const { vendorId } = useParams();

  useEffect(() => {
    async function getVendorCatalog(){
        setAppLoading(true)
        const res = await api.get(`catalogs/catalog?vendorId=${vendorId}`)
        setAppLoading(false)
        setCatalogs(res?.data?.data?.message)
    }
    getVendorCatalog()
  }, [vendorId]);


  return (
    <div>
      <h1 className="text-center text-[25px] md:text-[40px] mt-8 text-blue-900">
        Vendor Catalog
      </h1>
      <div className={`${catalogs.length > 0 && 'grid'} mt-8 md:grid-cols-2 p-5 gap-7 grid-cols-1`}>
        {
        catalogs.length > 0 ?
        catalogs.map((cat) => (
          <div className="h-[450px] shadow-lg rounded-lg" key={cat?._id}>
            <div className="h-[60%]">
              <img
                src={cat?.images[0].imageUrl}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div className="h-[40%]">
              <div className="p-2">
                <h1>
                  {cat?.name.length > 50
                    ? cat?.name.slice(0, 50) + "..."
                    : cat?.name}
                </h1>
                <p className="text-sm my-2">
                  {cat?.description.length > 200
                    ? cat?.description.slice(0, 200) + "..."
                    : cat?.description}
                </p>
                <p className="text-[12px]">
                  {formatNumberWithCommas(cat?.price)}
                </p>
                <Link to={``}>
                  <button className="border px-10 py-1 mt-2 rounded-lg w-full">
                    Order
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))
        : 
        <EmptyData title='No Catalog for this Vendor' />
        }
      </div>
    </div>
  );
};

export default VendorDisplayCatalog;
