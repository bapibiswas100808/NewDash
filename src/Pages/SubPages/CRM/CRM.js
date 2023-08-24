import React from "react";
import "./CRM.css";

const CRM = () => {
  return (
    <section className="crm-div">
      <div className="crm-area">
        <div className="crm-intro d-flex justify-content-between">
          <div className="crm-intro-text">
            <h3>Welcome Back, Jason Tyler!</h3>
            <p>Track Your sales activity, leads and deals here</p>
          </div>
          <div className="crm-buttons d-flex align-items-center">
            <div className="me-2">
              <button className="filter-button px-4 py-2 rounded">
                Filter
              </button>
            </div>
            <div className="">
              <button className="export-button px-4 py-2 rounded">
                Export
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CRM;
