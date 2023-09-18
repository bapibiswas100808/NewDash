import React, { useEffect, useState } from "react";
import { BsChevronDoubleRight } from "react-icons/bs";
import "./Settings.css";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import { useData } from "../DataContext/DataContext";

const Settings = () => {
  const { data } = useData();
  const [profile, setProfile] = useState("");
  const [toogleState, setToogleState] = useState(1);
  const [uploading, setUploading] = useState(false);
  const [imageId, setImageId] = useState();
  const [image, setImage] = useState("");
  const [oldPsw, setOldPsw] = useState("");
  const [newPsw, setNewPsw] = useState("");
  const [cNewPsw, setCNewPsw] = useState("");
  const [selectedImage, setSelectedImage] = useState(data?.data?.image_url);
  useEffect(() => {
    const accessToken = `Token ${localStorage.getItem("getToken")}`;
    axios
      .get("https://auth.privateyebd.com/api/v1/profile/", {
        headers: { Authorization: accessToken },
      })
      .then((res) => {
        setProfile(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  if (!profile) {
    return null;
  }

  const toogleTab = (index) => {
    setToogleState(index);
  };
  const handleChange = (e) => {
    const upImage = e.target.files[0];
    setImage(upImage);

    if (upImage) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(upImage);
    } else {
      setSelectedImage(null);
    }
  };
  const handleImage = () => {
    const imageApi = "https://auth.privateyebd.com/api/v1/documents/upload/";
    const imageForm = new FormData();
    imageForm.append("document", image);
    imageForm.append("doc_type", 0);
    const accessToken = `Token ${localStorage.getItem("getToken")}`;
    setUploading(true);
    axios
      .post(imageApi, imageForm, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: accessToken,
        },
      })
      .then((res) => {
        console.log(res.data.id);
        setImageId(res.data.id);
        setUploading(false);
        alert("Image Upload Successful");
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };
  const handleProfile = (e) => {
    e.preventDefault();
    const form = e.target;
    const image = imageId;
    console.log(image);
    const profileapi = "https://auth.privateyebd.com/api/v1/profile/";
    const accessToken = `Token ${localStorage.getItem("getToken")}`;
    const first_name = form.fnameInput.value;
    const last_name = form.lnameInput.value;
    const bio = form.bioInput.value;
    const countryId = data?.data?.country || "";
    const profileForm = {
      first_name,
      last_name,
      image,
      countryId,
      bio,
    };
    console.log(profileForm);
    axios
      .post(profileapi, profileForm, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((res) => {
        console.log(res.data);
        alert("Updated SuccessFully!");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleRemove = () => {
    setSelectedImage(null);
  };
  const handlePasswordChange = (e) => {
    e.preventDefault();
    const accessToken = `Token ${localStorage.getItem("getToken")}`;
    const changePasswordApi =
      "https://auth.privateyebd.com/api/v1/change/password/";
    const changePasswordForm = {
      old_password: oldPsw,
      password: newPsw,
      confirm_password: cNewPsw,
    };
    axios
      .post(changePasswordApi, changePasswordForm, {
        headers: { Authorization: accessToken },
      })
      .then((res) => {
        console.log(res.data);
        alert(res.data.detail);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="settings-area">
      <div className="setting-container project-container ">
        <div className=" settings-heading py-3 d-lg-flex justify-content-between align-items-center ">
          <div className="settings-heading-text">
            <span>Update Info</span>
          </div>
          <div className="settings-heading-nav">
            <nav>
              <ol className="list-unstyled d-flex">
                <li className="me-2 text-primary">Pages</li>
                <li>
                  <BsChevronDoubleRight className="me-2" />
                  Settings
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <Row>
          <Col lg={12}>
            <div className="settings-content card">
              <div className="settings-zone">
                <div className="tabs d-flex pb-3">
                  <div
                    onClick={() => toogleTab(1)}
                    className={
                      toogleState === 1 ? "tabs active-tabs me-4" : "tabs me-4"
                    }
                  >
                    Update Infornation
                  </div>
                  <div
                    onClick={() => toogleTab(2)}
                    className={toogleState === 2 ? "tabs active-tabs" : "tabs"}
                  >
                    Change Password
                  </div>
                </div>
                <div className="tab-contents">
                  <div
                    className={
                      toogleState === 1 ? "content active-content" : "content"
                    }
                  >
                    <div className="update-settings-info">
                      <div className="settings-info-content">
                        <div className="update-image-info">
                          <h2>Photo :</h2>

                          <img className="mb-3" src={selectedImage} alt="" />

                          <div className="update-image d-flex  flex-column flex-lg-row mb-3">
                            <div>
                              <input
                                onChange={handleChange}
                                className=""
                                type="file"
                              />
                            </div>
                            <div className="upload-buttons d-flex mt-3 mt-lg-0">
                              <div className="upload-button me-3">
                                <button onClick={handleImage} className="">
                                  {uploading ? "Uploading..." : "Upload"}
                                </button>
                              </div>
                              <div>
                                <button
                                  onClick={handleRemove}
                                  className="bg-danger"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="update-name-bio">
                          <form onSubmit={(e) => handleProfile(e)}>
                            <input
                              // label="First Name"
                              placeholder="first name"
                              name="fnameInput"
                              type="text"
                              className="w-100 mb-2"
                            />
                            <input
                              // label="Last Name"
                              placeholder="last name"
                              name="lnameInput"
                              type="text"
                              className="w-100 mb-2"
                            />
                            <textarea
                              className="w-100 border-none"
                              type="textarea"
                              placeholder="Write Something About Yourself"
                              name="bioInput"
                            />
                            <button type="submit" className="">
                              Submit
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      toogleState === 2 ? "content active-content" : "content"
                    }
                  >
                    <div className="change-password-area">
                      <div className="change-password">
                        <h2>Change Password :</h2>
                        <div className="password-form">
                          <form onSubmit={handlePasswordChange}>
                            <input
                              className="w-100 mb-2"
                              placeholder="Write Old Password"
                              onChange={(e) => setOldPsw(e.target.value)}
                            />
                            <input
                              className="w-100 mb-2"
                              placeholder="Write New Password"
                              onChange={(e) => setNewPsw(e.target.value)}
                            />
                            <input
                              className="w-100 mb-2"
                              placeholder="Confirm New Password"
                              onChange={(e) => setCNewPsw(e.target.value)}
                            />
                            <button
                              type="submit"
                              className="change-password-button"
                            >
                              Change Password
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Settings;
