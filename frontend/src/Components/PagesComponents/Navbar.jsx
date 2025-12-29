import React, { Fragment, useEffect, useState } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import unknownuser from "../../assets/unknownuser.webp"
import { IoIosCloseCircle } from "react-icons/io";
import { AiFillInstagram, AiOutlineCheck } from "react-icons/ai";
import { CiCircleQuestion } from 'react-icons/ci';
import { FaFacebook, FaLinkedin } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';
import fallbackimage from "../../assets/fallback.3b935c39.svg"
import LoginDialog from './LoginDialog';
import { useDispatch, useSelector } from 'react-redux';
import { MdDashboardCustomize } from 'react-icons/md';
import { GiSuspicious } from 'react-icons/gi';
import { IoLogOut } from 'react-icons/io5';
import { toast } from 'sonner';
import { SetUser } from '../../Redux/AuthSlice';
import axios from 'axios';
import SearchBar from './SearchBar';
import { HeartIcon } from 'lucide-react';




const Navbar = ({search,type,setType,lookingTo,SetlookingTo,onSubmit}) => {
  const [isSidebarOpen, SetIsSidebarOpen] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector((state) => state.Auth.user)
  const navigate = useNavigate()
  const [IsNavbarFixed, SetIsNavbarFixed] = useState(false)
  const location = useLocation()

  // handle logout 
  const HandleLogout = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/logout`, {
        withCredentials: true
      })
      if (response.data) {
        toast.success(response?.data?.message)
        dispatch(SetUser(null))
        localStorage.removeItem("token")
        SetIsSidebarOpen(false)
        navigate("/")
      }
    } catch (error) {
      console.error("failed to logout", error)
      toast.error(error?.response?.data?.message || "Internal server error")
    }
  }
  //handle Navbar fixed
  useEffect(() => {
    if(location.pathname !== "/"){
      SetIsNavbarFixed(false)
      return;
    }
    const handleScroll = () => {
      const offset = 580
      if (window.scrollY > offset) {
        SetIsNavbarFixed(true)
      } else {
        SetIsNavbarFixed(false)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return (() => window.removeEventListener("scroll", handleScroll))
  }, [])



  return (
    <>
      <header style={
        IsNavbarFixed && location.pathname === "/"
          ? {
            background:
              "linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.25), transparent) rgb(94, 63, 224)",
            boxShadow: "rgba(0, 0, 0, 0.25) 0px 4px 10px",
            borderRadius: "0 0 70px 70px",
          }
          : {
            background: "#2E1173",
          }
      } className={`flex  w-full transition-all duration-300 ease-in-out px-6  items-center z-[9999] ${IsNavbarFixed
        ? "fixed top-0 left-0 right-0  translate-y-0 opacity-100"
        : "relative bg-[#2E1173] translate-y-0"
        }  min-h-[75px] tracking-wide`}>
        <nav className="flex max-w-screen-xl mx-auto  w-full">
          <div className={`flex  items-center lg:gap-y-2 ${location.pathname === "/searchproperties" ? "justify-around" :"justify-between"} w-full`}>
            <div className='flex items-start text-white'>
              <span className='text-[1.5rem] sm:text-[2rem] font-[600] leading-none'>ESTATO</span>
              <span className='text-[0.8rem] font-[600] relative bottom-[-12px] ml-1'>.COM</span>
            </div>
            {/* Search Input for large screen show only on searchproperties page */}
            {
            location.pathname === "/searchproperties" && (
              <SearchBar search={search} type={type} setType={setType} lookingTo={lookingTo} SetlookingTo={SetlookingTo} onSubmit={onSubmit} />
            )
            }

            <div className="flex items-center  gap-x-5 gap-y-3 ">
              <div className="flex items-center gap-2 sm:gap-5">
                {
                  user?.mylistings?.length > 0 ? (
                    <NavLink to="/dashboard/mylistings" className="text-white bg-[#36C991] font-[500] text-[0.8rem] px-4 py-1 rounded-md">
                      Manage Listings
                    </NavLink>

                  ) : (
                    <button onClick={()=>{
                      if(!user){
                        toast.info("Please login to post a property");
                        SetIsSidebarOpen(true)
                      }else{
                        navigate("/dashboard/add-property")
                      }
                    }} className="text-white font-[600]  text-[0.8rem]">
                      Post Property
                      <span className='ml-1  py-[2px] px-[4px] bg-[#F22B68]'>Free</span>
                    </button>
                  )
                }

                <div onClick={() => SetIsSidebarOpen(true)} className='bg-white cursor-pointer sm:py-1 sm:px-5 border rounded-[16px] '>
                  {/* <User2 /> */}
                  <img src={unknownuser} alt="user" className='w-[24px] h-[24px] object-cover' />
                </div>
              </div>
            </div>

          </div>
        </nav>


      </header>
      {/* Login Sidebar  */}
      <div className={` fixed fixed-sidebar top-0  pb-[80px] lg:pb-[0]  right-0 h-full w-[363px] z-[10000] bg-white shadow-lg  transform transition-transform duration-300 will-change-transform  ${isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } overflow-y-auto scrollbar-hidden`}
      >
        <div className=" bg-[#F2F3F8]">
          <div className='flex justify-end p-3'>
            <IoIosCloseCircle onClick={() => SetIsSidebarOpen(false)} className='text-[2.5rem] hover:bg-gray-100 cursor-pointer  py-2 px-2 rounded-full' />
          </div>
          <div className='flex px-4 py-3 gap-3 items-center'>
            <div className='flex px-2 items-center gap-3'>
              {
                user ? (
                  <>
                    <div className='flex flex-col '>
                      <span className='font-[700] text-[0.8rem]'>Hello {user?.username || "User"}</span>
                      <span className='text-[#525253] font-[600] text-[0.7rem]'>{user?.email ? user?.email : user?.phonesuffix + user?.phoneNumber} </span>
                    </div>
                  </>
                ) : (
                  <>
                    <img src={unknownuser} alt="user pic" className='w-[64px] h-[64px]' />
                    <div className='flex flex-col gap-1'>
                      <span className='font-[700] text-[0.8rem]'>Hello👋🏻</span>
                      <span className='flex gap-2 items-center  text-gray-400 font-[600] text-[0.8rem]'>
                        <span className='rounded-full py-1 px-1 border border-green-500'><AiOutlineCheck className='text-green-500' /></span>Easy Contact with sellers</span>
                      <span className='flex text-gray-400 gap-2 items-center font-[600] text-[0.8rem]'> <span className='rounded-full py-1 px-1 border border-green-500'><AiOutlineCheck className='text-green-500' /></span>Personalized experience</span>
                    </div>
                  </>
                )
              }
            </div>
            {
              user ? <NavLink to="/dashboard/my-profile" className=' text-sm rounded-full  text-black px-3 py-2 bg-white'>Edit</NavLink> : <LoginDialog onLoginSuccess={() => SetIsSidebarOpen(false)} />
            }
          </div>
        </div>
        {/* my details */}
        <div className='flex mt-3 flex-col'>
          <h4 className='font-[700] py-3 px-3  text-[0.8rem]'>My Activity</h4>
          {
            user ? (
              <>
                <NavLink to="/dashboard/dashboard-home" className='flex px-4 cursor-pointer  hover:bg-[#F6F4FD] py-4 items-center gap-[20px]'>
                  <MdDashboardCustomize className='text-[1.2rem]' />
                  <span className='font-[500] text-sm'>Manage Dashboard</span>
                </NavLink>
                <NavLink to="/mywishlists" className='flex px-4 cursor-pointer  hover:bg-[#F6F4FD] py-4 items-center gap-[20px]'>
                  <HeartIcon className='text-[1.2rem]' />
                  <span className='font-[500] text-sm'>Saved properties</span>
                </NavLink>

                <NavLink to="#" className='flex px-4 cursor-pointer  hover:bg-[#F6F4FD] py-4 items-center gap-[20px]'>
                  <GiSuspicious className='text-[1.2rem]' />
                  <span className='font-[500] text-sm'>Report a fraud</span>
                </NavLink>
              </>
            ) : (
              <>
                <div className='flex flex-col items-center  px-4 py-8 gap-2'>
                  <img src={fallbackimage} alt="fallback" className='w-[165px] object-cover h-[117px]' />
                  <button className='text-white mt-2 text-[0.8rem] font-[600] bg-[#5E40E0] px-8 py-1 rounded-md'>Login to view your Recent <br /> Activity</button>
                </div>
              </>
            )
          }
        </div>
        <div className='flex px-4 py-2 mt-3 gap-3 flex-col'>
          <NavLink to="#" className='flex px-4   hover:bg-[#F6F4FD] cursor-pointer border rounded-md py-4 items-center gap-[20px]'>
            <CiCircleQuestion className='text-[1.2rem]' />
            <span className='font-[400] text-sm'>Visit Help Center</span>
          </NavLink>
          {
            user ? <button className='flex mt-5 px-4 cursor-pointer  hover:bg-[#F6F4FD]  border rounded-md py-4 items-center gap-[20px]'>
              <IoLogOut className='text-[1.2rem]' />
              <span onClick={HandleLogout} className='font-[500] text-sm'>Log Out</span>
            </button> : ""
          }
        </div>
        <div className='flex  mt-20 items-center justify-center px-3 py-2 gap-3'>
          <span className='text-sm text-[#A9A9A9]'>Follow on</span>
          <div className='flex items-center  gap-8 text-[#A9A9A9]'>
            <FaFacebook className='cursor-pointer' />
            <FaSquareXTwitter className='cursor-pointer' />
            <AiFillInstagram className='cursor-pointer' />
            <FaLinkedin className='cursor-pointer' />
          </div>
        </div>
      </div>
      {/* overlay container only for Sidebar (not LoginDialog) */}
      {isSidebarOpen && (
        <div
          onClick={() => SetIsSidebarOpen(false)}
          className="fixed fixed-overlay inset-0 bg-black bg-opacity-40 z-[10001]"
        ></div>

      )}
    </>
  )
}

export default Navbar


