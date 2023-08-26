import React from "react";
import Slider1 from "../../images/form1.png";
import Slider2 from "../../images/form2.png";
import Slider3 from "../../images/form2.png";
import "./Slider.css";

const Slider = ({ caption, para }) => {
  return (
    <div className="slider-area ">
      {/* <swiper-container slides-per-view="1" speed="500" loop="true">
        <swiper-slide>
          <img className="mx-auto d-block" src={Slider1} alt="" />
          <h3 className="swiper-heading">{caption}</h3>
          <p className="swiper-para">{para}</p>
        </swiper-slide>
        <swiper-slide>
          <img className="mx-auto d-block" src={Slider2} alt="" />
          <h3 className="swiper-heading">{caption}</h3>
          <p className="swiper-para">{para}</p>
        </swiper-slide>
        <swiper-slide>
          <img className="mx-auto d-block" src={Slider3} alt="" />
          <h3 className="swiper-heading">{caption}</h3>
          <p className="swiper-para">{para}</p>
        </swiper-slide>
      </swiper-container> */}
    </div>
  );
};

export default Slider;
