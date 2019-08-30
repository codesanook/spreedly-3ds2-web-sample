import React from 'react'

const Step = ({ number, currentStep, label, description}) => (
  <div className={`flex lg:w-32 mr-4 pr-4 pb-4`}>
    <div className={`text-gray-600 ${currentStep >= number && "text-gray-900"} ${number === currentStep && "text-blue-500"} align-text-top text-3xl lg:text-4xl pr-2`}>
      {number}
    </div>
    <div className="align-text-top pt-4 text-gray-600">
      <div className="text-xs leading-none">{label}</div>
    </div>
  </div>
);

export default Step;
