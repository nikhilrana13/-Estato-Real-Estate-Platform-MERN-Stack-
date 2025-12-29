import React, { useEffect, useState } from 'react'
import { FiPhoneCall } from 'react-icons/fi'
import warningimg from "../../assets/warning.png"
import calculatorimg from "../../assets/calculator.png"
import { NavLink } from 'react-router-dom'
import ListingPropertyCard from './ListingPropertyCard'
import axios from 'axios'
import ListingShimmerCard from './ListingShimmerCard'
import { toast } from 'sonner'



const MyListings = () => {
  const [selectedProperty, setSelectedProperty] = useState("residential");
  const [Listings,SetMyListings] = useState([])
  const [loading,Setloading] = useState(false)

   useEffect(()=>{
         const fetchListings = async()=>{
           try {
               Setloading(true)
            
               const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/property/mylistings`,{
                headers:{
                  Authorization: `Bearer ${localStorage.getItem("token")}`
                },withCredentials:true
               })
               console.log("response",response.data.data)
               if(response.data){
                   const allListings = response.data?.data?.mylistings || []
                   const filtered = allListings.filter((item)=> {
                    return Object.keys(item).includes(selectedProperty)
                   })
                  //  console.log("filtered data",filtered)
                   SetMyListings(filtered)
               }
           } catch (error) {
             console.log("failed to get listings",error)
           }finally{
              Setloading(false)
           }
         }
         fetchListings()
   },[selectedProperty])
   
   const handleDeleteListing = async(id)=>{
       try {
          const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/property/delete/${id}`,{
             headers:{
              Authorization: `Bearer ${localStorage.getItem("token")}`
             },withCredentials:true
          })
          if(response.data){
             toast.success(response?.data?.message)
             SetMyListings((prev)=> prev.filter((item)=> item._id !== id))
          }
        
       } catch (error) {
         console.error("failed to delete listing",error)
         toast.error(error?.response?.data?.message || "Internal server error")
       }
   }
   
   
  return (
    <div className='w-full py-3 rounded-md min-h-screen gap-5 flex flex-col md:flex-row px-10'>
      {/* left side */}
        <div className='w-full bg-[#FFFFFF] min-h-[50vh] p-4  flex flex-col rounded-md md:w-[20%]'>
          <div className='flex flex-col gap-2'>
            <span className='text-[1rem] font-[600]'>My Listings</span>
            <span className='text-[0.8rem] text-[#767676]'>Manage your listings</span>
          </div>
         <div className='mt-5 flex gap-2 flex-col'>
           <span className='text-[1rem] font-[500]'>Show</span>
            <div className='flex flex-col gap-2'>
             <span onClick={()=> setSelectedProperty("residential")} className={`flex text-[0.9rem] cursor-pointer gap-2 font-[500] ${selectedProperty === "residential" ? "text-[#5E23DC]":"" } `}>
                <div className={`w-5 h-5 rounded-full ${selectedProperty === "residential" ? "bg-[#5E23DC]" : "bg-[#FFFFFF]"}  border-2 `}></div> Residential Properties
             </span>
              <span onClick={()=> setSelectedProperty("commercial")} className={`flex text-[0.9rem] cursor-pointer gap-2 font-[500] ${selectedProperty === "commercial" ? "text-[#5E23DC]":"" } `}>
                <div className={`w-5 h-5 rounded-full border-2 ${selectedProperty === "commercial" ? "bg-[#5E23DC]" : "bg-[#FFFFFF]"}    `}></div> Commercial Properties
             </span>
            </div>
         </div>
         </div>
        {/* center listings card */}
        <div data-lenis-prevent className='w-full bg-[#FFFFFF]  flex flex-col gap-5 border  md:h-[calc(100vh-2rem)]   overflow-y-auto  py-5 px-2 md:px-5 rounded-md md:w-[55%]'>
            
            {
            loading ? (
               [...Array(3)].map((_,i)=>{
                  return (
                    <ListingShimmerCard key={i} />
                  )
               })
            ):Listings?.length > 0 ? (
              Listings?.map((property)=>{
                return (
                 <ListingPropertyCard key={property?._id} handleDeleteListing={()=> handleDeleteListing(property?._id)}  property={property} />
                )
              })
            ):(
              <p className='text-center mx-auto  mt-10 text-gray-500 text-[1rem]'>No Listings found</p>
            )
          }
        </div>
        {/* right cards */}
        <div className='w-full gap-3 flex flex-col rounded-md md:w-[25%]'>
            {cards.map((c) => (
          <InfoCard card={c} key={c.id} />
        ))}
        </div>  
      </div>
  )
}

export default MyListings


const cards = [
  {
    id: 1,
    title: "Your property advisor",
    description: "Get assistance on selling/ renting your property faster",
    icon: FiPhoneCall,         
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80",
    link: "#",
    buttonText: "view contact",
  },
  {
    id: 2,
    title: "Pro tip",
    description:
      "Be cautious of any suspicious calls received from users posing as 'Armyman' or from other 'public service' and asking to transfer money!",
    image: warningimg,
    link: "#",
    buttonText: "Know More",
  },
  {
    id: 3,
    title: "Property Value Calculator",
    description: "Calculate the right value of your property",
    image: calculatorimg,
    link: "#",
    buttonText: "Estimate Price",
  },
];

// Reusable InfoCard component
function InfoCard({ card }) {
  const Icon = card.icon; // component ref or undefined

  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] overflow-hidden w-full">
      <div className="flex gap-4 p-3 items-start">
        {/* Left media: if icon + image both present, show image as avatar */}
        {card.image ? (
          <img
            src={card.image}
            alt={card.title}
            className="w-14 h-14 rounded-full object-cover border-2 border-white shadow"
          />
        ) : Icon ? (
          <div className="w-14 h-14 rounded-full bg-[#F8F6FF] flex items-center justify-center">
            <Icon className="text-[#5E23DC] text-xl" />
          </div>
        ) : (
          <div className="w-14 h-14 rounded-full bg-gray-100" />
        )}

        {/* Text */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
          
            {Icon && !card.image && <Icon className="text-[#5E23DC]" />}
            <span className="font-semibold text-[0.92rem] text-[#111827]">
              {card.title}
            </span>
          </div>

          <p className="text-[0.78rem] text-gray-600 mt-1 leading-snug">
            {card.description}
          </p>

          <div className="mt-3 text-right  ">
            <NavLink
              to={card.link || "#"}
              className="text-[#5E23DC] text-[0.85rem] font-semibold"
            >
              {card.buttonText} &gt;
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}