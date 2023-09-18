import React, { useState, useEffect } from "react";
import "./About.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://auth.privateyebd.com/api/v2/qrcodes/"
        );
        setColumns(Object.keys(response.data[0]));
        setRecords(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [columns]);
  const handleDelete = async (id) => {
    const conf = window.confirm("Do You Want to Delete?");
    if (conf) {
      await axios
        .delete(`https://auth.privateyebd.com/api/v2/qrcodes/${id}/`)
        .then((res) => {
          alert("Record has been deleted!");
          navigate("/webpage1");
        })
        .catch((error) => {
          console.groupCollapsed(error);
        });
    }
  };
  const handleView = async (id) => {
    const accessToken = `Token ${localStorage.getItem("getToken")}`;
    console.log(accessToken);
    try {
      await axios
        .patch(
          `https://auth.privateyebd.com/api/v2/qrcodes/${id}/`,

          {
            headers: {
              Authorization: accessToken,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          const screenWidth =
            window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth;
          const popupWidth = screenWidth >= 768 ? 600 : 300;
          const popupHeight = 600;
          const popupWindow = window.open(
            "",
            "_blank",
            `width=${popupWidth},height=${popupHeight}`
          );
          popupWindow.document.write(`
            <h2>QR Code Details</h2>
            <p><strong>Title:</strong> ${response.data.title}</p>
            <p><strong>QR Text:</strong> ${response.data.qr_text}</p>
            <p><strong>QR Code Image:</strong></p>
            <img className="qr-image-view w-100" src="${response.data.qr_code}" alt="QR Code">
          `);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const handleNewMember = () => {
    navigate("/create");
  };

  return (
    <div className="about-area">
      <div className="about-cntent project-container py-4">
        <div className="about-top d-flex align-items-center justify-content-between mb-4">
          <div className="about-users">
            <h2>Users List</h2>
          </div>
          <div className="add-button">
            <button className="py-2 px-3 rounded" onClick={handleNewMember}>
              Add New Member
            </button>
          </div>
        </div>
        <table className="w-100">
          <thead className="">
            <tr>
              {columns.map((c, i) => (
                <th key={i}>{c}</th>
              ))}
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {records.map((d, i) => (
              <tr className="" key={i}>
                <td>{d.id}</td>
                <td>{d.title}</td>
                <td>{d.qr_text}</td>
                <td>
                  <img
                    style={{ height: "30px" }}
                    className="qr-image"
                    src={d.qr_code}
                    alt=""
                  />
                </td>
                <td className="">
                  <div className="buttons-dash d-flex align-items-center justify-content-center flex-column flex-lg-row">
                    <div className="view-button-div">
                      <button
                        onClick={() => handleView(d.id)}
                        className=" btn-success px-2 rounded view-button"
                        style={{
                          border: "1px solid #828080",
                          fontSize: "13px",
                        }}
                      >
                        View
                      </button>
                    </div>
                    <div className="update-button-div">
                      <Link
                        to={`/update/${d.id}`}
                        className=" btn-success ms-2 px-2 rounded update-button"
                        style={{
                          border: "1px solid #828080",
                          fontSize: "13px",
                          padding: "2px",
                          color: "#ffffff",
                        }}
                      >
                        Update
                      </Link>
                    </div>
                    <div className="delete-button-div">
                      <button
                        onClick={(e) => handleDelete(d.id)}
                        className="bg-danger rounded ms-2 px-2 delete-button"
                        style={{
                          border: "none",
                          padding: "2px",
                          color: "white",
                          fontSize: "13px",
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default About;
