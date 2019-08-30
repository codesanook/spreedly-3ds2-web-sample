import React from 'react';
import Step from './Step';

const Header = ({ currentStep }) => (
  <div>
    <div className="flex content-center justify-between h-10">
        <h1 className="text-2xl uppercase text-gray-600">
          Splinky<span className="text-blue-400">&trade;</span>
        </h1>
        <span className="text-xs text-gray-500">
          A Spreedly 3DS 2 Sample Application
        </span>
    </div>

    <div className="flex justify-between flex-wrap mx-auto">
      <Step number={1} currentStep={currentStep} label="Collect Browser Info" />
      <Step number={2} currentStep={currentStep} label="Make purchase" />
      <Step number={3} currentStep={currentStep} label="Submit transaction" />
      <Step number={4} currentStep={currentStep} label="Lifecycle Events" />
      <Step number={5} currentStep={currentStep} label="Completed Transaction" />
    </div>
  </div>
);

export default Header;