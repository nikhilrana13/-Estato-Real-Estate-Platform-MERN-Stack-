import React, { useState } from "react";
import ImageViewerModal from "./ImagesViewerModel";

const PropertyImageGallery = ({ images = [] }) => {
  const [active, setActive] = useState(0);
  const [open,setOpen] = useState(false)
  if (!images.length) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 mt-4">
      {/* LEFT BIG IMAGE */}
      <div onClick={()=> setOpen(true)} className="lg:col-span-3  cursor-pointer relative shadow-md overflow-hidden rounded-lg">
        <img
          src={images[active]}
          alt="property"
          className="w-full h-[205px] sm:h-[422px] object-cover rounded-lg"
        />
      </div>

      {/* RIGHT THUMBNAILS */}
      <div className="flex  flex-col gap-3">
        {images.slice(1, 3).map((img, index) => (
          <div
            key={index}
            onClick={()=>{
                setActive(index + 1)
                setOpen(true)
            }}
            className="relative cursor-pointer"
          >
            <img
              src={img}
              alt="thumb"
              className="w-full h-[205px] object-cover rounded-lg"
            />
            {/* +more overlay */}
            {index === 1 && images.length > 3 && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-lg">
                <span className="text-white text-xl font-semibold">
                  +{images.length - 3} more
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* open model */}
      {
        open  && (
        <ImageViewerModal
          images={images}
          startIndex={active}
          onClose={() => setOpen(false)}
        />
        )
      }
    </div>
  );
};

export default PropertyImageGallery;
