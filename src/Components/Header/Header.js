import React, { useContext, useState } from "react";
import { FaBars } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { BsMoonFill, BsFullscreenExit, BsFullscreen } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { AiOutlineShoppingCart, AiOutlineAppstore } from "react-icons/ai";
import { IoIosNotificationsOutline } from "react-icons/io";
import { BsFillSunFill } from "react-icons/bs";
import "./Header.css";
import { Themecontext } from "../ThemeContext/ThemeContext";
import profileImage from "../../images/favicon1.png";
import { NavLink } from "react-router-dom";

const Header = ({ onClick, isOpen }) => {
  // Theme Selection
  const { theme, setTheme } = useContext(Themecontext);
  const [isProfilopen, setIsProfileOpen] = useState(false);
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
      style={{ width: isOpen ? "calc(100% - 240px)" : "calc(100% - 75.24px)" }}
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
              <FaBars onClick={onClick} />
            ) : (
              <RxCross1 onClick={onClick} />
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
            <select style={{ color: "#536485" }} className="country-drop">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
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
              <ul className="profile-list">
                <li className="profile-list-item">Profile</li>
                <NavLink to="/signup">
                  <li className="profile-list-item">Log out</li>
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
