import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import "./CRM.css";
import { AiOutlineDoubleRight, AiOutlineSearch } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import { useState, useEffect } from "react";
import axios from "axios";

const CRM = ({
  pageApi,
  heading,
  pages,
  pageName,
  buttonName,
  option1,
  option2,
  option3,
  option4,
  option5,
  option6,
  td1,
  td2,
  td3,
  td4,
  td5,
  td6,
  td7,
  td8,
  data1,
  data2,
  data3,
  data4,
  data5,
  data6,
  data7,
  data8,
  showActiveColumn,
  showActiveMenu,
}) => {
  const [records, setRecords] = useState([]);
  const [originalRecords, setOriginalRecords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = `Token ${localStorage.getItem("getToken")}`;
        const response = await axios.get(pageApi, {
          headers: {
            Authorization: accessToken,
          },
        });
        console.log(response.data.results);
        setRecords(response.data.results);
        setOriginalRecords(response.data.results);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchData();
  }, []);
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    if (searchTerm === "") {
      setRecords(originalRecords);
    } else {
      setRecords(
        originalRecords.filter((f) => f.name.toLowerCase().includes(searchTerm))
      );
    }
  };
  const dropValueChange = (e) => {
    const dropTerm = e.target.value;
    console.log(dropTerm);

    if (dropTerm === "all") {
      setRecords(originalRecords);
    } else if (dropTerm === "pending") {
      setRecords(originalRecords.filter((record) => record.order_status === 0));
    } else if (dropTerm === "processing") {
      setRecords(originalRecords.filter((record) => record.order_status === 1));
    } else if (dropTerm === "out for delivery") {
      setRecords(originalRecords.filter((record) => record.order_status === 2));
    } else if (dropTerm === "delivered") {
      setRecords(originalRecords.filter((record) => record.order_status === 3));
    } else if (dropTerm === "cancelled") {
      setRecords(originalRecords.filter((record) => record.order_status === 4));
    } else {
      setRecords([]);
    }
  };
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 5;
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const record = records?.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(records.length / recordPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);
  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const changePage = (id) => {
    setCurrentPage(id);
  };

  const nextPage = () => {
    if (currentPage !== nPage) {
      setCurrentPage(currentPage + 1);
    }
  };
  const totalRows = 10;
  const emptyRowCount = totalRows - records.length;
  const emptyRows = [...Array(emptyRowCount).keys()];

  return (
    <div className="orders-area">
      <div className="orders-content project-container py-3 ">
        <div className="orders-top d-flex align-items-top justify-content-between">
          <div className="orders-heading">
            <h4>{heading}</h4>
          </div>
          <div className="">
            <p className="fs-6">
              {pages}
              <span>
                <AiOutlineDoubleRight />
                {pageName}
              </span>
            </p>
            <button className="px-3 py-2 rounded mt-4 mb-2">
              {buttonName}
            </button>
          </div>
        </div>
        <div className="order-table card container-fluid ">
          <div className="order-table-top d-flex justify-content-between">
            <div className="order-search d-flex align-items-center">
              <span className="search">
                <AiOutlineSearch className="fs-4" />
              </span>
              <div>
                <input
                  className="form-control px-5"
                  placeholder="Type to search by Name"
                  onChange={handleSearch}
                />
              </div>
            </div>
            <div className="order-drop">
              <div className="order-drop-button">
                <select className=" list-unstyled " onChange={dropValueChange}>
                  <option value="all">{option1}</option>
                  <option value="pending">{option2}</option>
                  <option value="processing">{option3}</option>
                  <option value="out for delivery">{option4}</option>
                  <option value="delivered">{option5}</option>
                  <option value="cancelled">{option6}</option>
                </select>
                <div className="drop-icon text-white">
                  <IoMdArrowDropdown />
                </div>
              </div>
            </div>
          </div>
          <div className="order-table-main">
            <div className="order-table-zone">
              <table className="w-100 ">
                <thead className="">
                  <tr className="w-100 text-center">
                    <td>{td1}</td>
                    <td>{td2}</td>
                    <td>{td3}</td>
                    <td>{td4}</td>
                    <td>{td5}</td>
                    <td>{td6}</td>
                    <td>{td7}</td>
                    <td>{td8}</td>
                    {/* <td>Updated</td> */}
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                  {record.map((d, i) => (
                    <tr className="w-100 text-center my-2" key={i}>
                      <td>
                        <img src={d[data1]} alt="" />
                      </td>
                      <td>{d[data2]}</td>
                      <td>{d[data3]}</td>
                      {showActiveColumn && (
                        <td>
                          {d[data4] ? "Active " : "Inactive "}
                          <BsDot
                            className="fs-2"
                            style={{ color: d[data4] ? "#03AC13" : "red" }}
                          />
                        </td>
                      )}
                      {showActiveMenu && (
                        <td>
                          {d[data5] ? "Yes" : "No"}
                          <BsDot
                            className="fs-3"
                            style={{ color: d[data4] ? "#03AC13" : "red" }}
                          />
                        </td>
                      )}
                      <td>{d[data6]}</td>
                      <td>{d[data7]}</td>
                      <td>{d[data8]}</td>
                      {/* <td>{d.updated_at}</td> */}
                    </tr>
                  ))}
                  {emptyRows.map((_, i) => (
                    <tr key={`empty-${i}`}>
                      <td></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <nav className="">
                <ul className="pagination pagi-list">
                  <li className="page-link" onClick={prePage}>
                    Prev
                  </li>
                  {numbers.map((n, i) => (
                    <li
                      className={`page-link ${
                        currentPage === n ? "active-page" : ""
                      }`}
                      key={i}
                      onClick={() => changePage(n)}
                    >
                      {n}
                    </li>
                  ))}
                  <li className="page-link" onClick={nextPage}>
                    Next
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CRM;
