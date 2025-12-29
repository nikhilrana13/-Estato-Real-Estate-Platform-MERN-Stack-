import { SearchIcon } from 'lucide-react';
import React from 'react'

const HeroLocationInput = ({search,displayCity,onSubmit}) => {
  return (
    <div className="flex items-center relative left-0 right-0 top-2 border mt-2 bg-white  rounded-md sm:rounded-full  p-2 gap-3">
            {/* Search Input */}
            <input
              type="text"
              value={search.value}
              onChange={(e) =>{ search.setValue(e.target.value);search.setIsUserTyping(true)}}
              placeholder={`Search in ${displayCity || "India"} for locality,project,builder`}
              className="flex-1 outline-none px-2 py-2 bg-transparent text-gray-700 placeholder-gray-400"
              onFocus={() => search.setOpen(true)}
              onBlur={() => setTimeout(() => search.setOpen(false), 200)}
            />

            {/* Search Button */}
            <button type="button" onClick={()=> onSubmit()} className="bg-[#36C991] hidden md:block hover:bg-green-600 text-white px-8 py-3 rounded-full transition-all shadow">
              Search
            </button>
            {/* for mobile */}
            <button type="button" onClick={()=> onSubmit()} className="bg-[#36C991] block md:hidden hover:bg-green-600 text-white px-3 py-2 rounded-full transition-all shadow">
              <SearchIcon />
            </button>
            {/* show dropdown */}
            {
              search.open && (
                <>
                  {/* Loading */}
                  {search.loading && (
                    <div className="absolute top-full p-3 left-0 ml-1 w-full md:w-[80%] bg-white rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto ">
                      <span className="text-gray-500">Loading...</span>
                    </div>
                  )}
                  {/* Suggestions */}
                  {!search.loading && search.suggestions.length > 0 && (
                    <div className="absolute top-full left-0 ml-1 w-full md:w-[80%] bg-white rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto no-scrollbar" >
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
                    <div className="absolute top-full left-0 w-full mt-1 bg-white md:w-[80%] rounded-lg px-4 py-2 text-sm text-gray-500 z-50">
                      No locations found
                    </div>
                  )}
                </>
              )
            }

          </div>
  )
}

export default HeroLocationInput