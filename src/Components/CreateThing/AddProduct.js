import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddProduct.css";
import { Col, Row } from "react-bootstrap";
import axios from "axios";

const AddProduct = () => {
  const [file, setFile] = useState(null);
  const [thumbFile, setThumbFile] = useState(null);
  const [isActiveChecked, setIsActiveChecked] = useState(false);
  const [isFeatureChecked, setIsFeatureChecked] = useState(false);
  const [isProductChecked, setIsProductChecked] = useState(false);
  const [newBrand, setNewBrand] = useState([]);
  const [selectBrand, setSelectBrand] = useState();
  const [newCategory, setNewCategory] = useState([]);
  const [selectCategory, setSelectCategory] = useState();
  const [newStatus, setNewStatus] = useState(0);
  const [imageId, setImageId] = useState();
  const [thumbId, setThumbId] = useState();
  const inputRef = useRef();
  const inputThumbRef = useRef();
  const navigate = useNavigate();
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
  useEffect(() => {
    const thumbForm = new FormData();
    thumbForm.append("document", thumbFile);
    thumbForm.append("doc_type", 0);
    console.log(thumbForm);
    const accessToken = `Token ${localStorage.getItem("getToken")}`;
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://secom.privateyebd.com/api/v1/auth/documents/upload/",
          thumbForm,
          {
            headers: {
              Authorization: accessToken,
            },
          }
        );
        console.log(response.data);
        setThumbId(response.data.id);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [thumbFile]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = `Token ${localStorage.getItem("getToken")}`;
        const response = await axios.get(
          "https://secom.privateyebd.com/api/v1/inventory/admin/brands/",
          {
            headers: {
              Authorization: accessToken,
            },
          }
        );
        console.log(response.data.results);
        setNewBrand(response.data.results);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = `Token ${localStorage.getItem("getToken")}`;
        const response = await axios.get(
          "https://secom.privateyebd.com/api/v1/inventory/admin/categories/",
          {
            headers: {
              Authorization: accessToken,
            },
          }
        );
        console.log(response.data.results);
        setNewCategory(response.data.results);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchData();
  }, []);

  const handleAddMember = (event) => {
    event.preventDefault();
    const form = event.target;
    const brand = selectBrand;
    const category = selectCategory;
    const stock_status = newStatus;
    const name = form.productName.value;
    const vat = form.vatName.value;
    const price = form.priceName.value;
    const cost = form.costName.value;
    const quantity = form.quantityName.value;
    const description = form.descriptionName.value;
    const images = [imageId];
    const thumbnail = thumbId;
    const is_active = isActiveChecked;
    const is_featured = isFeatureChecked;
    const accessToken = `Token ${localStorage.getItem("getToken")}`;

    const addApi =
      "https://secom.privateyebd.com/api/v1/inventory/admin/product/";
    const addForm = {
      brand,
      category,
      thumbnail,
      images,
      name,
      description,
      quantity,
      stock_status,
      cost,
      price,
      vat,
      is_featured,
      is_active,
    };
    console.log(addForm);
    axios
      .post(addApi, addForm, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((res) => {
        console.log(res);
        navigate("/webpage5");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleBrand = (e) => {
    e.preventDefault();
    const selectedBrandId = e.target.value;
    setSelectBrand(selectedBrandId);
    console.log(selectedBrandId);
  };
  const handleCategory = (e) => {
    const categoryData = e.target.value;
    setSelectCategory(categoryData);
    console.log(categoryData);
  };
  const handleStatus = (e) => {
    const statusData = parseInt(e.target.value);
    setNewStatus(statusData);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDrop = (e) => {
    e.preventDefault();
    console.log(e.dataTransfer.files[0]);
    const mainFile = e.dataTransfer.files[0];
    if (mainFile) {
      setFile(mainFile);
    }
  };
  const handleThumbDragOver = (e) => {
    e.preventDefault();
  };
  const handleThumbDrop = (e) => {
    e.preventDefault();
    console.log(e.dataTransfer.files[0]);
    const mainThumbFile = e.dataTransfer.files[0];
    if (mainThumbFile) {
      setThumbFile(mainThumbFile);
    }
  };
  const handleSelectFile = () => {
    inputRef.current.click();
  };
  const handleSelectImage = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };
  const handleSelectThumbFile = () => {
    inputThumbRef.current.click();
  };
  const handleSelectThumbImage = (e) => {
    e.preventDefault();
    setThumbFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };
  const handleActiveCheck = (event) => {
    setIsActiveChecked(event.target.checked);
  };
  const handleFeatureCheck = (event) => {
    setIsFeatureChecked(event.target.checked);
  };
  const handleProductCheck = (event) => {
    setIsProductChecked(event.target.checked);
  };

  return (
    <section className="create-area mt-4">
      <div className="project-container">
        <h2 className="fs-4">Add New Product</h2>
        <form onSubmit={handleAddMember}>
          <div className="">
            <label>Product Name</label>
            <input
              className="p-2 mb-2 w-100 rounded"
              type="text"
              placeholder="Product Name"
              name="productName"
            />
          </div>
          <div>
            <label className="me-3">Brand Name</label> <br />
            <select
              className="w-100 px-2 py-2 rounded"
              onChange={handleBrand}
              value={selectBrand}
            >
              {newBrand.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-3">
            <label className="me-3">Category Name</label> <br />
            <select
              className="w-100 px-2 py-2 rounded"
              onChange={handleCategory}
              value={selectCategory}
            >
              {newCategory.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-3">
            <label className="me-3">Stock Status</label> <br />
            <select
              className="w-100 px-2 py-2 rounded"
              value={newStatus}
              onChange={handleStatus}
            >
              <option value="0">Select Status</option>
              <option value="1">Avaialable</option>
              <option value="2">Coming Soon!</option>
              <option value="3">Out Of Stock</option>
            </select>
          </div>
          <div className="upload-div mt-3">
            <label>Upload Image</label>
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="dropzone d-flex align-items-center"
            >
              <h5>Drag and Drop File picture here</h5>
              <h5 className="mx-3">Or</h5>
              {file && (
                <img
                  className="me-2"
                  src={URL.createObjectURL(file)}
                  alt="Selected File"
                />
              )}
              <input
                hidden
                type="file"
                onChange={handleSelectImage}
                ref={inputRef}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleSelectFile();
                }}
                className="px-2 py-2 rounded"
              >
                Select File
              </button>
            </div>
          </div>
          <div className="thumb-div mt-3">
            <label>Upload Thumbnail</label>
            <div
              onDragOver={handleThumbDragOver}
              onDrop={handleThumbDrop}
              className="dropzone d-flex align-items-center"
            >
              <h5>Drag and Drop File picture here</h5>
              <h5 className="mx-3">Or</h5>
              {thumbFile && (
                <img
                  className="me-2"
                  src={URL.createObjectURL(thumbFile)}
                  alt=""
                />
              )}
              <input
                hidden
                type="file"
                onChange={handleSelectThumbImage}
                ref={inputThumbRef}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleSelectThumbFile();
                }}
                className="px-2 py-2 rounded"
              >
                Select File
              </button>
            </div>
          </div>
          <div className="product-description mt-3">
            <label>Product Description</label>
            <textarea
              placeholder="Enter Product Details"
              className="w-100 py-3 rounded  "
              name="descriptionName"
            />
          </div>
          <div className="product-quantity">
            <label>Product Quantity</label>
            <input
              placeholder="Product Quantity"
              className="w-100 py-2 rounded"
              type="number"
              name="quantityName"
            />
          </div>
          <div className="product-cost">
            <label>Product Cost</label>
            <input
              placeholder="Product Cost"
              className="w-100 py-2 rounded"
              type="number"
              name="costName"
            />
          </div>
          <div className="product-price">
            <label>Product Price</label>
            <input
              placeholder="Price"
              className="w-100 py-2 rounded"
              type="number"
              name="priceName"
            />
          </div>
          <div className="product-vat">
            <label>Product Vat</label>
            <input
              placeholder="Vat"
              className="w-100 py-2 rounded"
              type="number"
              name="vatName"
            />
          </div>

          <div className="is-featured mt-3">
            <Row>
              <Col lg={4}>
                <span>Is Featured?</span>
              </Col>
              <Col lg={8}>
                <div className=" d-flex align-items-center">
                  <input
                    className="py-2"
                    type="checkbox"
                    checked={isFeatureChecked}
                    onChange={handleFeatureCheck}
                  />
                  <label className="ms-2">Yes</label>
                </div>
              </Col>
            </Row>
          </div>
          <div className="is-active mt-3">
            <Row>
              <Col lg={4}>
                <span>Is Active?</span>
              </Col>
              <Col lg={8}>
                <div className=" d-flex align-items-center">
                  <input
                    className="py-2"
                    type="checkbox"
                    checked={isActiveChecked}
                    onChange={handleActiveCheck}
                  />
                  <label className="ms-2">Yes</label>
                </div>
              </Col>
            </Row>
          </div>
          <div className="discount mt-3">
            <Row>
              <Col lg={4}>
                <span>Product Available?</span>
              </Col>
              <Col lg={8}>
                <div className=" d-flex align-items-center">
                  <input
                    className="py-2"
                    type="checkbox"
                    checked={isProductChecked}
                    onChange={handleProductCheck}
                  />
                  <label className="ms-2">Yes</label>
                </div>
              </Col>
            </Row>
          </div>
          <div className="discount-amount mt-3">
            <label>Discount Amount</label>
            <input
              placeholder="Discount"
              className="w-100 py-2 rounded"
              type="number"
            />
          </div>

          <button className="w-100 px-3 py-2 rounded mt-3" type="submit">
            Add New Product
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddProduct;
