import React, { useState, useEffect } from "react";
import "./OTP.css";

const OTP = ({ onChange }) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      newOtp[index] = element.value;
      return newOtp;
    });
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  useEffect(() => {
    const otpString = otp.join("");
    onChange(otpString);
  }, [otp, onChange]);

  return (
    <section>
      <div className="project-contaner">
        <div className=" otp-container">
          {otp.map((data, index) => {
            return (
              <input
                className="otp-field"
                type="text"
                name="otp"
                maxLength="1"
                key={index}
                value={data}
                onChange={(e) => handleOtpChange(e.target, index)}
                onFocus={(e) => e.target.select()}
              />
            );
          })}
        </div>
        <button
          onClick={() => setOtp(new Array(6).fill(""))}
          className="btn p-2 mb-4 mt-4 bg-primary"
        >
          Clear OTP
        </button>
      </div>
    </section>
  );
};

export default OTP;
