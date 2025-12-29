import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form';
import { MdKeyboardArrowLeft } from 'react-icons/md'

const AddAdvancedDetails = ({PrevStep}) => {
    const {register,setValue,watch,formState:{errors}} = useFormContext()
    const  typeText = watch("propertydescription") || ""

    return (
        <div className='w-full flex flex-col gap-3 '>
            <span onClick={PrevStep}  className='font-[500] cursor-pointer items-center flex gap-2'>
                <MdKeyboardArrowLeft />
                Add Advanced Details
            </span>
            {/* Age of property */}
            <div className='flex  flex-col py-1 gap-1'>
                <span className='text-[#909098] font-[400] text-[0.7rem]'>Age of property (in years)</span>
                <input type='number' {...register("residential.advancedDetails.ageOfProperty")} className="w-full bg-transparent outline-none border-0 border-b-2 border-[#eee] focus:border-purple-600 px-0 py-2 text-lg font-medium text-[#333]" />
            </div>
            {/* Bathroom */}
            <div className='flex gap-2 flex-col  '>
                <span className='text-[#909098] font-[400] text-[0.7rem]'>Bathroom</span>
                <div className='flex flex-wrap gap-2'>
                    <input type="hidden" {...register("residential.advancedDetails.bathroom")} />
                    {
                        [0, 1, 2, 3, 4, 5].map((item,index) => {
                            return (
                                <div  onClick={()=> setValue("residential.advancedDetails.bathroom",item)} key={index} className={`bg-white border cursor-pointer rounded-md px-5 py-3 ${watch("residential.advancedDetails.bathroom") === item ? "bg-[#F2F3F8] border-[#5E23DC] text-[#5E23DC]":"text-black" } text-center`}>
                                    <span className='font-[0.8rem]'>{item}</span>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
            {/* Balcony */}
            <div className='flex gap-2  flex-col '>
                <span className='text-[#909098] font-[400] text-[0.7rem]'>Balcony</span>
                <div className='flex flex-wrap gap-2'>
                     <input type="hidden" {...register("residential.advancedDetails.balcony")} />
                    {
                        [0, 1, 2, 3, 4, 5].map((item,index) => {
                            return (
                                <div onClick={()=> setValue("residential.advancedDetails.balcony",item)} key={index} className={`bg-white border cursor-pointer rounded-md px-5 py-3 ${watch("residential.advancedDetails.balcony") === item ? "bg-[#F2F3F8] border-[#5E23DC] text-[#5E23DC]":"text-black" } text-center`}>
                                    <span className='font-[0.8rem]'>{item}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {/* Covered Parking */}
            <div className='flex gap-2  flex-col '>
                <span className='text-[#909098] font-[400] text-[0.7rem]'>Covered Parking</span>
                <div className='flex flex-wrap gap-2'>
                     <input type="hidden" {...register("residential.advancedDetails.coveredParking")} />
                    {
                        [0, 1, 2, 3, 4, 5].map((item,index) => {
                            return (
                                <div onClick={()=> setValue("residential.advancedDetails.coveredParking",item)} key={index} className={`bg-white border cursor-pointer rounded-md px-5 py-3 ${watch("residential.advancedDetails.coveredParking") === item ? "bg-[#F2F3F8] border-[#5E23DC] text-[#5E23DC]":"text-black" } text-center`}>
                                    <span className='font-[0.8rem]'>{item}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {/* floor number */}
            <div className='flex  flex-col py-1 gap-1'>
                <span  className='text-[#909098] font-[400] text-[0.7rem]'>Floor number</span>
                <input {...register("residential.advancedDetails.floorNumber")} type='number' className="w-full bg-transparent outline-none border-0 border-b-2 border-[#eee] focus:border-purple-600 px-0 py-2 text-lg font-medium text-[#333]" />
            </div>
            {/* Property description */}
            <div className='flex  flex-col py-1 gap-1'>
                <span className='text-[#909098] font-[400] text-[0.7rem]'>Property Description</span>
                <textarea maxLength={1500}  rows={1} {...register("propertydescription")}  className="w-full bg-transparent resize-none outline-none border-0 border-b-2 border-[#eee] focus:border-purple-600 px-0 py-2 text-lg font-medium text-[#333]" />
                <div className="flex justify-between items-center">
                    <span className="text-[0.7rem] text-[#909098]">
                        Tell us more about the special features of your property
                    </span>

                    <span className="text-[0.7rem] text-[#909098]">
                        {typeText.length || 0} / 1500
                    </span>
                </div>
            </div>
        </div>
    )
}

export default AddAdvancedDetails