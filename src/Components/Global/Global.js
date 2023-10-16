import React, { useState } from "react";
import { BsChevronDoubleRight } from "react-icons/bs";
import "./Global.css";
import { Col, Row } from "react-bootstrap";
import GetApi from "../GetApi/GetApi";
import { Link, Outlet, useLocation } from "react-router-dom";

const Global = () => {
  const [getGlobalData, setGetGlobalData] = useState({});
  const location = useLocation();

  const handleGlobal = (data) => {
    const globalData = data.data;
    setGetGlobalData(globalData);
    console.log(getGlobalData);
  };

  return (
    <section className="global-setting-area">
      <GetApi
        api="https://secom.privateyebd.com/api/v1/utility/admin/globalsettings"
        onDataFetched={handleGlobal}
      />
      <div className="project-container">
        <div className="global-settings-content">
          <div className=" global-settings-heading py-3 d-flex justify-content-between align-items-center ">
            <div className="global-settings-heading-text">
              <span>Global Settings</span>
            </div>
            <div className="settings-heading-nav">
              <nav>
                <ol className="list-unstyled d-flex">
                  <li className="me-2 text-primary">Settings</li>
                  <li>
                    <span>
                      <BsChevronDoubleRight className="me-2" />
                      Global Settings
                    </span>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
        <div className="global-bottom card">
          <Row>
            <Col lg={12}>
              <div className="global-settings-zone">
                <div className="global-tabs d-flex">
                  <Link
                    to="/globalsetting"
                    className={`me-4 ${
                      location.pathname.includes("/globalsetting") &&
                      !location.pathname.includes("/faq") &&
                      !location.pathname.includes("/pages")
                        ? "global-active"
                        : ""
                    }`}
                    exact="true"
                  >
                    Languages
                  </Link>
                  <Link
                    to="/globalsetting/faq"
                    className={`me-4 ${
                      location.pathname.includes("/globalsetting/faq")
                        ? "global-active"
                        : ""
                    }`}
                    exact="true"
                  >
                    FAQ
                  </Link>
                  <Link
                    to="/globalsetting/pages"
                    className={`${
                      location.pathname.includes("/globalsetting/pages")
                        ? "global-active"
                        : ""
                    }`}
                    exact="true"
                  >
                    Pages
                  </Link>
                </div>
                <Outlet />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
};

export default Global;
