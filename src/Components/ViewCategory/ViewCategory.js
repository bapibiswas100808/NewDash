import axios from "axios";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ViewCategory.css";
import { Col, Row } from "react-bootstrap";

const ViewCategory = () => {
  const [viewCategory, setViewCategory] = useState({});
  const [categoryType, setCategoryType] = useState({});
  const [file, setFile] = useState(null);
  const [imageId, setImageId] = useState(null);
  const navigate = useNavigate();
  const inputRef = useRef();
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = `Token ${localStorage.getItem("getToken")}`;
        const response = await axios.get(
          `https://secom.privateyebd.com/api/v1/inventory/admin/categories/${id}/`,
          {
            headers: {
              Authorization: accessToken,
            },
          }
        );
        console.log(response.data);
        setViewCategory(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);
  useEffect(() => {
    const imageForm = new FormData();
    imageForm.append("document", file);
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
  }, [file]);
  const editRoute = window.location.pathname.includes("/editcategory");
  const handleCategoryType = (e) => {
    e.preventDefault();
    const type = e.target.value;
    setCategoryType(type);
  };
  console.log(categoryType);
  const handleSelectImage = () => {
    inputRef.current.click();
  };
  const handleSelectFile = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };
  const handleCategorySubmit = async (event) => {
    event.preventDefault();
    const accessToken = `Token ${localStorage.getItem("getToken")}`;
    const form = event.target;
    const name = form.fName.value;
    const description = form.desName.value;
    const rank = form.rankName.value;
    const is_active = viewCategory.is_active;
    const is_menu = viewCategory.is_menu;
    const image = file ? imageId : viewCategory.image;
    const categoryForm = {
      name,
      description,
      rank,
      is_active,
      is_menu,
      image,
    };
    console.log(categoryForm);

    await axios
      .put(
        `https://secom.privateyebd.com/api/v1/inventory/admin/categories/${id}/`,
        categoryForm,
        {
          headers: {
            Authorization: accessToken,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        navigate("/categories");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <section className="view-ategory-zone">
      <div className="view-category-area project-container">
        <h2 className="my-4 fs-4">
          {editRoute ? "Update Category" : `Category No : ${id}`}
        </h2>
        <div className="view-category-content card">
          <form onSubmit={handleCategorySubmit}>
            <div className="view-category-image">
              <label className="mb-2">Image</label> <br />
              <input
                defaultValue={viewCategory?.image_id}
                className="ms-2 rounded"
                type="file"
                hidden
                ref={inputRef}
                onChange={handleSelectFile}
                disabled={!editRoute}
              />
              <img
                onClick={handleSelectImage}
                src={file ? URL.createObjectURL(file) : viewCategory?.image_url}
                alt=""
              />
            </div>
            <Row>
              <Col lg={6}>
                <div className="view-category-name mt-3">
                  <label className="mb-2">Name</label>
                  <input
                    className="w-100 px-3 py-2 rounded"
                    type="text"
                    defaultValue={viewCategory.name}
                    name="fName"
                    disabled={!editRoute}
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div className="view-category-code mt-3">
                  <label className="mb-2">Code</label>
                  <input
                    className="w-100 px-3 py-2 rounded"
                    type="text"
                    defaultValue={viewCategory.code}
                    name="codeName"
                    disabled={!editRoute}
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div className="view-category-rank mt-3">
                  <label className="mb-2">Rank</label>
                  <input
                    className="w-100 px-3 py-2 rounded"
                    type="text"
                    defaultValue={viewCategory.rank}
                    name="rankName"
                    disabled={!editRoute}
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div className="view-category-type mt-3">
                  <label className="mb-2">Type</label>
                  <select
                    className="px-3 py-2 w-100 form-select"
                    onChange={handleCategoryType}
                  >
                    <option value="0">Normal</option>
                    <option value="1">Supreme</option>
                  </select>
                </div>
              </Col>
              <Col lg={12}>
                <div className="view-category-description mt-3">
                  <label className="mb-2">Category Description</label>
                  <textarea
                    className="px-3 py-4 w-100 rounded"
                    defaultValue={viewCategory.description}
                    name="desName"
                    disabled={!editRoute}
                  />
                </div>
              </Col>
            </Row>
            <button
              style={{ display: editRoute ? "block" : "none" }}
              type="submit"
              className="px-3 py-2 rounded w-100 my-4"
            >
              Update Category
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ViewCategory;
