import { PlusIcon } from 'lucide-react';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom'
import MoreDropdownMenu from './DropdownMenu';

const DashboardNavbar = () => {
    const user = useSelector((state) => state.Auth.user)
    // console.log("user",user)
    const [toggle, settoggle] = useState(false);
    const location = useLocation()

    const handleToggle = () => {
        settoggle(!toggle);
    };
    return (
        <header className="flex bg-[#CEC6FF]   flex-col pb-3  rounded-b-[40px]  xl:px-[8rem]  tracking-wide relative z-50">
            <nav className="flex  px-6 py-1 w-full">
                <div className="flex flex-wrap items-center justify-between lg:gap-y-2 gap-2 w-full">
                    {/* Logo */}
                    <div className='flex items-start text-black'>
                        <span className='text-[1.5rem] sm:text-[2rem] font-[600] leading-none'>ESTATO</span>
                        <span className='text-[0.8rem] font-[600] relative bottom-[-12px] ml-1'>.COM</span>
                    </div>
                    {/* Mobile Menu */}
                    <div
                        className={`flex  max-lg:!block max-lg:fixed gap-5 max-lg:bg-white dark:bg-black max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50 transition-transform duration-300 ${toggle ? "max-lg:translate-x-0" : "max-lg:-translate-x-full"
                            }`}
                    >
                        {/* Close Button */}
                        <button onClick={handleToggle} className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white w-9 h-9 flex items-center justify-center border">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 fill-black" viewBox="0 0 320.591 320.591">
                                <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z" />
                                <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z" />
                            </svg>
                        </button>
                        {/* Menu Items */}
                        <ul className="lg:flex items-center cursor-pointer lg:gap-x-3 max-lg:space-y-3">
                            <li className="max-lg:border-b  max-lg:py-3 px-3">
                                <NavLink to="/dashboard/dashboard-home" className={({ isActive }) =>
                                    isActive
                                        ? "relative text-black  font-bold after:content-[''] after:absolute after:top-0  after:left-0 after:w-full after:h-[4px] after:rounded-full  after:bg-black"
                                        : "text-black text-[1rem] font-[400]"
                                }  >
                                    <p className='mt-2'>Dashboard</p>
                                </NavLink>
                            </li>
                            <li className="max-lg:border-b max-lg:py-3 px-3">
                                <NavLink to="enquiries" className={({ isActive }) =>
                                    isActive
                                        ? "relative text-black  font-bold after:content-[''] after:absolute after:top-0  after:left-0 after:w-full after:h-[4px] after:rounded-full  after:bg-black"
                                        : "text-black text-[1rem] font-[400]"
                                }>

                                    <p className='mt-2'>Enquiries</p>
                                </NavLink>
                            </li>
                            <li className="max-lg:border-b max-lg:py-3 px-3">
                                <NavLink to="mylistings" className={({ isActive }) =>
                                    isActive
                                        ? "relative text-black  font-bold after:content-[''] after:absolute after:top-0  after:left-0 after:w-full after:h-[4px] after:rounded-full  after:bg-black"
                                        : "text-black text-[1rem] font-[400]"
                                }>

                                    <p className='mt-2'>Listings</p>
                                </NavLink>
                            </li>
                            <li className="max-lg:border-b gap-2 flex items-center max-lg:py-3 px-3">
                                <MoreDropdownMenu />
                            </li>
                        </ul>
                    </div>
                
                    <div className="flex items-center   gap-x-5 gap-y-3 ">
                        <div className="flex items-center gap-3">
                            <NavLink to="add-property">
                                <button className='text-white  mt-2 text-[0.8rem] font-[600] bg-[#5E23DC] px-5 py-2 rounded-md'>
                                    Add Property
                                </button>
                            </NavLink>

                            {/* Mobile Menu Button */}
                            <button onClick={handleToggle} className="lg:hidden text-white" >
                                <svg className="w-7 h-7" fill="#ffffff" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
             {location.pathname === "/dashboard-home" && (
                <div className='px-6 mt-8 py-3'>
                    <div className='flex  items-start text-[#434343]'>
                        <span className='text-[1.2rem]  font-[600] leading-none'>Hi Hjjj</span>
                        <span className='text-[0.8rem] font-[600] relative bottom-[-7px] ml-2'>Welcome to the dashboard</span>
                    </div>
                </div>
             )}
        </header>
    )
}

export default DashboardNavbar