import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./ViewOrder.css";

const ViewOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [coupon, setCoupon] = useState({});
  const [cancel, setCancel] = useState([]);

  useEffect(() => {
    const accessToken = `Token ${localStorage.getItem("getToken")}`;
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://secom.privateyebd.com/api/v1/order/admin/order/${id}/`,
          {
            headers: {
              Authorization: accessToken,
            },
          }
        );
        console.log(response.data);
        setOrder(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);
  useEffect(() => {
    const accessToken = `Token ${localStorage.getItem("getToken")}`;
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://secom.privateyebd.com/api/v1/order/admin/coupon/`,
          {
            headers: {
              Authorization: accessToken,
            },
          }
        );
        console.log(response.data);
        setCoupon(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const accessToken = `Token ${localStorage.getItem("getToken")}`;
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://secom.privateyebd.com/api/v1/order/admin/cancelreason/`,
          {
            headers: {
              Authorization: accessToken,
            },
          }
        );
        console.log(response.data);
        setCancel(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  const [cancelId, setCancelId] = useState();
  const [selectedCancelItem, setSelectedCancelItem] = useState({
    reason_name: "",
    is_active: false,
    updated_at: "",
    created_at: "",
  });
  const handleReason = (e) => {
    const id = e.target.value;
    setCancelId(id);
    console.log(id);
  };
  useEffect(() => {
    const selectedItem = cancel.find(
      (item) => item.id === parseInt(cancelId, 10)
    );
    setSelectedCancelItem(
      selectedItem || {
        reason_name: "",
        is_active: false,
        updated_at: "",
        created_at: "",
      }
    );
  }, [cancelId, cancel]);

  const { reason_name, is_active, updated_at, created_at } = selectedCancelItem;
  console.log(reason_name, is_active, updated_at, created_at);

  const handleCancel = (e) => {
    e.preventDefault();
    const accessToken = `Token ${localStorage.getItem("getToken")}`;
    const cancelForm = {
      reason_name,
      is_active,
    };
    console.log(cancelForm);
    axios
      .put(
        `https://secom.privateyebd.com/api/v1/order/admin/cancelreason/${cancelId}/`,
        cancelForm,
        {
          headers: {
            Authorization: accessToken,
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <section className="view-order-zone">
      <div className="project-container view-order-area">
        <h2 className="fs-5 my-3">Order Details</h2>
        <div className="view-order-content card">
          <Row>
            <Col lg={6}>
              <div className="order-view-id">
                <label className="mb-2">Order ID</label> <br />
                <input
                  type="text"
                  className=" px-3 py-2 rounded w-100 mb-3 mb-lg-0"
                  defaultValue={order.id}
                />
              </div>
            </Col>
            <Col lg={6}>
              <div className="order-invoice-number">
                <label className="mb-2">Invoice Number</label> <br />
                <input
                  type="text"
                  className=" px-3 py-2 rounded w-100 mb-3 mb-lg-0"
                  defaultValue={order.invoice_no}
                />
              </div>
            </Col>
            <Col lg={6}>
              <div className="order-invoice-number mb-3 mb-lg-0">
                <label className="mb-2">Customer Name</label> <br />
                <input
                  type="text"
                  className=" px-3 py-2 rounded w-100"
                  defaultValue={order.customer_name}
                />
              </div>
            </Col>
            <Col lg={6}>
              <div className="order-invoice-number mb-3 mb-lg-0">
                <label className="mb-2">Total Price</label> <br />
                <input
                  type="text"
                  className=" px-3 py-2 rounded w-100"
                  defaultValue={order.total}
                />
              </div>
            </Col>
            <Col lg={6}>
              <div className="order-invoice-number mb-3 mb-lg-0">
                <label className="mb-2">Shipping Charge</label> <br />
                <input
                  type="text"
                  className=" px-3 py-2 rounded w-100"
                  defaultValue={order.shipping_charge}
                />
              </div>
            </Col>
            <Col lg={6}>
              <div className="order-updated-at mb-3 mb-lg-0">
                <label className="mb-2">Created</label> <br />
                <input
                  type="text"
                  className=" px-3 py-2 rounded w-100"
                  defaultValue={selectedCancelItem.created_at}
                />
              </div>
            </Col>
            <Col lg={6}>
              <div className="order-updated-at mb-3 mb-lg-0">
                <label className="mb-2">Updated</label> <br />
                <input
                  type="text"
                  className=" px-3 py-2 rounded w-100"
                  defaultValue={selectedCancelItem.updated_at}
                />
              </div>
            </Col>
            <Col lg={6}>
              <div className="order-invoice-number mb-3 mb-lg-0">
                <label className="mb-2">Cancel Reason</label> <br />
                <select
                  onChange={handleReason}
                  className="px-3 py-2 w-100 rounded"
                >
                  <option>-----</option>
                  {cancel.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.reason_name}
                    </option>
                  ))}
                </select>
              </div>
            </Col>
            <Col lg={12}>
              <div className="view-order-text mt-3">
                <textarea
                  className="w-100 px-3 py-2 rounded"
                  placeholder="No reason"
                />
              </div>
            </Col>
          </Row>
          <button className="px-3 py-2 rounded my-4" onClick={handleCancel}>
            Save
          </button>
        </div>
      </div>
    </section>
  );
};

export default ViewOrder;
