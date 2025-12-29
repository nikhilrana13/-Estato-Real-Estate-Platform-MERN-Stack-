import { ChevronDown, ChevronUp, PlusIcon } from 'lucide-react'
import React, { useState } from 'react'
import UsePropertyFilters from '../CustomHook/UsePropertyFilters'

const PropertySearchFilters = ({ type, filters }) => {
    const [typeOpen, setTypeOpen] = useState(true)
    const [openBhk, setOpenBhk] = useState(false)
    const [openConstruction, setOpenCon] = useState(false)
    const [openAmenities, setOpenAmenities] = useState(true)
    const [openFurnish, setOpenFurnish] = useState(true)

    // console.log("selected property type",filters.propertytype)
    // console.log("selected Bhks",filters.Bhks)
    // console.log("construction status",filters.constructionStatus)
    // console.log("furnish type",filters.furnishType)

    const residentialPropertytypes = [
        "Apartment", "Independent House", "Duplex", "Independent Floor", "Villa", "Penthouse", "Studio", "Plot", "Farmhouse", "Agricultural Land",
    ]
    const commercialPropertytypes = [
        "office", "retailshop", "showroom", "warehouse", "plot", "others"
    ]
    const typeofbhks = [
        "1RK", "1BHK", "1.5BHK", "2BHK", "3+BHK"
    ]
    const constructionStatus = [
        "readytomove", "underconstruction"
    ]
    const residentialAmenities = [
        "powerbackup", "swimmingpool", "gym", "lift", "intercom", "garden", "sports", "kidsArea", "cctv", "clubhouse", "gatedcommunity", "communityhall", "watersupply",
    ]
    const furnishType = [
        "fullyfurnished", "semifurnished", "unfurnished"
    ]
    const commercialAmenities = [
        "waterstorage", "powerbackup", "internetconnectivity", "security", "cctv", "cafeteria"
    ]

    const handlePropertyType = (value) => {
        filters.SetPropertytype((prev) => {
            if (prev.includes(value)) {
                return prev.filter((t) => t !== value) // remove if already selected
            } else {
                return [...prev, value] // add if not selected
            }
        })
    }
    const handleBhks = (value) => {
        filters.SetBhks((prev) => {
            if (prev.includes(value)) {
                return prev.filter((b) => b !== value) // remove if already selected
            } else {
                return [...prev, value] // add if not selected
            }
        })
    }
    const handleAmenities = (value) => {
        filters.SetAmenities((prev) => {
            if (prev.includes(value)) {
                return prev.filter((a) => a !== value) // remove if already selected
            } else {
                return [...prev, value] // add if not selected
            }
        })
    }
    const handleFurnishtype = (value) => {
        filters.SetFurnishType((prev) => {
            if (prev.includes(value)) {
                return prev.filter((f) => f !== value) // remove if already selected
            } else {
                return [...prev, value] // add if not selected
            }
        })
    }
    const handleConstructionStatus = (value) => {
        filters.SetConstructionStatus(value)
    }
    // format price numbers to lakh and crore
    const formatPrice = (v) => {
        if (v >= 10000000) return `${(v / 10000000).toFixed(1)} Cr`;
        if (v >= 100000) return `${(v / 100000).toFixed(1)} L`;
        return v.toLocaleString();
    };
   const MAX_PRICE = 1000000000; // 100 Cr
   const STEP = 50000;

    return (
        <div className='flex p-3 flex-col gap-3 '>
            <span className='font-[600] '>Filters</span>
            {/* budget filter */}
            <div className='flex mt-4 border-t py-2 flex-col gap-2'>
                <span className='text-[1rem]  font-[500]'>Budget</span>
                {/* RANGE CONTAINER */}
                <div className="relative w-full h-10">
                    {/* MIN RANGE */}
                    <input
                        type="range"
                        min={0}
                        max={MAX_PRICE}
                        step={STEP}
                        value={filters.minPrice}
                        onChange={(e) => {
                            const value = Math.min(Number(e.target.value), filters.maxPrice - 50000);
                            filters.SetMinPrice(value);
                        }}
                        className="absolute w-full pointer-events-none appearance-none z-20 h-2 bg-transparent"
                    />
                    {/* MAX RANGE */}
                    <input
                        type="range"
                        min={0}
                        max={MAX_PRICE}
                        step={STEP}
                        value={filters.maxPrice}
                        onChange={(e) => {
                            const value = Math.max(Number(e.target.value), filters.minPrice + 50000);
                            filters.SetMaxPrice(value);
                        }}
                        className="absolute w-full  appearance-none z-20 h-2 bg-transparent"
                    />
                    {/* TRACK */}
                    <div className="absolute z-10 h-2 w-full rounded bg-gray-200 top-4" />

                    {/* SELECTED RANGE */}
                    <div
                        className="absolute z-10 h-2 rounded bg-[#5E40E0] top-4"
                        style={{
                            left: `${(filters.minPrice / MAX_PRICE) * 100}%`,
                            width: `${((filters.maxPrice - filters.minPrice) / MAX_PRICE) * 100}%`,
                        }}
                    />
                </div>

                {/* VALUES DISPLAY */}
                <div className="flex justify-between text-[0.8rem] font-[500] text-gray-700">
                    <span>₹ {formatPrice(filters.minPrice)}</span>
                    <span>₹ {formatPrice(filters.maxPrice)}</span>
                </div>


            </div>
            {/* type of property residential */}
            <div className='flex mt-4 border-t py-2 flex-col gap-3'>
                <div onClick={() => setTypeOpen((prev) => !prev)} className='flex justify-between cursor-pointer items-center'>
                    <span className='text-[1rem]  font-[500]'>Type of property</span>
                    <span
                        className={`transition-transform duration-300 ${typeOpen ? 'rotate-180' : ''
                            }`}
                    >
                        <ChevronDown size={18} />
                    </span>
                </div>
                {
                    typeOpen && (
                        <div className={`grid grid-cols-1 gap-3 transition-all duration-300 ease-in-out ${typeOpen ? 'max-h-[700px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                            {(type === "residential" ? residentialPropertytypes : commercialPropertytypes).map((propertyType, index) => {
                                return (
                                    <span key={index} onClick={() => handlePropertyType(propertyType)} className={`rounded-full hover:bg-[#F4F5F7] items-center cursor-pointer flex gap-3 text-[0.8rem]  border px-3 py-2 ${filters.propertytype?.includes(propertyType) ? "bg-[#F4F5F7]" : "bg-white"}  `}>
                                        <PlusIcon /> {propertyType}
                                    </span>
                                )
                            })}
                        </div>
                    )
                }
            </div>
            {/* No of bhks for only residential  */}
            {
                type === "residential" && (
                    <div className='flex mt-4 border-t py-2 flex-col gap-3'>
                        <div onClick={() => setOpenBhk((prev) => !prev)} className='flex justify-between cursor-pointer items-center'>
                            <span className='text-[1rem]  font-[500]'>No of Bedrooms</span>
                            <span
                                className={`transition-transform duration-300 ${openBhk ? 'rotate-180' : ''
                                    }`}
                            >
                                <ChevronDown size={18} />
                            </span>
                        </div>
                        {
                            openBhk && (
                                <div className={`grid grid-cols-1 gap-3 transition-all duration-300 ease-in-out ${openBhk ? 'max-h-[700px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                                    {typeofbhks.map((bhktype, index) => {
                                        return (
                                            <span key={index} onClick={() => handleBhks(bhktype)} className={`rounded-full hover:bg-[#F4F5F7] items-center cursor-pointer flex gap-3 text-[0.8rem] border px-3 py-2 ${filters.Bhks?.includes(bhktype) ? "bg-[#F4F5F7]" : "bg-white"}`}>
                                                <PlusIcon /> {bhktype}
                                            </span>
                                        )
                                    })}
                                </div>
                            )
                        }

                    </div>
                )
            }
            {/* construction status for commercial */}
            <div className='flex mt-4 border-t py-2 flex-col gap-3'>
                <div onClick={() => setOpenCon((prev) => !prev)} className='flex justify-between cursor-pointer items-center'>
                    <span className='text-[1rem]  font-[500]'>Construction status</span>
                    <span
                        className={`transition-transform duration-300 ${openConstruction ? 'rotate-180' : ''
                            }`}
                    >
                        <ChevronDown size={18} />
                    </span>
                </div>
                {
                    openConstruction && (
                        <div className={`grid grid-cols-1 gap-3 transition-all duration-300 ease-in-out ${openConstruction ? 'max-h-[700px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                            {constructionStatus.map((consttype, index) => {
                                return (
                                    <span key={index} onClick={() => handleConstructionStatus(consttype)} className={`rounded-full hover:bg-[#F4F5F7] items-center cursor-pointer flex gap-3 text-[0.8rem] border px-3 ${filters.constructionStatus === consttype ? "bg-[#F4F5F7]" : "bg-white"} py-2`}>
                                        <PlusIcon /> {consttype}
                                    </span>
                                )
                            })}
                        </div>
                    )
                }

            </div>
            {/* Amenities  */}
            {
                (type === "residential" || type === "commercial") && (
                    <div className='flex mt-4 border-t py-2 flex-col gap-3'>
                        <div onClick={() => setOpenAmenities((prev) => !prev)} className='flex justify-between cursor-pointer items-center'>
                            <span className='text-[1rem]  font-[500]'>Amenities</span>
                            <span
                                className={`transition-transform duration-300 ${openAmenities ? 'rotate-180' : ''
                                    }`}
                            >
                                <ChevronDown size={18} />
                            </span>
                        </div>
                        {
                            openAmenities && (
                                <div className={`grid grid-cols-1 gap-3 transition-all duration-300 ease-in-out ${openAmenities ? 'max-h-[700px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                                    {(type === "residential" ? residentialAmenities : commercialAmenities).map((amenity, index) => {
                                        return (
                                            <span key={index} onClick={() => handleAmenities(amenity)} className={`rounded-full hover:bg-[#F4F5F7] items-center cursor-pointer flex gap-3 text-[0.8rem] border px-3 py-2 ${filters.Amenities?.includes(amenity) ? "bg-[#F4F5F7]" : "bg-white"}`}>
                                                <PlusIcon /> {amenity}
                                            </span>
                                        )
                                    })}
                                </div>
                            )
                        }

                    </div>
                )
            }
            {/* furnish type for residential */}
            {
                type === "residential" && (
                    <div className='flex mt-4 border-t py-2 flex-col gap-3'>
                        <div onClick={() => setOpenFurnish((prev) => !prev)} className='flex justify-between cursor-pointer items-center'>
                            <span className='text-[1rem]  font-[500]'>Furnishing type</span>
                            <span
                                className={`transition-transform duration-300 ${openFurnish ? 'rotate-180' : ''
                                    }`}
                            >
                                <ChevronDown size={18} />
                            </span>
                        </div>
                        {
                            openFurnish && (
                                <div className={`grid grid-cols-1 gap-3 transition-all duration-300 ease-in-out ${openFurnish ? 'max-h-[700px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                                    {furnishType.map((furnishtype, index) => {
                                        return (
                                            <span key={index} onClick={() => handleFurnishtype(furnishtype)} className={`rounded-full hover:bg-[#F4F5F7] items-center cursor-pointer flex gap-3 text-[0.8rem] border px-3 py-2 ${filters.furnishType?.includes(furnishtype) ? "bg-[#F4F5F7]" : "bg-white"}`}>
                                                <PlusIcon /> {furnishtype}
                                            </span>
                                        )
                                    })}
                                </div>
                            )
                        }

                    </div>
                )
            }
        </div>
    )
}

export default PropertySearchFilters