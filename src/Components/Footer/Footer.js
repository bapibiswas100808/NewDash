import React from "react";
import "./Footer.css";
import { AiFillHeart } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="text-center footer px-3">
      <p>
        Copyright @ 2023 <b>Ynex</b>. Designed with{" "}
        <span className="pe-2 text-danger fs-6">
          <AiFillHeart />
        </span>
        <a className="pe-2" href="/">
          Spurko
        </a>
        All rights reserved
      </p>
    </div>
  );
};

export default Footer;
