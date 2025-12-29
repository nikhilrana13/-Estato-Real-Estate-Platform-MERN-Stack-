import React, { useEffect, useState } from 'react'
import { FiPhoneCall } from 'react-icons/fi'
import userimg from "../../assets/man_13860639.png"
import calculatorimg from "../../assets/calculator.png"
import warningimg from "../../assets/warning.png"
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import EnquiryCardShimmer from "../DashboardComponents/EnquiryCardShimmer"
import { formatPrice } from '@/utils/formatters'

const PropertyEnquires = () => {
  const [loading,setLoading] = useState(false)
  const [Enquires,Setenquires] = useState([])


  useEffect(()=>{
          const fetchEnquires = async()=>{
            try { 
                 setLoading(true)
                 const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/lead/all-leads`,{
                  headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                  },withCredentials:true
                 })
                //  console.log("response",response.data)
                 if(response.data){
                    Setenquires(response?.data?.data)
                 }
            } catch (error) {
              console.log("failed to get enquires",error)
            }finally{
              setTimeout(() => {
                   setLoading(false)
              }, 2000);
           
            }
          }
          fetchEnquires()
  },[])
  return (
     <div className='w-full py-3 rounded-md gap-5 flex flex-col md:flex-row px-10'>
      {/* left  */}
      <div className='w-full bg-[#FFFFFF]  p-4  flex flex-col rounded-md md:w-[20%]'>
        <span className='text-[1.2rem] text-[#5E23DC]'>All Enquires ({Enquires?.length || 0})</span>
      </div>
      {/* center */}
      <div className='w-full   flex flex-col gap-5 md:h-[calc(100vh-2rem)]   overflow-y-auto  py-5 px-2 md:px-5 rounded-md md:w-[55%]'>
        <span>Showing {Enquires?.length || 0} Enquires:</span> 
        {
          loading ? (
            <>
            <EnquiryCardShimmer />
             <EnquiryCardShimmer />
            </>
          
          ):Enquires?.length > 0 ? (
            Enquires?.map((property)=>{
            const isResidential = property?.propertyId?.residential;
               const isCommercial = property?.propertyId?.commercial;

            const data = isResidential ? property.propertyId?.residential : property?.propertyId?.commercial;
              return (
        <div key={property._id} className='bg-[#ffffff] px-4 py-6 rounded-md gap-3 flex flex-col '>
             <span className='text-[0.8rem] text-gray-500 font-[500]'>Property ID: {property?.propertyId?._id.slice(0,9) || "NA"}</span>
          <div className='flex  justify-between'>
            <div className='flex gap-3'>
              <img src={userimg} alt="profile" className='w-10 h-10 rounded-md object-cover' />
              <span className='text-[0.8rem] font-[700]'>{property?.viewerDetail?.name || "NA"}</span>
            </div>
             <span className='text-[0.8rem] text-gray-500 font-[500]'>{new Date(property?.createdAt).toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "short",
                                 year:"2-digit"
                            }) || "NA"}</span>
          </div>
          <div className='flex flex-col gap-3 sm:flex-row justify-between'>
            <div className='flex flex-col'>
              <span className=' flex gap-1  text-gray-500 text-[0.8rem]'>
              Requirements: <span className='text-black'>{isResidential ? `${data?.bhk || "NA"}`:`${data?.type || "NA"}`}  </span>
            </span>
               <span className='text-black text-[0.8rem] '>
                {formatPrice(data?.propertyPrice) || "NA"} 
              </span>
               <span>
                {data?.address?.city || "NA"} {data?.address.locality || "NA"}
              </span>
            </div>
            <div>
              <span className='py-2 px-7 text-[#5E23DC] rounded-md bg-[#F2F3F8]'>
               {property.viewerDetail.phonenumber || "NA"}
            </span>
            </div>
            
          </div>
    </div>
              )
            })
          ):(
            <p className='text-center mx-auto  mt-10 text-gray-500 text-[1rem]'>No Enquires found</p>
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

export default PropertyEnquires


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