import React, { useEffect, useState } from "react";
import "./Profile.css";
import "./Profile.css";
import { BsChevronDoubleRight } from "react-icons/bs";
import {
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiOutlineYoutube,
} from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import { FiGithub } from "react-icons/fi";
import { BiLogoFacebook } from "react-icons/bi";
import { Col, NavLink, Row } from "react-bootstrap";
import profileImage from "../../images/topdealer1.jpg";
import axios from "axios";
import { useData } from "../DataContext/DataContext";

const Profile = () => {
  const [profile, setProfile] = useState([]);
  const { data, setData } = useData();
  console.log(profile);
  console.log(data);
  useEffect(() => {
    const accessToken = `Token ${localStorage.getItem("getToken")}`;
    axios
      .get("https://secom.privateyebd.com/api/v1/auth/profile/", {
        headers: { Authorization: accessToken },
      })
      .then(
        (res) => {
          console.log(res.data);
          setData(res);
          setProfile(res);
        },
        (error) => {
          console.log(error);
        }
      );
  }, [setData]);
  const firstName = data?.data?.first_name || "";
  const lastName = data?.data?.last_name || "";
  const email = data?.data?.email || "";
  const mobile = data?.data?.mobile || "";
  const bio = data?.data?.bio || "";
  const image = data?.data?.image_url || "";
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
                      src={image}
                      alt=""
                    />
                  </div>
                  <div className="profile-info flex-fill mt-3 ">
                    <div className="profile-info-top d-flex">
                      <div className="profile-info-text">
                        <h2 className="text-white fs-6 fw-normal">
                          {firstName} {lastName}
                        </h2>
                        <p className="text-white profile-para">
                          Email: {email}
                        </p>
                        <p className="text-white profile-para">
                          Phone: {mobile}
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
            <div className="bio-area pt-4 mb-4 bg-white project-container">
              <div className="bio-content pb-4">
                <div className="bio-heading">
                  <h2 className="fs-6">Professional Bio :</h2>
                  {/* <p>
                    {bio}
                    I am soniya Taulor. here by conclude that, i am founder and
                    managing director of the pastegious company name laugh at
                    all and acts as the cheif executive officer of the company
                  </p> */}
                  <div className="bio-text">
                    <p>{bio}</p>
                  </div>
                </div>
              </div>
              <div className="Links-area">
                <div className="profile-link">
                  <h2>Links :</h2>
                  <div className="links">
                    <div className="single-link">
                      <div className="link-one">
                        <span>
                          <a href="/">https://www.spurku.com/</a>
                        </span>
                      </div>
                      <div className="link-two">
                        <span>
                          <a href="/">
                            https://www.themeforest.net/user/spurku/portfolio
                          </a>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="profile-contact-area mt-5">
                <div className="contact-zone">
                  <h2>Contact Information :</h2>
                  <div className="contact-info">
                    <div className="single-info info-email">
                      <p>
                        <span>
                          <AiOutlineMail />
                        </span>
                        {email}
                      </p>
                    </div>
                    <div className="single-info info-phone">
                      <p>
                        <span>
                          <AiOutlinePhone />
                        </span>
                        {mobile}
                      </p>
                    </div>
                    <div className="single-info info-adress">
                      <p>
                        <span>
                          <CiLocationOn />
                        </span>
                        MIG-1-11, Monore Street, Geregtown, Washington DC, USA,
                        20071
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="social-network-area mt-5">
                <div className="social-networks">
                  <h2>Social Networks :</h2>
                  <div className="social-icons">
                    <BiLogoFacebook className="me-3 single-icon facebook" />
                    <AiOutlineTwitter className="me-3 single-icon twitter" />
                    <AiOutlineInstagram className="me-3 single-icon instagram" />
                    <FiGithub className="me-3 single-icon github" />
                    <AiOutlineYoutube className=" single-icon youtube" />
                  </div>
                </div>
              </div>
              <div className="skills-area py-5">
                <h2>Skills :</h2>
                <div className="skills">
                  <span className="single-skill me-2">
                    <NavLink href="#">Cloud Computing</NavLink>
                  </span>
                  <span className="single-skill me-2">
                    <NavLink href="#">Data Analysis</NavLink>
                  </span>
                  <span className="single-skill me-2">
                    <NavLink href="#">DevOps</NavLink>
                  </span>
                  <span className="single-skill me-2">
                    <NavLink href="#">Machine-Learning</NavLink>
                  </span>
                  <span className="single-skill me-2">
                    <NavLink href="#">Programming</NavLink>
                  </span>
                  <span className="single-skill me-2">
                    <NavLink href="#">Security</NavLink>
                  </span>
                  <span className="single-skill me-2">
                    <NavLink href="#">Python</NavLink>
                  </span>
                  <span className="single-skill me-2">
                    <NavLink href="#">Javascripts</NavLink>
                  </span>
                  <span className="single-skill me-2">
                    <NavLink href="#">Ruby</NavLink>
                  </span>
                  <span className="single-skill me-2">
                    <NavLink href="#">PowerShell</NavLink>
                  </span>
                  <span className="single-skill me-2">
                    <NavLink href="#">Statistics</NavLink>
                  </span>
                  <span className="single-skill me-2">
                    <NavLink href="#">SQL</NavLink>
                  </span>
                </div>
              </div>
              <div className="follower-area pb-2">
                <div className="follower-zone">
                  <h2 className="mb-3">Followers :</h2>
                  <div className="followers">
                    <ul className="list-unstyled">
                      <li>
                        <div className="single-follower d-flex align-items-top">
                          <span>
                            <img className="me-2" src={profileImage} alt="" />
                          </span>
                          <div className="follower-info flex-fill">
                            <p className="mb-0 lh-1">Alicia Sierra</p>
                            <span className="fs-11 text-muted op-7">
                              aliciasieera@gmail.com
                            </span>
                          </div>
                          <button>Follow</button>
                        </div>
                      </li>
                      <li>
                        <div className="single-follower d-flex align-items-top">
                          <span>
                            <img className="me-2" src={profileImage} alt="" />
                          </span>
                          <div className="follower-info flex-fill">
                            <p className="mb-0 lh-1">Alicia Sierra</p>
                            <span className="fs-11 text-muted op-7">
                              aliciasieera@gmail.com
                            </span>
                          </div>
                          <button>Follow</button>
                        </div>
                      </li>
                      <li>
                        <div className="single-follower d-flex align-items-top">
                          <span>
                            <img className="me-2" src={profileImage} alt="" />
                          </span>
                          <div className="follower-info flex-fill">
                            <p className="mb-0 lh-1">Alicia Sierra</p>
                            <span className="fs-11 text-muted op-7">
                              aliciasieera@gmail.com
                            </span>
                          </div>
                          <button>Follow</button>
                        </div>
                      </li>
                      <li>
                        <div className="single-follower d-flex align-items-top">
                          <span>
                            <img className="me-2" src={profileImage} alt="" />
                          </span>
                          <div className="follower-info flex-fill">
                            <p className="mb-0 lh-1">Alicia Sierra</p>
                            <span className="fs-11 text-muted op-7">
                              aliciasieera@gmail.com
                            </span>
                          </div>
                          <button>Follow</button>
                        </div>
                      </li>
                      <li>
                        <div className="single-follower d-flex align-items-top">
                          <span>
                            <img className="me-2" src={profileImage} alt="" />
                          </span>
                          <div className="follower-info flex-fill">
                            <p className="mb-0 lh-1">Alicia Sierra</p>
                            <span className="fs-11 text-muted op-7">
                              aliciasieera@gmail.com
                            </span>
                          </div>
                          <button>Follow</button>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col xxl={8} lg={12}>
            <div className="profile-content-area">
              <div className="project-container profile-content-zone">
                <h2 className="pt-4">Profile Content here</h2>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Profile;
