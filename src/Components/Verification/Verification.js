import React, { useState } from "react";
import axios from "axios";
import "./Verification.css";
import OTP from "../OTP/OTP";
import { useNavigate } from "react-router-dom";

const Verification = () => {
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationStatus, setVerificationStatus] = useState(null);

  const userEmail = localStorage.getItem("email");
  console.log(userEmail);

  const handleVerificationCode = (e) => {
    e.preventDefault();
    const verificationApiUrl =
      "https://auth.privateyebd.com/api/v1/account/verify/";
    const verificationData = {
      email: userEmail,
      code: verificationCode,
    };
    console.log(verificationCode);
    axios
      .post(verificationApiUrl, verificationData)
      .then((response) => {
        console.log(response);
        alert("Verification Successful. Please Login.");
        setVerificationStatus("success");
        localStorage.removeItem("email");
        navigate(`/signin`);
      })
      .catch((error) => {
        console.log(error.response.data);
        alert("Verification Failed. Invalid Code.");
        setVerificationStatus("error");
      });
  };

  const handleOTPChange = (otpString) => {
    setVerificationCode(otpString);
    setVerificationStatus(null);
  };

  return (
    <section className="verification-area">
      <div className="project-container pt-4">
        <form>
          <label>Verification Code is sent to your Email!</label>
          <OTP onChange={handleOTPChange} />

          <button onClick={handleVerificationCode} className="btn bg-primary">
            Submit
          </button>
          {verificationStatus === "success" && (
            <div className="success-message">
              Verification successful. Please login.
            </div>
          )}
          {verificationStatus === "error" && (
            <div className="error-message">
              Verification failed. Please try again.
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default Verification;
