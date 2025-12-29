import React from "react";
import { NavLink } from "react-router-dom";

const FAQCard = () => {
  return (
    <div className="w-full bg-white  rounded-3xl px-6 py-6 md:px-10 md:py-8 flex flex-col md:flex-row items-start md:items-center justify-between shadow-sm">

      {/* Left Text */}
      <div className="flex md:flex-row flex-col md:items-center gap-2">
        <h2 className="text-[1.1rem] md:text-[1.2rem] font-semibold text-gray-900">
          Have Questions?
        </h2>
        <p className="text-gray-500 text-[0.8rem] sm:text-[0.95rem]">
          Explore our FAQ section for commonly asked questions
        </p>
      </div>

      {/* Right Button */}
      <NavLink
        to="/faq"
        className="mt-4 md:mt-0 bg-[#F0E9FF] hover:bg-[#e6dbff] text-[#5E23DC] font-semibold text-[0.8rem] px-5 py-3 rounded-xl transition"
      >
        Explore FAQ’s
      </NavLink>
    </div>
  );
};

export default FAQCard;
