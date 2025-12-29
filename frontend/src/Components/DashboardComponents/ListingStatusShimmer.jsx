import React from "react";

const ListingStatusShimmer = () => {
  const shimmerItems = [1, 2, 3, 4]; // 4 boxes

  return (
    <div className="w-full bg-white rounded-xl p-5 shadow-sm">
      {/* Title shimmer */}
      <div className="h-5 w-40 bg-gray-200 rounded animate-pulse mb-4"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {shimmerItems.map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 rounded-xl border bg-white"
          >
            {/* Left side text shimmer */}
            <div className="flex flex-col gap-2 w-full">
              <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-5 w-16 bg-gray-300 rounded animate-pulse"></div>
            </div>

            {/* Right side circular icon shimmer */}
            <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListingStatusShimmer;
