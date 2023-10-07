import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateMember.css";

const CreateMember = () => {
  const [isChecked, setIsChecked] = useState(0);
  // const [qrContent, setQrcontent] = useState({});
  // console.log(qrContent);
  const navigate = useNavigate();
  const handleAddMember = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.emailInput.value;
    const mobile = form.mobileInput.value;
    const dob = form.dobInput.value;
    const role = form.roleInput.value;
    const is_active = form.activeInput.value;
    const userApi = "https://secom.privateyebd.com/api/v1/auth/admin/user/";
    const accessToken = `Token ${localStorage.getItem("getToken")}`;
    const userForm = {
      email,
      mobile,
      dob,
      role,
      is_active,
    };
    axios
      .post(userApi, userForm, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((res) => {
        console.log(res.data);
        // setQrcontent(res.data);
        navigate("/users");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleChecked = () => {
    setIsChecked(!isChecked);
  };
  return (
    <section className="create-area mt-4">
      <div className="project-container">
        <h2 className="fs-4">Add Member</h2>
        <form onSubmit={handleAddMember}>
          <input
            className="px-2 py-2 mb-2 w-100 rounded"
            type="text"
            placeholder="User Email"
            name="emailInput"
          />
          <input
            className="px-2 py-2 mb-2 w-100 rounded"
            type="number"
            placeholder="Phone no."
            name="mobileInput"
          />
          <input
            className="px-2 py-2 mb-2 w-100 rounded"
            type="date"
            placeholder="Birth Date"
            name="dobInput"
          />
          <select className="px-2 py-2 mb-2 w-100 rounded" name="roleInput">
            <option value="0">Customer</option>
            <option value="1">Admin</option>
            <option value="2">Delivery Man</option>
          </select>
          <div className="d-flex align-items-center mb-3">
            <label className="me-3 fs-6">Is Active?</label>
            <input
              name="activeInput"
              type="checkbox"
              checked={isChecked}
              onChange={handleChecked}
            />
          </div>
          <button className="w-100 px-3 py-2 rounded" type="submit">
            Add Member
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateMember;
