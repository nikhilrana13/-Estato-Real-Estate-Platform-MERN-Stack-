
import InfoCards from '../DashboardComponents/InfoCards'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { MdKeyboardArrowRight } from 'react-icons/md'
import Nophotosimg from "../../assets/nophotos.svg"
import ListingStatus from '../DashboardComponents/ListingStatus'
import BoostVisibility from '../DashboardComponents/BoostVisibility'
import Testimonials from '../DashboardComponents/Testimonials'
import FAQCard from '../DashboardComponents/FAQCard'
import CustomerSupport from '../DashboardComponents/CustomerSupport'
import axios from 'axios'
import SummaryShimmer from './SummaryShimmer'
import { useSelector } from 'react-redux'
import ListingStatusShimmer from './ListingStatusShimmer'
import BoostVisibilityShimmer from './BoostVisibilityShimmer'
import { formatPrice } from '../../utils/formatters.js'

const Dashboard = () => {
  const user = useSelector((state)=> state.Auth.user)
  const [Listings, SetMyListings] = useState([])
  const [loading, Setloading] = useState(false)
  const ActiveListingcount = Listings?.filter((property)=> property.status === "active").length

  useEffect(() => {
    const fetchListings = async () => {
      try {
        Setloading(true)

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/property/mylistings`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }, withCredentials: true
        })
        // console.log("response", response.data.data)
        if (response.data) {

          SetMyListings(response?.data?.data.mylistings)
        }
      } catch (error) {
        console.log("failed to get listings", error)
      } finally {
         setTimeout(() => {
          Setloading(false)
         }, 1000);
        
      }
    }
    fetchListings()
  }, [])

  return (
    <>
      {/* left side */}
      <div className='w-full  rounded-md lg:w-[70%] '>
        <div className='flex  py-3 items-center justify-between'>
          <span className='text-[1rem] font-[600]'>
            Checkout your listing ({Listings?.length || 0})
          </span>
          <NavLink to="/dashboard/mylistings" className="text-[#7B4BE2] text-[0.9rem] flex items-center">
            View All <MdKeyboardArrowRight />
          </NavLink>
        </div>
        {
          loading ? (
            <SummaryShimmer />
          ) : Listings.length > 0 ? (
            <div className='bg-white p-5  rounded-md'>
              <span className='py-3  text-[1rem] text-[#767676] '>Current plan:{user?.plan || "NA"}</span>
              {
                Listings.slice(0, 1).map((property) => {
                  const isResidential = property?.residential;
                  const isCommercial = property?.commercial;
                  const data = isResidential ? property.residential : property.commercial;
                  return (
                    <>
                      <div key={property?._id} className='flex mt-3 flex-col justify-between sm:items-center md:flex-row gap-3'>
                        <div className='flex  gap-2'>
                          <img src={property?.images[0] || Nophotosimg} alt="fallback image" className='rounded-md object-cover w-[126px]' />
                          <div className='flex ml-2 flex-col gap-1'>
                            <span className='text-[1rem] font-[600]'>
                              {data.property?.residential && `${data?.bhk || "N/A"} `}{data?.type || "NA"} in {data?.address.city || "N/A"}
                            </span>
                            <span className='text-[0.8rem] text-[#767676]'>
                              {data?.plotArea || "NA"} {data?.plotAreaUnit || "NA"} | ₹ {formatPrice(data?.propertyPrice || "NA")}                           </span>
                          </div>
                        </div>
                        <div className='mt-3 sm:mt-0'>
                          <NavLink to="/dashboard/mylistings" className="bg-[#5E23DC] px-2 py-2 sm:px-9 sm:py-3 rounded-md text-sm text-white font-[600]" >
                            View All Listings
                          </NavLink>
                        </div>
                      </div>
                    </>
                  )
                })
              }
            </div>
          ) : (
            <p className='text-[1rem] text-center p-5 text-gray-500'>No Listings found</p>
          )
        }
        {/* Listing status cards */}
        {
          loading ? (
            <ListingStatusShimmer />
          ):(
              <ListingStatus Activecount={ActiveListingcount} />
          )
        }
       
        {/* boost visibility */}
        {loading ? <BoostVisibilityShimmer /> : <BoostVisibility />}
        {/* testimonals */}
        <Testimonials />
        {/* faq card */}
        <FAQCard />
        {/* customer support card */}
        <CustomerSupport />
      </div>
      {/* right side */}
      <div className='w-full  gap-4 sm:items-center  flex overflow-auto flex-col  lg:w-[30%]'>
        <InfoCards />
      </div>
    </>
  )
}

export default Dashboard