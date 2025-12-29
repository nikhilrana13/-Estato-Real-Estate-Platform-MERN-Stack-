import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { IoArrowBackCircleSharp } from 'react-icons/io5'
import { NavLink } from 'react-router-dom'
import nophotos from "../../assets/nophotos.svg"

const UsersWishlistProperty = () => {
    const [loading,setLoading] = useState(false)
    const [savedProperty,setSavedProperty] = useState([])

    useEffect(()=>{
         const fetchWishlistproperty = async()=>{
            try {
                setLoading(true)
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/property/mywishlists`,{
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("token")}`
                    },withCredentials:true
                })
                // console.log("response",response.data)
                if(response?.data){
                    setSavedProperty(response?.data?.data)
                }
            } catch (error) {
                console.log("failed to get wishlist property",error)
            }finally{
                setLoading(false)
            }
         }
         fetchWishlistproperty()
    },[])
  return (
    <>
     <div className='px-[2rem] lg:px-[7rem]   xl:px-[12rem] py-3'> 
        <NavLink to="/" className="p-10">
        <IoArrowBackCircleSharp className='w-10 h-10' />
        </NavLink>
           <div className='container'>
         <div className='m-2 p-5 '>
            <h1 className='text-2xl sm:text-3xl font-bold  '>Saved Property's </h1>
         </div>
          
          {
            loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12">
            {Array(8)
              .fill("")
              .map((_, index) => (
                <div key={index} className="animate-pulse max-w-[20rem] p-2 px-3 overflow-hidden">
                  <div className="w-full h-[200px] md:h-[250px] lg:h-[250px] bg-gray-300 rounded-[14px]"></div>
                  <div className="mt-3 h-6 w-3/4 bg-gray-300 rounded"></div>
                  <div className="mt-2 h-4 w-1/2 bg-gray-300 rounded"></div>
                </div>
              ))}
                </div>

            ):(savedProperty?.length > 0 ? (
                <div className='cards  mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 '>
                {savedProperty.map((item)=>{
                     const details = item?.residential || item?.commercial
                    return(
                        <NavLink key={item?._id} to={`/property/${item?._id}`}>
                            <div key={item?._id} className='max-w-[20rem] gap-3 p-2 px-3 overflow-hidden hover:scale-110 transition ease-in-out '>
                           <div className='relative bg-cover bg-no-repeat bg-center '>
                             <img src={item?.images[0] || nophotos} lazyloading="true" alt="image"  className='w-full h-[200px] object-cover md:h-[250px] lg:h-[250px] transition-all duration-300 rounded-[14px]' />
                       </div>
                         <div className='flex flex-col p-1 gap-0 '>
                              <span className='text-[1rem] sm:text-2xl  text-black font-bold'>{details?.address?.buildingName || "NA"}</span>
                              <p className='text-[1rem] text-[#6A6A6A] font-[500]'>{details?.address?.locality || "NA"} {details?.address.city || "NA"} 
                              </p>
                         </div>
                 </div>
                        </NavLink>
                        
                    )
                })}
             </div>

            ):(
            <h1 className='text-2xl  font-bold  text-center mt-12'> No Property found</h1>
            ))}
      </div>

    </div>
   

    </>
  )
}

export default UsersWishlistProperty