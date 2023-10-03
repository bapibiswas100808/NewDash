import React, { useEffect, useRef, useState } from "react";
import { BiHomeAlt } from "react-icons/bi";
import {
  MdOutlineContactPage,
  MdOutlineBrandingWatermark,
  MdProductionQuantityLimits,
  MdOutlineDiscount,
} from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { AiOutlineBorderBottom, AiOutlineNotification } from "react-icons/ai";
import { GoDot } from "react-icons/go";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import Logo from "../../images/logo.png";
import Logo2 from "../../images/favicon2.png";

const Sidebar = ({ isOpen, children, setIsOpen }) => {
  const menuRef = useRef();
  useEffect(() => {
    const handler = (e) => {
      if (
        isOpen &&
        window.innerWidth < 992 &&
        !menuRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    if (window.innerWidth < 992) {
      document.addEventListener("mousedown", handler);
    }

    return () => {
      if (window.innerWidth < 992) {
        document.removeEventListener("mousedown", handler);
      }
    };
  }, [setIsOpen, isOpen]);

  // Menu Items
  const menuItem = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <BiHomeAlt />,
      heading: "MAIN",
      subitems: [],
    },
    {
      path: "/users",
      name: "User List",
      icon: <MdOutlineContactPage />,
      heading: "Users",
      subitems: [],
    },
    {
      path: "/orders",
      name: "Orders",
      icon: <AiOutlineBorderBottom />,
      heading: "Orders",
      subitems: [],
    },
    {
      path: "/categories",
      name: "Categories",
      icon: <BiCategory />,
      heading: "Category",
      subitems: [],
    },
    {
      path: "/brands",
      name: "Brands",
      icon: <MdOutlineBrandingWatermark />,
      heading: "Brand",
      subitems: [],
    },
    {
      path: "/products",
      name: "Products",
      icon: <MdProductionQuantityLimits />,
      heading: "Product",
      subitems: [],
    },
    {
      path: "/notifications",
      name: "Notifications",
      icon: <AiOutlineNotification />,
      heading: "Notification",
      subitems: [],
    },
    {
      path: "/coupons",
      name: "Coupon",
      icon: <MdOutlineDiscount />,
      heading: "Cuopon",
      subitems: [],
    },
  ];
  // Menu and Hover
  const [activeMenu, setActiveMenu] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMenuClick = (index) => {
    console.log(index);
    if (activeMenu === index) {
      setActiveMenu(null);
    } else {
      if (isHovered || isOpen) {
        setActiveMenu(index);
      }
    }
  };
  return (
    <section className="sidebar-div">
      <div className="sidebar-container">
        <div
          ref={menuRef}
          className={`sidebar ${
            !isOpen || isHovered || window.innerWidth < 992 ? "absolute" : ""
          }`}
          style={{
            backgroundColor: isHovered || isOpen ? "#111C43" : "",
            width:
              isOpen || isHovered
                ? window.innerWidth < 992
                  ? "300px"
                  : "300px"
                : window.innerWidth < 992
                ? "0px"
                : "80px",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className="top-side d-flex justify-content-center align-items-center"
            style={{ width: isOpen || isHovered ? "240px" : "80px" }}
          >
            <img
              className="logo"
              src={isOpen || isHovered ? Logo : Logo2}
              alt=""
            />
          </div>
          {/* Menu Items */}
          <div className="bottom-side-container">
            {menuItem.map((menu, index) => (
              <div className="bottom-side" key={index}>
                {/* Sidebar Heading */}
                <div className="side-heading mt-2">
                  <p
                    style={{
                      textAlign: isOpen || isHovered ? "left" : "center",
                    }}
                  >
                    {isOpen || isHovered ? menu.heading : <GoDot />}
                  </p>
                </div>

                {/* Siderbar Link */}

                <NavLink to={menu.path} onClick={() => handleMenuClick(index)}>
                  <div
                    style={{
                      padding: isOpen || isHovered ? "6px 17px" : "0",
                    }}
                    onClick={() => handleMenuClick(index)}
                    className={`d-flex align-items-center justify-content-between link ${
                      (isOpen && activeMenu === index) ||
                      (!isOpen && activeMenu === index)
                        ? "active"
                        : ""
                    }`}
                  >
                    {/* Icon and Text in link */}
                    <div className="icon-text d-flex align-items-center justify-content-center">
                      {/*Icon  */}
                      <div className="icon text-white">
                        {isOpen || isHovered ? menu.icon : null}
                      </div>

                      {/* Text */}
                      <div
                        style={{
                          fontSize: isOpen || isHovered ? "14px" : "20px",
                        }}
                        className="link-text "
                      >
                        <span>
                          {isOpen || isHovered ? menu.name : menu.icon}
                        </span>
                      </div>
                    </div>
                    {/* <div className="drop-icon text-white">
                        {isOpen || isHovered ? (
                          activeMenu === index ? (
                            <IoMdArrowDropdown style={{ fontSize: "20px" }} />
                          ) : (
                            <AiFillCaretRight style={{ fontSize: "14px" }} />
                          )
                        ) : null}
                      </div> */}
                  </div>
                </NavLink>

                {/* Sub Menu */}
                <div>
                  {activeMenu === index && (
                    <div className="dropdown ">
                      {menu.subitems.map((subitem, subindex) => (
                        <NavLink to={subitem.path} key={subindex}>
                          <div className="subitem px-3 py-2">
                            {isOpen || isHovered ? (
                              <ul>
                                <li className="text-white">{subitem.name}</li>
                              </ul>
                            ) : null}
                          </div>
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Main Area */}
        <main
          className="main-area"
          style={{
            marginLeft: isOpen
              ? window.innerWidth < 992
                ? "0px"
                : "240px"
              : window.innerWidth < 992
              ? "0px"
              : "75px",
          }}
        >
          {children}
        </main>
      </div>
    </section>
  );
};

export default Sidebar;
