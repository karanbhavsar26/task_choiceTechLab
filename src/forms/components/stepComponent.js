import React from "react";
import { useSelector } from "react-redux";

const StepProgress = () => {
  const steps = [
    "Personal Information",
    "Education Details",
    "Work Experience",
    "Skills & Certification",
    "Additional Details",
    "Review",
    "Final Submit"
  ];
  
  const currentStep = useSelector((state) => state?.forms?.step);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 m-4">
      {steps.slice(0, steps.length - 1).map((title, index) => (
        <div key={index} className="flex items-center text-center space-x-2">
          <div
            className={`h-10 w-10 flex items-center justify-center rounded-full sm:h-12 sm:w-12 ${
              index <= currentStep ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            {index + 1}
          </div>
          <div className="text-sm hidden sm:block">{title}</div>
        </div>
      ))}
    </div>
  );
};

export default StepProgress;
