import React from "react";
import CRM from "../../Pages/SubPages/CRM/CRM";

const PagesZone = ({ toogleState }) => {
  return (
    <section>
      <div
        className={
          toogleState === 3
            ? "global-content global-active-content"
            : "global-content"
        }
      >
        <div className="global-page-area my-4">
          <CRM
            pageApi="https://secom.privateyebd.com/api/v1/utility/admin/page/"
            heading="Pages"
            pages="Pages"
            pageName="Page"
            buttonName7="Add Page"
            td1="Title"
            td2="Description"
            td3="Is Active"
            td9="Action"
            data2="title"
            data3="desc"
            data4="is_active"
            tableHeading="See All Pages"
            showActiveColumn={true}
          />
        </div>
      </div>
    </section>
  );
};

export default PagesZone;
