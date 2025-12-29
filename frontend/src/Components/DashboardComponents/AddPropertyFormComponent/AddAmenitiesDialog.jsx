import React, { useState } from 'react'
import { Button } from "../../ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog"
import { MdKitchen, MdOutlineDinnerDining, MdOutlineSportsBaseball, MdSportsGymnastics } from 'react-icons/md'
import { RiFridgeLine } from "react-icons/ri";
import { BiSolidBuildingHouse } from "react-icons/bi";
import { GiChimney, GiGasStove, GiGate, GiLift, GiPlantRoots, GiWaterBolt, GiWaterTank } from "react-icons/gi";
import { AirVentIcon, BedDouble, Cctv, Fan, House, Lightbulb, LucideMicrowave, LucideSofa, LucideWashingMachine, Tv2Icon } from 'lucide-react';
import { FaCarBattery, FaIntercom, FaPersonSwimming } from 'react-icons/fa6';
import { useFormContext } from 'react-hook-form';



const AddAmenitiesDialog = ({label}) => {
   const {watch,setValue} = useFormContext()
   const [open,Setopen] = useState(false)
   const selectedflatamenities = watch("residential.flatAmenities") || []
   const selectedSocietyamenities = watch("residential.societyAmenities") || []

   const handleFlatAmenities = (item)=>{
       let updated; 
       if(selectedflatamenities.includes(item)){
          updated = selectedflatamenities.filter((a)=>  a !== item)
       }else{
         updated = [...selectedflatamenities,item]
       }
       setValue("residential.flatAmenities",updated)
   }
   
   const handleSocietyAmenities = (item)=>{
       let updated; 
       if(selectedSocietyamenities.includes(item)){
          updated = selectedSocietyamenities.filter((a)=>  a !== item)
       }else{
         updated = [...selectedSocietyamenities,item]
       }
       setValue("residential.societyAmenities",updated)
   }

   const HandleSave = ()=>{
    Setopen(false)
   }
  return (
    <Dialog open={open} onOpenChange={Setopen}>
      <DialogTrigger asChild>
        <span className='text-[#5E23DC] text-[0.8rem] cursor-pointer font-[500]'>{label}</span>
      </DialogTrigger>
      <DialogContent className='max-w-[72rem]  !rounded-[2.5rem] [&>div]:!rounded-[2.5rem]   overflow-y-auto'>
        <form>
          <DialogHeader>
            <DialogTitle>Add Property furnishings and amenities </DialogTitle>
          </DialogHeader>
          <div className='flex mt-5  py-2 gap-3 flex-col max-h-[80vh] no-scrollbar overflow-y-auto'>
            {/* Flat amenities */}
            <div className='flex flex-col gap-3 '>
              <div className='flex justify-between'>
                <span className='font-[600]'>Flat furnishings  </span>
                <span>{selectedflatamenities.length || 0} Selected</span>
              </div>
              {/* Amenities */}
              <div className='grid grid-cols-1 gap-4 mx-auto md:m-0 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6'>
                {[
                  [MdOutlineDinnerDining, 'Dining Table'],
                  [LucideWashingMachine, 'Washing Machine'],
                  [BiSolidBuildingHouse, 'Cupboard'],
                  [LucideSofa, 'Sofa'],
                  [LucideMicrowave, 'Microwave'],
                  [GiGasStove, 'Stove'],
                  [RiFridgeLine, 'Fridge'],
                  [GiWaterTank, 'Water Purifier'],
                  [GiGasStove, 'Gas pipeline'],
                  [GiChimney, 'Chimney'],
                  [MdKitchen, 'Modular kitchen'],
                  [Fan, 'Fan'],
                  [Lightbulb, 'Light'],
                  [AirVentIcon, 'Ac'],
                  [Tv2Icon, 'TV'],
                  [BedDouble, 'Bed'],
                  [GiGasStove, 'Geyser'],
                ].map(([Icon, label], i) => (
                    <div key={i} onClick={()=> handleFlatAmenities(label)} className={`flex w-[150px] cursor-pointer h-[100px] flex-col border rounded-md ${selectedflatamenities?.includes(label) ? "bg-[#F2F3F8] border-[#5E23DC] text-[#5E23DC]" :"bg-white text-black"} justify-center items-center`}>
                    <Icon  color={selectedflatamenities?.includes(label) ? "#5E23DC" : "#909098"} className="text-2xl !stroke-[1.5]" />
                    <span className='text-sm  text-center  font-[400]'>{label}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Society Amenities */}
            <div className='flex flex-col gap-3 '>
              <div className='flex justify-between'>
                <span className='font-[600]'>Society Amenities </span>
                <span>{selectedSocietyamenities.length || 0} Selected</span>
              </div>
              {/* Society Amenities */}
              <div className='grid grid-cols-1 gap-4 mx-auto md:m-0 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6'>
                {[
                  [FaCarBattery, 'Power Backup'],
                  [FaPersonSwimming, 'Swimming pool'],
                  [MdSportsGymnastics, 'Gym'],
                  [GiLift, 'Lift'],
                  [FaIntercom, 'Intercom'],
                  [GiPlantRoots, 'Garden'],
                  [MdOutlineSportsBaseball, 'Sports'],
                  [MdOutlineSportsBaseball, 'Kids area'],
                  [Cctv, 'CCTV'],
                  [House, 'Clubhouse'],
                  [GiGate, 'Community Hall'],
                  [GiWaterTank, 'Water Supply'],

                ].map(([Icon, label], i) => (
                  <div key={i} onClick={()=> handleSocietyAmenities(label)} className={`flex w-[150px] cursor-pointer h-[100px] flex-col border rounded-md ${selectedSocietyamenities ?.includes(label) ? "bg-[#F2F3F8] border-[#5E23DC] text-[#5E23DC]" :"bg-white text-black"} justify-center items-center`}   >
                    <Icon color={selectedSocietyamenities?.includes(label) ? "#5E23DC" : "#909098"} className='text-2xl  !stroke-[1.5]' />
                    <span className='text-sm  text-center  font-[400]'>{label}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Save button */}
            <div className='mx-auto'>
              <button type='button' onClick={HandleSave} className='text-white mt-2  text-[0.8rem] font-[600] bg-[#5E40E0] px-[6.5rem] py-3 rounded-md'>Save</button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddAmenitiesDialog



