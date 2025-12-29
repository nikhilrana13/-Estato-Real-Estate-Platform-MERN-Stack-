import React, { useEffect } from "react";
import { X } from "lucide-react";
import {Swiper,SwiperSlide} from "swiper/react";
import { Navigation, Pagination, Keyboard } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
 
    

const ImageViewerModal = ({ images, startIndex=0, onClose }) => {
  // ESC close support
  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [onClose]);

  
  return (
    <div  className="fixed w-full inset-0 z-[999] bg-black/95 flex items-center justify-center">
 {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-[88px] right-6 text-white z-50"
      >
        <X size={32} />
      </button>

      <Swiper
        modules={[Navigation, Pagination, Keyboard]}
        initialSlide={startIndex}
        navigation
        pagination={{ clickable: true }}
        keyboard={{ enabled: true }}
        loop={true}
        className="w-full h-full"
      >
        {images.map((img, i) => (
          <SwiperSlide
            key={i}
          >
            <div className="flex items-center w-full h-full  justify-center">
             <img
              src={img}
              alt="property"
              className="max-h-[85vh] max-w-[90vw] rounded-md"
            />
            </div>
           
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageViewerModal;



    //   <div
    //     className="relative flex items-center justify-center"
    //     onClick={(e) => e.stopPropagation()} //STOP BUBBLING
    //   >
    //     {/* Close */}
    //   <button
    //     onClick={onClose}
    //     className="absolute top-6 right-6 text-white"
    //   >
    //     <X size={30} />
    //   </button>

    //   {/* Counter */}
    //   <span className="absolute top-6 left-6 text-white text-sm">
    //     {activeIndex + 1}/{images.length}
    //   </span>
    //   {/* Prev */}
    //   <button
    //     onClick={prev}
    //     className="absolute left-6 text-white hover:scale-110 transition"
    //   >
    //     <ChevronLeft size={40} />
    //   </button>

    //   {/* Image */}
    //   <img
    //     src={images[activeIndex]}
    //     alt="property"
    //     className="max-h-[85vh] max-w-[90vw] object-contain"
    //   />

    //   {/* Next */}
    //   <button
    //     onClick={next}
    //     className="absolute right-6 text-white hover:scale-110 transition"
    //   >
    //     <ChevronRight size={40} />
    //   </button>
    //   </div>