import React from "react";
import { MdWarningAmber, MdTrendingUp } from "react-icons/md";

const BoostVisibility = () => {
  const steps = [
    {
      title: "Add atleast 4 photos",
      desc: "Gets you more enquiries.",
      status: "Pending",
      visibility: "+15%",
      btn: "Add photos",
    },
    {
      title: "Self-verify property",
      desc: "Increases trust, attracts buyers.",
      status: "Pending",
      visibility: "+10%",
      btn: "Self-verify",
    },
    {
      title: "Add additional details",
      desc: "Detailed listings sell faster.",
      status: "Pending",
      visibility: "+40%",
      btn: "Add details",
    },
  ];

  return (
    <div className="w-full bg-[#F7F7FB] p-6 rounded-xl border mt-5">
      {/* Top Alert */}
      <div className="flex items-center gap-2 mb-4">
        <MdWarningAmber className="text-[#FF9800] text-xl" />
        <p className="text-gray-700 text-[0.95rem]">
          Listing visibility is <span className="text-green-600 font-semibold">High</span>, 
          to <span className="font-semibold">boost visibility</span>, complete the steps below.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {steps.map((step, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-xl border shadow-sm hover:shadow-md transition-all duration-300"
          >
            {/* Title + Status */}
            <div className="flex items-center justify-between">
              <h3 className="text-[0.8rem] font-[700]">{step.title}</h3>
              <span className="bg-[#FFF1D6] text-[#FF9800] text-xs px-2 py-[2px] rounded-md">
                {step.status}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-500 text-[0.85rem] mt-1">{step.desc}</p>

            {/* Line */}
            <div className="w-full h-[1px] bg-gray-200 my-4" />

            {/* Visibility */}
            <div className="flex items-center gap-1">
              <span className="text-gray-600 text-sm">Visibility:</span>
              <span className="font-semibold text-[0.95rem]">{step.visibility}</span>
              <MdTrendingUp className="text-green-600 text-lg" />
            </div>
            {/* Button */}
            <button className="w-full bg-[#F2EBFF] text-[#7B4BE2] mt-4 py-2 rounded-md font-[600] hover:bg-[#e8dcff] transition">
              {step.btn} &gt;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoostVisibility;
