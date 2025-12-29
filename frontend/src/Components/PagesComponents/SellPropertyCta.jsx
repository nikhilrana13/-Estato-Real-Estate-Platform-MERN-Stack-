import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import leftbanner from "../../assets/10767192.jpg"
import rightbanner from "../../assets/10767193.jpg"
import { useSelector } from "react-redux";
import { startWaapiAnimation } from "framer-motion";
import { toast } from "sonner";

const SellPropertyCTA = () => {
  const user = useSelector((state)=> state.Auth.user)
  const navigate = useNavigate()

  return (
    <section className="w-full px-6 py-8 md:px-[8rem]">
      {/* Heading */}
      <h2 className="text-3xl font-semibold text-gray-900">
        Have a property to sell?
      </h2>

      {/* CTA Box */}
      <div className="w-full mt-6 bg-[#8448FB] rounded-3xl border shadow-sm flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-10 gap-6">

        {/* Left Illustration */}
        <img
          src={leftbanner}
          alt="sell banner left"
          className="w-40  rounded-md md:w-48 object-contain"
        />

        {/* Center Text */}
        <div className="flex flex-col items-center text-center flex-1">
          <p className="text-gray-700 text-lg md:text-xl font-medium">
            List your property & connect with clients faster!
          </p>

          <button onClick={()=>{
            if(!user){
              toast.info("Please Login to Sell a Property")
            }else{
              navigate("/dashboard/add-property")
            }
          }} className="mt-5 border border-white hover:border-purple-600  hover:text-purple-700 px-8 py-3 rounded-xl text-lg font-medium text-white hover:bg-purple-50 transition">
            Sell your property
          </button>
        </div>

        {/* Right Illustration */}
        <img
          src={rightbanner}alt="sell-banner-right"
          className="w-40  rounded-md md:w-48 object-contain"
        />

      </div>
    </section>
  );
};

export default SellPropertyCTA;
