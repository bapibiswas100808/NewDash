import React from "react";
import "./AddFaq.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddFaq = () => {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const handleCheck = () => {
    setIsChecked(!isChecked);
  };
  console.log(isChecked);
  const handleFaqSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const question = form.questionName.value;
    const answer = form.answerName.value;
    const position = form.positionName.value;
    const is_active = isChecked;
    const accessToken = `Token ${localStorage.getItem("getToken")}`;
    const faqApi = "https://secom.privateyebd.com/api/v1/utility/admin/faq/";
    const faqForm = {
      question,
      answer,
      position,
      is_active,
    };
    await axios
      .post(faqApi, faqForm, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((res) => {
        console.log(res.data);
        navigate("/globalsetting/faq");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <section className="add-faq-area">
      <div className="project-container">
        <h2 className="fs-5 my-4">Add New FAQ</h2>
        <div className="add-faq-content card">
          <form onSubmit={handleFaqSubmit}>
            <div className="faq-question mb-3">
              <label className="fs-6 mb-2">Question</label>
              <input
                type="text"
                className="w-100 px-3 py-2 rounded form-control"
                placeholder="New Question"
                name="questionName"
              />
            </div>
            <div className="faq-answer mb-3">
              <label className="fs-6 mb-2">Answer</label>
              <textarea
                type="text"
                className="w-100 px-3 py-4 rounded"
                placeholder="Answer"
                name="answerName"
              />
            </div>
            <div className="faq-position mb-3">
              <label className="fs-6 mb-2">Position</label>
              <input
                type="number"
                className="w-100 px-3 py-2 rounded form-control"
                placeholder="Position"
                name="positionName"
              />
            </div>
            <div className="faq-active mb-3">
              <label className="fs-6 mt-2 mb-2 me-3">Is Active?</label>
              <input
                type="checkbox"
                className="px-3 py-2"
                checked={isChecked}
                onChange={handleCheck}
              />
            </div>
            <button type="submit" className="w-100 px-3 py-2 rounded">
              Add FAQ
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddFaq;
