import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import "./AddCategory.css";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const [file, setFile] = useState(null);
  const [imageId, setImageId] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const [isMenuChecked, setIsMenuChecked] = useState(false);
  const navigate = useNavigate();

  const inputRef = useRef();
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
  const handleSelectFile = () => {
    inputRef.current.click();
  };
  const handleSelectImage = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };
  const handleCheck = (event) => {
    setIsChecked(event.target.checked);
  };
  const handleMenuCheck = (event) => {
    setIsMenuChecked(event.target.checked);
  };
  const handleAddBrand = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.nameInput.value;
    const description = form.desInput.value;
    const rank = form.rankInput.value;
    const is_active = isChecked;
    const is_menu = isMenuChecked;
    const image = imageId;
    const brandForm = {
      name,
      description,
      rank,
      is_active,
      is_menu,
      image,
    };
    const brandApi =
      "https://secom.privateyebd.com/api/v1/inventory/admin/categories/";
    const accessToken = `Token ${localStorage.getItem("getToken")}`;
    axios
      .post(brandApi, brandForm, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((res) => {
        console.log(res);
        navigate("/webpage3");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <section>
      <div className="project-container">
        <div className="add-category-area">
          <div className="add-category-top my-3">
            <div className="add-category-top-content">
              <h3>Add New Category</h3>
            </div>
          </div>
          <div className="add-category-bottom card">
            <form onSubmit={handleAddBrand}>
              <div className="add-brand-name">
                <label>Category Name</label>
                <input
                  className="w-100 mt-2 px-3 py-2 rounded"
                  type="text"
                  name="nameInput"
                  placeholder="Category Name"
                />
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
                    className="px-3 py-2 rounded"
                  >
                    Select File
                  </button>
                </div>
              </div>
              <div className="add-category-active mt-3">
                <label className="">Product Active?</label>
                <input
                  className="ms-3 py-2"
                  checked={isChecked}
                  onChange={handleCheck}
                  type="checkbox"
                />
              </div>
              <div className="add-category-des mt-3">
                <textarea
                  placeholder="Category Description"
                  className="px-2 pb-5 w-100 rounded"
                  name="desInput"
                />
              </div>
              <div className="add-category-rank">
                <label>Rank</label>
                <input
                  className="w-100 px-2 py-2 rounded"
                  type="number"
                  placeholder="Rank"
                  name="rankInput"
                />
              </div>
              <div className="category-active mt-3">
                <label>Menu Active?</label>
                <input
                  className="ms-3"
                  type="checkbox"
                  checked={isMenuChecked}
                  onChange={handleMenuCheck}
                />
              </div>
              <button type="submit" className="mt-3 px-3 py-2 rounded">
                Add Category
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddCategory;
