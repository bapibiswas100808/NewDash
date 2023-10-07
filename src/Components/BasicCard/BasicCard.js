import React from "react";
import { BsArrowRight } from "react-icons/bs";
import customerGraph from "../../images/pngegg.png";
import "./BasicCard.css";
import { NavLink } from "react-router-dom";

const BasicCard = ({
  cardTitle,
  numbers,
  percentage,
  icon,
  numbersHeading,
  specialText,
}) => {
  return (
    <div className="basic-card">
      <div className="card-content d-flex align-items-top justify-content-between">
        <div className="card-icon">
          <span>
            <i>{icon}</i>
          </span>
        </div>
        <div className="card-text flex-fill ms-3">
          <div className="basic-card-top d-flex align-items-center justify-content-between">
            <div className="basic-top-left">
              <p className="mb-0">{cardTitle}</p>
              <h4 className="mt-1 mb-2 fs-6">
                {numbersHeading} : {numbers}
              </h4>
            </div>
            <div className="basic-top-right">
              <img className="d-block" src={customerGraph} alt="" />
            </div>
          </div>
          <div className="basic-card-bottom d-flex justify-content-between align-items center mt-1">
            <div className="basic-bottom-left d-flex align-items-center">
              <div>
                <NavLink className="brands d-none" to="/brands">
                  View All
                </NavLink>
                <NavLink className="products d-none" to="/products">
                  View All
                </NavLink>
                <NavLink className="categories d-none" to="/categories">
                  View All
                </NavLink>
                <NavLink className="users d-none" to="/users">
                  View All
                </NavLink>
                <NavLink className="coupons d-none" to="/coupons">
                  View All
                </NavLink>
                <NavLink className="orders d-none" to="/orders">
                  View All
                </NavLink>
                <NavLink className="notifications d-none" to="/notifications">
                  View All
                </NavLink>
                <NavLink className="carts d-none" to="">
                  View All
                </NavLink>
                <h6 className="fs-6 d-none special-text">{specialText}</h6>
              </div>
              <div>
                <i>
                  <BsArrowRight className="ms-1" />
                </i>
              </div>
            </div>
            <div className="basic-bottom-right">
              <p>{percentage}</p>
              <span>This Month</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicCard;
