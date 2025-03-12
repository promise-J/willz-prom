import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import { useModal } from "../../context/ModalContext";
import toast from "react-hot-toast";
import ApiSetup from "../../utils/ApiSetup";
import { useAuth } from "../../context/AuthContext";
import ImagesUploader from "../../components/file/ImagesUploader";
import { useNavigate, useParams } from "react-router-dom";
import { capitalizeFirstLetter } from "../../utils/helpers";

const initialCatalog = { name: "", description: "", price: "" };

const VendorEditCatalog = () => {
  const api = ApiSetup();
  const navigate = useNavigate()
  const { setIsOpenCatalog, appLoading } = useModal();
  const { uploadSingleImage, uploadMultipleImage, userInfo } = useAuth();
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [catalog, setCatalog] = useState();

  const { id: catalogId } = useParams();

  useEffect(() => {
    async function getCatalog() {
      const res = await api.get(`catalogs/catalog/${catalogId}`);
      const catalog = res?.data?.data?.message
        ? res?.data?.data?.message
        : null;
      setCatalog({
        name: catalog?.name,
        description: catalog?.description,
        price: catalog?.price,
      });
    }
    if (catalogId) {
      getCatalog();
    }
  }, [catalogId]);

  async function editCatalog() {
    // console.log({ files, images });
    // if (files.length < 1) {
    //   return toast.error("Please enter at least one image");
    // }

    // if (
    //   !catalog.vendor ||
    //   !catalog.description ||
    //   !catalog.name ||
    //   !catalog.price
    // ) {
    //   return toast.error("Please enter the required values");
    // }

    // const imageRes = await uploadMultipleImage(files);
    //   setCatalog({ ...catalog, images: imageRes.message });
    const res = await api.put(`catalogs/catalog/${catalogId}`, catalog);
    if (res?.data?.success) {
      setFiles([]);
      setCatalog(initialCatalog);
      setImages([]);
      toast.success(res?.data?.data?.message, {
        position: "top-right",
      });
      return navigate('/dashboard/vendor-catalog')
    } else {
      return toast.error(res?.data?.data?.error, { position: "top-right" });
    }
  }

  function handleClose() {
    setImages([]);
    setCatalog(initialCatalog);
    setIsOpenCatalog(false);
  }

  return (
    <Container>
      <div className="bg-white h-[95vh] w-[90%] md:w-[60%]">
        <h1 className="text-center mt-5 text-xl">Add Catalog</h1>
        <div className="h-[90%]">
          <div className="py-1 md:px-4 px-3">
            <label htmlFor="" className="text-sm text-blue-900">
              Enter {capitalizeFirstLetter(userInfo?.offerType)} Name
            </label>
            <input
              onChange={(e) => setCatalog({ ...catalog, name: e.target.value })}
              name="name"
              disabled
              value={catalog?.name || ""}
              type="text"
              placeholder="Enter product name"
              className="border w-full mb-4 py-2 px-2 outline-none rounded-lg"
            />
            <label htmlFor="" className="text-sm text-blue-900">
              Enter Product Description
            </label>
            <textarea 
               onChange={(e) =>
                setCatalog({ ...catalog, description: e.target.value })
              }
              name="description"
              value={catalog?.description || ""}
              type="text"
              placeholder="Enter product description"
              className="border w-full mb-4 py-2 px-2 outline-none rounded-lg h-[120px]"
            >
           
            </textarea>
            <label htmlFor="" className="text-sm text-blue-900">
              Enter Product Price
            </label>
            <input
              onChange={(e) =>
                setCatalog({ ...catalog, price: e.target.value })
              }
              name="price"
              value={catalog?.price || ""}
              type="text"
              placeholder="Enter product price"
              className="border w-full py-2 px-2 outline-none rounded-lg"
            />
            <ImagesUploader
              images={images}
              setImages={setImages}
              setFiles={setFiles}
            />
            {images.length > 0 && (
              <marquee className="text-red-500" behavior="" direction="">
                Click on an image above to remove it
              </marquee>
            )}
            <div className="mb-5 mt-10 flex md:gap-5 gap-2 px-5 justify-around">
              <button
                onClick={editCatalog}
                className="px-10 py-1 rounded-lg md:w-full bg-blue-900 text-white"
              >
                {appLoading ? "Loading..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default VendorEditCatalog;
