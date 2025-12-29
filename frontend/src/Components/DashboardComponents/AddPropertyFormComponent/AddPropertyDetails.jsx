
import { MdApartment, MdKeyboardArrowLeft } from "react-icons/md";
import { BiSolidBuildingHouse } from "react-icons/bi";
import { FaHouseChimney } from "react-icons/fa6";
import { PiArmchairDuotone, PiFarmLight, PiAlignBottomSimpleFill, PiFarm } from "react-icons/pi";
import { GiFamilyHouse } from "react-icons/gi";
import BuiltUpArea from "./BuiltUpArea";
import AddAmenitiesDialog from "./AddAmenitiesDialog";
import { useFormContext } from "react-hook-form";
import { BsShop } from "react-icons/bs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FloorSelect from "./FloorSelect";
import CommercialAmenitiesDialog from "./CommercialAmenitiesDialog";

const AddPropertyDetails = ({ PropertyType, PrevStep }) => {
  const { register, watch, setValue, formState: { errors } } = useFormContext();
  const typeText = watch("propertydescription") || ""


  const Flatamenities = watch("residential.flatAmenities")
  const Societyamenities = watch("residential.societyAmenities")
  const Commericalamenities = watch("commercial.amenities")


  return (
    <div className="w-full">
      <span onClick={PrevStep} className="font-[500] cursor-pointer items-center flex gap-2">
        <MdKeyboardArrowLeft />
        Add Property Details
      </span>

      <div className="flex mt-5 px-7 py-2 flex-col gap-3">
        <label className="text-[#909098] font-[400] text-[0.8rem]">
          Property Type
        </label>
        {/* PROPERTY TYPE BOXES */}
        {/* show residential propertyType */}
        {
          PropertyType === "residential" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                [MdApartment, "Apartment"],
                [FaHouseChimney, "Independent Floor"],
                [BiSolidBuildingHouse, "Duplex"],
                [PiFarmLight, "Villa"],
                [GiFamilyHouse, "Penthouse"],
                [FaHouseChimney, "Studio"],
                [FaHouseChimney, "Farm house"],
                [PiAlignBottomSimpleFill, "Agricultural Land"],
                [PiFarm, "Plot"],
              ].map(([Icon, label], i) => (
                <div
                  key={i}
                  onClick={() => setValue("residential.type", label)}
                  className={`flex w-[100px] cursor-pointer h-[90px] flex-col border rounded-md justify-center items-center ${watch("residential.type") === label
                      ? "bg-[#E7DDFB] text-[#5E23DC]"
                      : "bg-white border text-black"
                    }`}
                >
                  <input
                    type="hidden"
                    {...register("residential.type", {
                      required: "Please select a property type",
                    })}
                  />
                  <Icon className="text-[#909098] text-2xl" />
                  <span className="text-sm text-center font-[400]">{label}</span>
                </div>
              ))}

              {errors?.residential?.type && (
                <p className="text-red-500 text-sm">
                  {errors.residential.type.message}
                </p>
              )}
            </div>
          )
        }
        {/* show commercial propertyType */}
        {
          PropertyType === "commercial" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                [MdApartment, "office"],
                [BsShop, "retailshop"],
                [BiSolidBuildingHouse, "showroom"],
                [PiFarmLight, "warehouse"],
                [PiFarm, "plot"],
                [PiFarm, "others"],
              ].map(([Icon, label], i) => (
                <div
                  key={i}
                  onClick={() => setValue("commercial.type", label)}
                  className={`flex w-[100px] cursor-pointer h-[90px] flex-col border rounded-md justify-center items-center ${watch("commercial.type") === label
                      ? "bg-[#E7DDFB] text-[#5E23DC]"
                      : "bg-white border text-black"
                    }`}
                >
                  <input
                    type="hidden"
                    {...register("commercial.type", {
                      required: "Please select a property type",
                    })}
                  />
                  <Icon className="text-[#909098] text-2xl" />
                  <span className="text-sm text-center font-[400]">{label}</span>
                </div>
              ))}

              {errors?.commercial?.type && (
                <p className="text-red-500 text-sm">
                  {errors?.commercial?.type.message}
                </p>
              )}
            </div>
          )
        }
        {/* BUILDING NAME */}
        {/* building name for residential type */}
        {
          PropertyType === "residential" && (
            <div className="flex flex-col py-3 gap-2">
              <span className="text-[#909098] font-[400] text-[0.7rem]">
                Building/Project/Society
              </span>
              <input
                {...register("residential.address.buildingName", {
                  required: "Please enter a building name",
                })}
                type="text"
                className="w-full bg-transparent outline-none border-0 border-b-2 border-[#eee] 
          focus:border-purple-600 px-0 py-2 text-lg font-medium text-[#333]"
              />
              {errors?.residential?.address?.buildingName && (
                <p className="text-red-500 text-sm">
                  {errors.residential?.address?.buildingName?.message}
                </p>)}
            </div>
          )
        }

        {/* building name for commercial type */}
        {
          PropertyType === "commercial" && (
            <div className="flex flex-col py-3 gap-2">
              <span className="text-[#909098] font-[400] text-[0.7rem]">
                Building/Project/Society
              </span>
              <input
                {...register("commercial.address.buildingName", {
                  required: "Please enter a building name",
                })}
                type="text"
                className="w-full bg-transparent outline-none border-0 border-b-2 border-[#eee] 
          focus:border-purple-600 px-0 py-2 text-lg font-medium text-[#333]"
              />
              {errors?.commercial?.address?.buildingName && (
                <p className="text-red-500 text-sm">
                  {errors.commercial?.address?.buildingName?.message}
                </p>)}
            </div>
          )
        }
        {/* LOCALITY */}
        {/* locality for residential type */}
        {
          PropertyType === "residential" && (
            <div className="flex flex-col py-3 gap-2">
              <span className="text-[#909098] font-[400] text-[0.7rem]">Locality</span>
              <input
                {...register("residential.address.locality", {
                  required: "Please enter a locality",
                })}
                type="text"
                className="w-full bg-transparent outline-none border-0 border-b-2 border-[#eee] 
          focus:border-purple-600 px-0 py-2 text-lg font-medium text-[#333]"
              />
              {errors?.residential?.address?.locality && (
                <p className="text-red-500 text-sm">
                  {errors.residential?.address?.locality?.message}
                </p>)}
            </div>
          )
        }
        {/* locality for commercial type */}
        {
          PropertyType === "commercial" && (
            <div className="flex flex-col py-3 gap-2">
              <span className="text-[#909098] font-[400] text-[0.7rem]">Locality</span>
              <input
                {...register("commercial.address.locality", {
                  required: "Please enter a locality",
                })}
                type="text"
                className="w-full bg-transparent outline-none border-0 border-b-2 border-[#eee] 
          focus:border-purple-600 px-0 py-2 text-lg font-medium text-[#333]"
              />
              {errors?.commercial?.address?.locality && (
                <p className="text-red-500 text-sm">
                  {errors.commercial?.address?.locality?.message}
                </p>)}
            </div>
          )
        }
        {/* BHK for residential */}
        <div>
          {
            PropertyType === "residential" && (
              <>
                <span className="text-[#909098] font-[400] text-[0.7rem]">BHK</span>
                <div className="grid grid-cols-2 mt-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  <input
                    type="hidden"
                    {...register("residential.bhk", { required: "Please select a bhk" })}
                  />

                  {["1RK", "1BHK", "1.5BHK", "2BHK", "3+BHK"].map((bhk) => (
                    <div
                      key={bhk}
                      onClick={() => setValue("residential.bhk", bhk)}
                      className={`flex w-20 h-10 cursor-pointer border rounded-md justify-center items-center ${watch("residential.bhk") === bhk
                          ? "bg-[#E7DDFB] text-[#5E23DC]"
                          : "bg-white border text-black"
                        }`}
                    >
                      <span className="text-sm text-center font-[400]">{bhk}</span>
                    </div>
                  ))}
                </div>
                {errors?.residential?.bhk && (
                  <p className="text-red-500 text-sm">
                    {errors.residential?.bhk?.message}
                  </p>)}

              </>
            )
          }


          {/* BUILT UP AREA */}
          <BuiltUpArea PropertyType={PropertyType} />

          {/* FURNISH TYPE for residential */}
          {
            PropertyType === "residential" && (
              <div className="flex flex-col py-3 gap-3">
                <span className="text-[#909098] font-[400] text-[0.7rem]">
                  Furnish Type
                </span>
                <div className="flex flex-wrap gap-3">
                  <input type="hidden" {...register("residential.furnishType")} />

                  {[
                    ["fullyfurnished", "Fully Furnished"],
                    ["semifurnished", "Semi Furnished"],
                    ["unfurnished", "Unfurnished"],
                  ].map(([value, label]) => (
                    <span
                      key={value}
                      onClick={() => setValue("residential.furnishType", value)}
                      className={`rounded-md items-center gap-3 px-5 text-sm cursor-pointer flex ${watch("residential.furnishType") === value
                          ? "bg-[#E7DDFB] text-[#5E23DC]"
                          : "bg-white border text-black"
                        } py-3`}
                    >
                      <PiArmchairDuotone /> {label}
                    </span>
                  ))}
                </div>
              </div>
            )
          }
          {/* OwnerShip for commercial   */}
          {
            PropertyType === "commercial" && (
              <div className='flex flex-col gap-3'>
                <span className='text-[#909098] font-[400] text-[0.7rem]'>Ownership</span>
                <div className='flex flex-wrap gap-3'>
                  <input type="hidden" {...register("commercial.advancedDetails.ownership")} />
                  <span onClick={() => setValue("commercial.advancedDetails.ownership", "freehold")} className={`rounded-md items-center gap-3 px-5 text-sm cursor-pointer flex ${watch("commercial.advancedDetails.ownership") === "freehold" ? "bg-[#E7DDFB] text-[#5E23DC]" : "bg-white border text-black"}    py-3 `}>
                    free hold
                  </span>
                  <span onClick={() => setValue("commercial.advancedDetails.ownership", "lease")} className={`rounded-md items-center gap-3 px-5 text-sm cursor-pointer flex ${watch("commercial.advancedDetails.ownership") === "lease" ? "bg-[#E7DDFB] text-[#5E23DC]" : "bg-white border text-black"}    py-3 `}>
                    Lease
                  </span>
                  <span onClick={() => setValue("commercial.advancedDetails.ownership", "cooperativesociety")} className={`rounded-md items-center gap-3 px-5 text-sm cursor-pointer flex ${watch("commercial.advancedDetails.ownership") === "cooperativesociety" ? "bg-[#E7DDFB] text-[#5E23DC]" : "bg-white border text-black"}    py-3 `}>
                    cooperative society
                  </span>
                  <span onClick={() => setValue("commercial.advancedDetails.ownership", "powerofattorney")} className={`rounded-md items-center gap-3 px-5 text-sm cursor-pointer flex ${watch("commercial.advancedDetails.ownership") === "powerofattorney" ? "bg-[#E7DDFB] text-[#5E23DC]" : "bg-white border text-black"}    py-3 `}>
                    power of attorney
                  </span>
                </div>
              </div>
            )
          }
          {/* Property age for commercial */}
          {
            PropertyType === "commercial" && (
              <div className='flex mt-3  flex-col py-1 gap-1'>
                <span className='text-[#909098] font-[400] text-[0.7rem]'>Age of property (in years)</span>
                <input type='number' {...register("commercial.advancedDetails.ageOfProperty")} className="w-full bg-transparent outline-none border-0 border-b-2 border-[#eee] focus:border-purple-600 px-0 py-2 text-lg font-medium text-[#333]" />
              </div>
            )
          }
          {/* Zone Type for commercial */}
          {
            PropertyType === "commercial" && (
              <div className="flex flex-col py-3 gap-3">
                <span className="text-[#909098] font-[400] text-[0.7rem]">
                  Zone Type
                </span>
                <div className="flex flex-wrap gap-3">
                  <input type="hidden" {...register("commercial.advancedDetails.zoneType")} />
                  {[
                    ["Industrial", "Industrial"],
                    ["Commercial", "Commercial"],
                    ["Residential", "Residential"],
                    ["Others", "Others"],
                  ].map(([value, label]) => (
                    <span
                      key={value}
                      onClick={() => setValue("commercial.advancedDetails.zoneType", value)}
                      className={`rounded-md items-center gap-3 px-5 text-sm cursor-pointer flex ${watch("commercial.advancedDetails.zoneType") === value
                          ? "bg-[#E7DDFB] text-[#5E23DC]"
                          : "bg-white border text-black"
                        } py-3`}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            )
          }
          {/* location hub for commercial */}
          {
            PropertyType === "commercial" && (
              <div className="flex flex-col py-3 gap-3">
                <span className="text-[#909098] font-[400] text-[0.7rem]">
                  Location Hub
                </span>
                <div className="flex flex-wrap gap-3">
                  <input type="hidden" {...register("commercial.advancedDetails.locationHub")} />
                  {[
                    ["mall", "Mall"],
                    ["commercialproject", "Commercial Project"],
                    ["markethighstreet", "Market high Street"],
                    ["retailcomplexbuilding", "Retail complex Building"],
                    ["others", "Others"],
                  ].map(([value, label]) => (
                    <span
                      key={value}
                      onClick={() => setValue("commercial.advancedDetails.locationHub", value)}
                      className={`rounded-md items-center gap-3 px-5 text-sm cursor-pointer flex ${watch("commercial.advancedDetails.locationHub") === value
                          ? "bg-[#E7DDFB] text-[#5E23DC]"
                          : "bg-white border text-black"
                        } py-3`}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            )
          }
          {/* Floor number for commercial */}
          {
            PropertyType === "commercial" && (
              <FloorSelect />
            )
          }
          {/* Property description for commercial */}
          {
            PropertyType === "commercial" && (
              <div className='flex  flex-col py-1 gap-1'>
                <span className='text-[#909098] font-[400] text-[0.7rem]'>Property Description</span>
                <textarea maxLength={1500} rows={1} {...register("propertydescription")} className="w-full bg-transparent resize-none outline-none border-0 border-b-2 border-[#eee] focus:border-purple-600 px-0 py-2 text-lg font-medium text-[#333]" />
                <div className="flex justify-between items-center">
                  <span className="text-[0.7rem] text-[#909098]">
                    Tell us more about the special features of your property
                  </span>

                  <span className="text-[0.7rem] text-[#909098]">
                    {typeText.length || 0} / 1500
                  </span>
                </div>
              </div>
            )
          }
          {/* AMENITIES DIALOG  */}
          {
            PropertyType === "residential" && (
              <>
                {
                  (Flatamenities.length > 0 || Societyamenities.length > 0) ? (
                    <div className="border flex flex-col bg-[#F2F3F8] p-3 gap-3 rounded-md">
                      {/* Amenities list */}
                      <div className="flex flex-col gap-1">
                        {Flatamenities.length > 0 && (
                          <span className="text-[0.8rem] font-[500] text-[#4C4C4C]">
                            Flat Furnishings:{" "}
                            <span className="text-[0.7rem] text-black">{Flatamenities.join(", ")}</span>
                          </span>
                        )}
                        {Societyamenities.length > 0 && (
                          <span className="text-[0.8rem] font-[500] text-[#4C4C4C]">
                            Society Amenities:{" "}
                            <span className="text-[0.7rem] text-black">{Societyamenities.join(", ")}</span>
                          </span>
                        )}
                      </div>
                      {/* + Add more button */}
                      <div className="flex justify-center mt-2">
                        <AddAmenitiesDialog label="+ Add more" />
                      </div>
                    </div>
                  ) : (
                    <div className="flex">
                      <AddAmenitiesDialog label="+ Add Property furnishings and amenities" />
                    </div>
                  )
                }
              </>
            )
          }
          {/* for commercial amenities */}
          {
            PropertyType === "commercial" && (
                 <>
                {
                  (Commericalamenities.length > 0) ? (
                    <div className="border flex flex-col bg-[#F2F3F8] p-3 gap-3 rounded-md">
                      {/* Amenities list */}
                      <div className="flex flex-col gap-1">
                        {Commericalamenities.length > 0 && (
                          <span className="text-[0.8rem] font-[500] text-[#4C4C4C]">
                            Amenities:{" "}
                            <span className="text-[0.7rem] text-black">{Commericalamenities.join(", ")}</span>
                          </span>
                        )}
                      </div>
                      {/* + Add more button */}
                      <div className="flex justify-center mt-2">
                        <CommercialAmenitiesDialog label="+ Add more" />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <CommercialAmenitiesDialog label="+ Add amenities" />
                    </div>
                  )
                }
              </>
            )
          }
        </div>
      </div>
    </div>
  )
};

export default AddPropertyDetails;



