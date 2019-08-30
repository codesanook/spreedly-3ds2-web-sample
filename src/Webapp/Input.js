import React from 'react';

const CLASSNAMES = 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'

const Input = ({ value, setValue, name, label, placeholder, classNames }) => {

  return (
    <div className="mb-4 mx-2 flex-grow">
      <label className={`block w-full text-gray-700 text-sm font-bold mb-2 ${classNames}`} htmlFor={name}>
        {label}
      </label>
      <input
        className={CLASSNAMES}
        id={name} type="text"
        placeholder={placeholder || label}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
};

export default Input;