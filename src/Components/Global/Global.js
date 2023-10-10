import React, { useState } from "react";
import { BsChevronDoubleRight } from "react-icons/bs";
import "./Global.css";
import { Col, Row } from "react-bootstrap";
import GetApi from "../GetApi/GetApi";
import CRM from "../../Pages/SubPages/CRM/CRM";

const Global = () => {
  const [toogleState, setToogleState] = useState(1);
  const [getGlobalData, setGetGlobalData] = useState({});
  const toogleTab = (index) => {
    setToogleState(index);
  };
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
          <div className=" global-settings-heading py-3 d-lg-flex justify-content-between align-items-center ">
            <div className="global-settings-heading-text">
              <span>Global Settings</span>
            </div>
            <div className="settings-heading-nav">
              <nav>
                <ol className="list-unstyled d-flex">
                  <li className="me-2 text-primary">Pages</li>
                  <li>
                    <BsChevronDoubleRight className="me-2" />
                    Global Settings
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
                  <div
                    onClick={() => toogleTab(1)}
                    className={
                      toogleState === 1
                        ? "global-tabs global-active-tabs me-5"
                        : "global-tabs me-5"
                    }
                  >
                    Languages
                  </div>
                  <div
                    onClick={() => toogleTab(2)}
                    className={
                      toogleState === 2
                        ? "global-tabs global-active-tabs me-5"
                        : "global-tabs me-5"
                    }
                  >
                    FAQ
                  </div>
                  <div
                    onClick={() => toogleTab(3)}
                    className={
                      toogleState === 3
                        ? "global-tabs global-active-tabs me-5"
                        : "global-tabs me-5"
                    }
                  >
                    Pages
                  </div>
                </div>
                <div className="global-tab-contents">
                  <div
                    className={
                      toogleState === 1
                        ? "global-content global-active-content"
                        : "global-content"
                    }
                  >
                    <div className="global-language mt-5">
                      <div className="global-language-content card">
                        <h3 className="fs-5">Language & Currencies Settings</h3>
                        <form>
                          <div className="global-language-lang mb-3">
                            <label className="mb-2">Language</label>
                            <input
                              type="text "
                              className="w-100 px=3 py-2 rounded"
                            />
                          </div>
                          <div className="global-language-currency">
                            <label className="mb-2">Currency</label>
                            <input
                              type="text "
                              className="w-100 px=3 py-2 rounded"
                            />
                          </div>
                          <button className="px-3 py-2 rounded w-100 my-4">
                            Save Changes
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      toogleState === 2
                        ? "global-content global-active-content"
                        : "global-content"
                    }
                  >
                    <div className="global-faq-area my-4">
                      <CRM
                        pageApi="https://secom.privateyebd.com/api/v1/utility/admin/faq/"
                        heading="FAQ"
                        pages="Pages"
                        pageName="FAQ"
                        buttonName6="Add FAQ"
                        td1="Question"
                        td2="Answer"
                        td9="Action"
                        data2="question"
                        data3="answer"
                        tableHeading="Frequently Asked Questions"
                      />
                    </div>
                  </div>
                  <div
                    className={
                      toogleState === 3
                        ? "global-content global-active-content"
                        : "global-content"
                    }
                  >
                    <div className="global-page-area my-4">
                      <CRM
                        pageApi="https://secom.privateyebd.com/api/v1/utility/admin/page/"
                        heading="Pages"
                        pages="Pages"
                        pageName="Page"
                        buttonName7="Add Page"
                        td1="Title"
                        td2="Description"
                        td3="Is Active"
                        td9="Action"
                        data2="title"
                        data3="desc"
                        data4="is_active"
                        tableHeading="See All Pages"
                        showActiveColumn={true}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
};

export default Global;
