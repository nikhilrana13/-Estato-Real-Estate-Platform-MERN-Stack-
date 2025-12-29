import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import "react-datepicker/dist/react-datepicker.css";
import { useFormContext, Controller } from 'react-hook-form';

const AddPriceDetails = ({ PropertyType, LookingTo,PrevStep }) => {
  // const [date, setdate] = useState(new Date());
  const { register, setValue, control, watch, formState: { errors } } = useFormContext()

  const constructionKey = `${PropertyType}.constructionStatus`
  return (
    <div className='w-full '>
      <span onClick={PrevStep} className='font-[500] cursor-pointer items-center flex gap-2'>
        <MdKeyboardArrowLeft />
        Add Price Details
      </span>
      {/* For Rent for residential */}
      {
        PropertyType === "residential" && LookingTo === "Rent" && (
          <>
            <div className='flex mt-8   flex-col py-1 gap-1'>
              <span className='text-[#909098] font-[400] text-[0.7rem]'>Monthly Rent</span>
              <input {...register("residential.propertyPrice", { required: "Rent is required" })} type='number' placeholder='₹1,00,000' className="w-full bg-transparent outline-none border-0 border-b-2 border-[#eee] focus:border-purple-600 px-0 py-2 text-lg font-medium text-[#333]" />
            </div>
            {errors?.residential?.propertyPrice && <p className="text-red-500 text-sm">{errors.residential.propertyPrice.message}</p>}
          </>
        )
      }
      {/* For Sell for residential */}
      {
        PropertyType === "residential" && LookingTo === "Sell" && (
          <>
            <div className='flex mt-8   flex-col py-1 gap-1'>
              <span className='text-[#909098] font-[400] text-[0.7rem]'>Total Price</span>
              <input {...register("residential.propertyPrice", { required: "Price is required" })} type='number' placeholder='₹1,00,000' className="w-full bg-transparent outline-none border-0 border-b-2 border-[#eee] focus:border-purple-600 px-0 py-2 text-lg font-medium text-[#333]" />
            </div>
            {errors?.residential?.propertyPrice && <p className="text-red-500 text-sm">{errors.residential.propertyPrice.message}</p>}
          </>
        )
      }
      {/* For Rent for commercial */}
      {
        PropertyType === "commercial" && LookingTo === "Rent" && (
          <>
            <div className='flex mt-8   flex-col py-1 gap-1'>
              <span className='text-[#909098] font-[400] text-[0.7rem]'>Monthly Rent</span>
              <input {...register("commercial.propertyPrice", { required: "Rent is required" })} type='number' placeholder='₹1,00,000' className="w-full bg-transparent outline-none border-0 border-b-2 border-[#eee] focus:border-purple-600 px-0 py-2 text-lg font-medium text-[#333]" />
            </div>
            {errors?.commercial?.propertyPrice && <p className="text-red-500 text-sm">{errors.commercial?.propertyPrice?.message}</p>}
          </>
        )
      }
      {/* For Sell for residential */}
      {
        PropertyType === "commercial" && LookingTo === "Sell" && (
          <>
            <div className='flex mt-8   flex-col py-1 gap-1'>
              <span className='text-[#909098] font-[400] text-[0.7rem]'>Total Price</span>
              <input {...register("commercial.propertyPrice", { required: "Price is required" })} type='number' placeholder='₹1,00,000' className="w-full bg-transparent outline-none border-0 border-b-2 border-[#eee] focus:border-purple-600 px-0 py-2 text-lg font-medium text-[#333]" />
            </div>
            {errors?.commercial?.propertyPrice && <p className="text-red-500 text-sm">{errors.commercial?.propertyPrice?.message}</p>}
          </>
        )
      }
      {
      }
      {/* construction status */}
      <div className='flex flex-col gap-3'>
        <span className='text-[#909098] font-[400] text-[0.7rem]'>Construction status</span>
        <div className='flex flex-wrap gap-3'>
          <input type="hidden" {...register(constructionKey)} />
          <span onClick={() => setValue(constructionKey, "readytomove")} className={`rounded-md items-center gap-3 px-5 text-sm cursor-pointer flex ${watch(constructionKey) === "readytomove" ? "bg-[#E7DDFB] text-[#5E23DC]" : "bg-white border text-black"}    py-3 `}>
            Ready to move
          </span>
          <span onClick={() => setValue(constructionKey, "underconstruction")} className={`rounded-md items-center gap-3 px-5 text-sm cursor-pointer flex ${watch(constructionKey) === "underconstruction" ? "bg-[#E7DDFB] text-[#5E23DC]" : "bg-white border text-black"}    py-3 `}>
            Under construction
          </span>
        </div>
      </div>
      {/* Available From (Commercial only) */}
      {
        PropertyType === "commercial" && (
          <div className='flex mt-8 flex-col py-1 gap-1'>
            <span className='text-[#909098] font-[400] text-[0.7rem]'>Available From</span>
            <Controller
              control={control}
              name="commercial.availableFrom"
              rules={{ required: "Available date is required" }}
              render={({ field }) => (
                <DatePicker
                  selected={field.value || null}
                  onChange={(newDate) => field.onChange(newDate)}
                  dateFormat="dd MMM, yyyy"
                  minDate={new Date()}
                  className="border-none outline-none text-black text-sm w-full cursor-pointer font-semibold"
                  calendarClassName="rounded-2xl shadow-lg border p-2"
                  popperPlacement="bottom-start"
                  portalId='root-portal'
                  withPortal
                />
              )}
            />
          </div>
        )
      }

    </div>
  )
}

export default AddPriceDetails