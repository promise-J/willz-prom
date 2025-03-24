import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { useModal } from "../../context/ModalContext";
import ImagesUploader from "../file/ImagesUploader";
import ApiSetup from "../../utils/ApiSetup";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const initialCatalog = {
  vendor: "",
  name: "",
  description: "",
  price: "",
  images: [],
};

const AddCatalogModal = () => {
  const { isOpenCatalog, setIsOpenCatalog, appLoading } = useModal();
  const { uploadSingleImage, uploadMultipleImage, userInfo } = useAuth();
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [catalog, setCatalog] = useState(initialCatalog)

  const api = ApiSetup();


  useEffect(()=>{
    setCatalog({...catalog, vendor: userInfo?._id})
  },[userInfo])

  function closeModal() {
    setIsOpenCatalog(false);
  }

  async function addCatalog() {
    // console.log({files, images})
    if (files.length < 1){
      return toast.error("Please enter at least one image",{position: 'top-right'});
    }

    if(!catalog.vendor || !catalog.description || !catalog.name || !catalog.price){
      return toast.error('Please enter the required values',{position: 'top-right'})
    }

    const imageRes = await uploadMultipleImage(files);
    if(imageRes.success){
      setCatalog({...catalog, images: imageRes.message})
      const res = await api.post("catalogs/catalog", catalog)
      if(res?.data?.success){
        setFiles([])
        setCatalog(initialCatalog)
        setImages([])
        window.location.reload()
        return toast.success(res?.data?.data?.message, {position: 'top-right'})
      }else{
        return toast.error(res?.data?.data?.error, {position: 'top-right'})
      }
    }
  }

  function handleClose(){
    setImages([])
    setCatalog(initialCatalog)
    setIsOpenCatalog(false)
  }


  return (
    <Modal isOpen={isOpenCatalog} closeModal={closeModal}>
      <div className="bg-white h-[95vh] w-[90%] md:w-[60%]">
        <h1 className="text-center mt-5 text-xl">Add Catalog</h1>
        <div className="overflow-y-auto h-[90%]">
          <div className="py-1 md:px-4 px-3">
            <label htmlFor="" className="text-sm text-blue-900">
              Enter Product Name
            </label>
            <input
              onChange={(e) => setCatalog({...catalog, name: e.target.value})}
              name="name"
              value={catalog.name}
              type="text"
              placeholder="Enter product name"
              className="border w-full mb-4 py-2 px-2 outline-none rounded-lg"
            />
            <label htmlFor="" className="text-sm text-blue-900">
              Enter Product Description
            </label>
            <input
              onChange={(e) => setCatalog({...catalog, description: e.target.value})}
              name="description"
               value={catalog.description}
              type="text"
              placeholder="Enter product description"
              className="border w-full mb-4 py-2 px-2 outline-none rounded-lg"
            />
            <label htmlFor="" className="text-sm text-blue-900">
              Enter Product Price
            </label>
            <input
              onChange={(e) => setCatalog({...catalog, price: e.target.value})}
              name="price"
             value={catalog.price}
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
                onClick={handleClose}
                className="border border-red-500 px-10 py-1 rounded-lg md:w-full text-red-600"
              >
                Cancel
              </button>
              <button
                onClick={addCatalog}
                className="px-10 py-1 rounded-lg md:w-full bg-blue-900 text-white"
              >
                {appLoading ? "Loading..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddCatalogModal;
