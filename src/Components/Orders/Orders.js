import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import "./Orders.css";
import {
  AiOutlineDoubleRight,
  AiFillCaretRight,
  AiFillCaretDown,
  AiOutlineSearch,
} from "react-icons/ai";
import { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);
  const [originalRecords, setOriginalRecords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = `Token ${localStorage.getItem("getToken")}`;
        const response = await axios.get(
          "https://secom.privateyebd.com/api/v1/order/admin/order/",
          {
            headers: {
              Authorization: accessToken,
            },
            params: {
              page: 1,
              limit: 5,
            },
          }
        );
        setColumns(Object.keys(response.data[0]));
        setRecords(response.data);
        setOriginalRecords(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchData(1, 5);
  }, []);
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    if (searchTerm === "") {
      setRecords(originalRecords);
    } else {
      setRecords(
        originalRecords.filter((f) =>
          f.customer_name.toLowerCase().includes(searchTerm)
        )
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
            <h4>Orders</h4>
          </div>
          <div className="">
            <p className="fs-6">
              Pages
              <span>
                <AiOutlineDoubleRight />
                Orders
              </span>
            </p>
            <button className="px-3 py-2 rounded mt-4 mb-2">New Order</button>
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
                  <option value="all">All</option>
                  <br />
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="out for delivery">Out for Delivery</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <div className="drop-icon text-white">
                  <IoMdArrowDropdown />
                </div>
              </div>
            </div>
          </div>
          <div className="order-table-main">
            <div className="order-table-zone">
              <table className="w-100 table">
                <thead className="">
                  <tr className="w-100 text-center">
                    <td>Id</td>
                    <td>Invoice</td>
                    <td>Customer</td>
                    <td>Total Order</td>
                    <td>Status</td>
                    <td>Created</td>
                    {/* <td>Updated</td> */}
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                  {record.map((d, i) => (
                    <tr className="w-100 text-center my-2" key={i}>
                      <td>{d.id}</td>
                      <td>{d.invoice_no}</td>
                      <td>{d.customer_name}</td>
                      <td>{d.total}</td>
                      <td>{d.order_status}</td>
                      <td>{d.created_at}</td>
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

export default Orders;
