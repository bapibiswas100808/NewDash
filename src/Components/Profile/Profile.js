import React, { useEffect, useState } from "react";
import "./Profile.css";
import "./Profile.css";
import { BsChevronDoubleRight } from "react-icons/bs";
import { Col, Row } from "react-bootstrap";
import profileImage from "../../images/topdealer1.jpg";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState([]);
  console.log(profile);
  useEffect(() => {
    const accessToken = `Token ${localStorage.getItem("getToken")}`;
    axios
      .get("https://auth.privateyebd.com/api/v1/profile/", {
        headers: { Authorization: accessToken },
      })
      .then(
        (res) => {
          console.log(res.data);
          setProfile(res);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);
  return (
    <div className="profile-area">
      <div className="project-container ">
        <div className=" profile-heading py-3 d-lg-flex justify-content-between align-items-center ">
          <div className="profile-heading-text">
            <span>Profile</span>
          </div>
          <div className="profile-heading-nav">
            <nav>
              <ol className="list-unstyled d-flex">
                <li className="me-2 text-primary">Pages</li>
                <li>
                  <BsChevronDoubleRight className="me-2" />
                  Profile
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <Row>
          <Col xxl={4} lg={12}>
            <div className="card profile-container">
              <div className="profile-zone">
                <div className="profile-top d-lg-flex align-items-top">
                  <div className="profile-image pe-3">
                    <img
                      className="d-block rounded-circle"
                      src={profileImage}
                      alt=""
                    />
                  </div>
                  <div className="profile-info flex-fill mt-3 ">
                    <div className="profile-info-top d-flex justify-content-between">
                      <div className="profile-info-text">
                        <h2 className="text-white fs-6 fw-normal">
                          {profile?.data?.first_name} {profile?.data?.last_name}
                        </h2>
                        <p className="text-white profile-para">
                          Email: {profile?.data?.email}
                        </p>
                        <p className="text-white profile-para">
                          Phone: {profile?.data?.mobile}
                        </p>
                      </div>
                      <div className="profile-info-button">
                        <button className="rounded bg-white border-none ">
                          <span className="">
                            <span className="me-1">+</span>Follow
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className="profile-bottom d-flex mt-4 mb-2">
                      <div className="pe-4">
                        <p className="fs-5 text-white fw-bold">113</p>
                        <p className=" text-white">Projects</p>
                      </div>
                      <div className="pe-4">
                        <p className="fs-5 text-white fw-bold">12.2k</p>
                        <p className=" text-white">Followers</p>
                      </div>
                      <div>
                        <p className="fs-5 text-white fw-bold">128</p>
                        <p className="text-white">Following</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bio-area pt-4 bg-white project-container">
              <div className="bio-content">
                <div className="bio-heading">
                  <h2 className="fs-6">Professional Bio :</h2>
                  <div className="bio-text">
                    <p>{profile?.data?.bio}</p>
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

export default Profile;
