import React from 'react';

const Select = ({ value, setValue, options, label, }) => {
  return (
    <div className="mb-4 mx-2 flex-grow">
      <label>
        <span className="block w-full text-gray-700 text-sm font-bold mb-2">
          {label}
        </span>
        <div className="relative">
          <select
            className="block shadow appearance-none w-full border bg-white text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline focus:border-gray-500"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          >
            {options.map((option) => <option value={option.value} key={`${label}-${option.value}`}>{option.label}</option>)}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </label>
    </div>
  );
};

export default Select;