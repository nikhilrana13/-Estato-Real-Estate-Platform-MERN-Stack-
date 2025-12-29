import React, { useEffect, useState } from 'react'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { NavLink, useFormAction, useNavigate } from 'react-router-dom'
import ProgressBar from './ProgressBar'
import ProgressSteps from './ProgressSteps'
import BasicDetails from './BasicDetails'
import AddPropertyDetails from './AddPropertyDetails'
import AddPriceDetails from './AddPriceDetails'
import AddPropertyPhotos from './AddPropertyPhotos'
import AddAdvancedDetails from './AddAdvancedDetails'
import { FormProvider, useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

const AddPropertyForm = () => {
  const [progress, SetProgress] = useState(0)
  const [Step, SetStep] = useState(1)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)


  const methods = useForm({
    defaultValues: {
      lookingTo: "Rent",
      whoYouAre: "",
      images: [],
      propertydescription: "",
      Propertytype: "residential",
      // residential
      residential: {
        type: "",
        address: {
          buildingName: "",
          locality: "",
          city: "",
        },
        bhk: "1 RK",
        furnishType: "",
        flatAmenities: [],
        societyAmenities: [],
        plotArea: 0,
        plotAreaUnit: "sq.ft",
        length: 0,
        width: 0,
        propertyPrice: 0,
        constructionStatus: "",
        advancedDetails: {
          ageOfProperty: 0,
          balcony: 0,
          bathroom: 0,
          coveredParking: 0,
          floorNumber: 0,
        }
      },
      // commercial
      commercial: {
        type: "",
        address: {
          buildingName: "",
          locality: "",
          propertyName: "",
          city: "",
        },
        plotArea: 0,
        plotAreaUnit: "sq.ft",
        length: 0,
        width: 0,
        propertyPrice: 0,
        constructionStatus: "readytomove",
        availableFrom: "",   // <-- DATE default empty string OK
        advancedDetails: {
          ageOfProperty: 0,
          zoneType: "",
          locationHub: "",
          ownership: "",
          totalFloor: 0,
          yourFloor: 0,
        },
        roi: 0,
        amenities: []
      }
    }
  });

  let { handleSubmit, trigger, getValues, watch } = methods
  const PropertyType = watch("Propertytype")
  const LookingTo = watch("lookingTo")

  const NextStep = async (e) => {

    // Current step fields validation
    let stepFields = []
    if (Step === 1) {
      stepFields = ["Propertytype", "lookingTo", "whoYouAre", PropertyType === "residential"
        ? "residential.address.city"
        : "commercial.address.city"]
    }

    if (Step === 2) {
      if (PropertyType === "residential") {
        // All relevant residential fields from AddPropertyDetails
        stepFields = [
          // basic property identification
          "residential.type",
          // address
          "residential.address.buildingName",
          "residential.address.locality",
          "residential.address.city",
          // property specifics
          "residential.bhk",
        ];
      } else {
        // commercial
        stepFields = [
          // basic property identification
          "commercial.type",
          // address
          "commercial.address.buildingName",
          "commercial.address.locality",
          "commercial.address.city",
        ];
      }
    }
    if (Step === 5) {
      if (PropertyType === "residential") {
        stepFields = [
          "residential.propertyPrice"
        ]

      } else {
        stepFields = [
          "commercial.propertyPrice"
        ]
      }
    }


    const valid = await trigger(stepFields)
    if (valid) {
      let nextStep = Step
      // conditional step jump for commercial
      if (Step === 2 && PropertyType === "commercial") {
        nextStep = 4
        SetStep(4)
      } else {
        nextStep = Math.min(Step + 1, 5)
        // SetStep((prev)=> Math.min(prev + 1,5))
        SetStep(nextStep)
      }
      // Calculate progress based on filled fields only
      let newProgress = 0;

      if (Step === 1) newProgress = 20;
      else if (Step === 2) newProgress = 40;
      else if (Step === 3) newProgress = 60;
      else if (Step === 4) newProgress = 80;
      else if (Step === 5) newProgress = 100;

      SetProgress(newProgress);
    }
  }


  const PrevStep = () => {
    SetStep((prev) => Math.max(prev - 1, 1))
  }

  // Send data to backend
  const onSubmit = async (data) => {
    const formdata = new FormData();

    // convert amenities → lowercase
    if (data.residential?.flatAmenities) {
      data.residential.flatAmenities = data.residential.flatAmenities.map(a =>({
         name:a.toLowerCase().replace(/\s+/g, ""),
         quantity: 1, // default
      }))
    }
    if (data.residential?.societyAmenities) {
      data.residential.societyAmenities = data.residential.societyAmenities.map(a => a.toLowerCase().replace(/\s+/g, ""));
    }

    if (data.commercial?.amenities) {
      data.commercial.amenities = data.commercial.amenities.map(a => a.toLowerCase().replace(/\s+/g, ""));
    }
    formdata.append("lookingTo", data.lookingTo);
    formdata.append("whoYouAre", data.whoYouAre);
    formdata.append("propertydescription", data.propertydescription);
    
    // console.log("Plot Area Unit:", data.commercial.plotAreaUnit)
    if (data.Propertytype === "residential") {
      formdata.append("residential", JSON.stringify(data.residential))
    }
    if (data.Propertytype === "commercial") {
      formdata.append("commercial", JSON.stringify(data.commercial))
      data.commercial.plotAreaUnit = data.commercial.plotAreaUnit.trim()
    }
    data.images.forEach(file => {
      formdata.append("images", file)
    });

    // for (let Pair of formdata.entries()) {
    //   console.log(Pair[0] + "" + Pair[1])
    // }
    try {
      setLoading(true)
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/property/add-property`, formdata, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data"
        }, withCredentials: true
      })
      // console.log("response ", response.data)
      if (response.data) {
        toast.success(response?.data?.message)
        methods.reset()
        navigate("/dashboard/mylistings")
      }
    } catch (error) {
      console.log("failed to add property", error)
      toast.error(error?.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }

  }

  return (
    <div className=' w-full py-3  px-10 '>
      <div className=' rounded-md min-h-screen p-5 gap-3 flex flex-col md:flex-row bg-white'>
        {/* left side */}
        <div className='w-full bg-[#F6F7FF] p-4 border  flex flex-col rounded-md md:w-[20%]'>
          <NavLink to="/dashboard/dashboard-home" className='text-[#616164] text-[0.8rem] font-[500]  flex items-center'> <MdKeyboardArrowLeft />  Return to dashboard</NavLink>
          <div className=' flex px-1 mt-5  flex-col'>
            <h3 className='text-[#434343] text-[1rem] font-[500]'>Post your property</h3>
            <h5 className='text-[#616264] text-[0.8rem] font-[400]'>Sell or Rent your Property</h5>
            {/* progress bar */}
            <ProgressBar progress={progress} />
          </div>
          {/* progress steps */}
          <ProgressSteps currentStep={Step} />
        </div>
        {/* right side */}
        <div data-lenis-prevent className='w-full border min-h-screen md:h-[calc(100vh-2rem)]   overflow-y-auto  py-8 md:px-8 rounded-md md:w-[80%]'>
          {/* Steps */}
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className='px-2'>
              {Step === 1 && <BasicDetails Propertytype={PropertyType} />}
              {Step === 2 && <AddPropertyDetails PropertyType={PropertyType} PrevStep={PrevStep} />}
              {Step === 3 && PropertyType !== "commercial" && <AddAdvancedDetails PrevStep={PrevStep} />}
              {(Step === 3 && PropertyType === "commercial") || Step === 4 ? (
                <AddPropertyPhotos PrevStep={PrevStep} />
              ) : null}
              {/* {Step === 4 && <AddPropertyPhotos PrevStep={PrevStep}  />} */}
              {Step === 5 && <AddPriceDetails PropertyType={PropertyType} PrevStep={PrevStep} LookingTo={LookingTo} />}

              {/* Next Button */}
              {
                Step === 1 && <button type='button' onClick={(e) => NextStep(e)} className='bg-[#36C991] mt-3 w-full rounded-md text-sm text-white font-[500] px-8 py-3'>Next,add property details</button>
              }

              {
                Step === 2 && <button type='button' onClick={(e) => NextStep(e)} className='bg-[#36C991] mt-3 w-full rounded-md text-sm text-white font-[500] px-8 py-3'>
                  {PropertyType === "commercial" ? "Next, add Property Images" : "Next, add Advanced details"}
                </button>
              }
              {Step === 3 && PropertyType !== "commercial" && (
                <button type='button' onClick={NextStep} className='bg-[#36C991] mt-3 w-full rounded-md text-sm text-white font-[500] px-8 py-3'>
                  Next, add Property Images
                </button>
              )}

              {(Step === 3 && PropertyType === "commercial") || Step === 4 ? (
                <button type='button' onClick={NextStep} className='bg-[#36C991] mt-3 w-full rounded-md text-sm text-white font-[500] px-8 py-3'>
                  Next, add Price Details
                </button>
              ) : null}

              {
                Step === 5 && <button type='submit' className='bg-[#36C991] mt-3 w-full rounded-md text-sm text-white font-[500] px-8 py-3'>
                  {loading ? <Loader2 className='w-5 h-5 mx-auto animate-spin' /> : "Post property"}
                </button>
              }
            </form>
          </FormProvider>

        </div>
      </div>
    </div>
  )
}

export default AddPropertyForm 