import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const ViewCoupon = () => {
  const { id } = useParams();
  const [viewCoupon, setViewCoupon] = useState({});
  const accessToken = `Token ${localStorage.getItem("getToken")}`;
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://secom.privateyebd.com/api/v1/order/admin/coupon/${id}/`,
          {
            headers: {
              Authorization: accessToken,
            },
          }
        );
        console.log(response.data);
        setViewCoupon(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [accessToken, id]);
  const isEditable = window.location.pathname.includes(`/editcoupon/${id}`);
  const [couponType, setCouponType] = useState(0);
  const [isActiveChecked, setIsActiveChecked] = useState(false);
  const handleCouponType = (e) => {
    e.preventDefault();
    setCouponType(e.target.value);
  };
  const handleActiveCheck = (event) => {
    setIsActiveChecked(event.target.checked);
  };
  const handleCouponAdd = (e) => {
    e.preventDefault();
    const accessToken = `Token ${localStorage.getItem("getToken")}`;
    const form = e.target;
    const name = form.couponName.value;
    const code = form.couponCode.value;
    const start_date = form.couponStart.value;
    const expiry_date = form.couponEnd.value;
    const discount_type = couponType;
    const minimum_price = form.priceMinimum.value;
    const maximum_price = form.priceMaximum.value;
    const maximum_discount_amount = form.discountMaximum.value;
    const price = form.couponPrice.value;
    const discount_percentage = form.discountPercentage.value;
    const remaining_count = form.remainingCount.value;
    const max_usage = form.maxUsage.value;
    const usage_count = form.usageCount.value;
    const is_active = isActiveChecked;
    const couponApi = `https://secom.privateyebd.com/api/v1/order/admin/coupon/${id}/`;
    const couponForm = {
      name,
      code,
      start_date,
      expiry_date,
      discount_type,
      minimum_price,
      maximum_price,
      maximum_discount_amount,
      price,
      discount_percentage,
      remaining_count,
      max_usage,
      usage_count,
      is_active,
    };
    axios
      .patch(couponApi, couponForm, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((res) => {
        console.log(res.data);
        navigate("/coupons");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <section className="add-coupon-area">
      <div className="project-container">
        <h2 className="fs-4 my-3">
          {isEditable ? "Update Coupon" : `Coupon No. ${id}`}
        </h2>
        <div className="add-coupon-content card">
          <form onSubmit={handleCouponAdd}>
            <div className="coupon-name mb-3">
              <label className="my-2">Coupon Name</label>
              <input
                className="w-100 px-3 py-2 rounded"
                type="text"
                placeholder="Coupon Name"
                name="couponName"
                defaultValue={viewCoupon.name}
                readOnly={!isEditable}
              />
            </div>
            <div className="coupon-code mb-3">
              <label className="my-2">Coupon Code</label>
              <input
                className="w-100 px-3 py-2 rounded"
                type="text"
                placeholder="Coupon Code"
                name="couponCode"
                defaultValue={viewCoupon.code}
                readOnly={!isEditable}
              />
            </div>
            <div className="coupon-start-end mb-3">
              <Row>
                <Col lg={6}>
                  <div className="start-date">
                    <label className="mb-2">Start Date</label>
                    <input
                      className="w-100 px-3 py-2 rounded"
                      type={isEditable ? "date" : "text"}
                      name="couponStart"
                      defaultValue={viewCoupon.start_date}
                      readOnly={!isEditable}
                    />
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="end-date">
                    <label className="mb-2">End Date</label>
                    <input
                      className="w-100 px-3 py-2 rounded"
                      type={isEditable ? "date" : "text"}
                      name="couponEnd"
                      defaultValue={viewCoupon.expiry_date}
                      readOnly={!isEditable}
                    />
                  </div>
                </Col>
              </Row>
            </div>
            <div className="discount-type mb-3">
              <label className="mb-2">Discount Type</label>
              <select onChange={handleCouponType} className="w-100 form-select">
                <option value="0">Type 1</option>
                <option value="1">Type 2</option>
                <option value="2">Type 3</option>
              </select>
            </div>
            <div className="coupon-price-discount mb-3">
              <Row>
                <Col lg={6}>
                  <div className="minimum-price mb-3">
                    <label className="mb-2">Minimum Price</label>
                    <input
                      className="w-100 px-3 py-2 rounded"
                      type="number"
                      name="priceMinimum"
                      placeholder="Minimum price"
                      defaultValue={viewCoupon.minimum_price}
                      readOnly={!isEditable}
                    />
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="maximum-price mb-3">
                    <label className="mb-2">Maximum Price</label>
                    <input
                      className="w-100 px-3 py-2 rounded"
                      type="number"
                      name="priceMaximum"
                      placeholder="maximum price"
                      defaultValue={viewCoupon.maximum_price}
                      readOnly={!isEditable}
                    />
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="maximum-discount mb-3">
                    <label className="mb-2">Maximum discount</label>
                    <input
                      className="w-100 px-3 py-2 rounded"
                      type="number"
                      name="discountMaximum"
                      placeholder="Maximum discount"
                      defaultValue={viewCoupon.maximum_discount_amount}
                      readOnly={!isEditable}
                    />
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="maximum-percentage mb-3">
                    <label className="mb-2">Discount Percentage</label>
                    <input
                      className="w-100 px-3 py-2 rounded"
                      type="number"
                      name="discountPercentage"
                      placeholder="Discount Percentage"
                      defaultValue={viewCoupon.discount_percentage}
                      readOnly={!isEditable}
                    />
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="coupon-price mb-3">
                    <label className="mb-2">Coupon Price</label>
                    <input
                      className="w-100 px-3 py-2 rounded"
                      type="number"
                      name="couponPrice"
                      placeholder="Coupon Price"
                      defaultValue={viewCoupon.price}
                      readOnly={!isEditable}
                    />
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="max-usage mb-3">
                    <label className="mb-2">Max Usage</label>
                    <input
                      className="w-100 px-3 py-2 rounded"
                      type="number"
                      name="maxUsage"
                      placeholder="Max Usage"
                      defaultValue={viewCoupon.max_usage}
                      readOnly={!isEditable}
                    />
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="remaining-count mb-3">
                    <label className="mb-2">Remaining Count</label>
                    <input
                      className="w-100 px-3 py-2 rounded"
                      type="number"
                      name="remainingCount"
                      placeholder="Remaining Count"
                      defaultValue={viewCoupon.remaining_count}
                      readOnly={!isEditable}
                    />
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="usage-count mb-3">
                    <label className="mb-2">Usage Count</label>
                    <input
                      className="w-100 px-3 py-2 rounded"
                      type="number"
                      name="usageCount"
                      placeholder="Usage count"
                      defaultValue={viewCoupon.usage_count}
                      readOnly={!isEditable}
                    />
                  </div>
                </Col>
              </Row>
            </div>
            <div className="coupon-active">
              <label className="mb-2">Coupon Active?</label>
              <input
                className="ms-4"
                type="checkbox"
                checked={isActiveChecked}
                onChange={handleActiveCheck}
              />
            </div>
            <button
              type="submit"
              className="px-3 py-2 rounded my-3 w-100"
              style={{ display: isEditable ? "block" : "none" }}
            >
              {isEditable ? "Update Coupon" : `Coupon No. ${id}`}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ViewCoupon;
