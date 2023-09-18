import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateMember.css";

const CreateMember = () => {
  const [qrContent, setQrcontent] = useState({});
  console.log(qrContent);
  const navigate = useNavigate();
  const handleAddMember = (event) => {
    event.preventDefault();
    const form = event.target;
    const title = form.titleInput.value;
    const qr_text = form.qrInput.value;
    const qrApi = "https://auth.privateyebd.com/api/v2/qrcodes/";
    const qrForm = {
      title,
      qr_text,
    };
    axios
      .post(qrApi, qrForm)
      .then((res) => {
        console.log(res.data);
        setQrcontent(res.data);
        navigate("/webpage1");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <section className="create-area mt-4">
      <div className="project-container">
        <h2 className="fs-4">Add Member</h2>
        <form onSubmit={handleAddMember}>
          <input
            className="p-2 mb-2 w-100 rounded"
            type="text"
            placeholder="Write Title here"
            name="titleInput"
          />
          <input
            className="p-2 mb-2 w-100 rounded"
            type="text"
            placeholder="Write qr text here"
            name="qrInput"
          />
          <button className="w-100 px-3 py-2 rounded" type="submit">
            Add Member
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateMember;
