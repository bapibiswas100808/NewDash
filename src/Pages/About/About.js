import React, { useState, useEffect } from "react";
import "./About.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { BsFillEyeFill } from "react-icons/bs";
import { GrEdit } from "react-icons/gr";

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
          navigate("/users");
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
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 10;
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const record = records?.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(records.length / recordPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);
  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const changePage = (id) => {
    setCurrentPage(id);
  };

  const nextPage = () => {
    if (currentPage !== nPage) {
      setCurrentPage(currentPage + 1);
    }
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
        <div className="about-table card">
          <table className="w-100 table table-hover border text-nowrap table-bordered">
            <thead className="text-center">
              <tr>
                <th scope="row" className="">
                  <input className="form-check-input" type="checkbox" />
                </th>
                <th className="ps-2" scope="col">
                  ID
                </th>
                <th className="ps-3" scope="col">
                  Name
                </th>
                <th className="ps-3" scope="col">
                  Email
                </th>
                <th className="ps-3" scope="col">
                  Phone
                </th>
                <th className="ps-3" scope="col">
                  Rank
                </th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {record.map((d, i) => (
                <tr className="" key={i}>
                  <td>
                    <input className="form-check-input" type="checkbox" />
                  </td>
                  <td>{d.id}</td>
                  <td>{d.name}</td>
                  <td>{d.email}</td>
                  <td>{d.mobile}</td>
                  <td>{roleMappings[d.role]}</td>
                  <td className="">
                    <div className="buttons-dash d-flex align-items-center justify-content-center flex-column flex-lg-row">
                      <div className="view-button-div ">
                        <button
                          onClick={() => handleView(d.id)}
                          className=" btn-success px-2 rounded view-button"
                          style={{
                            border: "1px solid #828080",
                            fontSize: "13px",
                          }}
                        >
                          <i>
                            <BsFillEyeFill />
                          </i>
                        </button>
                      </div>
                      <div className="update-button-div">
                        <Link
                          to={`/edituser/${d.id}`}
                          className=" btn-success ms-0 ms-lg-2 px-2 rounded update-button"
                          style={{
                            border: "1px solid #828080",
                            fontSize: "13px",
                            padding: "2px",
                          }}
                        >
                          <i className="">
                            <GrEdit className="text-white" />
                          </i>
                        </Link>
                      </div>
                      <div className="delete-button-div">
                        <button
                          onClick={(e) => handleDelete(d.id)}
                          className="bg-danger rounded ms-0 ms-lg-2 px-2 delete-button"
                          style={{
                            border: "none",
                            padding: "2px",
                            color: "white",
                            fontSize: "13px",
                          }}
                        >
                          <i>
                            <AiFillDelete />
                          </i>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {records.length > 10 && (
          <nav className="mt-2">
            <ul className="pagination pagi-list">
              <li className="page-link" onClick={prePage}>
                Prev
              </li>
              {numbers.map((n, i) => (
                <li
                  className={`page-link ${
                    currentPage === n ? "active-page" : ""
                  }`}
                  key={i}
                  onClick={() => changePage(n)}
                >
                  {n}
                </li>
              ))}
              <li className="page-link" onClick={nextPage}>
                Next
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};

export default About;
