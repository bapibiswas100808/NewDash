import React from "react";
import "./Category.css";
import CRM from "../../Pages/SubPages/CRM/CRM";

const Category = () => {
  return (
    <div className="category-area">
      <CRM
        pageApi="https://secom.privateyebd.com/api/v1/inventory/admin/categories/"
        // patchApi="https://secom.privateyebd.com/api/v1/inventory/admin/categories/"
        heading="Categories"
        pages="Pages"
        pageName="Categories"
        buttonName3="Add Category"
        td1="Image"
        td2="Name"
        td3="Rank"
        td4="Active Status"
        td5="Menu Status"
        td9="Action"
        data1="image_url"
        data2="name"
        data3="code"
        data4="is_active"
        data5="is_menu"
        showActiveColumn={true}
        showActiveMenu={true}
      />
    </div>
  );
};

export default Category;
