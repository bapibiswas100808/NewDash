import React from "react";
import "./Input.css";

const Input = ({ label, placeholder, handleInput, type }) => {
  return (
    <div className="form-input mt-3">
      <label className="form-label">{label}</label>
      <input type={type} placeholder={placeholder} onChange={handleInput} />
    </div>
  );
};

export default Input;
