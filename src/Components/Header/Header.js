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
import { NavLink } from "react-router-dom";
import { Themecontext } from "../ThemeContext/ThemeContext";
import profileImage from "../../images/favicon.png";

const Header = ({ onClick, isOpen }) => {
  const { theme, setTheme } = useContext(Themecontext);
  const handleMode = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };
  const [fullScreen, setFullScreen] = useState();
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
    <div className="header-area d-flex justify-content-between align-items-center">
      <div className="header-content-left ps-4">
        <div className="bars">
          {isOpen ? (
            <FaBars onClick={onClick} />
          ) : (
            <RxCross1 onClick={onClick} />
          )}
        </div>
      </div>
      <div className="header-content-right d-flex align-items-center">
        <div className="ps-4">
          <NavLink>
            <i>
              <BsSearch style={{ color: "#536485" }} />
            </i>
          </NavLink>
        </div>
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
        <div className="ps-4">
          <i>
            <AiOutlineShoppingCart />
          </i>
        </div>
        <div className="ps-4">
          <i>
            <IoIosNotificationsOutline />
          </i>
        </div>
        <div className="ps-4">
          <i>
            <AiOutlineAppstore />
          </i>
        </div>
        <div className="ps-4">
          <button className="screen-button" onClick={handleFullscreen}>
            <i>{fullScreen ? <BsFullscreen /> : <BsFullscreenExit />}</i>
          </button>
        </div>
        <div className="ps-4 d-flex justify-content-center align-items-center">
          <div className="profile-image">
            <img className="" src={profileImage} alt="" />
          </div>
          <div className="profile-text">
            <h5 className="profile-heading">Name</h5>
            <p>Web Developer</p>
          </div>
        </div>
        <div className="ps-4 pe-4">
          <FiSettings className="settings-button" />
        </div>
      </div>
    </div>
  );
};

export default Header;
