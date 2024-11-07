import React from 'react';

const TextInput = ({ placeholder, onChange }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="w-full max-w-md px-4 py-2 border-2 border-black rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-red-500"
      onChange={onChange}
    />
  );
};

export default TextInput;
