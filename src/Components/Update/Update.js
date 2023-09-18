import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Update.css";

const Update = () => {
  const { id } = useParams();
  console.log("ID from URL:", id);
  const [data, setData] = useState({
    title: "",
    qr_text: "",
  });
  console.log(data);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://auth.privateyebd.com/api/v2/qrcodes/${id}/`)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const accessToken = `Token ${localStorage.getItem("getToken")}`;

    try {
      const response = await axios.put(
        `https://auth.privateyebd.com/api/v2/qrcodes/${id}/`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: accessToken,
          },
        }
      );

      console.log(response);
      alert("Updated Successfully!");
      navigate("/webpage1");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <section className="update-area">
      <div className="project-container">
        <h2>Update Info</h2>
        <form className="d-flex flex-column" onSubmit={handleUpdate}>
          <input
            className="p-2 mb-2 rounded"
            type="text"
            placeholder="Update Title here"
            value={data.title}
            name="title"
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
          />
          <input
            className="p-2 mb-2 rounded"
            type="text"
            placeholder="Update qr text here"
            value={data.qr_text}
            name="qr_text"
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
          />
          <button className="btn" type="submit">
            Update
          </button>
        </form>
      </div>
    </section>
  );
};

export default Update;
