import React, { useContext, useState, useEffect, useRef } from "react";
import { FaBars } from "react-icons/fa";
import { AiOutlineGlobal } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { CgProfile, CgWebsite } from "react-icons/cg";
import { LuSettings2 } from "react-icons/lu";
import { HiOutlineLogout } from "react-icons/hi";
import { BsFullscreenExit, BsFullscreen } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { MdOutlineDarkMode } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";
import { BsFillSunFill } from "react-icons/bs";
import "./Header.css";
import { Themecontext } from "../ThemeContext/ThemeContext";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Header = ({ onClick, isOpen }) => {
  const navigate = useNavigate();
  const profileRef = useRef(null);
  const settingRef = useRef(null);
  const [profile, setProfile] = useState([]);

  // Click Outside to list off
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  // Click Outside to seting off
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingRef.current && !settingRef.current.contains(event.target)) {
        setIsSettingsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Get Profile Data
  useEffect(() => {
    const accessToken = `Token ${localStorage.getItem("getToken")}`;
    axios
      .get("https://secom.privateyebd.com/api/v1/auth/profile/", {
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
  const firstName = profile?.data?.first_name || "";
  const countryId = profile?.data?.country || "";
  const image = profile?.data?.image_url || "";

  // Theme Selection
  const { theme, setTheme } = useContext(Themecontext);
  const [isProfileopen, setIsProfileOpen] = useState(false);
  const [isSettingsopen, setIsSettingsOpen] = useState(false);
  // const [countries, setCountries] = useState("");
  const [country, setCountry] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://secom.privateyebd.com/api/v1/auth/country/${countryId}`
        );
        setCountry(response.data);
        console.log(response.data);
      } catch (error) {
        alert(JSON.stringify(error));
      }
    };

    fetchData();
  }, [countryId]);

  // Theme Selection
  const handleMode = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };
  // Fullscreen Control
  const [fullScreen, setFullScreen] = useState(true);
  const handleFullscreen = () => {
    const isFullScreen = document.fullscreenElement;
    setFullScreen(isFullScreen);

    if (!isFullScreen) {
      const appElement = document.documentElement;
      if (appElement.requestFullscreen) {
        appElement.requestFullscreen();
      } else if (appElement.mozRequestFullScreen) {
        /* Firefox */
        appElement.mozRequestFullScreen();
      } else if (appElement.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        appElement.webkitRequestFullscreen();
      } else if (appElement.msRequestFullscreen) {
        /* IE/Edge */
        appElement.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        /* Firefox */
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        /* IE/Edge */
        document.msExitFullscreen();
      }
    }
  };
  // Log Out
  const handleLogOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("getToken");
    navigate("/signin");
  };

  return (
    <section
      style={{
        width: isOpen
          ? window.innerWidth < 992
            ? "100%"
            : "calc(100% - 240px)"
          : window.innerWidth < 992
          ? "100%"
          : "calc(100% - 75.24px)",
      }}
      className="header-div"
    >
      <div
        style={{ borderBottom: theme === "light" ? null : "1px solid #313335" }}
        className="header-area d-flex justify-content-between align-items-center"
      >
        {/* Toogle Bar */}
        <div className="header-content-left d-flex align-items-center">
          <div className="bars">
            {isOpen ? (
              window.innerWidth < 992 || window.innerWidth > 992 ? (
                <FaBars onClick={onClick} />
              ) : (
                <RxCross1 onClick={onClick} />
              )
            ) : window.innerWidth > 992 ? (
              <RxCross1 onClick={onClick} />
            ) : (
              <FaBars onClick={onClick} />
            )}
          </div>
          {/* Search Button */}
          <div className="d-none d-lg-block">
            <div className="ps-4 d-flex align-items-center">
              <div className="search-input">
                <input className="px-4 py-1 ps-5" />
              </div>
              <div className="ms-3 search-icon position-absolute">
                <i>
                  <BsSearch style={{ color: "#536485" }} />
                </i>
              </div>
              <div className="search-button">
                <button className="px-3 py-1">Search</button>
              </div>
            </div>
          </div>
        </div>

        {/* Header links */}
        <div className="header-content-right d-flex align-items-center">
          {/* Country optios */}
          <div className=" country-image">
            <img className="d-none " src={country.flag} alt="" />
            {country?.data?.data?.flag && (
              <img src={country.data.data.flag} alt="Country Flag" />
            )}
          </div>
          {/* Dark/light switch */}
          <div className="ps-3">
            <div className="switch">
              <div className="theme-button" onClick={handleMode}>
                <i className="">
                  {theme === "light" ? (
                    <MdOutlineDarkMode className="fs-5" />
                  ) : (
                    <BsFillSunFill className="fs-5" />
                  )}
                </i>
              </div>
            </div>
          </div>
          {/* Cart */}
          {/* <div className="ps-4 d-none d-lg-block">
            <i>
              <AiOutlineShoppingCart />
            </i>
          </div> */}
          {/* Notifications */}
          <div className="ps-2">
            <i>
              <IoIosNotificationsOutline className="fs-4" />
            </i>
          </div>
          {/* App Store */}
          {/* <div className="ps-4 d-none d-lg-block">
            <i>
              <AiOutlineAppstore />
            </i>
          </div> */}
          {/* Full Screen mode */}
          <div className="ps-2">
            <i style={{ color: "#536485" }} onClick={handleFullscreen}>
              {fullScreen ? (
                <BsFullscreen className="fs-5" />
              ) : (
                <BsFullscreenExit className="fs-5" />
              )}
            </i>
          </div>
          {/* Profile */}
          <div
            ref={profileRef}
            onClick={(e) => setIsProfileOpen(!isProfileopen)}
            className="ps-4 d-flex justify-content-center align-items-center header-profile"
          >
            <div className="header-profile-image">
              <img className="" src={image} alt="" />
            </div>
            <div className="profile-text text-center">
              <h5 className="profile-heading">{firstName}</h5>
              <p>Web Developer</p>
            </div>
            {isProfileopen && (
              <div className="profile-list">
                <ul className="d-flex flex-column justify-content-start mt-2 list-unstyled px-3 py-2 profile-list-inner">
                  <NavLink to="/profile">
                    <li className="profile-list-item pb-2">
                      <CgProfile className="me-2" />
                      Profile
                    </li>
                  </NavLink>
                  <NavLink to="/settings">
                    <li className="profile-list-item pb-2">
                      <LuSettings2 className="me-2" />
                      Settings
                    </li>
                  </NavLink>
                  <NavLink onClick={handleLogOut}>
                    <li className="profile-list-item pb-2">
                      <HiOutlineLogout className="me-2" />
                      Log out
                    </li>
                  </NavLink>
                </ul>
              </div>
            )}
          </div>
          {/* Settings */}
          <div
            ref={settingRef}
            className="ps-3 ps-lg-4"
            onClick={(e) => setIsSettingsOpen(!isSettingsopen)}
          >
            <FiSettings className="settings-button" />
          </div>
          {isSettingsopen && (
            <div className="settings-options">
              <ul className="list-unstyled">
                <NavLink to="/globalsetting">
                  <li>
                    <AiOutlineGlobal className="me-2" />
                    Global Settings
                  </li>
                </NavLink>
                <NavLink to="/websitesetting">
                  <li>
                    <CgWebsite className="me-2" />
                    Website Settings
                  </li>
                </NavLink>
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Header;
