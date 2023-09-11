import React, { useContext, useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { LuSettings2 } from "react-icons/lu";
import { HiOutlineLogout } from "react-icons/hi";
import { BsMoonFill, BsFullscreenExit, BsFullscreen } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { AiOutlineShoppingCart, AiOutlineAppstore } from "react-icons/ai";
import { IoIosNotificationsOutline } from "react-icons/io";
import { BsFillSunFill } from "react-icons/bs";
import "./Header.css";
import { Themecontext } from "../ThemeContext/ThemeContext";
import profileImage from "../../images/favicon1.png";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Header = ({ onClick, isOpen, onCountryChange }) => {
  // Theme Selection
  const { theme, setTheme } = useContext(Themecontext);
  const [isProfilopen, setIsProfileOpen] = useState(false);
  const [countries, setCountries] = useState("");
  const [country, setCountry] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://auth.privateyebd.com/api/v1/country/"
        );
        setCountries(response.data.results);
      } catch (error) {
        alert(JSON.stringify(error));
      }
    };

    fetchData();
  }, []);
  const handleCountry = (e) => {
    setCountry(e.target.value);
    onCountryChange(setCountry);
  };
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
        <div className="header-content-left">
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
        </div>

        {/* Header links */}
        <div className="header-content-right d-flex align-items-center">
          {/* Search Button */}
          <div className="ps-4">
            <div>
              <i>
                <BsSearch style={{ color: "#536485" }} />
              </i>
            </div>
          </div>
          {/* Country optios */}
          <div className="ps-4">
            <select onChange={handleCountry} value={country}>
              {countries.length > 0 ? (
                countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))
              ) : (
                <option value="">No options available</option>
              )}
            </select>
          </div>
          {/* Dark/light switch */}
          <div className="ps-4">
            <div className="switch">
              <button
                style={{ color: "#536485" }}
                className="theme-button"
                onClick={handleMode}
              >
                <i> {theme === "light" ? <BsMoonFill /> : <BsFillSunFill />}</i>
              </button>
            </div>
          </div>
          {/* Cart */}
          <div className="ps-4">
            <i>
              <AiOutlineShoppingCart />
            </i>
          </div>
          {/* Notifications */}
          <div className="ps-4">
            <i>
              <IoIosNotificationsOutline />
            </i>
          </div>
          {/* App Store */}
          <div className="ps-4">
            <i>
              <AiOutlineAppstore />
            </i>
          </div>
          {/* Full Screen mode */}
          <div className="ps-4">
            <button className="screen-button" onClick={handleFullscreen}>
              <i style={{ color: "#536485" }}>
                {fullScreen ? <BsFullscreen /> : <BsFullscreenExit />}
              </i>
            </button>
          </div>
          {/* Profile */}
          <div
            onClick={(e) => setIsProfileOpen(!isProfilopen)}
            className="ps-4 d-flex justify-content-center align-items-center header-profile"
          >
            <div className="profile-image">
              <img className="" src={profileImage} alt="" />
            </div>
            <div className="profile-text">
              <h5 className="profile-heading">Name</h5>
              <p>Web Developer</p>
            </div>
            {isProfilopen && (
              <ul className="profile-list d-flex flex-column justify-content-start bg-white mt-2 pe-5 py-3">
                <NavLink to="/profile">
                  <li className="profile-list-item pb-2">
                    <CgProfile className="me-2" />
                    Profile
                  </li>
                </NavLink>
                <NavLink to="/settings">
                  <li className="profile-list-item">
                    <LuSettings2 className="me-2" />
                    Settings
                  </li>
                </NavLink>
                <NavLink to="/signup">
                  <li className="profile-list-item pt-2">
                    <HiOutlineLogout className="me-2" />
                    Log out
                  </li>
                </NavLink>
              </ul>
            )}
          </div>
          {/* Settings */}
          <div className="ps-4">
            <FiSettings className="settings-button" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
