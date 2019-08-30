import React from 'react';

const Loader = ({ message }) => (
  <div className="bg-white mx-auto shadow-md rounded p-16 text-xl text-blue-600">
    <div className="flex justify-around">
      <span className="h-16 p-8 text-align-center">{message}</span>
      <img className="h-24 w-32" src="splinky.png" alt="splinky" />
    </div>
  </div>
);

export default Loader;