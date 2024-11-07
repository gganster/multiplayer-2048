import React from 'react';

const Title = ({ children, className }) => {
  return (
    <h1 className={`${className ?? ""} text-4xl font-extrabold text-slate-950 border-b-4 border-black inline-block pb-1`}>
      {children}
    </h1>
  );
};

export default Title;
