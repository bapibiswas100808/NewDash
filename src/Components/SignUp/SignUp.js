import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Slider from "../Slider/Slider";
import "./SignUp.css";
import Input from "../Input/Input";
import { NavLink, useNavigate } from "react-router-dom";
import SignTop from "../SignTop/SignTop";
import Dropdown from "../Dropdown/Dropdown";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [cmPassword, setCmPassword] = useState("");
  const [selectedGender, setSelectedGender] = useState("0");
  const [countries, setCountries] = useState("");
  const [country, setCountry] = useState("20");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://auth.privateyebd.com/api/v1/country/"
        );
        setCountries(response.data.results);
      } catch (error) {
        alert(JSON.stringify(error));
      }
    };

    fetchData();
  }, []);

  const handleCountry = (e) => {
    setCountry(e.target.value);
  };

  const genderOptions = [
    {
      id: 0,
      gender: "Male",
    },
    {
      id: 1,
      gender: "Female",
    },
    {
      id: 2,
      gender: "Others",
    },
  ];
  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value);
  };

  const handleSignSubmit = (e) => {
    e.preventDefault();
    const signForm = {
      first_name: firstName,
      last_name: lastName,
      dob: dob,
      email: email,
      mobile: mobile,
      password: password,
      confirm_password: cmPassword,
      country: country,
      gender: selectedGender,
    };

    const signApi = "https://auth.privateyebd.com/api/v1/signup/";

    axios
      .post(signApi, signForm)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("email", res.data.email);
        navigate("./verification");
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
                    <form onSubmit={handleSignSubmit}>
                      <Input
                        className="mt-0"
                        label="First Name"
                        placeholder="first name"
                        handleInput={(e) => setFirstName(e.target.value)}
                        firstName={firstName}
                      />
                      <Input
                        label="Last Name"
                        placeholder="last name"
                        handleInput={(e) => setLastName(e.target.value)}
                        lastName={lastName}
                      />
                      <Input
                        type="date"
                        label="Date of Birth"
                        handleInput={(e) => setDob(e.target.value)}
                        dob={dob}
                      />
                      <Input
                        label="Email"
                        placeholder="Email"
                        handleInput={(e) => setEmail(e.target.value)}
                        email={email}
                      />
                      <Input
                        label="Phone Number"
                        placeholder="Phone Number"
                        handleInput={(e) => setMobile(e.target.value)}
                        mobile={mobile}
                      />
                      <Input
                        label="Password"
                        placeholder="password"
                        handleInput={(e) => setPassword(e.target.value)}
                        password={password}
                      />
                      <Input
                        label="Confirm Password"
                        placeholder="confirm password"
                        handleInput={(e) => setCmPassword(e.target.value)}
                        cmPassword={cmPassword}
                      />
                      <div className="country-drop my-3">
                        <label>Select Country</label> <br />
                        <select
                          className="py-1"
                          onChange={handleCountry}
                          value={country}
                          options={countries}
                        >
                          {countries.length > 0 ? (
                            countries.map((country) => (
                              <option
                                className="country-option"
                                key={country.id}
                                value={country.id}
                              >
                                {country.name}
                              </option>
                            ))
                          ) : (
                            <option value="">No options available</option>
                          )}
                        </select>
                      </div>
                      <Dropdown
                        options={genderOptions}
                        label="Select Gender"
                        value={selectedGender}
                        onChange={handleGenderChange}
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
                        <button type="submit" className="w-100">
                          Create Account
                        </button>
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
