import { HeartIcon } from 'lucide-react'
import React from 'react'
import PropertyImageSlider from './PropertyImageSlider'
import unknownuser from "../../assets/unknownuser.webp"
import { formatLabel, formatPrice } from '../../utils/formatters.js'
import nophotos from "../../assets/nophotos.svg"
import ContactSellerformDialog from './ContactSellerformDialog'

const PropertyListingCard = ({ type, property ,onNavigate}) => {
  // console.log("property", property)
  const details = type === "commercial" ? property.commercial : property.residential
  if (!details) return null
  const address = details.address || {}
  const rawStatus = type === "commercial"? details?.constructionStatus: details?.furnishType
  const displayStatus = typeof rawStatus === "string" && rawStatus.trim()  ? formatLabel(rawStatus): "NA";

   
  return (
    <div className='w-full bg-white cursor-pointer  rounded-md gap-2  hover:shadow-lg p-3 flex flex-col md:flex-row'>
      {/* image slider */}
      <div className='w-full cursor-pointer md:w-[300px]' onClick={(e) => e.stopPropagation()}>
        <PropertyImageSlider createdAt={property?.createdAt} images={property?.images || nophotos} />
      </div>
      {/* content area */}
      <div  onClick={onNavigate} className='flex w-full px-2 sm:px-3 flex-col gap-2'>
        <div className='flex  justify-between'>
          <div className='flex flex-col gap-2'>
            <h2 className='font-semibold text-[1rem] sm:text-lg'>
              {type === "commercial"
                ? `${details?.type} for ${property?.lookingTo === "Sell" ? "Sale" : "Rent"}`
                : `${details?.bhk} ${details?.type} for ${property?.lookingTo === "Sell" ? "Sale" : "Rent"}`
              } in {address?.city}
            </h2>
            <span className='text-[#222222] font-[400]'>
              {address?.buildingName || address?.locality || "NA"}
            </span>
          </div>
          <HeartIcon />
        </div>
        <div className='flex flex-col gap-2 md:flex-row'>
          <div className='flex flex-col pr-3 border-r '>
            <span className='text-[0.8rem] font-[600] '>{formatPrice(details?.propertyPrice)}</span>
            <span className='text-[0.8rem] font-[400] text-[#6D6D6D]'> See price breakup </span>
          </div>
          <div className='flex flex-col sm:px-3 border-r '>
            <span className='text-[0.8rem] font-[600] text-[#6D6D6D] '>{details?.plotArea || "NA"} {details?.plotAreaUnit || "NA"}</span>
            <span className='text-[0.8rem] font-[400] text-[#6D6D6D]'>Build up area</span>
          </div>
          <div className='flex flex-col sm:px-3 '>
            <span className='text-[0.8rem] font-[600] text-[#6D6D6D]'>{displayStatus}</span>
            <span className='text-[0.8rem] font-[400] text-[#6D6D6D]'>{type === "commercial" ? "Possession Status" : "Furnishing status"}</span>
          </div>

        </div>
        {/* Amenities */}
        <span className='text-[0.8rem] font-[400] text-[#6D6D6D]'>  Amenities:{" "}
          {type === "residential"
            ? (details?.societyAmenities?.length
              ? details.societyAmenities.map(a => formatLabel(a)).join(", ")
              : "NA")
            : (details?.amenities?.length
              ? details.amenities.map(a => formatLabel(a)).join(", ")
              : "NA")}</span>
        {/* contact */}
        <div className='flex mt-5 justify-between sm:px-2 pt-3 items-center border-t'>
          <div className='flex gap-1'>
            <img src={property?.userId?.profilepic || unknownuser} alt="profile pic" className='w-10 h-10 rounded-full' />
            <div className='flex flex-col'>
              <span className='text-[0.8rem] font-[500]'>{property?.userId?.username}</span>
              <span className='text-[0.8rem] font-[400] text-[#6D6D6D]'>{property?.whoYouAre}</span>
            </div>
          </div>
          <button className="bg-[#5E23DC] font-[600] text-white text-[0.8rem] rounded-md px-3 py-2  flex items-center">
            Contact
          </button>
        </div>

      </div>

    </div>
  )
}

export default PropertyListingCard