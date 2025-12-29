import React from "react";

const PropertyListingCardShimmer = () => {
  return (
    <div className="w-full bg-white rounded-md p-3 flex flex-col md:flex-row gap-3 animate-pulse">

      {/* IMAGE SHIMMER */}
      <div className="w-full md:w-[300px] h-[200px] bg-gray-200 rounded-md" />

      {/* CONTENT */}
      <div className="flex flex-col w-full px-2 sm:px-3 gap-3">

        {/* TITLE + HEART */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-2 w-[80%]">
            <div className="h-4 bg-gray-200 rounded w-[70%]" />
            <div className="h-3 bg-gray-200 rounded w-[40%]" />
          </div>
          <div className="h-5 w-5 bg-gray-200 rounded-full" />
        </div>

        {/* PRICE / AREA / STATUS */}
        <div className="flex flex-col md:flex-row gap-4">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="flex flex-col gap-2 pr-3 border-r last:border-none">
              <div className="h-3 bg-gray-200 rounded w-20" />
              <div className="h-3 bg-gray-200 rounded w-24" />
            </div>
          ))}
        </div>

        {/* AMENITIES */}
        <div className="h-3 bg-gray-200 rounded w-[90%]" />

        {/* CONTACT SECTION */}
        <div className="flex justify-between items-center pt-3 border-t mt-2">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 bg-gray-200 rounded-full" />
            <div className="flex flex-col gap-2">
              <div className="h-3 bg-gray-200 rounded w-24" />
              <div className="h-3 bg-gray-200 rounded w-16" />
            </div>
          </div>

          <div className="h-8 w-20 bg-gray-200 rounded-md" />
        </div>

      </div>
    </div>
  );
};

export default PropertyListingCardShimmer;
