import React from "react";
import "./CRM.css";
import {
  AiOutlineDoubleRight,
  AiOutlineSearch,
  AiFillDelete,
} from "react-icons/ai";
import { BsDot, BsFillEyeFill } from "react-icons/bs";
import { GrEdit } from "react-icons/gr";
import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const CRM = ({
  pageApi,
  heading,
  pages,
  pageName,
  buttonName1,
  buttonName2,
  buttonName3,
  td1,
  td2,
  td3,
  td4,
  td5,
  td6,
  td7,
  td8,
  td9,
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
  const navigate = useNavigate();

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
  }, [pageApi]);
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
  const emptyRowCount = totalRows - recordPerPage;
  const emptyRows = [...Array(emptyRowCount).keys()];
  const handleAddProduct = () => {
    navigate("/addproduct");
  };
  const handleAddBrand = () => {
    navigate("/addbrand");
  };
  const handleAddCategory = () => {
    navigate("/addcategory");
  };

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
          </div>
        </div>
        <div className="order-table card container-fluid ">
          <div className="order-table-top d-flex justify-content-between align-items-center">
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
            <div>
              <button
                onClick={handleAddProduct}
                className="px-3 py-2 rounded mt-4 mb-2 add-product-button"
              >
                {buttonName1}
              </button>
              <button
                onClick={handleAddBrand}
                className="px-3 py-2 rounded mt-4 mb-2 add-brand-button"
              >
                {buttonName2}
              </button>
              <button
                onClick={handleAddCategory}
                className="px-3 py-2 rounded mt-4 mb-2 add-category-button"
              >
                {buttonName3}
              </button>
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
                    <td>{td9}</td>
                    {/* <td>Updated</td> */}
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
                      <td>
                        <div className="action-buttons d-flex align-items-center justify-content-center">
                          <div className="show-button me-2 action-button">
                            <NavLink className="view-category" to="">
                              <BsFillEyeFill />
                            </NavLink>
                            <NavLink className="view-brand" to="">
                              <BsFillEyeFill />
                            </NavLink>
                            <NavLink className="view-product" to="">
                              <BsFillEyeFill />
                            </NavLink>
                          </div>
                          <div className="edit-button me-2 action-button">
                            <NavLink className="view-category" to="">
                              <GrEdit />
                            </NavLink>
                            <NavLink className="view-brand" to="">
                              <GrEdit />
                            </NavLink>
                            <NavLink className="view-product" to="">
                              <GrEdit />
                            </NavLink>
                          </div>
                          <div className="delete-button action-button">
                            <NavLink className="view-category" to="">
                              <AiFillDelete />
                            </NavLink>
                            <NavLink className="view-brand" to="">
                              <AiFillDelete />
                            </NavLink>
                            <NavLink className="view-product" to="">
                              <AiFillDelete />
                            </NavLink>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {emptyRows.map((_, i) => (
                    <tr key={`empty-${i}`}>
                      <td></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <nav className="mt-2">
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
