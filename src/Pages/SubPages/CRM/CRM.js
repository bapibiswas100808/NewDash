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
  buttonName4,
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
        const specialresponse = response.data;
        const responseRecord = Array.isArray(specialresponse)
          ? specialresponse
          : specialresponse.results;
        setRecords(responseRecord);
        setOriginalRecords(responseRecord);
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
  const recordPerPage = 10;
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
  // const totalRows = 10;
  // // const emptyRowCount = totalRows - recordPerPage;
  // // const emptyRows = [...Array(emptyRowCount).keys()];
  const handleAddProduct = () => {
    navigate("/addproduct");
  };
  const handleAddBrand = () => {
    navigate("/addbrand");
  };
  const handleAddCategory = () => {
    navigate("/addcategory");
  };
  const handleAddCoupon = () => {
    navigate("/addcoupon");
  };
  const handleDeleteCategory = async (id) => {
    try {
      const accessToken = `Token ${localStorage.getItem("getToken")}`;
      const shouldDelete = window.confirm("Do You Want to Delete?");

      if (shouldDelete) {
        const response = await axios.delete(
          `https://secom.privateyebd.com/api/v1/inventory/admin/categories/${id}/`,
          {
            headers: {
              Authorization: accessToken,
            },
          }
        );

        console.log(response);
        alert("Deleted Succesfully");
        const newCategory = await axios.get(
          "https://secom.privateyebd.com/api/v1/inventory/admin/categories/",
          {
            headers: {
              Authorization: accessToken,
            },
          }
        );
        setRecords(newCategory.data.results);
        navigate("/categories");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteBrand = async (id) => {
    try {
      const accessToken = `Token ${localStorage.getItem("getToken")}`;
      const shouldDelete = window.confirm("Do You Want to Delete?");

      if (shouldDelete) {
        const response = await axios.delete(
          `https://secom.privateyebd.com/api/v1/inventory/admin/brands/${id}/`,
          {
            headers: {
              Authorization: accessToken,
            },
          }
        );

        console.log(response);
        alert("Deleted Succesfully");
        const newCategory = await axios.get(
          "https://secom.privateyebd.com/api/v1/inventory/admin/brands/",
          {
            headers: {
              Authorization: accessToken,
            },
          }
        );
        setRecords(newCategory.data.results);
        navigate("/brands");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteProduct = async (id) => {
    try {
      const accessToken = `Token ${localStorage.getItem("getToken")}`;
      const shouldDelete = window.confirm("Do You Want to Delete?");

      if (shouldDelete) {
        const response = await axios.delete(
          `https://secom.privateyebd.com/api/v1/inventory/admin/product/${id}/`,
          {
            headers: {
              Authorization: accessToken,
            },
          }
        );

        console.log(response);
        alert("Deleted Succesfully");
        const newCategory = await axios.get(
          "https://secom.privateyebd.com/api/v1/inventory/admin/product/",
          {
            headers: {
              Authorization: accessToken,
            },
          }
        );
        setRecords(newCategory.data.results);
        navigate("/products");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteCoupon = async (id) => {
    try {
      const accessToken = `Token ${localStorage.getItem("getToken")}`;
      const shouldDelete = window.confirm("Do You Want to Delete?");

      if (shouldDelete) {
        const response = await axios.delete(
          `https://secom.privateyebd.com/api/v1/order/admin/coupon/${id}/`,
          {
            headers: {
              Authorization: accessToken,
            },
          }
        );

        console.log(response);
        alert("Deleted Succesfully");
        const newCategory = await axios.get(
          "https://secom.privateyebd.com/api/v1/order/admin/coupon/",
          {
            headers: {
              Authorization: accessToken,
            },
          }
        );
        setRecords(newCategory.data);
        navigate("/coupons");
      }
    } catch (error) {
      console.error(error);
    }
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
            <div className="ms-2">
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
              <button
                onClick={handleAddCoupon}
                className="px-3 py-2 rounded mt-4 mb-2 add-coupon-button d-none"
              >
                {buttonName4}
              </button>
            </div>
          </div>
          <div className="order-table-main">
            <div className="order-table-zone">
              <table className="w-100 table text-nowrap table-hover border table-bordered ">
                <thead className="">
                  <tr className="w-100 text-center">
                    <th scope="row" className="">
                      <input className="form-check-input" type="checkbox" />
                    </th>
                    <th className="th1" scope="col">
                      {td1}
                    </th>
                    <th className="th2" scope="col">
                      {td2}
                    </th>
                    <th className="th3" scope="col">
                      {td3}
                    </th>
                    <th className="th4" scope="col">
                      {td4}
                    </th>
                    <th className="th5" scope="col">
                      {td5}
                    </th>
                    <th className="th6" scope="col">
                      {td6}
                    </th>
                    <th className="th7" scope="col">
                      {td7}
                    </th>
                    <th className="th8" scope="col">
                      {td8}
                    </th>
                    <th className="th9" scope="col">
                      {td9}
                    </th>
                    {/* <td>Updated</td> */}
                  </tr>
                </thead>
                <tbody>
                  {record.map((d, i) => (
                    <tr className="w-100 text-center my-2" key={i}>
                      <td>
                        <input className="form-check-input" type="checkbox" />
                      </td>
                      <td className="td1">
                        <img src={d[data1]} alt="" />
                      </td>
                      <td className="td2">{d[data2]}</td>
                      <td className="td3">{d[data3]}</td>
                      {showActiveColumn && (
                        <td className="td4">
                          {d[data4] ? "Active " : "Inactive "}
                          <BsDot
                            className="fs-2"
                            style={{ color: d[data4] ? "#03AC13" : "red" }}
                          />
                        </td>
                      )}
                      {showActiveMenu && (
                        <td className="td5">
                          {d[data5] ? "Yes" : "No"}
                          <BsDot
                            className="fs-3"
                            style={{ color: d[data4] ? "#03AC13" : "red" }}
                          />
                        </td>
                      )}
                      <td className="td6">{d[data6]}</td>
                      <td className="td7">{d[data7]}</td>
                      <td className="td8">{d[data8]}</td>
                      {/* <td>{d.updated_at}</td> */}
                      <td>
                        <div className="action-buttons d-flex align-items-center justify-content-center">
                          <div className="show-button me-2 action-button">
                            <NavLink
                              className="view-category"
                              to={`/viewcategory/${d.id}`}
                            >
                              <BsFillEyeFill />
                            </NavLink>
                            <NavLink
                              className="view-brand"
                              to={`/viewbrand/${d.id}`}
                            >
                              <BsFillEyeFill />
                            </NavLink>
                            <NavLink
                              className="view-product"
                              to={`/viewproduct/${d.id}`}
                            >
                              <BsFillEyeFill />
                            </NavLink>
                            <NavLink
                              className="view-coupon"
                              to={`/viewcoupon/${d.id}`}
                            >
                              <BsFillEyeFill />
                            </NavLink>
                          </div>
                          <div className="edit-button me-2 action-button">
                            <NavLink
                              className="view-category"
                              to={`/viewcategory/${d.id}`}
                            >
                              <GrEdit />
                            </NavLink>
                            <NavLink
                              className="view-brand"
                              to={`/viewbrand/${d.id}`}
                            >
                              <GrEdit />
                            </NavLink>
                            <NavLink
                              className="view-product"
                              to={`/viewproduct/${d.id}`}
                            >
                              <GrEdit />
                            </NavLink>
                            <NavLink
                              className="view-coupon"
                              to={`/viewcoupon/${d.id}`}
                            >
                              <GrEdit />
                            </NavLink>
                          </div>
                          <div className="delete-button action-button">
                            <NavLink
                              className="view-category"
                              onClick={() => handleDeleteCategory(d.id)}
                            >
                              <AiFillDelete />
                            </NavLink>
                            <NavLink
                              className="view-brand"
                              onClick={() => handleDeleteBrand(d.id)}
                            >
                              <AiFillDelete />
                            </NavLink>
                            <NavLink
                              className="view-product"
                              onClick={() => handleDeleteProduct(d.id)}
                            >
                              <AiFillDelete />
                            </NavLink>
                            <NavLink
                              className="view-coupon"
                              onClick={() => handleDeleteCoupon(d.id)}
                            >
                              <AiFillDelete />
                            </NavLink>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {/* {emptyRows.map((_, i) => (
                    <tr key={`empty-${i}`}>
                      <td></td>
                    </tr>
                  ))} */}
                </tbody>
              </table>
            </div>
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
  );
};

export default CRM;
