
import * as React from "react"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { NavLink, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { SetUser } from "../../Redux/AuthSlice"
import { toast } from "sonner"
import axios from "axios"
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { useState } from 'react'

const MoreDropdownMenu = ()=> {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  
  
   // handle logout 
  const HandleLogout = async()=>{
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/logout`,{
        withCredentials:true
      })
      if(response.data){
        toast.success(response?.data?.message)
         dispatch(SetUser(null))
         localStorage.removeItem("token")
         navigate("/")
      }
    } catch (error) {
      console.error("failed to logout",error)
      toast.error(error?.response?.data?.message || "Internal server error")
    }
  }

  return (
    <DropdownMenu className="border" open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
  <div className="flex items-center gap-3 cursor-pointer">
          <p className='mt-2'>More</p>
          {open ? <MdKeyboardArrowUp className="text-[1.2rem] mt-2  cursor-pointer" /> : <MdKeyboardArrowDown className=" cursor-pointer mt-2 text-[1.2rem]" />}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 bg-white shadow-md translate-x-[20%]">
        <div className="flex p-2 flex-col gap-3">
               <NavLink to="my-profile" className=" text-[#666666] text-sm font-[500]">
            My profile
        </NavLink>
           <NavLink to="/" className="text-sm font-[500] text-[#666666] ">
            Go to Estato.com
        </NavLink>
        <span onClick={HandleLogout} className="text-sm font-[500] cursor-pointer text-[#666666] ">
            Logout
        </span>
        </div>
     
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default MoreDropdownMenu

