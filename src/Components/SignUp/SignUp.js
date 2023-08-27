import React from "react";
import { Col, Row } from "react-bootstrap";
import Slider from "../Slider/Slider";
import "./SignUp.css";
import Input from "../Input/Input";
import { NavLink } from "react-router-dom";
import SignTop from "../SignTop/SignTop";

const SignUp = () => {
  return (
    <section className="sign-up-div">
      <div className="sign-up-area">
        <Row className="gx-0">
          <Col lg={7} md={12}>
            <div className="sign-form-area d-flex align-items-center justify-content-center">
              <div className="sign-form-content p-5">
                {/* Sign up Top */}
                <div className="sign-up-top">
                  <SignTop
                    heading="Sign Up"
                    text="Welcome & Join us by creating a free account"
                  />
                  {/* Sign up Form */}
                  <div className="Sign-up-form">
                    <form>
                      <Input
                        className="mt-0"
                        label="First Name"
                        placeholder="first name"
                      />
                      <Input label="Last Name" placeholder="last name" />
                      <Input label="Password" placeholder="password" />
                      <Input
                        label="Confirm Password"
                        placeholder="confirm password"
                      />
                      <div className="form-checkbox">
                        <input className="mt-3" type="checkbox" />
                        {/* <label>
                          By creating an account you agree to our
                          <a href="/">Terms & Conditions</a>and
                          <a href="/">Privacy Policy</a>
                        </label> */}
                      </div>
                      <div className="sign-submit mt-2">
                        <button className="w-100">Create Account</button>
                      </div>
                    </form>
                    <div className="go-sign mt-4 text-center">
                      <p>
                        <span className="pe-1">Already have an account? </span>
                        <NavLink to="/signin">Sign In</NavLink>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={5} className="d-md-none d-lg-block">
            <Slider
              caption="Sign Up"
              para="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce molestie urna sit amet eros hendrerit fringilla. Ut a tortor et leo gravida malesuada et at augue. Phasellus id augue et metus dignissim egestas. "
            />
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default SignUp;
