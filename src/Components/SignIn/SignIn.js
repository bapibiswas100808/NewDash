import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import SignTop from "../SignTop/SignTop";
import Input from "../Input/Input";
import Slider from "../Slider/Slider";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";
import axios from "axios";

const SignIn = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    const loginApi = "https://secom.privateyebd.com/api/v1/auth/login/";
    const loginForm = {
      email: userName,
      password: password,
    };
    axios
      .post(loginApi, loginForm)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("getToken", res.data.token);
        navigate("/profile");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="sign-in-div">
      <div className="sign-in-area">
        <Row className="gx-0">
          <Col lg={7} md={12}>
            <div className="signin-form-area d-flex align-items-center justify-content-center">
              <div className="sign-in-form-content p-5">
                <div className="sign-in-top">
                  <SignTop heading="Sign In" text="Welcome back John!" />
                  <div className="sign-in-form">
                    <form onSubmit={handleLogin}>
                      <Input
                        handleInput={(e) => setUserName(e.target.value)}
                        userName={userName}
                        label="User Name"
                        placeholder="user name"
                      />
                      <Input
                        handleInput={(e) => setPassword(e.target.value)}
                        password={password}
                        label="Password"
                        type="password"
                        placeholder="password"
                      />
                      <div className="form-checkbox d-flex align-items-center mt-3 mb-4">
                        <div>
                          <input type="checkbox" className="me-2" />
                        </div>
                        <div>
                          <label className="sign-label">
                            Remember Password?
                          </label>
                        </div>
                      </div>
                      <div className="sign-submit mt-2">
                        <button type="submit" className="w-100">
                          Sign In
                        </button>
                      </div>
                    </form>
                    <div className="go-sign mt-4 text-center">
                      {/* <p>
                        <span className="pe-1">Don't have an account?</span>
                        <NavLink to="/signup">Sign Up</NavLink>
                      </p> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={5} className="d-none d-lg-block">
            <Slider
              caption="Sign In"
              para="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce molestie urna sit amet eros hendrerit fringilla. Ut a tortor et leo gravida malesuada et at augue. Phasellus id augue et metus dignissim egestas. "
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SignIn;
