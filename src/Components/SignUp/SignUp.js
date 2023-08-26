import React from "react";
import { Col, Row } from "react-bootstrap";
import Slider from "../Slider/Slider";

const SignUp = () => {
  return (
    <section className="sign-up-div container-fluid">
      <div className="sign-up-area">
        <Row>
          <Col lg={7}>
            <div className="sign-up-content">
              <h1>Sign up content here</h1>
            </div>
          </Col>
          <Col lg={5}>
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
