import React, { useCallback, useEffect, useState } from 'react'
import Navbar from './Navbar'
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowRight, Type } from 'lucide-react'
import { MdKeyboardArrowRight } from 'react-icons/md'
import PropertySearchFilters from './PropertySearchFilters'
import PropertyListingCard from './PropertyListingCard'
import useLocationSearch from '../CustomHook/useLocationSearch'
import { toast } from 'sonner'
import UsePropertyFilters from '../CustomHook/UsePropertyFilters'
import axios from 'axios'
import useDebounce from '../CustomHook/useDebounce'
import FiltersShimmer from './FilterShimmer'
import PropertyListingCardShimmer from './PropertyListingCardShimmer'


const SearchProperties = () => {
  const search = useLocationSearch()
  const filters = UsePropertyFilters()
  const [type, setType] = useState("residential")
  const [lookingTo, SetlookingTo] = useState("Buy")
  const [appliedCity, setAppliedCity] = useState("")
  const [appliedlookingto, setAppliedlooking] = useState("")
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [Properties, SetAllProperties] = useState([])
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1 })
  const debouncedMin = useDebounce(filters.minPrice, 500)
  const debouncedMax = useDebounce(filters.maxPrice, 500)

  // get values on first render from params
  useEffect(() => {
    const city = searchParams.get("city")
    const type = searchParams.get("type")
    const lookingto = searchParams.get("lookingto")
    if (city && type && lookingto) {
      search.setValue(city)
      setAppliedCity(city)
      setType(type)
      SetlookingTo(lookingto)
      setAppliedlooking(lookingto)
    }
  }, [searchParams])
  // update url when filters change
  const updateFiltersInURL = useCallback(() => {
    const params = new URLSearchParams(window.location.search);
    // BASE SEARCH PARAMS
    params.set("city", appliedCity);
    params.set("type", type);
    params.set("lookingto", lookingTo);
    // PRICE
    params.set("minPrice", filters.minPrice);
    params.set("maxPrice", filters.maxPrice);
    // ARRAYS
    filters.Bhks.length
      ? params.set("bhk", filters.Bhks.join(","))
      : params.delete("bhk");

    filters.propertytype.length
      ? params.set("propertytype", filters.propertytype.join(","))
      : params.delete("propertytype");

    filters.Amenities.length
      ? params.set("Amenities", filters.Amenities.join(","))
      : params.delete("Amenities");

    filters.furnishType.length
      ? params.set("furnishType", filters.furnishType.join(","))
      : params.delete("furnishType");

    // OTHERS
    filters.sortBy
      ? params.set("sortby", filters.sortBy)
      : params.delete("sortby");

    filters.constructionStatus
      ? params.set("constructionStatus", filters.constructionStatus)
      : params.delete("constructionStatus");
    navigate(`?${params.toString()}`, { replace: true });
  }, [appliedCity, type, lookingTo, filters.minPrice, filters.maxPrice, filters.Bhks, filters.propertytype, filters.Amenities, filters.furnishType, filters.sortBy, filters.constructionStatus])

  // Api call when filters change or component mount
  useEffect(() => {
    if (!appliedCity || !type || !lookingTo) return;
    // URL sync 
    updateFiltersInURL()
    // api call
    fetchProperties(appliedCity, type, lookingTo)
  }, [appliedCity, debouncedMin, debouncedMax, filters.propertytype, filters.Bhks, filters.furnishType, filters.Amenities, filters.constructionStatus, filters.sortBy])

  const extractCity = (str) => {
    // "Panchkula, Haryana, India" → "Panchkula"
    return str?.split(",")[0]?.trim();
  };
  // Fetch Properties
  const fetchProperties = useCallback(async (cityForApi, selectedType, selectedLookingTo) => {
    try {
      setLoading(true)
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/property/properties`,
        {
          params: {
            minPrice: filters.minPrice,
            maxPrice: filters.maxPrice,
            propertytype: filters.propertytype.join(","),
            bhk: filters.Bhks.join(","),
            furnishType: filters.furnishType.join(","),
            Amenities: filters.Amenities.length ? filters.Amenities.join(",") : undefined,
            type: selectedType,
            lookingto: selectedLookingTo,
            sortby: filters.sortBy,
            city: cityForApi,
            constructionStatus: filters.constructionStatus,
          },
        },
        { withCredentials: true }
      )
      // console.log("response", response.data)
      if (response.data) {
        SetAllProperties(response.data.data.properties)
        setPagination(response.data.data.pagination)
      }
    } catch (error) {
      console.log("failed to get properties", error)
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 1000);
    }
  }, [filters.minPrice, filters.maxPrice, filters.propertytype, filters.Bhks, filters.furnishType, filters.Amenities, filters.sortBy,
  filters.constructionStatus])
  //  console.log("properties",Properties)
  // send data to backend 
  const onSubmit = async () => {
    const cityforapi = extractCity(search.value)
    if (!cityforapi) {
      toast.error("Location is Required")
      return;
    }
    setAppliedCity(cityforapi)
    setAppliedlooking(lookingTo)
    // update params values when change
    const currentParams = new URLSearchParams(window.location.search)
    currentParams.set("city", cityforapi)
    currentParams.set("type", type)
    currentParams.set("lookingto", lookingTo)
    navigate(`?${currentParams.toString()}`, { replace: true })
    // console.log("type",type)
    // console.log("lookingto",lookingTo)
    // console.log("city",cityforapi)
    // ready for send to data
    fetchProperties(cityforapi, type, lookingTo)
  }
  const handleSorting = (e) => {
    filters.SetSortBy(e.target.value)
  }
  const start =
    (pagination?.currentPage - 1) * pagination?.limit + 1;

  const end =
    Math.min(
      pagination?.currentPage * pagination?.limit,
      pagination?.totalproperty
    );
  return (
    <div className='w-full '>
      <Navbar search={search} type={type} setType={setType} lookingTo={lookingTo} SetlookingTo={SetlookingTo} onSubmit={onSubmit} />
      {/* Search properties filters */}
      <section className='w-full bg-[#F4F4F4]  border px-[2rem] lg:px-[7rem]   xl:px-[12rem] py-3'>
        <NavLink to="/" className=' items-center  text-[#747474] flex gap-1 text-[0.8rem]'>
          Home <MdKeyboardArrowRight /> <span>property in {appliedCity || "India"}</span>
        </NavLink>
        <div className='  flex flex-col py-2 w-full mt-5 h-full   lg:flex-row  gap-3'>
          {/* left side filters */}
          <div data-lenis-prevent className='w-full   no-scrollbar lg:sticky  lg:h-[calc(100vh-75px)] lg: overflow-y-auto lg:top-[75px]  rounded-md flex  flex-col bg-white   lg:w-[25%]'>
            {
              loading ? (
                <FiltersShimmer />
              ) : (
                <PropertySearchFilters filters={filters} type={type} />
              )
            }
          </div>
          {/* right side */}
          <div className='w-full lg:w-[75%] md:px-2 '>
            <div className='flex flex-col gap-1'>
              {pagination.totalproperty > 0 ? (
                <span className='text-[#747474] text-[0.9rem] sm:text-[0.8rem] font-[600]'>Showing {start || "NA"}-{end || "NA"}  of {pagination?.totalproperty || 0} results</span>
              ) : <p className='text-[0.9rem]  sm:text-[0.8rem]  text-[#747474]'>No properties found</p>
              }
              <div className='flex flex-col md:items-center sm:justify-between md:flex-row gap-2'>
                <span className='text-black font-[500]'>Properties for {appliedlookingto === "Rent" ? "Rent" : "Sale"} in {appliedCity || "India"}</span>
                <div className='flex items-center gap-2'>
                  <span className='text-[0.8rem] font-[600]' >Sort By:</span>
                  <select onChange={handleSorting} className='p-2 cursor-pointer rounded-md  text-[0.9rem]'>
                    <option value="relevance" className='cursor-pointer'>Relevance</option>
                    <option value="hightolow" className='cursor-pointer'>High to low</option>
                    <option value="lowtohigh" className='cursor-pointer'>Low to High</option>
                  </select>
                </div>
              </div>
              {/* Property Cards */}
              {
                loading ? (
                  <div className='flex flex-col  gap-3 mt-4'>
                    {[1, 2, 3, 4, 5].map((index) => {
                      return (
                        <PropertyListingCardShimmer key={index} />
                      )
                    })
                    }
                  </div>
                ) : Properties.length > 0 ? (
                  <div className='flex flex-col  gap-3 mt-4'>
                    {Properties.map((property) => {
                      return (
                        <PropertyListingCard key={property?._id} property={property} type={type} onNavigate={() => {
                          navigate(`/property/${property?._id}`)
                        }} />
                      )
                    })}
                  </div>
                ) : (
                  <div className='flex mx-auto justify-center items-center mt-10'>
                    <p className='text-gray-500 text-[0.8rem]'>Sorry! No Property found {extractCity(appliedCity)}</p>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SearchProperties





