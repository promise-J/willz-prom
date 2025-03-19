import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import AddCatalogModal from "../../components/modals/AddCatalogModal";
import { useModal } from "../../context/ModalContext";
import ApiSetup from "../../utils/ApiSetup";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { formatNumberWithCommas } from "../../utils/helpers";

const VendorCatalog = () => {
  const api = ApiSetup();
  const { setIsOpenCatalog } = useModal();
  const { userInfo } = useAuth();

  const [catalogs, setCatalogs] = useState([]);

  console.log(userInfo?._id,'the id')
  useEffect(() => {
    async function getVendorCatalogs() {
      const res = await api.get(`catalogs/catalog?vendorId=${userInfo?._id}`);
      setCatalogs(res?.data?.data?.message);
    }
    if(userInfo?._id){
        getVendorCatalogs();
    }
  }, [userInfo]);

  return (
    <Container>
      <h1 className="text-center font-bold uppercase mt-4">View my catalog</h1>
      <div className="flex justify-center mt-6">
        <button
          className="border border-gray-200 px-5 py-1 rounded-lg w-full"
          onClick={() => setIsOpenCatalog(true)}
        >
          Add item
        </button>
      </div>
      <div className="mt-8 grid md:grid-cols-2 p-5 gap-7 grid-cols-1">
        {catalogs.map((cat) => (
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
                <h1>{cat?.name.length > 50 ? cat?.name.slice(0, 50) + "..." : cat?.name}</h1>
                <p className="text-sm my-2">{cat?.description.length > 200 ? cat?.description.slice(0, 200) + "..." : cat?.description}</p>
                <p className="text-[12px]">{formatNumberWithCommas(cat?.price)}</p>
                <Link to={`/dashboard/vendor-catalog/${cat?._id}`}>
                  <button className="border px-10 py-1 mt-2 rounded-lg w-full">
                    Edit
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <AddCatalogModal />
    </Container>
  );
};

export default VendorCatalog;
