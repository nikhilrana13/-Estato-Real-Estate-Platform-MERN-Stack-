import React from 'react'
import { useFormContext } from 'react-hook-form'

const BasicDetails = ({Propertytype}) => {
  const { register, watch, setValue, formState: { errors } } = useFormContext()

  return (
    <div className=' w-full '>
      <h3 className='font-[500]'>Add Basic Details</h3>
      <div className='flex  mt-5 flex-col gap-3'>
        {/* property type */}
        <div className='flex flex-col py-3  gap-3'>
          <span className='text-[#909098] font-[400] text-[0.7rem]'>Property Type</span>
           {/* Hidden input */}
          <input type="hidden" {...register("Propertytype",{required:"Please select property type"})} />
          <div className='flex flex-wrap gap-3'>
            <span onClick={() => setValue("Propertytype", "residential")} className={`rounded-md px-5  py-3 flex items-center  text-sm cursor-pointer   ${watch("Propertytype") === "residential" ? "bg-[#E7DDFB]  text-[#5E23DC]" : "bg-white border text-black"}`} >Residential</span>
            <span onClick={() => setValue("Propertytype", "commercial")} className={`rounded-md px-5  py-3 flex items-center  text-sm cursor-pointer   ${watch("Propertytype") === "commercial" ? "bg-[#E7DDFB]  text-[#5E23DC]" : "bg-white border text-black"}`} >Commercial</span>
          </div>
          {errors.Propertytype && <p className="text-red-500 text-sm">{errors.Propertytype.message}</p>}
        </div>
        {/* Looking to */}
          <div className='flex flex-col py-3  gap-3'>
          <span className='text-[#909098] font-[400] text-[0.7rem]'>Looking to</span>
          {/* Hidden input */}
          <input type="hidden" {...register("lookingTo",{required:"Please select looking To"})} />
          <div className='flex flex-wrap gap-3'>

            {["Rent", "Sell"].map((role) => (
              <span
                key={role}
                onClick={() => setValue("lookingTo", role)}
                className={`rounded-md px-5 text-sm cursor-pointer py-3 
               ${watch("lookingTo") === role ? "bg-[#E7DDFB] text-[#5E23DC]" : "bg-white border text-black"}`}
              >
                {role}
              </span>
            ))}
          </div>
          {errors.lookingTo && <p className="text-red-500 text-sm">{errors.lookingTo.message}</p>}

        </div>
        {/* who you are  */}
        <div className='flex flex-col py-3  gap-3'>
          <span className='text-[#909098] font-[400] text-[0.7rem]'>Who You Are</span>
          {/* Hidden input */}
          <input type="hidden" {...register("whoYouAre",{required:"Please select who are you"})} />
          <div className='flex flex-wrap gap-3'>

            {["owner", "dealer", "broker"].map((role) => (
              <span
                key={role}
                onClick={() => setValue("whoYouAre", role)}
                className={`rounded-md px-5 text-sm cursor-pointer py-3 
               ${watch("whoYouAre") === role ? "bg-[#E7DDFB] text-[#5E23DC]" : "bg-white border text-black"}`}
              >
                {role}
              </span>
            ))}
          </div>
          {errors.whoYouAre && <p className="text-red-500 text-sm">{errors.whoYouAre.message}</p>}

        </div>
        {/* City */}
        {
          Propertytype === "residential" && (
           <div className='flex  flex-col py-3 gap-2'>
          <span className='text-[#909098] font-[400] text-[0.7rem]'>City</span>
          <input {...register("residential.address.city",{required:"Please field city"})} type='text' className='border-b outline-none' placeholder=' Search City' />
          {errors?.residential?.address?.city && <p className="text-red-500 text-sm">{errors?.residential?.address?.city.message}</p>}
        </div>
          )
        }
        {
          Propertytype === "commercial" && (
           <div className='flex  flex-col py-3 gap-2'>
          <span className='text-[#909098] font-[400] text-[0.7rem]'>City</span>
          <input {...register("commercial.address.city",{required:"Please field city"})} type='text' className='border-b outline-none' placeholder=' Search City' />
          {errors?.commercial?.address?.city && <p className="text-red-500 text-sm">{errors?.commercial?.address?.city.message}</p>}
        </div>
          )
        }
      

      </div>
    </div>
  )
}

export default BasicDetails