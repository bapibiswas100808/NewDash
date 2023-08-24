import React, { useState } from "react";
import { BiHomeAlt } from "react-icons/bi";
import { MdOutlineContactPage } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { AiFillCaretRight } from "react-icons/ai";
import { GoDot } from "react-icons/go";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import Logo from "../../images/logo.png";
import Logo2 from "../../images/favicon1.png";

const Sidebar = ({ isOpen, children }) => {
  const menuItem = [
    {
      path: "/dashboard",
      name: "Dashboards",
      icon: <BiHomeAlt />,
      heading: "MAIN",
      subitems: [
        { path: "/dashboard1", name: "Dashboard 1" },
        { path: "/dashboard2", name: "Dashboard 2" },
      ],
    },
    {
      path: "/webpages",
      name: "Pages",
      icon: <MdOutlineContactPage />,
      heading: "GENERAL",
      subitems: [
        { path: "/webpage1", name: "Webpage 1" },
        { path: "/webpage2", name: "Webpage 2" },
      ],
    },
  ];

  const [activeMenu, setActiveMenu] = useState(null);

  const handleMenuClick = (index) => {
    if (activeMenu === index) {
      setActiveMenu(null);
    } else {
      !isOpen ? setActiveMenu(null) : setActiveMenu(index);
    }
  };

  return (
    <div className="sidebar-container">
      <div
        style={{
          width: isOpen ? "300px" : "70px",
          transition: "all 50ms ease-in-out",
        }}
        className="sidebar"
      >
        <div className="top-side d-flex justify-content-center">
          <img className="logo" src={isOpen ? Logo : Logo2} alt="" />
        </div>
        {menuItem.map((menu, index) => (
          <div className="bottom-side" key={index}>
            <div style={{ color: "#49547A" }} className="side-heading">
              <p style={{ textAlign: isOpen ? "left" : "center" }}>
                {isOpen ? menu.heading : <GoDot />}
              </p>
            </div>
            <NavLink to={menu.path} onClick={() => handleMenuClick(index)}>
              <div
                style={{ padding: isOpen ? "6px 15px" : "0" }}
                className="d-flex align-items-center justify-content-between link"
              >
                <div className="icon-text d-flex">
                  <div className="icon text-white">
                    {isOpen ? menu.icon : null}
                  </div>
                  <div
                    style={{ fontSize: !isOpen ? "20px" : "14px" }}
                    className="link-text "
                  >
                    <b>{isOpen ? menu.name : menu.icon}</b>
                  </div>
                </div>
                <div className="drop-icon text-white">
                  {isOpen ? (
                    activeMenu === index ? (
                      <IoMdArrowDropdown style={{ fontSize: "20px" }} />
                    ) : (
                      <AiFillCaretRight style={{ fontSize: "14px" }} />
                    )
                  ) : null}
                </div>
              </div>
            </NavLink>
            {activeMenu === index && (
              <div className="dropdown">
                {menu.subitems.map((subitem, subindex) => (
                  <NavLink to={subitem.path} key={subindex}>
                    <div className="subitem px-3 py-2">
                      <ul>
                        {isOpen ? (
                          <li className="text-white">{subitem.name}</li>
                        ) : null}
                      </ul>
                    </div>
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <main className="main-area">{children}</main>
    </div>
  );
};

export default Sidebar;
