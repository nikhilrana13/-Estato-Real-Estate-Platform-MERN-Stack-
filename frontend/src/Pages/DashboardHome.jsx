
import { MessageCircleWarning } from 'lucide-react'
import DashboardNavbar from '../../../frontend/src/Components/DashboardComponents/DashboardNavbar'
import React, { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { BiCloset } from 'react-icons/bi'
import { IoIosCloseCircle } from 'react-icons/io'
import ChatbotHome from '../../../frontend/src/Components/DashboardComponents/ChatbotComponent/ChatbotHome'


const DashboardHome = () => {
  const [open,setOpen] = useState(false)
  return (
    <div className='w-full bg-[#F2F3F8]'>
      <DashboardNavbar />
      <div className='w-full flex min-h-[100vh] py-3 xl:px-[9rem]  gap-5 lg:flex-row flex-col '>
        <Outlet />
      </div>
      {/* Chatbot pop up */}
      {
        !open && (
          <div className='fixed bottom-6 z-[9999] right-6'>
        <button onClick={()=> setOpen(true)} className='w-[60px] hover:scale-110 transition h-[60px] cursor-pointer flex items-center  justify-center rounded-full bg-[#32075E] '>
              <MessageCircleWarning className='text-white' size={29} />
        </button>
      </div>
        )
      }
      {/* Chatbot*/}
      {
        open && ( 
         <ChatbotHome open={open} setOpen={setOpen} />
        )
      }
     
    </div>
  )
}

export default DashboardHome