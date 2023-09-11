import React from "react";
import "./Dropdown.css";

const Dropdown = ({ label, value, onChange, options }) => {
  return (
    <div>
      <div className="dropdown-container">
        <label>{label}</label> <br />
        <select value={value} onChange={onChange}>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.gender}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Dropdown;
