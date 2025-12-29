import React from "react";
import toppicks from "../../assets/toppicks.avif"
import logo from "../../assets/rajgrouplog.avif"

const TopPicks = () => {
  return (
    <section className="w-full px-6  py-8 md:px-[8rem]">
      {/* Heading */}
      <div>
        <h2 className="text-3xl font-semibold text-gray-900">Estato's top picks</h2>
        <p className="text-gray-600 mt-1">Explore top living options with us</p>
      </div>

      {/* Main Card */}
      <div className="w-full mt-10 bg-[#ECD1E4] rounded-md flex flex-col lg:flex-row gap-6">

        {/* Left Card */}
        <div className="w-full lg:w-[40%] p-8  shadow-sm flex flex-col justify-between">
          
          {/* Logo + Name */}
          <div className="flex items-center gap-2">
            <div className="w-14 h-14 rounded-xl bg-white shadow flex items-center justify-center">
              <img 
                src={logo} 
                alt="logo" 
                className="w-10 h-10 object-contain"
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900">Raj Realty Group</h3>
              <button className="text-sm text-blue-600 hover:underline">View Projects</button>
            </div>
          </div>

          {/* Project Title */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-900">Raj Legacy Satyam A…</h2>
            <p className="text-gray-600 mt-1">
              Mira Road East, Mira Road and Beyond
            </p>
          </div>

          {/* Price + Types */}
          <div className="mt-6">
            <p className="text-lg font-medium text-gray-900">Price on Request</p>
            <p className="text-gray-600 text-sm">1, 2, 3 BHK Apartments</p>
          </div>

          {/* CTA Button */}
          <button className="mt-8 bg-[#5E23DC]  text-white py-3 rounded-xl w-full text-lg font-medium">
            Contact
          </button>
        </div>

        {/* Right Image Section */}
        <div className="w-full lg:w-[60%] p-2 relative">
          {/* Thumbnail Top Right */}
          <div className="absolute -top-[7.5rem] hidden md:flex right-4  rounded-xl shadow-md p-2">
            <div className="flex flex-col">
           <img 
              src={toppicks}
              alt="small-preview"
              className="w-28 h-20 object-cover rounded-lg"
            />
             <p className="text-xs mt-1 text-gray-700 font-medium">
              Raj Legacy Satyam A…
            </p>
            </div>  
          </div>

          {/* Main Image */}
          <div className="rounded-3xl overflow-hidden ">
            <img 
              src={toppicks}
              alt="main-project"
              className="w-full rounded-lg h-[420px]  object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default TopPicks;
