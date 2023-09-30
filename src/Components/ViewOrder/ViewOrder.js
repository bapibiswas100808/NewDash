import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [coupon, setCoupon] = useState({});
  const [cancel, setCancel] = useState({});

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
          `https://secom.privateyebd.com/api/v1/order/admin/order/${id}/`,
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
  }, [id]);
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
  }, [id]);

  return (
    <section className="view-order-zone">
      <div className="project-container view-order-area">
        <div className="view-order-content card">
          <h2 className="text-center">View Order</h2>
        </div>
      </div>
    </section>
  );
};

export default ViewOrder;
