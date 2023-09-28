import React, { useState, useEffect } from "react";
import "./About.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = `Token ${localStorage.getItem("getToken")}`;
      try {
        const response = await axios.get(
          "https://secom.privateyebd.com/api/v1/auth/admin/user/",
          {
            headers: {
              Authorization: accessToken,
            },
            params: {
              is_active: [true, false],
            },
          }
        );
        setRecords(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const accessToken = `Token ${localStorage.getItem("getToken")}`;
    const conf = window.confirm("Do You Want to Delete?");
    if (conf) {
      await axios
        .delete(`https://secom.privateyebd.com/api/v1/auth/admin/user/${id}/`, {
          headers: {
            Authorization: accessToken,
          },
        })
        .then((res) => {
          alert("Record has been deleted!");
          setRecords((prevRecords) =>
            prevRecords.filter((record) => record.id !== id)
          );
          navigate("/webpage1");
        })
        .catch((error) => {
          console.groupCollapsed(error);
        });
    }
  };
  const handleView = async (id) => {
    navigate(`/viewuser/${id}`);
  };
  const handleNewMember = () => {
    navigate("/create");
  };
  const roleMappings = {
    0: "Customer",
    1: "Admin",
    2: "Delivery Man",
  };

  return (
    <div className="about-area">
      <div className="about-content project-container py-4">
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
        <div className="about-table">
          <table className="w-100 table">
            <thead className="">
              <tr>
                <th className="ps-2">ID</th>
                <th className="ps-3">Name</th>
                <th className="ps-3">Email</th>
                <th className="ps-3">Phone</th>
                <th className="ps-3">Rank</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {records.map((d, i) => (
                <tr className="" key={i}>
                  <td>{d.id}</td>
                  <td>{d.name}</td>
                  <td>{d.email}</td>
                  <td>{d.mobile}</td>
                  <td>{roleMappings[d.role]}</td>
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
                          to={`/viewuser/${d.id}`}
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
    </div>
  );
};

export default About;
