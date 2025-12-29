import React from 'react'
import { FiPhoneCall } from 'react-icons/fi';
import warningimg from "../../assets/warning.png"
import calculatorimg from "../../assets/calculator.png"
import { NavLink } from 'react-router-dom';
import { Edit } from 'lucide-react';
import { useSelector } from 'react-redux';
import unknownuser from "../../assets/unknown user.jpg"
import EditProfileDialog from './EditProfileDialog';
const MyProfile = () => {
   const user = useSelector((state)=> state.Auth.user)
   
  return (
    <div className='w-full py-3 rounded-md  gap-5 flex flex-col md:flex-row px-10'>
      {/* left side */}
      <div className='w-full  px-4 py-5 flex flex-col rounded-md md:w-[60%]'>
        <div className='bg-white border gap-2 p-4  shadow-md rounded-md flex flex-col md:flex-row'>
            <img src={user?.profilepic || unknownuser} alt="Profile pic" className='w-[100px] rounded-full' />
            <div className='flex w-full flex-col  gap-2'>
              <div className='flex justify-between'>
                <div className='flex flex-col' >
                  <span className='text-[1rem] font-[500]'>{user?.username || "User"}</span>
                  <span className='text-gray-500 text-[0.9rem]'>{user?.email || "NA"}</span>
                </div>
               {/* Edit profile dialog */}
               <EditProfileDialog />
              </div>
              <div></div>
            </div>
        </div>
      </div>
      {/* right side */}
       <div className='w-full gap-3 flex flex-col rounded-md md:w-[25%]'>
            {cards.map((c) => (
          <InfoCard card={c} key={c.id} />
        ))}
        </div>  
    </div>
  )
}

export default MyProfile



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