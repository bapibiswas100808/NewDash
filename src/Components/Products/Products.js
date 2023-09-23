import React from "react";
import "./Products.css";
import CRM from "../../Pages/SubPages/CRM/CRM";

const Products = () => {
  return (
    <div className="category-area">
      <CRM
        pageApi="https://secom.privateyebd.com/api/v1/inventory/admin/product/"
        heading="Products"
        pages="Pages"
        pageName="Products"
        buttonName="Add Products"
        td1="Image"
        td2="Product name"
        td3="Product ID"
        td4="Active Status"
        td5="Price"
        td6="Category name"
        data1="thumbnail"
        data2="name"
        data3="id"
        data4="is_active"
        data6="price"
        data7="category_name"
        showActiveColumn={true}
      />
    </div>
  );
};

export default Products;
