import { AMENITY_ICONS } from '../../utils/AmenityIcons';
import { formatLabel } from '../../utils/formatters';
import React, { useState } from 'react'

const PropertyAmenities = ({Amenities}) => {
    const [showAll, setShowAll] = useState(false);
    // console.log("amenties",Amenities)

   if(!Amenities.length) return null

   // helpers (same file, minimal)
  const normalizeAmenity = (name = "") => name.toLowerCase().replace(/\s|_/g, "");
   const getAmenityName = (item) =>
    typeof item === "string" ? item : item?.name;

  const getAmenityIcon = (name) => {
    const key = normalizeAmenity(name);
    return AMENITY_ICONS[key] || AMENITY_ICONS.default;
  };

  const visibleAmenities = Amenities.slice(0, 7);
  const remaining = Amenities.slice(7);
  const extraCount = Amenities.length - 7;

  return (
    <div className='w-full bg-white  rounded-md p-4 sm:p-6 mt-6'>
      {/* Title */}
      <h2 className="text-[1.2rem] sm:text-[1.3rem] font-[600]">
         Amenities
      </h2>
      <hr className="my-4" />
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 md:grid-cols-4'>
        {/* First 8 Amenities */}
        {visibleAmenities.map((item,index)=>{
             const name = getAmenityName(item)
             const Icon = getAmenityIcon(name)
            return (
            <div key={item._id || index} className='border rounded-md flex flex-col gap-2 p-4 bg-white'>
            <Icon size={22}  />
            <span className='text-[#434343] text-[0.9rem]'>{formatLabel(name)}</span>
          </div>
            )
        })}
          {/* +More box */}
        {!showAll && extraCount > 0 && (
          <div
            onClick={() => setShowAll(true)}
            className='border cursor-pointer rounded-md flex flex-col gap-2 p-4 bg-white
                         hover:bg-[#f5f5f5] transition'
          >
            <span className='text-[1rem] font-[600]'>+{extraCount}</span>
            <span className='text-[0.8rem] font-[500]'>
              More amenities
            </span>
          </div>
        )}
        {/* Expanded remaining amenities */}
        {showAll && remaining.map((item, index) => {
             const name = getAmenityName(item)
             const Icon = getAmenityIcon(name)
            return(
                 <div key={item?._id ||index} className='border rounded-md flex flex-col gap-2 p-4 bg-white'>
            <Icon size={22}  />
            <span className='text-[#434343] text-[0.9rem]'>{formatLabel(name)}</span>
          </div>
            )
        })}
      </div>

    </div>
  )
}

export default PropertyAmenities