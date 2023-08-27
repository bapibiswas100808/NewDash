import React from "react";
import SignLogo from "../../images/siignuplogo.png";
import { BiLogoFacebook, BiLogoTwitter } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import "./SignTop.css";

const SignTop = ({ heading, text }) => {
  return (
    <section>
      {/* Sign up logo */}
      <div className="sign-up-logo mb-3">
        <img src={SignLogo} alt="" />
      </div>
      {/* Sign up text */}
      <div className="sign-up-text">
        <h3 className="mb-2">{heading}</h3>
        <p className="mb-3">{text}</p>
      </div>
      {/* Sign up buttons */}
      <div className="sign-up-buttons">
        <button>
          <FcGoogle />
          <span className="ps-2">Sign Up with Google</span>
        </button>
        <button>
          <BiLogoFacebook className="btn-icon" />
        </button>
        <button>
          <BiLogoTwitter />
        </button>
      </div>
      {/* ---OR--- */}
      <div className="my-5 text-center or-text ">
        <span>OR</span>
      </div>
    </section>
  );
};

export default SignTop;
