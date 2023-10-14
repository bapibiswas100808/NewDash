import React from "react";
import CRM from "../../Pages/SubPages/CRM/CRM";

const FaqZone = ({ toogleState }) => {
  return (
    <section>
      <div
        className={
          toogleState === 2
            ? "global-content global-active-content"
            : "global-content"
        }
      >
        <div className="global-faq-area my-4">
          <CRM
            pageApi="https://secom.privateyebd.com/api/v1/utility/admin/faq/"
            heading="FAQ"
            pages="Pages"
            pageName="FAQ"
            buttonName6="Add FAQ"
            td1="Question"
            td2="Answer"
            td9="Action"
            data2="question"
            data3="answer"
            tableHeading="Frequently Asked Questions"
          />
        </div>
      </div>
    </section>
  );
};

export default FaqZone;
