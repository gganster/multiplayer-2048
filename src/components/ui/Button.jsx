
import React from 'react';
import cn from '@/utils/cn';

const Button = ({ children, className, ...rest }) => {
  return (
    <button
      className={cn("bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg border-2 border-black font-bold text-lg transform hover:scale-105 transition-transform duration-200 ease-in-out", className)}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
