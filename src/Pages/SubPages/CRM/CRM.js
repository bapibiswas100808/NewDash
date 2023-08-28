import React from "react";
import "./CRM.css";
import { Col, Row } from "react-bootstrap";
import { BsFilterSquare } from "react-icons/bs";
import { BiExport } from "react-icons/bi";

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
                <BsFilterSquare className="me-1" />
                Filter
              </button>
            </div>
            <div className="">
              <button className="export-button px-4 py-2 rounded">
                <BiExport className="me-1" />
                Export
              </button>
            </div>
          </div>
        </div>
        <div className="crm-graph-area mt-4">
          <div className="crm-graphs">
            <Row>
              <Col lg={12}>
                <Row>
                  <Col lg={4}>
                    <Row>
                      <Col lg={12}>
                        <div>
                          <div className="crm-target card">
                            <h5>Your target is incomplete</h5>
                            <p>
                              you have completed 48% of the given targrt, you
                              can also check your status.
                            </p>
                            <a href="/">Click here</a>
                          </div>
                        </div>
                      </Col>
                      <Col lg={12}>
                        <div className="crm-deal card">
                          <h5>Top Deals</h5>
                        </div>
                      </Col>
                      <Col lg={12}>
                        <div className="crm-earned card">
                          <h5>Profile Earned</h5>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={8}>
                    <Row>
                      <Col lg={6}>
                        <div className="crm-cutomer card">
                          <h5>Total Customers</h5>
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="crm-revenue card">
                          <h5>Total Revenue</h5>
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="crm-ratio card">
                          <h5>Conversation Ratio</h5>
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="crm-total-deals card">
                          <h5>Total deals</h5>
                        </div>
                      </Col>
                      <Col lg={12}>
                        <div className="crm-revenue-stats card">
                          <h5>Revenue Analytics</h5>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col lg={12}>
                <div className="crm-stats card">
                  <h5>Deals Statistics</h5>
                </div>
              </Col>
              <Col lg={12}>
                <div className="crm-leads card">
                  <h5>Leads By Source</h5>
                </div>
              </Col>
              <Col lg={12}>
                <Row>
                  <Col lg={6}>
                    <div className="crm-status card">
                      <h5>Deals Status</h5>
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="crm-activity card">
                      <h5>Recent Activity</h5>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CRM;
