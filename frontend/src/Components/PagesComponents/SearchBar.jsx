import React, { useEffect, useRef, useState } from 'react'
import { FiSearch } from "react-icons/fi";

import { MdKeyboardArrowDown } from "react-icons/md";

const SearchBar = ({search,type,setType,lookingTo,SetlookingTo,onSubmit}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className='border hidden  md:flex items-center w-[50%] rounded-md p-2  bg-white'>

      <div className="flex relative items-center w-full gap-4  ">
        {/* LEFT DROPDOWN */}
        <div
          ref={dropdownRef}
          className="relative border-r px-4 py-2 cursor-pointer select-none"
          onClick={() => setOpen((prev) => !prev)}
        >
          <div className="flex items-center gap-1 font-medium text-gray-800">
            {lookingTo}
            <MdKeyboardArrowDown className={`text-[0.8rem] transition-transform ${open ? "rotate-180" : ""
              }`} />
          </div>
          {
            open && (
              <div className="absolute left-0 top-full mt-3 w-56 bg-white rounded-md shadow-lg border z-50">
                <div className="px-4 py-2 text-xs font-semibold text-gray-400">
                  Residential
                </div>
                {["Buy", "Rent",].map((item) => (
                  <div
                    key={`res-${item}`}
                    onClick={() => {
                      setType("residential")
                      SetlookingTo(item);
                      setOpen(false);
                    }}
                    className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${type === "residential" && lookingTo === item ? "font-semibold text-[#0B5ED7]" : ""
                      }`}
                  >
                    {item.charAt(0) + item.slice(1)}
                  </div>
                ))}

                <div className="px-4 py-2 text-xs font-semibold text-gray-400 mt-1">
                  Commercial
                </div>
                {["Buy", "Rent"].map((item) => (
                  <div
                    key={`com-${item}`}
                    onClick={() => {
                      setType("commercial")
                      SetlookingTo(item);
                      setOpen(false);
                    }}
                    className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${type === "commercial" && lookingTo === item ? "font-semibold text-[#0B5ED7]" : ""
                      }`}
                  >
                    {item.charAt(0) + item.slice(1)}
                  </div>
                ))}
              </div>
            )
          }
        </div>
        {/* search bar */}
        <input type='text' value={search.value } onChange={(e)=>{
          search.setValue(e.target.value); search.setIsUserTyping(true)
        }} onFocus={() => search.setOpen(true)} onBlur={() => setTimeout(() => search.setOpen(false), 200)}  
        className='flex-1  border-r  outline-none px-1 py-2 bg-transparent text-gray-700 placeholder-gray-400' placeholder='Enter for locality,project,builder' />

        <button onClick={()=> onSubmit()} className="w-9 h-9 flex items-center justify-center text-xl text-gray-700">
          <FiSearch />
        </button>
          {/* show dropdown */}
            {
              search.open && (
                <>
                  {/* Loading */}
                  {search.loading && (
                    <div className="absolute top-full p-3 left-20 ml-1 w-full md:w-[70%] bg-white rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto ">
                      <span className="text-gray-500">Loading...</span>
                    </div>
                  )}
                  {/* Suggestions */}
                  {!search.loading && search.suggestions.length > 0 && (
                    <div className="absolute top-full left-20 ml-1 w-full md:w-[70%] bg-white rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto no-scrollbar" >
                      {search.suggestions.map((item) => (
                        <div
                          key={item.place_id}
                          onMouseDown={() => {
                            search.setValue(item.display_name);
                            search.setOpen(false);
                            search.setIsUserTyping(false)
                          }}
                          className="px-4 py-2 text-sm cursor-pointer text-black hover:text-white hover:bg-[#5E23DC]"
                        >
                          {item.display_name}
                        </div>
                      ))}
                    </div>
                  )}
                  {/* No result */}
                  {!search.loading && search.hasSearched && search.suggestions.length === 0 && (
                    <div className="absolute top-full left-20 w-full mt-1 bg-white md:w-[70%] rounded-lg px-4 py-2 text-sm text-gray-500 z-50">
                      No locations found
                    </div>
                  )}
                </>
              )
            }
      </div>
    </div>
  )
}
export default SearchBar



