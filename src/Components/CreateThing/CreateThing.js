import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateThing.css";
import { Col, Row } from "react-bootstrap";

const CreateThing = () => {
  const [file, setFile] = useState(null);
  const [thumbFile, setThumbFile] = useState(null);
  const inputRef = useRef();
  const inputThumbRef = useRef();
  const navigate = useNavigate();
  const handleAddMember = (event) => {
    event.preventDefault();
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
            <select className="w-100 px-2 py-2 rounded">
              <option>Web App</option>
              <option>LG</option>
              <option>Sony</option>
              <option>Aroma</option>
              <option>abc</option>
            </select>
          </div>
          <div className="mt-3">
            <label className="me-3">Category Name</label> <br />
            <select className="w-100 px-2 py-2 rounded">
              <option>fg-76458</option>
              <option>fg-7645</option>
              <option>fg-7656</option>
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
                  className=""
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
                <img className="" src={URL.createObjectURL(thumbFile)} alt="" />
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
            />
          </div>
          <div className="product-quantity">
            <label>Product Quantity</label>
            <input
              placeholder="Product Quantity"
              className="w-100 py-2 rounded"
              type="number"
            />
          </div>
          <div className="product-cost">
            <label>Product Cost</label>
            <input
              placeholder="Product Cost"
              className="w-100 py-2 rounded"
              type="number"
            />
          </div>
          <div className="product-price">
            <label>Product Price</label>
            <input
              placeholder="Price"
              className="w-100 py-2 rounded"
              type="number"
            />
          </div>
          <div className="product-vat">
            <label>Product Vat</label>
            <input
              placeholder="Vat"
              className="w-100 py-2 rounded"
              type="number"
            />
          </div>

          <div className="is-featured mt-3">
            <Row>
              <Col lg={4}>
                <span>Is Featured?</span>
              </Col>
              <Col lg={8}>
                <div className=" d-flex align-items-center">
                  <input className="py-2" type="checkbox" />
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
                  <input className="py-2" type="checkbox" />
                  <label className="ms-2">Yes</label>
                </div>
              </Col>
            </Row>
          </div>
          <div className="discount mt-3">
            <Row>
              <Col lg={4}>
                <span>Discout Available?</span>
              </Col>
              <Col lg={8}>
                <div className=" d-flex align-items-center">
                  <input className="py-2" type="checkbox" />
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
            Add Member
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateThing;
