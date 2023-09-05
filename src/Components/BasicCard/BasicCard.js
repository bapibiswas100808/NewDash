import React from "react";
import { BsArrowRight } from "react-icons/bs";
import customerGraph from "../../images/pngegg.png";
import "./BasicCard.css";

const BasicCard = ({ cardTitle, numbers, percentage, icon }) => {
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
              <h4 className="mt-1 mb-2">{numbers}</h4>
            </div>
            <div className="basic-top-right">
              <img className="d-block" src={customerGraph} alt="" />
            </div>
          </div>
          <div className="basic-card-bottom d-flex justify-content-between align-items center mt-1">
            <div className="basic-bottom-left">
              <a href="/">View All</a>
              <i>
                <BsArrowRight className="ms-2" />
              </i>
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
