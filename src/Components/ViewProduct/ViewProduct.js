import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ViewProduct.css";
import { Col, Row } from "react-bootstrap";

const ViewProduct = () => {
  const [viewProduct, setViewProduct] = useState({});
  const [files, setFiles] = useState([]);
  const [thumbFile, setThumbFile] = useState(null);
  const [isActiveChecked, setIsActiveChecked] = useState(false);
  const [isFeatureChecked, setIsFeatureChecked] = useState(false);
  const [imageId, setImageId] = useState();
  const [thumbId, setThumbId] = useState();
  // const [image, setImage] = useState();
  const [stock, setStock] = useState(0);
  const [newBrand, setNewBrand] = useState([]);
  const [selectBrand, setSelectBrand] = useState();
  const [newCategory, setNewCategory] = useState([]);
  const [selectCategory, setSelectCategory] = useState();
  const inputRef = useRef();
  const inputThumbRef = useRef();
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    const imageForm = new FormData();
    files.forEach((file) => {
      imageForm.append("document", file);
    });
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
              "Content-Type": "multipart/form-data",
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
  }, [files]);
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
          `https://secom.privateyebd.com/api/v1/inventory/admin/product/${id}/`,
          {
            headers: {
              Authorization: accessToken,
            },
          }
        );
        console.log(response.data);
        // const documentUrl = response.data.images[0].document;
        // setImage(documentUrl);
        setViewProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);
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
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDrop = (e) => {
    e.preventDefault();
    console.log(e.dataTransfer.files[0]);
    const mainFile = e.dataTransfer.files;
    if (mainFile.length > 0) {
      setFiles([...files, ...Array.from(mainFile)]);
    }
  };
  const handleSelectFile = () => {
    inputRef.current.click();
  };
  const handleSelectImage = (e) => {
    e.preventDefault();
    const selectedImage = e.target.files;
    console.log(e.target.files);
    if (selectedImage.length > 0) {
      setFiles([...files, ...Array.from(selectedImage)]);
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
  const handleProductStock = (e) => {
    const stockType = e.target.value;
    console.log(e.target.value);
    setStock(stockType);
  };
  const handleUpdateProduct = async (event) => {
    event.preventDefault();
    const accessToken = `Token ${localStorage.getItem("getToken")}`;
    const form = event.target;
    const brand = selectBrand;
    const category = selectCategory;
    const thumbnail = thumbId;
    const images = [imageId];
    const name = form.productName.value;
    const description = form.desName.value;
    const quantity = form.quantityName.value;
    const stock_status = stock;
    const cost = form.costName.value;
    const price = form.priceName.value;
    const vat = form.vatName.value;
    const is_featured = isFeatureChecked;
    const is_active = isActiveChecked;
    const productForm = {
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
    try {
      const response = await axios.put(
        `https://secom.privateyebd.com/api/v1/inventory/admin/product/${id}/`,
        productForm,
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );
      console.log(response);
      navigate("/products");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <div className="view-product-area project-container">
        <h2 className="my-3">Product Review</h2>
        <div className="view-product-content card">
          <div className="view-product-image">
            <img src={viewProduct.thumbnail} alt="" />
          </div>

          <form onSubmit={handleUpdateProduct}>
            <div className="view-product-name mb-3">
              <label className="mb-2">Name</label> <br />
              <input
                className="w-100 px-3 py-2 rounded"
                type="text"
                defaultValue={viewProduct.name}
                name="productName"
              />
            </div>
            <div>
              <label className="me-3">Brand Name</label> <br />
              <select
                className="w-100 px-2 py-2 rounded form-select"
                onChange={handleBrand}
                value={selectBrand}
              >
                <option>----</option>
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
                className="w-100 px-2 py-2 rounded form-select"
                onChange={handleCategory}
                value={selectCategory}
              >
                <option>------</option>
                {newCategory.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
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
                {files && (
                  <div className="up-img">
                    {files.map((file, index) => (
                      <img
                        className="me-2"
                        src={URL.createObjectURL(file)}
                        alt=""
                        key={index}
                      />
                    ))}
                  </div>
                )}
                <input
                  hidden
                  type="file"
                  onChange={handleSelectImage}
                  ref={inputRef}
                  multiple
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
                className="dropzone d-flex align-items-center up-img"
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
            <div className="view-product-description mb-3">
              <label className="mb-2">Product Description</label> <br />
              <textarea
                className="w-100 px-3 py-4 rounded"
                type="text"
                defaultValue={viewProduct.description}
                name="desName"
              />
            </div>
            <div className="view-product-quantity mb-3">
              <label className="mb-2">Product Quantity</label> <br />
              <input
                className="w-100 px-3 py-2 rounded"
                type="text"
                defaultValue={viewProduct.quantity}
                name="quantityName"
              />
            </div>
            <div className="view-product-cost mb-3">
              <label className="mb-2">Product Cost</label> <br />
              <input
                className="w-100 px-3 py-2 rounded"
                type="text"
                defaultValue={viewProduct.cost}
                name="costName"
              />
            </div>
            <div className="view-product-price mb-3">
              <label className="mb-2">Product price</label> <br />
              <input
                className="w-100 px-3 py-2 rounded"
                type="text"
                defaultValue={viewProduct.price}
                name="priceName"
              />
            </div>
            <div className="view-product-vat mb-3">
              <label className="mb-2">Vat</label> <br />
              <input
                className="w-100 px-3 py-2 rounded"
                type="text"
                defaultValue={viewProduct.vat}
                name="vatName"
              />
            </div>
            <div className="view-product-stock mb-3">
              <label className="mb-2">Stock Status</label> <br />
              <select
                onChange={handleProductStock}
                className=" py-2 w-100 rounded form-select"
              >
                <option value="0">Available</option>
                <option value="1">Coming Soon!</option>
                <option value="2">Out Of Stock</option>
              </select>
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
            <button type="submit" className="px-3 py-2 my-4 w-100 rounded">
              Update Product
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ViewProduct;
