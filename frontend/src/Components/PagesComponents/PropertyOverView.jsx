import { formatLabel, formatPrice, timeAgo } from "@/utils/formatters";
import React, { useState } from "react";

const PropertyOverview = ({ data }) => {
  const [showMore, setShowMore] = useState(false);
    const propertyType = data?.residential || data?.commercial
    const details = propertyType
    // console.log("Data",details)
  return (
    <div className="w-full bg-white rounded-md p-4 sm:p-6 mt-6">
      {/* Title */}
      <h2 className="text-[1.2rem] sm:text-[1.3rem] font-[600]">
        Property Overview
      </h2>
      <hr className="my-4" />
      {/* RESPONSIVE GRID */}
      <div className="
        grid 
        grid-cols-2
        sm:grid-cols-2
        md:grid-cols-3
        gap-y-6
        gap-x-4
      ">
        {/* Project Name */}
        <div className="flex flex-col">
          <span className="text-[#8C8C8C] text-[0.75rem] sm:text-[0.8rem]">Buliding Name</span>
          <p className="text-[0.9rem] sm:text-[1rem] font-[500] underline cursor-pointer">
            {details?.address?.buildingName || "NA"}
          </p>
        </div>
        {/* Brokerage */}
        <div className="flex flex-col">
          <span className="text-[#8C8C8C] text-[0.75rem] sm:text-[0.8rem]">Brokerage</span>
          <p className="text-[0.9rem] sm:text-[1rem] font-[500]">
            {data?.brokerage || "No Charge"}
          </p>
          <p className="text-[#5E23DC] underline text-[0.75rem] sm:text-[0.85rem] cursor-pointer">
            Access Zero Brokerage Properties &gt;
          </p>
        </div>
        {/* Price */}
        <div className="flex flex-col">
          <span className="text-[#8C8C8C] text-[0.75rem] sm:text-[0.8rem]">Price</span>
          <p className="text-[1rem] font-[500]">{formatPrice(details?.propertyPrice || "NA")}</p>
        </div>
        {/* Bedrooms for residential */}
        {
            propertyType === "residential" && (
         <div className="flex flex-col">
          <span className="text-[#8C8C8C] text-[0.75rem] sm:text-[0.8rem]">Bedrooms</span>
          <p className="text-[1rem] font-[500]">{details?.bhk}</p>
        </div>
            )
        }
        {
            propertyType === "commercial" && (
                  <div className="flex flex-col">
          <span className="text-[#8C8C8C] text-[0.75rem] sm:text-[0.8rem]">location Hub</span>
          <p className="text-[1rem] font-[500]">{formatLabel(details?.advancedDetails?.locationHub)}</p>
        </div>
            )
        }
        {/* Bathrooms */}
        {
            propertyType === "residential" && (
              
                   <div className="flex flex-col">
          <span className="text-[#8C8C8C] text-[0.75rem] sm:text-[0.8rem]">Bathrooms</span>
          <p className="text-[1rem] font-[500]">{details?.advancedDetails?.bathroom}</p>
        </div>
            )
        }
        {
            propertyType === "commercial" && (
              
                   <div className="flex flex-col">
          <span className="text-[#8C8C8C] text-[0.75rem] sm:text-[0.8rem]">zoneType</span>
          <p className="text-[1rem] font-[500]">{details?.advancedDetails?.zoneType}</p>
        </div>
            )
        }
        {/* Parking */}
        {
            propertyType === "residential" && (
                 <div className="flex flex-col">
          <span className="text-[#8C8C8C] text-[0.75rem] sm:text-[0.8rem]">Parking</span>
          <p className="text-[1rem] font-[500]">
            {details?.advancedDetails?.coveredParking}
          </p>
        </div>

            )
        }
        {
            propertyType === "commercial" && (
                 <div className="flex flex-col">
          <span className="text-[#8C8C8C] text-[0.75rem] sm:text-[0.8rem]">OwnerShip</span>
          <p className="text-[1rem] font-[500]">
            {details?.advancedDetails?.ownership}
          </p>
        </div>
            )
        }
        {/* Balcony */}
        {
            propertyType === "residential" && (
            <div className="flex flex-col">
          <span className="text-[#8C8C8C] text-[0.75rem] sm:text-[0.8rem]">Balcony</span>
          <p className="text-[1rem] font-[500]">{details?.advancedDetails?.balcony}</p>
        </div>
            )
        }
        {
            propertyType === "commercial" && (
            <div className="flex flex-col">
          <span className="text-[#8C8C8C] text-[0.75rem] sm:text-[0.8rem]">Available from</span>
          <p className="text-[1rem] font-[500]">{new Date(details?.availableFrom).toLocaleDateString()}</p>
        </div>
            )
        }
        {/* Added */}
        <div className="flex flex-col">
          <span className="text-[#8C8C8C] text-[0.75rem] sm:text-[0.8rem]">Added</span>
          <p className="text-[1rem] font-[500]">{timeAgo(data?.createdAt || "NA")}</p>
        </div>
      </div>
      {/* ABOUT SECTION */}
      <div className="mt-6">
        <h3 className="font-[600] text-[1rem] sm:text-[1.1rem]">About this property</h3>

        <p className="text-[#767676] whitespace-normal break-words text-[0.85rem] sm:text-[0.9rem] mt-2 leading-6">
          {showMore
            ? data?.propertydescription
            : data?.propertydescription?.slice(0, 220) + "..."}
        </p>
        {/* Read More Button */}
        {data?.propertydescription?.length > 220 && (
          <button
            onClick={() => setShowMore(!showMore)}
            className="text-[#5E23DC] text-[0.85rem] sm:text-[0.9rem] mt-3 font-[500]"
          >
            {showMore ? "Read Less ▲" : "Read More ▼"}
          </button>
        )}
      </div>
    </div>
  );
};

export default PropertyOverview;
