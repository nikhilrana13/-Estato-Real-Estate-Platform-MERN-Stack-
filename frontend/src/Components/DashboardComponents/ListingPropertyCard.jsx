import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { MdModeEdit } from 'react-icons/md'
import fallbackpropertyimg from "../../assets/Nopropertyimg.jpg"
import ActiveBadge from './ActiveBadge'
import { X } from 'lucide-react'
import { formatPrice } from '../../utils/formatters.js'

const ListingPropertyCard = ({property,handleDeleteListing}) => {
    console.log("property",property)
    const isResidential = property?.residential;
  const isCommercial = property?.commercial;

  const data = isResidential ? property.residential : property.commercial;

  return (
    <div className='border flex rounded-md flex-col gap-3'>
        <div className='flex p-3  justify-between'>
            <span className='text-[0.8rem] text-[#767676]'>ID:{property._id.slice(0,9) || "NA"}</span>
            <div className='flex items-center gap-3'>
                <MdModeEdit className='cursor-pointer text-[#767676]' />
                <X onClick={handleDeleteListing} className='text-[#767676] cursor-pointer' />
            </div>
        </div>
        <div className='flex flex-col lg:h-[200px] border  lg:flex-row '>
            <div>
                <img src={property?.images?.[0]||fallbackpropertyimg} className='w-full lg:w-[200px]  h-full' alt="property" />
            </div>
            <div className='flex w-full flex-col gap-2'>
                <div className='flex p-2 justify-between gap-3 '>
                <span className='text-[1rem] font-[600]'>{formatPrice(data?.propertyPrice || "NA")}</span>
                 {property?.status === "active" && <ActiveBadge />}
                 
                </div>
                <span className='text-[1rem] px-2 font-[700]'> {isResidential ? `${data?.bhk || ""} ${data?.type || ""}` : data?.type || "NA"}</span>
                <span className='text-[0.8rem] px-2 flex gap-2 text-[#767676] font-[500]'>
                  {data?.plotArea || "NA"}
                  <span> {data?.plotAreaUnit || "NA"}</span>
                </span>
                <div className='h-full bg-[#F9F5FF]  flex gap-5 flex-wrap'>
                    <div className='flex p-2 flex-col gap-1'>
                        <span className='text-[0.8rem] font-[400]'>Last Added</span>
                        <span className='text-[0.9rem] font-[400]' >{new Date(property?.createdAt).toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "short",
                                 year:"2-digit"
                            }) || "NA"}</span>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default ListingPropertyCard