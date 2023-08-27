import React from "react";
import "./Input.css";

const Input = ({ label, placeholder, handleInput }) => {
  return (
    <div className="form-input mt-3">
      <label className="form-label">{label}</label>
      <input placeholder={placeholder} onChange={handleInput} />
    </div>
  );
};

export default Input;
