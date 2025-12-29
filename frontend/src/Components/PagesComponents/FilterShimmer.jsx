import React from "react";

const FiltersShimmer = () => {
  return (
    <div className="p-3 flex flex-col gap-4 animate-pulse">
      {/* Title */}
      <div className="h-4 w-24 bg-gray-200 rounded" />

      {/* Budget */}
      <div className="flex flex-col gap-2 mt-2">
        <div className="h-3 w-20 bg-gray-200 rounded" />
        <div className="h-2 w-full bg-gray-200 rounded" />
        <div className="flex justify-between">
          <div className="h-3 w-14 bg-gray-200 rounded" />
          <div className="h-3 w-14 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Repeated filter blocks */}
      {[1, 2, 3, 4].map((_, i) => (
        <div key={i} className="flex flex-col gap-3 mt-4 border-t pt-3">
          <div className="flex justify-between items-center">
            <div className="h-3 w-32 bg-gray-200 rounded" />
            <div className="h-3 w-3 bg-gray-200 rounded-full" />
          </div>

          <div className="grid grid-cols-1 gap-2">
            {[1, 2, 3].map((_, j) => (
              <div
                key={j}
                className="h-8 w-full bg-gray-200 rounded-full"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FiltersShimmer;
