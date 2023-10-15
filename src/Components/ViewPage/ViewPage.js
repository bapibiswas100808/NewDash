import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ViewPage.css";

const ViewPage = () => {
  const [policy, setPolicy] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [files, setFiles] = useState([]);
  const [thumbFile, setThumbFile] = useState(null);
  const [imageId, setImageId] = useState();
  const [thumbId, setThumbId] = useState();
  const [page, setPage] = useState({});
  const inputRef = useRef();
  const inputThumbRef = useRef();
  const navigate = useNavigate();
  const { id } = useParams();
  const currentLocation = window.location.pathname.includes("/editpage");
  useEffect(() => {
    const accessToken = `Token ${localStorage.getItem("getToken")}`;
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://secom.privateyebd.com/api/v1/utility/admin/page/${id}/`,
          {
            headers: {
              Authorization: accessToken,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response.data);
        setPage(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    // eslint-disable-line react-hooks/exhaustive-deps
  }, []);
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
    const selectedImage = e.target.files;
    console.log(e.target.files);
    if (selectedImage.length > 0) {
      setFiles([...files, ...Array.from(selectedImage)]);
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
  const handlePolicy = (e) => {
    const getPolicy = e.target.value;
    setPolicy(getPolicy);
  };
  const handleCheck = () => {
    setIsChecked(!isChecked);
  };
  const handleAddPage = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.titleName.value;
    const desc = form.desName.value;
    const video_url = form.urlName.value;
    const page_type = policy;
    const is_active = isChecked;
    const thumbnail = thumbId;
    const attachment = imageId;
    const accessToken = `Token ${localStorage.getItem("getToken")}`;
    const pageForm = {
      title,
      desc,
      video_url,
      page_type,
      is_active,
      thumbnail,
      attachment,
    };
    const pageAPi = `https://secom.privateyebd.com/api/v1/utility/admin/page/${id}/`;

    await axios
      .patch(pageAPi, pageForm, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((res) => {
        console.log(res.data);
        navigate("/globalsetting/pages");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="view-page-area">
      <div className="project-container">
        <h2 className="my-4 fs-4">
          {currentLocation ? "Edit Page" : `Page No : ${id}`}
        </h2>
        <div className="card add-page-content">
          <form onSubmit={handleAddPage}>
            <div className="add-page-title mb-3">
              <label className="mb-2">Page Title</label>
              <input
                type="text"
                className="px-3 py-2 w-100 rounded form-control"
                name="titleName"
                defaultValue={page.title}
                disabled={!currentLocation}
              />
            </div>
            <div className="add-page-des mb-3">
              <label className="mb-2">Page Description</label>
              <textarea
                type="text"
                className="px-3 py-4 w-100 rounded form-control"
                name="desName"
                defaultValue={page.desc}
                disabled={!currentLocation}
              />
            </div>
            <div className="add-page-video mb-3">
              <label className="mb-2">Video Url</label>
              <input
                type="text"
                className="px-3 py-2 w-100 rounded form-control"
                name="urlName"
                defaultValue={page.video_url}
                disabled={!currentLocation}
              />
            </div>
            {currentLocation && (
              <div className="add-page-policy mb-4">
                <label className="mb-2">Page Policy</label>
                <select
                  className="px-3 py-2 w-100 rounded form-select"
                  name="policyName"
                  onChange={handlePolicy}
                >
                  <option value="0">Privacy Policy</option>
                  <option value="1">Terms & Conditions</option>
                  <option value="2">About Us</option>
                  <option value="3">About Company</option>
                  <option value="4">General</option>
                </select>
              </div>
            )}
            {currentLocation ? (
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
            ) : (
              <div className="view-page-image">
                <label className="mb-2 ">Attachment</label> <br />
                <img src={page?.attachment_url} alt="" />
              </div>
            )}
            {currentLocation ? (
              <div className="thumb-div my-3">
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
            ) : (
              <div className="view-page-image">
                <label className="mb-2 ">Thumbnail</label> <br />
                <img src={page?.thumbnail_url} alt="" />
              </div>
            )}
            {currentLocation && (
              <div className="add-page-active mb-3">
                <label className="mb-2 me-5">Is Active?</label>
                <input
                  onChange={handleCheck}
                  checked={isChecked}
                  type="checkbox"
                  className="px-3 py-2"
                />
              </div>
            )}
            {currentLocation && (
              <button className="w-100 px-3 py-2 rounded" type="submit">
                Add New Page
              </button>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ViewPage;
