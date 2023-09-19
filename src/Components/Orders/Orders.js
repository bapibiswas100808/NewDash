import React from "react";
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
  const [profile, setProfile] = useState(false);
  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = `Token ${localStorage.getItem("getToken")}`;
        const response = await axios.get(
          "https://secom.privateyebd.com/api/v1/order/admin/order/",
          {
            headers: { Authorization: accessToken },
          }
        );
        setColumns(Object.keys(response.data[0]));
        setRecords(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchData();
  }, []);
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
        <div className="order-table card">
          <div className="order-table-top d-flex justify-content-between">
            <div className="order-search d-flex align-items-center">
              <span className="search">
                <AiOutlineSearch className="fs-4" />
              </span>
              <div>
                <input
                  className="form-control px-5"
                  list="datalistOptions"
                  id="exampleDataList"
                  placeholder="Type to search orders"
                />
              </div>
            </div>
            <div className="order-drop">
              <h6
                className="px-3 py-2 rounded text-white"
                onClick={(e) => setProfile(!profile)}
              >
                Sort Order
                <span className="fs-6 ms-2">
                  {profile ? <AiFillCaretDown /> : <AiFillCaretRight />}
                </span>
              </h6>
              {profile && (
                <ul className="position-fixed list-unstyled  px-3 py-1 rounded">
                  <li>first fdhufudyf</li>
                  <li>two</li>
                  <li>three</li>
                </ul>
              )}
            </div>
          </div>
          <div className="order-table-main">
            <div className="order-table-zone">
              <table className="w-100">
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
                  {records.map((d, i) => (
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
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
