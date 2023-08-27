import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Slider1 from "../../images/form1.png";
import Slider2 from "../../images/form2.png";
import Slider3 from "../../images/form2.png";
import "./Slider.css";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const Slider = ({ caption, para }) => {
  return (
    <div className="slider-area d-flex align-items-center justify-content-center">
      <div className="swiper-content">
        <Swiper
          autoplay={{ delay: 2000 }}
          modules={[Navigation, Pagination, Autoplay]}
          pagination={{ clickable: true }}
          navigation={true}
          spaceBetween={50}
          loop={true}
          slidesPerView={1}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          <SwiperSlide>
            <div className="slider-content">
              <div className="slider-image">
                <img
                  className="d-block mx-auto slider-image"
                  src={Slider1}
                  alt=""
                />
              </div>
              <div className="slider-text mx-auto">
                <h3>{caption}</h3>
                <p>{para}</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slider-content">
              <div className="slider-image">
                <img
                  className="d-block mx-auto slider-image"
                  src={Slider2}
                  alt=""
                />
              </div>
              <div className="slider-text mx-auto ">
                <h3>{caption}</h3>
                <p>{para}</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slider-content">
              <div className="slider-image">
                <img
                  className="d-block mx-auto slider-image"
                  src={Slider3}
                  alt=""
                />
              </div>
              <div className="slider-text mx-auto">
                <h3>{caption}</h3>
                <p>{para}</p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Slider;
