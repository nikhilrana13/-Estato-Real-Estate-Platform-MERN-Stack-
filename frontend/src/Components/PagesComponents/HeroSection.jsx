import React, { useEffect, useState } from "react";
import herobanner from "../../../src/assets/herobanner.webp"
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import HeroLocationInput from "./HeroLocationInput";
import useLocationSearch from "../CustomHook/useLocationSearch";

const tabs = ["BUY", "RENT", "COMMERCIAL"];

export const HeroSection = ({ displayCity }) => {
  const [activeTab, setActiveTab] = useState("BUY");
  const [type, SetType] = useState("residential")
  const [lookingto, SetlookingTo] = useState("Buy")
  const navigate = useNavigate()
  const search = useLocationSearch()



  const extractCity = (str) => {
    // "Panchkula, Haryana, India" → "Panchkula"
    return str?.split(",")[0]?.trim();
  };

  const onSubmit = () => {
    const cityforapi = extractCity(search.value)
    if (!cityforapi) {
      toast.error("Please Enter the city")
      return;
    }
    // save to local storage
    localStorage.setItem("type", type)
    localStorage.setItem("city", cityforapi)
    localStorage.setItem("lookingto", lookingto)
    // navigate to search properties route with params
    navigate(`/searchproperties?type=${encodeURIComponent(type)}&city=${encodeURIComponent(cityforapi)}&lookingto=${encodeURIComponent(lookingto)}`)
  }
  //  Autofill location from localstorage
  useEffect(() => {
    const savedtype = localStorage.getItem("type")
    const savedcity = localStorage.getItem("city")
    const savedlookingto = localStorage.getItem("lookingto")
    if (savedtype) SetType(savedtype)
    if (savedcity) search.setValue(savedcity)
    if (savedlookingto) SetlookingTo(savedlookingto)
    if (savedlookingto === "Buy") {
      setActiveTab("BUY")
    }
    else if (savedlookingto === "Rent" && savedtype === "commercial") {
      setActiveTab("COMMERCIAL")
    }
    else if (savedlookingto === "Rent") {
      setActiveTab("RENT")
    }
  }, [])

  return (
    <div className="relative w-full h-[480px] overflow-visible" style={{ backgroundImage: `url(${herobanner})` }}>
      {/* Background skyline overlay */}
      <div className="absolute inset-0 opacity-20  bg-cover bg-center"></div>
      {/* Main Content */}
      <div className="relative z-20 max-w-6xl mx-auto text-center pt-20 px-4">
        <h1 className="text-white text-4xl font-[600]">
          Properties to {lookingto} in {displayCity}
        </h1>
        <p className="text-gray-200 mt-2 text-sm">
          8K+ listings added daily and 65K+ total verified
        </p>
        {/* Search Box Container */}
        <div className="mt-10 bg-[#302763] relative   rounded-2xl shadow-xl max-w-[48rem] mx-auto">
          {/* Tabs */}
          <div className="flex space-x-8 overflow-y-auto no-scrollbar px-8 pt-4 ">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  tab === "RENT" && SetlookingTo("Rent")
                  tab === "BUY" && SetlookingTo("Buy")
                  tab === "COMMERCIAL" && SetlookingTo("Rent")
                  tab === "COMMERCIAL" ? SetType("commercial") : SetType("residential");
                }}
                className={`pb-3 text-sm font-semibold ${activeTab === tab
                  ? "text-white border-b-2 border-white"
                  : "text-[#C1BFD1]"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
          {/* Search Input Box */}
          <HeroLocationInput search={search} onSubmit={onSubmit} displayCity={displayCity} />
        </div>
      </div>
    </div>
  );
}


