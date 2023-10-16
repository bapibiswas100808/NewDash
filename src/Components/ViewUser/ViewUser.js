import axios from "axios";
import React from "react";
import { useState, useRef } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ViewUser.css";

const ViewUser = () => {
  const navigate = useNavigate();
  const userRef = useRef();
  const [image, setImage] = useState();
  const [imageId, setImageId] = useState();
  const [userDetails, setUserdetails] = useState({});
  const { id } = useParams();
  console.log(userDetails);
  useEffect(() => {
    const fetchData = async () => {
      const accessToken = `Token ${localStorage.getItem("getToken")}`;
      console.log(accessToken);

      try {
        const response = await axios.get(
          `https://secom.privateyebd.com/api/v1/auth/admin/user/${id}/`,
          {
            headers: {
              Authorization: accessToken,
            },
          }
        );
        setUserdetails(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);
  const handleUserImage = () => {
    userRef.current.click();
  };
  const handleSelectImage = (e) => {
    setImage(e.target.files[0]);
  };
  useEffect(() => {
    const imageForm = new FormData();
    imageForm.append("document", image);
    imageForm.append("doc_type", 0);
    console.log(imageForm);
    const accessToken = `Token ${localStorage.getItem("getToken")}`;
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://secom.privateyebd.com/api/v1/auth/documents/upload/",
          imageForm,
          {
            headers: {
              Authorization: accessToken,
            },
          }
        );
        console.log(response.data);
        setImageId(response.data.id);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [image]);
  const editRoute = window.location.pathname.includes("/edituser");
  const handleUserUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const first_name = form.firstName.value;
    const last_name = form.lastName.value;
    const gender = userDetails.gender;
    const dob = userDetails.dob;
    const bio = userDetails.bio;
    const image = imageId;
    const userForm = {
      first_name,
      last_name,
      gender,
      dob,
      bio,
      image,
    };
    const accessToken = `Token ${localStorage.getItem("getToken")}`;
    try {
      const response = await axios.put(
        `https://secom.privateyebd.com/api/v1/auth/admin/user/${id}/`,
        userForm,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: accessToken,
          },
        }
      );

      console.log(response);
      alert("Updated Successfully!");
      navigate("/users");
    } catch (error) {
      console.log(error.response.data);
    }
  };
  console.log(imageId);

  return (
    <section>
      <div className="project-container my-5">
        <div className="card view-user-content ">
          <form onSubmit={handleUserUpdate}>
            <div className="view-user-image mb-3">
              <label>User Image</label> <br />
              <input
                type="file"
                defaultValue={userDetails?.profile_pic}
                hidden
                ref={userRef}
                onChange={handleSelectImage}
                disabled={!editRoute}
              />
              <img
                onClick={handleUserImage}
                src={
                  image ? URL.createObjectURL(image) : userDetails.profile_pic
                }
                alt=""
              />
            </div>
            <div className="view-user-id mb-3">
              <label>User ID</label> <br />
              <input
                className="w-100 px-2 py-2 rounded"
                type="text"
                defaultValue={userDetails.id}
                name="idName"
                disabled={!editRoute}
              />
            </div>
            <div className="view-user-fname mb-3">
              <label>First Name</label> <br />
              <input
                className="w-100 px-2 py-2 rounded"
                type="text"
                defaultValue={userDetails.first_name}
                name="firstName"
                disabled={!editRoute}
              />
            </div>
            <div className="view-user-lname mb-3">
              <label>Last Name</label> <br />
              <input
                className="w-100 px-2 py-2 rounded"
                type="text"
                defaultValue={userDetails.last_name}
                name="lastName"
                disabled={!editRoute}
              />
            </div>
            <div className="view-user-email mb-3">
              <label>User Email</label> <br />
              <input
                className="w-100 px-2 py-2 rounded"
                type="text"
                defaultValue={userDetails.email}
                name="emailName"
                disabled={!editRoute}
              />
            </div>
            <div className="view-user-mobile mb-3">
              <label>User Phone</label> <br />
              <input
                className="w-100 px-2 py-2 rounded"
                type="text"
                defaultValue={userDetails.mobile}
                name="mobileName"
                disabled={!editRoute}
              />
            </div>
            <div className="user-update-button my-5">
              <button
                style={{ display: editRoute ? "block" : "none" }}
                type="submit"
                className="px-3 py-1 rounded w-100 py-2"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ViewUser;
