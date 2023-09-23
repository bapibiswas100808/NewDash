import React from "react";
import "./Brands.css";
import CRM from "../../Pages/SubPages/CRM/CRM";

const Brands = () => {
  return (
    <div className="category-area">
      <CRM
        pageApi="https://secom.privateyebd.com/api/v1/inventory/admin/brands/"
        heading="Brands"
        pages="Pages"
        pageName="Brands"
        buttonName="Add Brands"
        td1="Image"
        td2="Name"
        td4="Active Status"
        data1="image_url"
        data2="name"
        data4="is_active"
        data5="is_menu"
        showActiveColumn={true}
      />
    </div>
  );
};

export default Brands;
