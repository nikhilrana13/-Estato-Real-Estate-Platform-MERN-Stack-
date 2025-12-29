
import React from "react";
const ProgressSteps = ({ currentStep }) => {
  const steps = [
    { id: 1, title: "Basic Details" },
    { id: 2, title: "Property Details" },
    { id: 3, title: "Advanced Details" },
    { id: 4, title: "Property Images" },
    { id: 5, title: "Price Details" },
  ];

  return (
    <div className="mt-6 flex flex-col gap-6">
      {steps.map((step) => {
        const isCompleted = currentStep > step.id;
        const isCurrent = currentStep === step.id;

        return (
          <div key={step.id} className="flex items-start gap-4">
            {/* dot */}
            <div
              className={`w-7 h-7 rounded-full border-2 flex items-center justify-center
                ${isCompleted ? "border-green-500 bg-[#36C991]" : isCurrent ? "border-[#5E23DC] bg-[#5E23DC]" : "border-[#EAE4FF] bg-[#EAE4FF]"}
              `}
            >
              <div className={`w-5 h-5 rounded-full ${isCompleted ? "text-white flex items-center justify-center" : ""}`}>
                {isCompleted && <span className="text-white">&#10003;</span>}
              </div>
            </div>

            {/* title + status */}
            <div className="flex flex-col">
              <h3 className={`text-[0.95rem] font-[500] ${isCompleted ? "text-green-600" : "text-[#3A3A3A]"}`}>
                {step.title}
              </h3>

              <span
                className={`text-[0.6rem] mt-1 w-fit border px-3 py-[3px] rounded-full 
                  ${isCompleted ? "bg-green-100 text-green-600 border-green-300" : isCurrent ? "bg-[#EEE9FF] text-[#5E23DC]" : "bg-[#fff] text-[#909098] border-[#EAEAEA]"}
                `}
              >
                {isCompleted ? "Completed" : isCurrent ? "In Progress" : "Pending"}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProgressSteps;
