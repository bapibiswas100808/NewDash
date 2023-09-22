import React, { useState } from "react";
import "./Dashboard.css";
import { Col, Row } from "react-bootstrap";
import { BsFilterSquare, BsThreeDotsVertical } from "react-icons/bs";
import { BiExport, BiPulse } from "react-icons/bi";
import { HiOutlineBriefcase } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { GoPeople } from "react-icons/go";
import { AiOutlineDownload, AiOutlineEdit } from "react-icons/ai";
import { TbCalendarEvent } from "react-icons/tb";
import BasicCard from "../../Components/BasicCard/BasicCard";
import targetImage from "../../images/loading.png";
import dealer1 from "../../images/topdealer1.jpg";
import BarChart from "../../Components/BarChart/BarChart";
import LineChart from "../../Components/LineChart/LineChart";
import { UserData } from "../../Components/UserData/UserData";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js/auto";
import PercentageChart from "../../Components/PercentageChart/PercentageChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [openDealdrop, setOpenDealDrop] = useState(false);
  const [userData, setUserData] = useState(
    {
      labels: UserData.map((data) => data.month),
      datasets: [
        {
          label: "Revenue",
          data: UserData.map((data) => data.revenue),
          backgroundColor: "#b289ff",
        },
        {
          label: "Profit",
          data: UserData.map((data) => data.profit),
          backgroundColor: "#44c2e9",
        },
      ],
    },
    []
  );

  console.log(setUserData);
  const handleDealDrop = () => {
    setOpenDealDrop(!openDealdrop);
  };

  return (
    <section className="crm-div">
      <div className="crm-area crm-container">
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
                          <div className="crm-target card target-content">
                            <div className="d-flex align-items-center justify-content-between">
                              <div className="target-text pe-3">
                                <h5>Your target is incomplete</h5>
                                <p className="py-1">
                                  You have completed
                                  <span className="target-span ms-1">
                                    66%
                                  </span>{" "}
                                  of the given targrt, you can also check your
                                  status.
                                </p>
                                <NavLink>Click here</NavLink>
                              </div>
                              <div className="target-image">
                                <img
                                  src={targetImage}
                                  alt=""
                                  className="d-block"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col lg={12}>
                        <div className="crm-deal card">
                          <div className="top-special-top d-flex justify-content-between">
                            <div className="card-heading">
                              <h5>Top Deals</h5>
                            </div>
                            <div className="deal-dropdown">
                              <div
                                onClick={handleDealDrop}
                                className="three-dots"
                              >
                                <i>
                                  <BsThreeDotsVertical />
                                </i>
                                {openDealdrop && (
                                  <ul className="list-unstyled deal-drop-items">
                                    <li>Week</li>
                                    <li>Month</li>
                                    <li>Year</li>
                                  </ul>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="top-deal-bottom">
                            <ul className="list-unstyled mb-0">
                              <li>
                                <div className="dealer-detail d-flex align-items-top flex-wrap">
                                  <div className="dealer-image me-2">
                                    <img
                                      src={dealer1}
                                      alt=""
                                      className="d-block"
                                    />
                                  </div>
                                  <div className="dealer-contact flex-fill">
                                    <p className="mb-0">Michale Jordan</p>
                                    <span className="fs-12">
                                      michale.jordan@gmail.com
                                    </span>
                                  </div>
                                  <div className="deal-amount">$6767</div>
                                </div>
                              </li>
                              <li>
                                <div className="dealer-detail d-flex align-items-top flex-wrap">
                                  <div className="dealer-image me-2">
                                    <img
                                      src={dealer1}
                                      alt=""
                                      className="d-block"
                                    />
                                  </div>
                                  <div className="dealer-contact flex-fill">
                                    <p className="mb-0">Michale Jordan</p>
                                    <span className="fs-12">
                                      michale.jordan@gmail.com
                                    </span>
                                  </div>
                                  <div className="deal-amount">$6767</div>
                                </div>
                              </li>
                              <li>
                                <div className="dealer-detail d-flex align-items-top flex-wrap">
                                  <div className="dealer-image me-2">
                                    <img
                                      src={dealer1}
                                      alt=""
                                      className="d-block"
                                    />
                                  </div>
                                  <div className="dealer-contact flex-fill">
                                    <p className="mb-0">Michale Jordan</p>
                                    <span className="fs-12">
                                      michale.jordan@gmail.com
                                    </span>
                                  </div>
                                  <div className="deal-amount">$6767</div>
                                </div>
                              </li>
                              <li>
                                <div className="dealer-detail d-flex align-items-top flex-wrap">
                                  <div className="dealer-image me-2">
                                    <img
                                      src={dealer1}
                                      alt=""
                                      className="d-block"
                                    />
                                  </div>
                                  <div className="dealer-contact flex-fill">
                                    <p className="mb-0">Michale Jordan</p>
                                    <span className="fs-12">
                                      michale.jordan@gmail.com
                                    </span>
                                  </div>
                                  <div className="deal-amount">$6767</div>
                                </div>
                              </li>
                              <li>
                                <div className="dealer-detail d-flex align-items-top flex-wrap">
                                  <div className="dealer-image me-2">
                                    <img
                                      src={dealer1}
                                      alt=""
                                      className="d-block "
                                    />
                                  </div>
                                  <div className="dealer-contact flex-fill">
                                    <p className="mb-0">Michale Jordan</p>
                                    <span className="fs-12">
                                      michale.jordan@gmail.com
                                    </span>
                                  </div>
                                  <div className="deal-amount">$6767</div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </Col>
                      <Col lg={12}>
                        <div className="crm-earned card">
                          <div className="top-special-top d-flex align-items-top justify-content-between">
                            <div>
                              <h5 className="card-heading">Profile Earned</h5>
                            </div>
                            <div>
                              <p>View-all</p>
                            </div>
                          </div>
                          <div className="crm-earned-bar py-0 px-0 pt-3">
                            <BarChart
                              className="py-0 px-0"
                              chartData={userData}
                            />
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={8}>
                    <Row>
                      <Col lg={6}>
                        <div className="crm-customer card">
                          <BasicCard
                            cardTitle="Total Customers"
                            numbers="1,02,890"
                            percentage="+40%"
                            icon={<GoPeople />}
                          />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="crm-revenue card">
                          <BasicCard
                            cardTitle="Total Revenue"
                            numbers="$56,562"
                            percentage="+25%"
                            icon={<TbCalendarEvent />}
                          />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="crm-ratio card">
                          <BasicCard
                            cardTitle="Conversion Ratio"
                            numbers="12.08%"
                            percentage="-12%"
                            icon={<BiPulse />}
                          />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="crm-total-deals card">
                          <BasicCard
                            cardTitle="Total Deals"
                            numbers="2,543"
                            percentage="+19%"
                            icon={<HiOutlineBriefcase />}
                          />
                        </div>
                      </Col>
                      <Col lg={12}>
                        <div className="crm-revenue-stats special-card">
                          <div className="top-special-top">
                            <h5 className="card-heading">Revenue Analytics</h5>
                          </div>
                          <div className=" py-0 px-0 mt-3">
                            <p className="mb-2">
                              Revenue Analytics with sales & profit(USD)
                            </p>
                            <div className="chart-container">
                              <LineChart
                                className="py-0 px-0"
                                chartData1={userData}
                              />
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col lg={12}>
                <div className="crm-stats card">
                  <div className="top-special-top crm-stats-header d-flex justify-content-between">
                    <div className="stats-title">
                      <h5 className="card-heading">Deals Statistics</h5>
                    </div>
                    <div className="stats-search-sort d-flex align-items-top">
                      <div className="stats-search pe-2">
                        <input
                          placeholder="Search Here"
                          type="text"
                          className="stats-input"
                        />
                      </div>
                      <div>
                        <button className="crm-stats-btn">Sort By</button>
                      </div>
                    </div>
                  </div>
                  <div className="crm-stats-body">
                    <div className="table-responsive mt-3">
                      <table className="table text-nowrap table-hover border table-bordered">
                        <thead>
                          <tr>
                            <th scope="row" className="ps-4">
                              <input
                                className="form-check-input"
                                type="checkbox"
                              />
                            </th>
                            <th scope="col">Sales Rep</th>
                            <th scope="col">Catagory</th>
                            <th scope="col">Mail</th>
                            <th scope="col">Location</th>
                            <th scope="col">Date</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row" className="ps-4">
                              <input
                                className="form-check-input"
                                type="checkbox"
                              />
                            </th>
                            <td>
                              <div className="crm-stats-profile d-flex align-items-center dealer-image">
                                <div>
                                  <span>
                                    <img
                                      className="d-block me-2"
                                      alt=""
                                      src={dealer1}
                                    />
                                  </span>
                                </div>
                                <div className="dealer-contact">
                                  <p>Mayor Kelly</p>
                                </div>
                              </div>
                            </td>
                            <td>Manufacturer</td>
                            <td>mayorkelly@gmail.com</td>
                            <td>
                              <span className="badge bg-info">Germany</span>
                            </td>
                            <td>Sep 15 - oct 12, 2023</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="download-stats me-2">
                                  <a href="/">
                                    <i>
                                      <AiOutlineDownload />
                                    </i>
                                  </a>
                                </div>
                                <div className="edit-stats">
                                  <i>
                                    <AiOutlineEdit />
                                  </i>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row" className="ps-4">
                              <input
                                className="form-check-input"
                                type="checkbox"
                              />
                            </th>
                            <td>
                              <div className="crm-stats-profile d-flex align-items-center dealer-image">
                                <div>
                                  <span>
                                    <img
                                      className="d-block me-2"
                                      alt=""
                                      src={dealer1}
                                    />
                                  </span>
                                </div>
                                <div className="dealer-contact">
                                  <p>Mayor Kelly</p>
                                </div>
                              </div>
                            </td>
                            <td>Manufacturer</td>
                            <td>mayorkelly@gmail.com</td>
                            <td>
                              <span className="badge bg-info">Germany</span>
                            </td>
                            <td>Sep 15 - oct 12, 2023</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="download-stats me-2">
                                  <a href="/">
                                    <i>
                                      <AiOutlineDownload />
                                    </i>
                                  </a>
                                </div>
                                <div className="edit-stats">
                                  <i>
                                    <AiOutlineEdit />
                                  </i>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row" className="ps-4">
                              <input
                                className="form-check-input"
                                type="checkbox"
                              />
                            </th>
                            <td>
                              <div className="crm-stats-profile d-flex align-items-center dealer-image">
                                <div>
                                  <span>
                                    <img
                                      className="d-block me-2"
                                      alt=""
                                      src={dealer1}
                                    />
                                  </span>
                                </div>
                                <div className="dealer-contact">
                                  <p>Mayor Kelly</p>
                                </div>
                              </div>
                            </td>
                            <td>Manufacturer</td>
                            <td>mayorkelly@gmail.com</td>
                            <td>
                              <span className="badge bg-info">Germany</span>
                            </td>
                            <td>Sep 15 - oct 12, 2023</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="download-stats me-2">
                                  <a href="/">
                                    <i>
                                      <AiOutlineDownload />
                                    </i>
                                  </a>
                                </div>
                                <div className="edit-stats">
                                  <i>
                                    <AiOutlineEdit />
                                  </i>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row" className="ps-4">
                              <input
                                className="form-check-input"
                                type="checkbox"
                              />
                            </th>
                            <td>
                              <div className="crm-stats-profile d-flex align-items-center dealer-image">
                                <div>
                                  <span>
                                    <img
                                      className="d-block me-2"
                                      alt=""
                                      src={dealer1}
                                    />
                                  </span>
                                </div>
                                <div className="dealer-contact">
                                  <p>Mayor Kelly</p>
                                </div>
                              </div>
                            </td>
                            <td>Manufacturer</td>
                            <td>mayorkelly@gmail.com</td>
                            <td>
                              <span className="badge bg-info">Germany</span>
                            </td>
                            <td>Sep 15 - oct 12, 2023</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="download-stats me-2">
                                  <a href="/">
                                    <i>
                                      <AiOutlineDownload />
                                    </i>
                                  </a>
                                </div>
                                <div className="edit-stats">
                                  <i>
                                    <AiOutlineEdit />
                                  </i>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row" className="ps-4">
                              <input
                                className="form-check-input"
                                type="checkbox"
                              />
                            </th>
                            <td>
                              <div className="crm-stats-profile d-flex align-items-center dealer-image">
                                <div>
                                  <span>
                                    <img
                                      className="d-block me-2"
                                      alt=""
                                      src={dealer1}
                                    />
                                  </span>
                                </div>
                                <div className="dealer-contact">
                                  <p>Mayor Kelly</p>
                                </div>
                              </div>
                            </td>
                            <td>Manufacturer</td>
                            <td>mayorkelly@gmail.com</td>
                            <td>
                              <span className="badge bg-info">Germany</span>
                            </td>
                            <td>Sep 15 - oct 12, 2023</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="download-stats me-2">
                                  <a href="/">
                                    <i>
                                      <AiOutlineDownload />
                                    </i>
                                  </a>
                                </div>
                                <div className="edit-stats">
                                  <i>
                                    <AiOutlineEdit />
                                  </i>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="crm-stats-footer"></div>
                </div>
              </Col>
              <Col lg={12}>
                <div className="crm-leads card">
                  <div className="crm-leads-heading top-special-top">
                    <h5 className="card-heading">Leads By Source</h5>{" "}
                  </div>
                  <div className="d-flex align-items-center justify-content-center ">
                    <PercentageChart chartData={userData} />
                  </div>
                </div>
              </Col>
              <Col lg={12}>
                <Row>
                  <Col lg={6}>
                    <div className="crm-status card">
                      <h5 className="card-heading">Deals Status</h5>
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="crm-activity card">
                      <h5 className="card-heading">Recent Activity</h5>
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

export default Dashboard;
