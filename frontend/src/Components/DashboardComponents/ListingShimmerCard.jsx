import React from "react";
import "../../index.css"

const ListingShimmerCard = () => {
  return (
    <div className="border flex rounded-md flex-col gap-3 animate-pulse">
      
      {/* Top */}
      <div className="flex p-3 justify-between">
        <span className="shimmer h-4 w-24 rounded"></span>
        <div className="flex gap-3">
          <span className="shimmer h-5 w-5 rounded"></span>
          <span className="shimmer h-5 w-5 rounded"></span>
        </div>
      </div>

      {/* Main Section */}
      <div className="flex flex-col lg:h-[200px] border lg:flex-row">
        
        {/* Image */}
        <div>
          <div className="shimmer w-full lg:w-[150px] h-[200px]"></div>
        </div>

        {/* Right Side */}
        <div className="flex w-full  flex-col gap-2 ">
          
          <div className="flex p-2 justify-between">
            <span className="shimmer h-5 w-20 rounded"></span>
            <span className="shimmer h-5 w-16 rounded"></span>
          </div>

          <span className="shimmer ml-2 p-2 h-4 w-32 rounded"></span>

          <div className="flex p-2 gap-3">
            <span className="shimmer h-4 w-20 rounded"></span>
            <span className="shimmer h-4 w-16 rounded"></span>
          </div>

          <div className="h-full bg-[#F9F5FF] flex">
            <div className="flex p-2 flex-col gap-1">
              <span className="shimmer h-3 w-20 rounded"></span>
              <span className="shimmer h-4 w-24 rounded"></span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ListingShimmerCard;
