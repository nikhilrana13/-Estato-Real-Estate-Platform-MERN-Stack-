import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import nophotos from "../../assets/nophotos.svg"
import { timeAgo } from "@/utils/formatters";

const PropertyImageSlider = ({ images,createdAt }) => {
  const [current, setCurrent] = useState(0);
  const safeImages = images?.length ? images : [nophotos]
  const total = safeImages.length

  const prev = (e) => {
    e.stopPropagation();
    setCurrent((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const next = (e) => {
    e.stopPropagation();
    setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1));
  };
  const hasMultipleImages = images?.length > 1;


  return (
    <div className="relative w-full h-[200px] md:h-full overflow-hidden rounded-md group">

      {/* SLIDER TRACK */}
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {safeImages?.map((img, i) => (
          <img
            key={i}
            src={img}
            alt="property"
            className="w-full h-full object-cover flex-shrink-0"
          />
        ))}
      </div>
      {hasMultipleImages && (
        <>
          {/* LEFT ARROW */}
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2
      bg-black/40 text-white p-1 rounded-full
      opacity-0 group-hover:opacity-100 transition"
          >
            <ChevronLeft size={18} />
          </button>



          {/* RIGHT ARROW */}
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2
        bg-black/40 text-white p-1 rounded-full
        opacity-0 group-hover:opacity-100 transition"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}

      {/* DOTS */}
      {
        hasMultipleImages && (
           <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
        {images.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 w-1.5 rounded-full transition ${i === current ? "bg-white" : "bg-white/50"
              }`}
          />
        ))}
      </div>
        )
      }
     

      {/* TIME BADGE */}
      <span className="absolute bottom-2 right-2 text-xs bg-black/60 text-white px-2 py-0.5 rounded">
        {timeAgo(createdAt || new Date().toISOString())}
      </span>
    </div>
  );
};

export default PropertyImageSlider;

