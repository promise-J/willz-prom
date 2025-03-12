import React, { useState } from "react";

function ImagesUploader({ images, setImages, setFiles, isMultiple=true }) {

  const [deletedImages, setDeletedImages] = useState([]);
  const handleImageClick = (src) => {
    setImages((prevImages) => prevImages.filter((image) => image !== src));
    setDeletedImages((prevDeletedImages) => [...prevDeletedImages, src]);
  };

  const restoreImage = (src) => {
    setDeletedImages((prevDeletedImages) => prevDeletedImages.filter((image) => image !== src));
    setImages((prevImages) => [...prevImages, src]);
  };


  // Function to handle image upload
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...files]);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  return (
    <div>
      {/* Upload Image Section */}
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
        className="mb-4 hidden"
        id="upload-image"
      />
      <div className="flex items-center">
        <label htmlFor="upload-image">
          <img
            src="/images/image-placeholder.svg"
            className="w-[130px] cursor-pointer h-[130px] animate-pulse"
          />
        </label>
        <h3>Add images</h3>
      </div>

      {/* Display Images Section */}
      {images.length > 0 &&
      <div className="flex h-[200px] p-3 overflow-x-auto gap-5 w-full">
        {images.map((src, index) => (
        //   <div key={index} className="relative">
            <img
              src={src}
              key={index}
              alt={`uploaded-${index}`}
              className="w-[200px] object-cover cursor-pointer h-full rounded-[15px] hover:scale-[1.1] duration-500 ease-in-out"
              onClick={() => handleImageClick(src)} // Remove image on click
            />
        //   </div>
        ))}
      </div>
      }
      {deletedImages.length > 0 && (
        <div>
          <h3>Removed Images</h3>
          <div className="flex h-[200px] p-3 overflow-x-auto gap-5 w-full">
            {deletedImages.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`deleted-${index}`}
                  className="w-[200px] object-cover cursor-pointer h-full rounded-[15px] hover:scale-[1.1] duration-500 ease-in-out"
                  onClick={() => restoreImage(src)} // Restore image when clicked
                />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ImagesUploader;
