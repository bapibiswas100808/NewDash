import React, { useState } from "react";
import "./Dashboard.css";
import { Col, Row } from "react-bootstrap";
import { MdOutlineAssignmentReturned, MdDiscount } from "react-icons/md";
import { BsFilterSquare } from "react-icons/bs";
import { BiExport, BiPulse } from "react-icons/bi";
import { HiOutlineBriefcase, HiTemplate } from "react-icons/hi";
import { GoPeople } from "react-icons/go";
import {
  AiOutlineDownload,
  AiOutlineEdit,
  AiOutlineApartment,
  AiFillNotification,
} from "react-icons/ai";
import { TbCalendarEvent } from "react-icons/tb";
import BasicCard from "../../Components/BasicCard/BasicCard";
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
import GetApi from "../../Components/GetApi/GetApi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // const [openDealdrop, setOpenDealDrop] = useState(false);
  const [profileView, setProfileView] = useState([]);
  const [dataFromApi, setDataFromApi] = useState([]);
  const [productFromApi, setProductFromApi] = useState({});
  const [orderFromApi, setOrderFromApi] = useState({});
  const [couponFromApi, setCouponFromApi] = useState({});
  const [brandFromApi, setBrandFromApi] = useState({});
  const [categoryFromApi, setCategoryFromApi] = useState({});
  const [notificationFromApi, setNotificationFromApi] = useState([]);
  const [cartFromApi, setCartFromApi] = useState([]);
  const handleUserView = (apiData) => {
    setDataFromApi(apiData.data);
  };
  const handleProfileView = (apiData) => {
    setProfileView(apiData.data);
  };
  const handleProductView = (apiData) => {
    setProductFromApi(apiData.data.results);
  };
  const handleOrderView = (apiData) => {
    setOrderFromApi(apiData.data);
  };
  const handleCouponView = (apiData) => {
    setCouponFromApi(apiData.data);
  };
  const handleBrandView = (apiData) => {
    setBrandFromApi(apiData.data.results);
  };
  const handleCategoryView = (apiData) => {
    setCategoryFromApi(apiData.data.results);
  };
  const handleNotificationView = (apiData) => {
    setNotificationFromApi(apiData.data);
  };
  const handleCartView = (apiData) => {
    console.log(apiData.data);
    setCartFromApi(apiData.data);
  };
  console.log();

  const userData = {
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
  };

  return (
    <section className="crm-div">
      <GetApi
        api="https://secom.privateyebd.com/api/v1/auth/profile/"
        onDataFetched={handleProfileView}
      />
      <GetApi
        api="https://secom.privateyebd.com/api/v1/auth/admin/user/"
        onDataFetched={handleUserView}
      />
      <GetApi
        api="https://secom.privateyebd.com/api/v1/inventory/admin/product/"
        onDataFetched={handleProductView}
      />
      <GetApi
        api="https://secom.privateyebd.com/api/v1/order/admin/order/"
        onDataFetched={handleOrderView}
      />
      <GetApi
        api="https://secom.privateyebd.com/api/v1/order/admin/coupon/"
        onDataFetched={handleCouponView}
      />
      <GetApi
        api="https://secom.privateyebd.com/api/v1/inventory/admin/brands/"
        onDataFetched={handleBrandView}
      />
      <GetApi
        api="https://secom.privateyebd.com/api/v1/inventory/admin/categories/"
        onDataFetched={handleCategoryView}
      />
      <GetApi
        api="https://secom.privateyebd.com/api/v1/notification/admin/notification/"
        onDataFetched={handleNotificationView}
      />
      <GetApi
        api="https://secom.privateyebd.com/api/v1/courier/admin/courier_company/"
        onDataFetched={handleCartView}
      />
      <div className="crm-area crm-container">
        <div className="crm-intro d-flex justify-content-between">
          <div className="crm-intro-text">
            <h3>
              Welcome Back, {profileView?.first_name} {profileView?.last_name}!
            </h3>
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
                        <div className="card special-card total-earnings">
                          <BasicCard
                            cardTitle="Total Earnings"
                            numbersHeading="Earnings"
                            numbers=" $ 126800"
                            percentage="-12%"
                            icon={<BiPulse />}
                            specialText="Check Analysis"
                          />
                        </div>
                      </Col>
                      <Col lg={12}>
                        <div className="card total-brands">
                          <BasicCard
                            cardTitle="Total Brands"
                            numbersHeading="Brands"
                            numbers={brandFromApi.length}
                            percentage="+40%"
                            icon={<MdOutlineAssignmentReturned />}
                          />
                        </div>
                      </Col>
                      <Col lg={12}>
                        <div className="card total-coupons">
                          <BasicCard
                            cardTitle="Total Coupons"
                            numbersHeading="Coupon"
                            numbers={couponFromApi.length}
                            percentage="+40%"
                            icon={<MdDiscount />}
                          />
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
                        <div className="total-products card">
                          <BasicCard
                            cardTitle="Total items"
                            numbersHeading="Products"
                            numbers={productFromApi.length}
                            percentage="+40%"
                            icon={<HiTemplate />}
                          />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="total-orders card">
                          <BasicCard
                            cardTitle="Total Orders"
                            numbersHeading="Orders"
                            numbers={orderFromApi.length}
                            percentage="+25%"
                            icon={<TbCalendarEvent />}
                          />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="total-users card">
                          <BasicCard
                            cardTitle="Total Users"
                            numbers={dataFromApi.length}
                            numbersHeading="Users"
                            percentage="+40%"
                            icon={<GoPeople />}
                          />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="total-categories card">
                          <BasicCard
                            cardTitle="Total Categories"
                            numbersHeading="Categories"
                            numbers={categoryFromApi.length}
                            percentage="+19%"
                            icon={<HiOutlineBriefcase />}
                          />
                        </div>
                      </Col>
                      <Col lg={12}>
                        <div className="crm-revenue-stats card">
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
                    <div className="stats-search-sort d-flex align-items-center">
                      <div className="stats-search pe-2">
                        <input
                          placeholder="Search Here"
                          type="text"
                          className="stats-input py-2 rounded form-control"
                        />
                      </div>
                      <div className="crm-stats-btn">
                        <button className="px-3 py-2 rounded">Sort By</button>
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
                <Row>
                  <Col lg={6}>
                    <div className="total-carts card">
                      <BasicCard
                        cardTitle="Courier Companies"
                        numbersHeading="Couriers"
                        numbers={cartFromApi.length}
                        percentage="+5%"
                        icon={<AiOutlineApartment />}
                      />
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="total-notifications card">
                      <BasicCard
                        cardTitle="Total Notifications"
                        numbersHeading="Notifications"
                        numbers={notificationFromApi.length}
                        percentage="+30%"
                        icon={<AiFillNotification />}
                      />
                    </div>
                  </Col>
                </Row>
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
            </Row>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
