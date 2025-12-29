import React from "react";

const BoostVisibilityShimmer = () => {
  const shimmerCards = [1, 2, 3]; // 3 step cards

  return (
    <div className="w-full bg-[#F7F7FB] p-6 rounded-xl border mt-5">
      {/* Alert shimmer */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-5 h-5 bg-gray-300 rounded-full animate-pulse"></div>
        <div className="h-4 w-64 bg-gray-300 rounded animate-pulse"></div>
      </div>

      {/* Cards shimmer */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {shimmerCards.map((_, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-xl border shadow-sm"
          >
            {/* Title + Status */}
            <div className="flex items-center justify-between">
              <div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* Description */}
            <div className="h-3 w-36 bg-gray-200 rounded mt-2 animate-pulse"></div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-gray-200 my-4"></div>

            {/* Visibility Label */}
            <div className="flex items-center gap-2 mt-2">
              <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-10 bg-gray-300 rounded animate-pulse"></div>
              <div className="w-4 h-4 bg-gray-300 rounded-full animate-pulse"></div>
            </div>

            {/* Button */}
            <div className="w-full h-9 bg-gray-200 rounded-md mt-4 animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoostVisibilityShimmer;
