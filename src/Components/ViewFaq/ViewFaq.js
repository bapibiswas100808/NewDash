import React from "react";
import "./ViewFaq.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

const ViewFaq = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [faqData, setFaqData] = useState({});
  const accessToken = `Token ${localStorage.getItem("getToken")}`;
  const condition = window.location.pathname.includes("/editfaq");

  useEffect(() => {
    axios
      .get(`https://secom.privateyebd.com/api/v1/utility/admin/faq/${id}/`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((res) => {
        console.log(res.data);
        setFaqData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleFaqSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const question = form.questionName.value;
    const answer = form.answerName.value;
    const position = form.positionName.value;
    const accessToken = `Token ${localStorage.getItem("getToken")}`;
    const faqApi = `https://secom.privateyebd.com/api/v1/utility/admin/faq/${id}/`;
    const faqForm = {
      question,
      answer,
      position,
    };
    await axios
      .put(faqApi, faqForm, {
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
        <h2 className="fs-5 my-4">
          {condition ? "Update Faq" : `Faq Id : ${faqData.id} `}
        </h2>
        <div className="add-faq-content card">
          <form onSubmit={handleFaqSubmit}>
            <div className="faq-question mb-3">
              <label className="fs-6 mb-2">Question</label>
              <input
                type="text"
                className="w-100 px-3 py-2 rounded form-control"
                placeholder="New Question"
                name="questionName"
                defaultValue={faqData?.question}
                disabled={!condition}
              />
            </div>
            <div className="faq-answer mb-3">
              <label className="fs-6 mb-2">Answer</label>
              <textarea
                type="text"
                className="w-100 px-3 py-4 rounded"
                placeholder="Answer"
                name="answerName"
                defaultValue={faqData?.answer}
                disabled={!condition}
              />
            </div>
            <div className="faq-position mb-3">
              <label className="fs-6 mb-2">Position</label>
              <input
                type="number"
                className="w-100 px-3 py-2 rounded form-control"
                placeholder="Position"
                name="positionName"
                defaultValue={faqData?.position}
                disabled={!condition}
              />
            </div>
            {condition && (
              <button type="submit" className="w-100 my-3 px-3 py-2 rounded">
                Update FAQ
              </button>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ViewFaq;
