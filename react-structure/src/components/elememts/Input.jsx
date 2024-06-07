import React from "react";

const Input = ({ type, name, id, onChange, className, value, placeholder }) => {
  return (
    <>
      <input
        type={type}
        name={name}
        id={id}
        onChange={onChange}
        className={className}
        value={value}
        placeholder={placeholder}
      />
    </>
  );
};

export default Input;
