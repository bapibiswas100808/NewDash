import React from "react";
import CRM from "../../Pages/SubPages/CRM/CRM";
import "./Coupon.css";

const Coupon = () => {
  return (
    <section className="coupon-zone">
      <div className="project-container">
        <div className="coupon-area my-4">
          <CRM
            pageApi="https://secom.privateyebd.com/api/v1/order/admin/coupon/"
            heading="Coupons"
            pages="Pages"
            pageName="Coupons"
            buttonName4="Add New Coupon"
            td1="Name"
            td2="Coupon Code"
            td3="Maximum Price"
            td4="Maximum Discount"
            td5="Price"
            td6="Action"
            data2="name"
            data3="code"
            data6="maximum_price"
            data7="maximum_discount_amount"
            data8="price"
          />
        </div>
      </div>
    </section>
  );
};

export default Coupon;
