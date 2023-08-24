import React from "react";
import { FaBars } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import "./Header.css";

const Header = ({ onClick, isOpen }) => {
  return (
    <div className="header-area d-flex justify-content-between align-items-center">
      <div className="header-content-left">
        <div className="bars">
          {isOpen ? (
            <FaBars onClick={onClick} />
          ) : (
            <RxCross1 onClick={onClick} />
          )}
        </div>
      </div>
      <div className="header-content-right d-flex">
        <div className="ps-3">1</div>
        <div className="ps-3">2</div>
        <div className="ps-3">3</div>
        <div className="ps-3">4</div>
        <div className="ps-3">5</div>
        <div className="ps-3">6</div>
        <div className="ps-3">7</div>
        <div className="ps-3">8</div>
        <div className="ps-3">9</div>
      </div>
    </div>
  );
};

export default Header;
