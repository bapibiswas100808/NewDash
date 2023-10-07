import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ViewUser.css";

const ViewUser = () => {
  const navigate = useNavigate();
  const [userDetails, setUserdetails] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    dob: "",
    bio: "",
    image: "",
    email: "",
    mobile: "",
  });
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
  const handleUserUpdate = async (e) => {
    e.preventDefault();
    const accessToken = `Token ${localStorage.getItem("getToken")}`;
    try {
      const response = await axios.put(
        `https://secom.privateyebd.com/api/v1/auth/admin/user/${id}/`,
        userDetails,
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

  return (
    <section>
      <div className="project-container">
        <div className="card view-user-content">
          <form onSubmit={handleUserUpdate}>
            <div className="view-user-image mb-3">
              <label>User Image</label> <br />
              <img src={userDetails.profile_pic} alt="" />
            </div>
            <div className="view-user-id mb-3">
              <label>User ID</label> <br />
              <input
                className="w-100 px-2 py-2 rounded"
                type="text"
                value={userDetails.id}
                onChange={(e) => setUserdetails(e.target.value)}
                readOnly
              />
            </div>
            <div className="view-user-fname mb-3">
              <label>First Name</label> <br />
              <input
                className="w-100 px-2 py-2 rounded"
                type="text"
                value={userDetails.first_name}
                name="first_name"
                onChange={(e) =>
                  setUserdetails({
                    ...userDetails,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <div className="view-user-lname mb-3">
              <label>Last Name</label> <br />
              <input
                className="w-100 px-2 py-2 rounded"
                type="text"
                value={userDetails.last_name}
                name="last_name"
                onChange={(e) =>
                  setUserdetails({
                    ...userDetails,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <div className="view-user-email mb-3">
              <label>User Email</label> <br />
              <input
                className="w-100 px-2 py-2 rounded"
                type="email"
                value={userDetails.email}
                name="email"
                onChange={(e) =>
                  setUserdetails({
                    ...userDetails,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <div className="view-user-mobile mb-3">
              <label>User Phone</label> <br />
              <input
                className="w-100 px-2 py-2 rounded"
                type="text"
                value={userDetails.mobile}
                name="mobile"
                onChange={(e) =>
                  setUserdetails({
                    ...userDetails,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <div className="user-update-button my-3">
              <button type="submit" className="px-3 py-1 rounded">
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
