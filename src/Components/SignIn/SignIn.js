import React from "react";
import { Col, Row } from "react-bootstrap";
import SignTop from "../SignTop/SignTop";
import Input from "../Input/Input";
import Slider from "../Slider/Slider";
import { NavLink } from "react-router-dom";
import "./SignIn.css";

const SignIn = () => {
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
                    <form>
                      <Input label="User Name" placeholder="user name" />
                      <Input label="Password" placeholder="password" />
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
                        <button className="w-100">Sign In</button>
                      </div>
                    </form>
                    <div className="go-sign mt-4 text-center">
                      <p>
                        <span className="pe-1">Don't have an account?</span>
                        <NavLink to="/signup">Sign Up</NavLink>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={5} className="d-md-none d-lg-block">
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
